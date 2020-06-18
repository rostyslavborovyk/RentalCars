from quart_openapi import Resource
from quart import make_response, jsonify

from app.models import Car
from app.api import bp
from app.api.utils import get_data_for_table


# @bp.route("/cars/<string:car_id>")
# class CarsResource(Resource):
#     async def get(self, car_id):
#         return car_id
#
#     async def put(self, car_id):
#         return "Ok"
#
#     async def delete(self, car_id):
#         return "Ok"


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
