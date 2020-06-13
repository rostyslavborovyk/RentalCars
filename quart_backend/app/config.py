import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') \
                              or "mysql://srv84190_rost:pbhDcMq3Z@mysql-srv84190.hts.ru:3306/srv84190_cars"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = False
    TESTING = False
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SESSION_DURATION = 1  # in minutes
    QUART_CORS_ALLOW_ORIGIN = "*"  # todo: replace it with corresponding host


class Development(Config):
    DEBUG = True
    TESTING = True


class Production(Config):
    JSON_AS_ASCII = False


class Test(Config):
    JSON_AS_ASCII = False
