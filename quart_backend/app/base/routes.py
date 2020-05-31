from app.base import base


@base.route('/')
async def index():
    return "Hello"
