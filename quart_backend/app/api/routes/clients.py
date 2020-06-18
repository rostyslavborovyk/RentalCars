from quart_openapi import Resource
from quart import make_response, jsonify

from app.models import Client
from app.api import bp
from app.api.utils import get_data_for_table


@bp.route("/clients/table", methods=["GET"])
async def clients_table():
    db_response = await get_data_for_table(Client.select_for_clients_table)
    if db_response[0] == "error":
        return await db_response[1]

    response_arr = []
    for i in range(len(db_response)):
        obj = dict()
        obj.update(first_name=db_response[i][0])
        obj.update(last_name=db_response[i][1])
        obj.update(registration_date=db_response[i][2].strftime("%d.%m.%y"))
        obj.update(number_of_orders=db_response[i][3])
        response_arr.append(obj)
    return await make_response(jsonify(response_arr), 200)
