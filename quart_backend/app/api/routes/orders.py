from quart_openapi import Resource
from quart import make_response, jsonify

from app.api.utils.reqparsers import OrderReqParser
from app.api.utils.serializers import OrderSerializer
from app.models import Order
from app.api import bp
from app.api.common import get_data_for_table, get_item_from_id


@bp.route("/orders/<string:id_>")
class OrdersResource(Resource):
    async def get(self, id_):
        """
        Returns order by id
        example query http://localhost:5000/api/orders/<some_id> with GET method
        """

        response = await get_item_from_id(id_, Order.select_by_id)
        if response[0] == "error":
            return await response[1]
        serialized = OrderSerializer.to_dict(response[1])
        return await make_response(jsonify(serialized), 200)

    async def put(self, id_):
        return await make_response(jsonify({"status": "not implemented"}), 200)

    async def delete(self, id_):
        """
        Deletes order by id
        example query http://localhost:5000/api/orders/<some_id> with DELETE method
        """

        try:
            await Order.delete(id_)
        except Exception as e:
            print(e)
            return await make_response(jsonify({"status": "db error occurred"}), 500)
        return await make_response(jsonify({"status": "ok"}), 200)


@bp.route("/orders")
class OrdersListResource(Resource):
    async def post(self):
        """
        Posts order to db
        example query http://localhost:5000/api/orders with POST method
        """

        json_obj = await OrderReqParser.parse_request()
        try:
            await Order.insert(json_obj)
        except Exception as e:
            print(e)
            return await make_response(jsonify({"status": "db error occurred"}), 500)
        return await make_response(jsonify({"status": "ok"}), 200)


@bp.route("/orders/table", methods=["GET"])
async def orders_table():
    db_response = await get_data_for_table(Order.select_for_orders_table)
    if db_response[0] == "error":
        return await db_response[1]

    response_arr = []
    for i in range(len(db_response)):
        response_arr.append(OrderSerializer.table_to_dict(db_response[i]))

    return await make_response(jsonify(response_arr), 200)
