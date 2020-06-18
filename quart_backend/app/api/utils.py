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
