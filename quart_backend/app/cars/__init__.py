from quart import Blueprint

bp = Blueprint(
    'cars',
    __name__,
    url_prefix='/cars',
    template_folder='templates',
    static_folder='static'
)

from app.cars import routes
