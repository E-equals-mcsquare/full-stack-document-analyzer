import pytest
from httpx import AsyncClient
from fastapi import UploadFile
from app.main import app
import io

@pytest.mark.asyncio
async def test_ingest_success(monkeypatch):
    async def fake_ingest(file, embedder, document_id: int):
        assert document_id == 1
        return {"document_id": document_id, "chunks": 5}

    monkeypatch.setattr("app.api.ingestion", fake_ingest)

    test_file = io.BytesIO(b"%PDF-1.4 test file")
    files = {"file": ("sample.pdf", test_file, "application/pdf")}
    data = {"documentId": "1"}

    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/ingest/", data=data, files=files)

    assert response.status_code == 200
    assert response.json() == {"document_id": 1, "chunks": 5}


@pytest.mark.asyncio
async def test_ingest_missing_file():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        response = await ac.post("/ingest/", data={"documentId": "1"})

    assert response.status_code == 422
