from quart_openapi import Resource
from quart import make_response, jsonify

from app.api.utils.reqparsers import ClientReqParser
from app.api.utils.serializers import ClientSerializer
from app.models import Client
from app.api import bp
from app.api.common import get_data_for_table, get_item_from_id


@bp.route("/clients/<string:id_>")
class ClientsResource(Resource):
    async def get(self, id_):
        response = await get_item_from_id(id_, Client.select_by_id)
        if response[0] == "error":
            return await response[1]
        serialized = ClientSerializer.to_dict(response[1])
        return await make_response(jsonify(serialized), 200)

    async def put(self, id_):
        return await make_response(jsonify({"status": "not implemented"}), 200)

    async def delete(self, id_):
        try:
            await Client.delete(id_)
        except Exception as e:
            print(e)
            return await make_response(jsonify({"status": "db error occurred"}), 500)
        return await make_response(jsonify({"status": "ok"}), 200)


@bp.route("/clients")
class ClientsListResource(Resource):
    async def post(self):
        json_obj = await ClientReqParser.parse_request()
        try:
            await Client.insert(json_obj)
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
    for i in range(len(db_response)):
        response_arr.append(ClientSerializer.table_to_dict(db_response[i]))

    return await make_response(jsonify(response_arr), 200)
