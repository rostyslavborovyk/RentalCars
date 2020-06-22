from quart import request, make_response, jsonify


async def get_data_for_table(select_func):
    num_of_items = request.args.get("num_of_items")
    offset = request.args.get("offset")
    if not num_of_items or not offset:
        return "error", make_response(jsonify({"status": "num_of_items or offset query params is not set"}), 400)
    try:
        data = await select_func(
            num_of_items=num_of_items,
            offset=offset
        )
    except Exception as e:
        print(e)
        return "error", make_response(jsonify({"status": "db error occurred, check query params"}), 500)

    return data


async def get_item_from_id(id_, get_func):
    if not id_:
        return "error", make_response(jsonify({"status": "id query param is not set"}), 400)
    item = await get_func(id_)
    if item is None:
        return "error", make_response(jsonify({"status": "no item with such id"}), 400)
    return "ok", item
