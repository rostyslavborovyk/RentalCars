from quart_openapi import Resource
from quart import make_response, jsonify

from app.models import Car
from app.api import bp
from app.api.common import get_data_for_table, get_item_from_id
from app.api.utils.json_serializers import CarSerializer


@bp.route("/cars")
class CarsResource(Resource):
    async def get(self):
        response = await get_item_from_id(Car.select_by_id)
        if response[0] == "error":
            return await response[1]
        serialized = CarSerializer.to_dict(response[1])
        return await make_response(jsonify(serialized), 400)

    async def put(self):
        return "Ok"

    async def delete(self):
        return "Ok"


@bp.route("/cars/table", methods=["GET"])
async def cars_table():
    db_response = await get_data_for_table(Car.select_for_cars_table)
    if db_response[0] == "error":
        return await db_response[1]

    response_arr = []
    for i in range(len(db_response)):
        obj = dict()
        obj.update(car_description=db_response[i][0])
        obj.update(rental_cost=db_response[i][1])
        obj.update(number_of_orders=db_response[i][2])
        response_arr.append(obj)
    return await make_response(jsonify(response_arr), 200)
