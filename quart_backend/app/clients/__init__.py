from quart import Blueprint

bp = Blueprint(
    'clients',
    __name__,
    url_prefix='/clients',
    template_folder='templates',
    static_folder='static'
)

from app.clients import routes
