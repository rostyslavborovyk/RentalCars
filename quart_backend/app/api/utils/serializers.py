from json import dumps
from uuid import uuid4

from app.models import Car


class CarSerializer:
    def __init__(self):
        pass

    @staticmethod
    def to_dict(db_response):
        return {
            "id": db_response[0],
            "description": db_response[1],
            "cost": db_response[2]
        }


class ClientSerializer:
    def __init__(self):
        pass

    @staticmethod
    def to_dict(db_response):
        return {
            "id": db_response[0],
            "first_name": db_response[1],
            "last_name": db_response[2],
            "registration_date": db_response[3].strftime("%d.%m.%y"),
            "passport_number": db_response[4]
        }


class OrderSerializer:
    def __init__(self):
        pass

    @staticmethod
    def to_dict(db_response):
        return {
            "id": db_response[0],
            "id_client": db_response[1],
            "id_car": db_response[2],
            "add_date": db_response[3].strftime("%d.%m.%y"),
            "rental_time": db_response[4]
        }
