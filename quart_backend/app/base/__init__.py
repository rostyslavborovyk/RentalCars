from quart import Blueprint

base = Blueprint(
    'base',
    __name__,
    url_prefix='',
    template_folder='templates',
    static_folder='static'
)
