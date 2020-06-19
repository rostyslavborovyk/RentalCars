from quart_openapi import Resource
from quart import make_response, jsonify

from app.api.utils.serializers import OrderSerializer
from app.models import Order
from app.api import bp
from app.api.common import get_data_for_table


@bp.route("/orders")
class OrdersResource(Resource):
    async def get(self):
        return await make_response(jsonify({"status": "not implemented"}), 200)

    async def post(self):
        return await make_response(jsonify({"status": "not implemented"}), 200)

    async def put(self):
        return await make_response(jsonify({"status": "not implemented"}), 200)

    async def delete(self):
        return await make_response(jsonify({"status": "not implemented"}), 200)


@bp.route("/orders/table", methods=["GET"])
async def orders_table():
    db_response = await get_data_for_table(Order.select_for_orders_table)
    if db_response[0] == "error":
        return await db_response[1]

    response_arr = []
    # todo put this logic to serializer
    for i in range(len(db_response)):
        obj = dict()
        obj.update(order_id=db_response[i][0])
        obj.update(car_number=db_response[i][1])
        obj.update(client_passport_num=db_response[i][2])
        obj.update(add_date=db_response[i][3].strftime("%d.%m.%y"))
        obj.update(rental_time=db_response[i][4])
        obj.update(car_rental_cost=db_response[i][5])
        obj.update(total_cost=db_response[i][6])
        response_arr.append(obj)
    return await make_response(jsonify(response_arr), 200)
