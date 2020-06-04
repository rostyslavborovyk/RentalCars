import quart.flask_patch

from quart import Quart
from quart_backend.app.config import Development
from importlib import import_module
from dotenv import load_dotenv
from databases import Database
import sqlalchemy
from quart_auth import AuthManager

load_dotenv()

# "databases" engine to execute async queries
db = Database(Development.SQLALCHEMY_DATABASE_URI)

# "sqlalchemy" sync engine to create tables
engine = sqlalchemy.create_engine(Development.SQLALCHEMY_DATABASE_URI)

auth_manager = AuthManager()


def register_blueprints(app):
    base_bp = import_module("app.base.routes").bp
    app.register_blueprint(base_bp, url_prefix="")

    api_bp = import_module("app.api").bp
    app.register_blueprint(api_bp, url_prefix='/api')


def create_app(config_class=Development):
    # app = Quart(__name__)
    app = Quart(__name__)

    @app.before_request
    async def connect_db():
        await db.connect()

    @app.after_request
    async def disconnect_db(response):
        await db.disconnect()
        return response

    app.config.from_object(Development)
    register_blueprints(app)

    auth_manager.init_app(app)
    return app
