from app.orders import bp
from app.models import Client, Car, Order


@bp.route("/healthcheck", methods=["GET"])
async def check():
    return "Ok"
