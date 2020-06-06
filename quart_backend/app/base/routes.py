from datetime import date, datetime, timedelta
from functools import wraps

from quart import request, jsonify, make_response, current_app
from bcrypt import hashpw, gensalt, checkpw
from pymysql.err import IntegrityError
import jwt
from jwt.exceptions import ExpiredSignatureError

from app.base import bp
from app.models import Car, Client


@bp.route('/healthcheck', methods=["GET"])
async def test_empty():
    return "Ok"


@bp.route('/db_healthcheck', methods=["GET"])
async def test_db():
    client = await Client.select_by_passport_number("qw23r")

    return client.first_name


@bp.route("/register", methods=["POST"])
async def register():
    params = await request.get_json()

    hashed_password = hashpw(str(params["password"]).encode("utf-8"), gensalt())

    client = Client(
        first_name=params["first_name"],
        last_name=params["last_name"],
        passport_number=params["passport_number"],
        registration_date=date.today(),
        hashed_password=hashed_password
    )
    try:
        await Client.insert_client(client)
    except IntegrityError:
        return await make_response(jsonify({"status": "Such passport_number or id already exists"}), 400)
    return await make_response(jsonify({"status": "Ok"}), 200)


@bp.route("/login", methods=["GET"])
async def login():
    headers = request.headers
    if "passport_number" not in headers or "password" not in headers:
        return await make_response(jsonify({"status": "Set passport_number and password"}), 400)

    client = await Client.select_by_passport_number(headers["passport_number"])

    if not checkpw(headers["password"].encode("utf-8"), client.hashed_password.encode("utf-8")):
        return await make_response(jsonify({"status": "Wrong password"}), 400)

    token = jwt.encode({
        "passport_number": headers["passport_number"],
        "exp": datetime.utcnow() + timedelta(minutes=current_app.config["SESSION_DURATION"])
    }, current_app.config["SECRET_KEY"]).decode("utf-8")

    return await make_response(jsonify({"status": "Ok", "x-access-token": token}), 200)


def jwt_required(f):
    @wraps(f)
    async def decorated(*args, **kwargs):
        if "x-access-token" not in request.headers:
            return await make_response(jsonify({"status": "JWT required"}), 400)
        try:
            jwt.decode(request.headers["x-access-token"], current_app.config["SECRET_KEY"])
        except ExpiredSignatureError:
            return await make_response(jsonify({"status": "JWT has expired"}), 401)
        except Exception:
            return await make_response(jsonify({"status": "Invalid JWT"}), 400)
        return await f(*args, **kwargs)

    return decorated


@bp.route("/test", methods=["GET"])
@jwt_required
async def test():
    return "Ok"
