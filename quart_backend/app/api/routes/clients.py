from quart_openapi import Resource
from quart import request, make_response, jsonify

from app.models import Client
from app.api import bp
from app.api.utils import get_data_for_table


@bp.route("/clients/table", methods=["GET"])
async def clients_table():
    data = await get_data_for_table(Client.select_for_clients_table)

    response_arr = []
    for i in range(len(data)):
        obj = dict()
        obj.update(first_name=data[i][0])
        obj.update(last_name=data[i][1])
        obj.update(registration_date=data[i][2].strftime("%d.%m.%y"))
        obj.update(number_of_orders=data[i][3])
        response_arr.append(obj)
    return await make_response(jsonify(response_arr), 200)
