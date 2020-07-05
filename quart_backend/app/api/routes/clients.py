from quart_openapi import Resource
from quart import make_response, jsonify

from app.api.utils.reqparsers import ClientReqParser
from app.api.utils.response_formers import ClientsResponseFormer
from app.api.utils.serializers import ClientSerializer
from app.models import Client
from app.api import bp
from app.api.common import get_data_for_table, get_item_from_id, get_num_of_pages


@bp.route("/clients/<string:id_>")
class ClientsResource(Resource):
    async def get(self, id_):
        """
        Returns client by id
        example query http://localhost:5000/api/clients/<some_id> with GET method
        """

        response = await get_item_from_id(id_, Client.select_by_id)
        if response[0] == "error":
            return await response[1]
        serialized = ClientSerializer.to_dict(response[1])
        return await make_response(jsonify(serialized), 200)

    async def put(self, id_):
        return await make_response(jsonify({"status": "not implemented"}), 200)

    async def delete(self, id_):
        """
        Deletes client by id
        example query http://localhost:5000/api/clients/<some_id> with DELETE method
        """

        try:
            status = await Client.delete(id_)
            if status == 0:
                return await make_response(jsonify({"status": "no item with such id"}), 400)
        except Exception as e:
            print(e)
            return await make_response(jsonify({"status": "db error occurred"}), 500)
        return await make_response(jsonify({"status": "ok", "id": id_}), 200)


@bp.route("/clients")
class ClientsListResource(Resource):
    async def post(self):
        """
        Posts client to db
        example query http://localhost:5000/api/clients with POST method

        Example data:
        {
            "first_name":"Test",
            "last_name": "Test",
            "passport_number": "123jkw",
            "password": "1234"
        }
        """

        json_obj = await ClientReqParser.parse_request()
        try:
            id_ = await Client.insert(json_obj)
        except Exception as e:
            print(e)
            return await make_response(jsonify({"status": "db error occurred"}), 500)
        return await make_response(jsonify({"status": "ok", "id": id_}), 200)


@bp.route("/clients/table", methods=["GET"])
async def clients_table():
    db_response = await get_data_for_table(Client.select_for_clients_table)
    if len(db_response) == 0:
        return await make_response(jsonify(ClientsResponseFormer.form([], 0)), 200)

    if db_response[0] == "error":
        return await db_response[1]

    num_of_pages = await get_num_of_pages(Client.count_all)

    return await make_response(jsonify(ClientsResponseFormer.form(db_response, num_of_pages)), 200)
