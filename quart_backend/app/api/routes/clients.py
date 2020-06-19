from quart_openapi import Resource
from quart import make_response, jsonify

from app.api.utils.reqparsers import ClientReqParser
from app.api.utils.serializers import ClientSerializer
from app.models import Client
from app.api import bp
from app.api.common import get_data_for_table, get_item_from_id


@bp.route("/clients")
class ClientsResource(Resource):
    async def get(self):
        response = await get_item_from_id(Client.select_by_id)
        if response[0] == "error":
            return await response[1]
        serialized = ClientSerializer.to_dict(response[1])
        return await make_response(jsonify(serialized), 200)

    async def post(self):
        json_obj = await ClientReqParser.parse_request()
        try:
            await Client.insert(json_obj)
        except Exception as e:
            print(e)
            return await make_response(jsonify({"status": "db error occurred"}), 500)
        return await make_response(jsonify({"status": "ok"}), 200)

    async def put(self):
        return await make_response(jsonify({"status": "not implemented"}), 200)

    async def delete(self):
        id_ = await ClientReqParser.get_id_from_request()
        try:
            await Client.delete(id_)
        except Exception as e:
            print(e)
            return await make_response(jsonify({"status": "db error occurred"}), 500)
        return await make_response(jsonify({"status": "ok"}), 200)


@bp.route("/clients/table", methods=["GET"])
async def clients_table():
    db_response = await get_data_for_table(Client.select_for_clients_table)
    if db_response[0] == "error":
        return await db_response[1]

    response_arr = []
    # todo put this logic to serializer
    for i in range(len(db_response)):
        obj = dict()
        obj.update(client_id=db_response[i][0])
        obj.update(first_name=db_response[i][1])
        obj.update(last_name=db_response[i][2])
        obj.update(registration_date=db_response[i][3].strftime("%d.%m.%y"))
        obj.update(number_of_orders=db_response[i][4])
        response_arr.append(obj)
    return await make_response(jsonify(response_arr), 200)
