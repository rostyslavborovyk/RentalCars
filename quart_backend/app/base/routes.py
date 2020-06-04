from quart import request, jsonify
from datetime import date

from app.base import bp
from app.models import Car, Client


@bp.route('/', methods=["GET"])
async def index():
    data = await Car.get_car_by_id(1)
    return f"Hello, we have car {data[1]}"


@bp.route("/register", methods=["POST"])
async def register():
    response = await request.get_json()

    hashed_password = response[""]

    client = Client(
        first_name=response["first_name"],
        last_name=response["last_name"],
        passport_number=response["passport_number"],
        registration_date=date.today()
    )

    await Client.add_client(client)

    return jsonify({"status": "Ok"})
