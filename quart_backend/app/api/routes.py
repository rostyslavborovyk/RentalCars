from quart import jsonify, request, Response
from app.api import bp
from app.base.routes import jwt_required


@bp.route('/api', methods=['GET'])
@jwt_required
async def check() -> str:
    return "Ok"
