import quart.flask_patch

from quart import Quart
from app.config import Config
from importlib import import_module
from dotenv import load_dotenv
from databases import Database
import sqlalchemy
from quart_openapi import Pint

load_dotenv()

# "databases" engine to execute async queries
db = Database(Config.SQLALCHEMY_DATABASE_URI)

# "sqlalchemy" sync engine to create tables
engine = sqlalchemy.create_engine(Config.SQLALCHEMY_DATABASE_URI)


def register_blueprints(app):
    base = import_module("app.base.routes").base
    app.register_blueprint(base, url_prefix="")

    api_bp = import_module("app.api").bp
    app.register_blueprint(api_bp, url_prefix='/api')


def create_app(config_class=Config):
    # app = Quart(__name__)
    app = Quart(__name__)

    @app.before_request
    async def connect_db():
        await db.connect()

    @app.after_request
    async def disconnect_db(response):
        await db.disconnect()
        return response

    app.config.from_object(Config)
    register_blueprints(app)
    return app
