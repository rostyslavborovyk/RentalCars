from quart_openapi import Resource
from quart import request, make_response, jsonify

from app.models import Car
from app.api import bp
from app.api.utils import get_data_for_table


@bp.route("/cars")
class CarsResource(Resource):
    async def get(self):
        return "Hllo"


@bp.route("/cars/table", methods=["GET"])
async def cars_table():
    data = await get_data_for_table(Car.select_for_cars_table)

    response_arr = []
    for i in range(len(data)):
        obj = dict()
        obj.update(car_description=data[i][0])
        obj.update(rental_cost=data[i][1])
        obj.update(number_of_orders=data[i][2])
        response_arr.append(obj)
    return await make_response(jsonify(response_arr), 200)
