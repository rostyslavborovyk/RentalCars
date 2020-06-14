from quart import jsonify, make_response

from app.cars import bp
from app.models import Client, Car, Order


@bp.route("/healthcheck", methods=["GET"])
async def check():
    return "Ok"


@bp.route("/cars_table", methods=["GET"])
async def cars_table():
    data = await Car.select_for_cars_table()

    response_arr = []
    for i in range(len(data)):
        obj = dict()
        obj.update(car_description=data[i][0])
        obj.update(rental_cost=data[i][1])
        obj.update(number_of_orders=data[i][2])
        response_arr.append(obj)
    return await make_response(jsonify(response_arr), 200)
