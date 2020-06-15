from quart import jsonify, make_response, request

from app.clients import bp
from app.models import Client, Car, Order


@bp.route("/healthcheck", methods=["GET"])
async def check():
    return "Ok"


@bp.route("/clients_table", methods=["GET"])
async def clients_table():
    num_of_items = request.args.get("num_of_items")
    offset = request.args.get("offset")
    if not num_of_items or not offset:
        return await make_response(jsonify({"status": "num_of_items or offset query params is not set"}), 400)
    try:
        data = await Client.select_for_clients_table(
            num_of_items=num_of_items,
            offset=offset
        )
    except Exception as e:
        print(e)
        return await make_response(jsonify({"status": "db error occurred, check query params"}), 500)

    response_arr = []
    for i in range(len(data)):
        obj = dict()
        obj.update(first_name=data[i][0])
        obj.update(last_name=data[i][1])
        obj.update(registration_date=data[i][2].strftime("%d.%m.%y"))
        obj.update(number_of_orders=data[i][3])
        response_arr.append(obj)
    return await make_response(jsonify(response_arr), 200)
