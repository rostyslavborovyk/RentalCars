import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SESSION_DURATION = 5  # in minutes
    QUART_CORS_ALLOW_ORIGIN = [
        "http://localhost:3000",
    ]


class Development(Config):
    DEBUG = True
    TESTING = True


class Production(Config):
    JSON_AS_ASCII = False


class Test(Config):
    JSON_AS_ASCII = False
    SQLALCHEMY_DATABASE_URI = os.environ.get('TEST_DATABASE_URL')