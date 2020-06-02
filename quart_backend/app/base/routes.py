from app.base import base
from app.models import Car


@base.route('/')
async def index():
    data = await Car.get_car_by_id(1)

    return f"Hello, we have car {data[1]}"
