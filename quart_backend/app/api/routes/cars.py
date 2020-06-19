from quart_openapi import Resource
from quart import make_response, jsonify

from app.models import Car
from app.api import bp
from app.api.common import get_data_for_table, get_item_from_id
from app.api.utils.serializers import CarSerializer
from app.api.utils.reqparsers import CarReqParser


@bp.route("/cars")
class CarsResource(Resource):
    async def get(self):
        response = await get_item_from_id(Car.select_by_id)
        if response[0] == "error":
            return await response[1]
        serialized = CarSerializer.to_dict(response[1])
        return await make_response(jsonify(serialized), 200)

    async def post(self):
        json_obj = await CarReqParser.parse_request()
        try:
            await Car.insert(json_obj)
        except Exception as e:
            print(e)
            return await make_response(jsonify({"status": "db error occurred"}), 500)
        return await make_response(jsonify({"status": "ok"}), 200)

    async def put(self):
        return await make_response(jsonify({"status": "not implemented"}), 200)

    async def delete(self):
        id_ = await CarReqParser.get_id_from_request()
        try:
            await Car.delete(id_)
        except Exception as e:
            print(e)
            return await make_response(jsonify({"status": "db error occurred"}), 500)
        return await make_response(jsonify({"status": "ok"}), 200)


@bp.route("/cars/table", methods=["GET"])
async def cars_table():
    db_response = await get_data_for_table(Car.select_for_cars_table)
    if db_response[0] == "error":
        return await db_response[1]

    response_arr = []
    # todo put this logic to serializer
    for i in range(len(db_response)):
        obj = dict()
        obj.update(car_id=db_response[i][0])
        obj.update(car_description=db_response[i][1])
        obj.update(rental_cost=db_response[i][2])
        obj.update(number_of_orders=db_response[i][3])
        response_arr.append(obj)
    return await make_response(jsonify(response_arr), 200)
