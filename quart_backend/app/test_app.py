import pytest
from . import create_app
from .config import Test as TestConfig


@pytest.fixture(name='test_app')
def _test_app():
    app = create_app(TestConfig)
    return app


@pytest.mark.asyncio
async def test_empty_get_healthcheck(test_app):
    test_client = test_app.test_client()
    response = await test_client.get('/healthcheck')

    assert response.status_code == 200

    data = await response.get_data()
    assert data.decode("utf-8") == "Ok"


@pytest.mark.asyncio
async def test_db_healthcheck(test_app):
    test_client = test_app.test_client()
    response = await test_client.get('/db_healthcheck')

    assert response.status_code == 200

    data = await response.get_data()
    assert data.decode("utf-8") == "Pavel"


@pytest.mark.asyncio
async def test_clients_bp_healthcheck(test_app):
    test_client = test_app.test_client()
    response = await test_client.get('/clients/healthcheck')

    assert response.status_code == 200

    data = await response.get_data()
    assert data.decode("utf-8") == "Ok"


@pytest.mark.asyncio
async def test_orders_bp_healthcheck(test_app):
    test_client = test_app.test_client()
    response = await test_client.get('/orders/healthcheck')

    assert response.status_code == 200

    data = await response.get_data()
    assert data.decode("utf-8") == "Ok"


@pytest.mark.asyncio
async def test_cars_bp_healthcheck(test_app):
    test_client = test_app.test_client()
    response = await test_client.get('/cars/healthcheck')

    assert response.status_code == 200

    data = await response.get_data()
    assert data.decode("utf-8") == "Ok"
