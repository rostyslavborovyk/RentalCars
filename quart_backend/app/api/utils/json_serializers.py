from json import dumps


class CarSerializer:
    def __init__(self):
        pass

    @staticmethod
    def to_dict(db_response):
        return {
            "id_": db_response[0],
            "description": db_response[1],
            "rental_cost": db_response[2]
        }
