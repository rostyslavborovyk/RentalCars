from quart_openapi import PintBlueprint

bp = PintBlueprint(
    'api',
    __name__,
    url_prefix='/api',
)

from app.api.routes import cars
from app.api.routes import clients
from app.api.routes import orders
