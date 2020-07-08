from quart_openapi import Resource
from quart import make_response, jsonify, request

from app.api.utils.response_formers import CarsResponseFormer
from app.models import Car
from app.api import bp
from app.api.common import get_data_for_table, get_item_from_id, get_num_of_pages
from app.api.common import get_items_query_params, get_items_cost_query_params
from app.api.utils.serializers import CarSerializer
from app.api.utils.reqparsers import CarReqParser


@bp.route("/cars/<string:id_>")
class CarsResource(Resource):
    async def get(self, id_):
        """
        Returns car by id
        example query http://localhost:5000/api/cars/<some_id> with GET method
        """

        response = await get_item_from_id(id_, Car.select_by_id)
        if response[0] == "error":
            return await response[1]
        serialized = CarSerializer.to_dict(response[1])
        return await make_response(jsonify(serialized), 200)

    async def put(self, id_):
        return await make_response(jsonify({"status": "not implemented"}), 200)

    async def delete(self, id_):
        """
        Deletes car by id
        example query http://localhost:5000/api/cars/<some_id> with DELETE method
        """

        try:
            status = await Car.delete(id_)
            if status == 0:
                return await make_response(jsonify({"status": "no item with such id"}), 400)
        except Exception as e:
            print(e)
            return await make_response(jsonify({"status": "db error occurred"}), 500)
        return await make_response(jsonify({"status": "ok", "id": id_}), 200)


@bp.route("/cars")
class CarsListResource(Resource):
    async def post(self):
        """
        Posts car to db
        example query http://localhost:5000/api/cars with POST method

        Example data:
        {
            "description":"suzuki",
            "cost": "135"
        }
        """

        json_obj = await CarReqParser.parse_request()
        try:
            id_ = await Car.insert(json_obj)
        except Exception as e:
            print(e)
            return await make_response(jsonify({"status": "db error occurred"}), 500)
        return await make_response(jsonify({"status": "ok", "id": id_}), 200)


@bp.route("/cars/table", methods=["GET"])
async def cars_table():
    db_response = await get_data_for_table(
        select_func=Car.select_for_cars_table,
        **{**get_items_query_params(), **get_items_cost_query_params()}
    )
    if len(db_response) == 0:
        return await make_response(jsonify(CarsResponseFormer.form([], 0)), 200)

    if db_response[0] == "error":
        return await db_response[1]

    params = dict(
        cost_filter=True if request.args.get("from_cost") else None,
        params=get_items_cost_query_params()
    )
    num_of_pages = await get_num_of_pages(Car.count_all, **params)
    return await make_response(jsonify(CarsResponseFormer.form(db_response, num_of_pages)), 200)
