import pytest
from . import create_app
from .config import Test as TestConfig
from json import dumps, loads


@pytest.fixture(name="test_app")
def _test_app():
    app = create_app(TestConfig)
    return app


@pytest.mark.asyncio
async def test_empty_get_healthcheck(test_app):
    test_client = test_app.test_client()

    response = await test_client.get("/healthcheck")
    assert response.status_code == 200

    data = await response.get_data()
    assert data.decode("utf-8") == "Ok"


@pytest.mark.asyncio
async def test_cars_endpoint(test_app):
    test_client = test_app.test_client()

    response = await test_client.post("/api/cars", data=dumps({
        "description": "suzuki",
        "cost": "135"
    }))
    assert response.status_code == 200

    id_ = loads((await response.get_data()).decode("utf-8"))["id"]

    response = await test_client.get(f"/api/cars/{id_}")
    assert response.status_code == 200

    id_response = loads((await response.get_data()).decode("utf-8"))["id"]
    assert id_response == id_

    response = await test_client.delete(f"/api/cars/{id_}")
    assert response.status_code == 200
