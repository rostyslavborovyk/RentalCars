from quart import Blueprint

bp = Blueprint(
    'orders',
    __name__,
    url_prefix='/orders',
    template_folder='templates',
    static_folder='static'
)

from app.orders import routes
