from app.api.utils.serializers import OrderSerializer, ClientSerializer, CarSerializer


class ResponseFormer:
    def __init__(self):
        pass


class OrdersResponseFormer:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @classmethod
    def form(cls, orders_db_response, num_of_pages_db_response) -> dict:
        items = []
        for i in range(len(orders_db_response)):
            items.append(OrderSerializer.table_to_dict(orders_db_response[i]))

        return dict(
            num_of_pages=num_of_pages_db_response,
            items=items
        )


class ClientsResponseFormer:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @classmethod
    def form(cls, orders_db_response, num_of_pages_db_response) -> dict:
        items = []
        for i in range(len(orders_db_response)):
            items.append(ClientSerializer.table_to_dict(orders_db_response[i]))

        return dict(
            num_of_pages=num_of_pages_db_response,
            items=items
        )


class CarsResponseFormer:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    @classmethod
    def form(cls, orders_db_response, num_of_pages_db_response) -> dict:
        items = []
        for i in range(len(orders_db_response)):
            items.append(CarSerializer.table_to_dict(orders_db_response[i]))

        return dict(
            num_of_pages=num_of_pages_db_response,
            items=items
        )
