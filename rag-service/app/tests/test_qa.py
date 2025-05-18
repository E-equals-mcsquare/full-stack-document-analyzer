import pytest
from httpx import AsyncClient
from app.main import app

@pytest.mark.asyncio
async def test_qa_success():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/qa", params={"q": "Who is Parashurama?"})

    assert response.status_code == 200
    assert "answer" in response.json()


@pytest.mark.asyncio
async def test_qa_missing_query_param():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.get("/qa")

    assert response.status_code == 422
