from quart import jsonify, make_response

from app.orders import bp
from app.models import Client, Car, Order


@bp.route("/healthcheck", methods=["GET"])
async def check():
    return "Ok"


@bp.route("/orders_table", methods=["GET"])
async def orders_table():
    data = await Client.select_for_orders_table()

    response_arr = []
    for i in range(len(data)):
        obj = dict()
        obj.update(car_number=data[i][0])
        obj.update(client_passport_num=data[i][1])
        obj.update(add_date=data[i][2].strftime("%d.%m.%y"))
        obj.update(rental_time=data[i][3])
        obj.update(car_rental_cost=data[i][4])
        obj.update(total_cost=data[i][5])
        response_arr.append(obj)
    return await make_response(jsonify(response_arr), 200)
