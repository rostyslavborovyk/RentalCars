import quart.flask_patch
from quart import Quart
from importlib import import_module
from dotenv import load_dotenv
from databases import Database
import sqlalchemy
from quart_cors import cors
from quart_openapi import Pint
from app.common.db_init import DbWrapper

# one import for running alembic commands, other for running app
try:
    from app.config import Development
except ModuleNotFoundError:
    from quart_backend.app.config import Development

load_dotenv()

# # "databases" engine to execute async queries
# db = Database(Development.SQLALCHEMY_DATABASE_URI)
#
# # "sqlalchemy" sync engine to create tables
# engine = sqlalchemy.create_engine(Development.SQLALCHEMY_DATABASE_URI)


def register_blueprints(app: Pint) -> None:
    base_bp = import_module("app.base").bp
    app.register_blueprint(base_bp)

    api_bp = import_module("app.api").bp
    app.register_blueprint(api_bp)


def create_app(config_class=Development) -> Pint:
    app = Pint(__name__)
    app.test_client()
    DbWrapper.set_url(config_class.SQLALCHEMY_DATABASE_URI)
    db = DbWrapper.create_instance()

    @app.before_request
    async def connect_db() -> None:
        # todo: replace Exception with AlreadyConnectedToDbException
        try:
            await db.connect()
        except Exception:
            pass

    @app.after_request
    async def disconnect_db(response) -> None:
        await db.disconnect()
        return response

    app.config.from_object(Development)
    register_blueprints(app)

    app = cors(app, allow_credentials=True)
    return app
