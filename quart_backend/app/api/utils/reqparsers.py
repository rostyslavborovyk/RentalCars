from quart import request
from json import loads


class BaseReqParser:
    def __init__(self, *args, **kwargs):
        pass

    @classmethod
    def remove_spaces(cls, data):
        data: str = data.decode("utf-8")
        data.replace("\n", "")
        data.replace("\t", "")
        data.replace(" ", "")
        return data

    @classmethod
    async def parse_request(cls):
        data = await request.data
        return loads(cls.remove_spaces(data))

    @classmethod
    async def get_id_from_request(cls):
        data = loads(cls.remove_spaces(await request.data))
        return data["id"]


class CarReqParser(BaseReqParser):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)


class ClientReqParser(BaseReqParser):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    # @classmethod
    # async def parse_request(cls):
    #     data = await request.data
    #     return loads(cls.remove_spaces(data))
    #
    # @classmethod
    # async def get_id_from_request(cls):
    #     data = loads(cls.remove_spaces(await request.data))
    #     return data["id"]
