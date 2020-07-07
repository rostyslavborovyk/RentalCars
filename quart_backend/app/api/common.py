from quart import request, make_response, jsonify
from math import ceil


def get_items_query_params():
    return dict(
        num_of_items=request.args.get("num_of_items"),
        offset=request.args.get("offset")
    )


def get_items_date_query_params():
    return dict(
        from_date=request.args.get("from_date"),
        to_date=request.args.get("to_date")
    )


def get_items_cost_query_params():
    return dict(
        from_cost=request.args.get("from_cost"),
        by_cost=request.args.get("by_cost")
    )


async def get_data_for_table(select_func, **params):
    if not params["num_of_items"] or not params["offset"]:
        return "error", make_response(jsonify({"status": "num_of_items or offset query params is not set"}), 400)
    try:
        data = await select_func(**params)
    except Exception as e:
        print(e)
        return "error", make_response(jsonify({"status": "db error occurred, check query params"}), 500)
    return data


async def get_num_of_pages(count_func, **params):
    # todo get the number of pages with regard to date query params
    num = (await count_func(**params))[0]
    return ceil(num / int(request.args.get("num_of_items")))


async def get_item_from_id(id_, get_func):
    if not id_:
        return "error", make_response(jsonify({"status": "id query param is not set"}), 400)
    item = await get_func(id_)
    if item is None:
        return "error", make_response(jsonify({"status": "no item with such id"}), 400)
    return "ok", item
