from quart import jsonify, request, Response
from app.api import bp


@bp.route('/api', methods=['GET'])
async def healthcheck():
    return "Ok"
