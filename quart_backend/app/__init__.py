from quart import Quart
from app.config import Config
from importlib import import_module
from dotenv import load_dotenv

load_dotenv()


def register_blueprints(app):
    base = import_module("app.base.routes").base
    app.register_blueprint(base)


def create_app(config_class=Config):
    app = Quart(__name__)

    app.config.from_object(Config)
    register_blueprints(app)
    return app
