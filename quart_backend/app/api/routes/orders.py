from quart_openapi import Resource
from quart import make_response, jsonify

from app.models import Order
from app.api import bp
from app.api.utils import get_data_for_table


@bp.route("/orders/table", methods=["GET"])
async def orders_table():
    db_response = await get_data_for_table(Order.select_for_orders_table)
    if db_response[0] == "error":
        return await db_response[1]

    response_arr = []
    for i in range(len(db_response)):
        obj = dict()
        obj.update(car_number=db_response[i][0])
        obj.update(client_passport_num=db_response[i][1])
        obj.update(add_date=db_response[i][2].strftime("%d.%m.%y"))
        obj.update(rental_time=db_response[i][3])
        obj.update(car_rental_cost=db_response[i][4])
        obj.update(total_cost=db_response[i][5])
        response_arr.append(obj)
    return await make_response(jsonify(response_arr), 200)
