from fastapi import APIRouter
from app.core.db import SessionLocal
from app.models import Document
from sqlalchemy import select

router = APIRouter()

@router.get("/")
async def list_documents():
    async with SessionLocal() as session:
        result = await session.execute(select(Document))
        docs = result.scalars().all()
        return [
            {"id": doc.id, "filename": doc.filename}
            for doc in docs
        ]
