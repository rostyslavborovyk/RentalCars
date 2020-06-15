from quart import jsonify, make_response, request

from app.cars import bp
from app.models import Client, Car, Order


@bp.route("/healthcheck", methods=["GET"])
async def check():
    return "Ok"


@bp.route("/cars_table", methods=["GET"])
async def cars_table():
    num_of_items = request.args.get("num_of_items")
    offset = request.args.get("offset")
    if not num_of_items or not offset:
        return await make_response(jsonify({"status": "num_of_items or offset query params is not set"}), 400)
    try:
        data = await Car.select_for_cars_table(
            num_of_items=num_of_items,
            offset=offset
        )
    except Exception as e:
        print(e)
        return await make_response(jsonify({"status": "db error occurred, check query params"}), 500)

    response_arr = []
    for i in range(len(data)):
        obj = dict()
        obj.update(car_description=data[i][0])
        obj.update(rental_cost=data[i][1])
        obj.update(number_of_orders=data[i][2])
        response_arr.append(obj)
    return await make_response(jsonify(response_arr), 200)
