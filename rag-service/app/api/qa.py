from typing import Optional, List
from fastapi import APIRouter, Query
from sqlalchemy import select
from app.core.db import SessionLocal
from app.models import EmbeddingChunk
from app.services.llm_client import generate_answer
from app.services.vector_math import cosine_similarity
from langchain.embeddings import OpenAIEmbeddings

router = APIRouter()

@router.get("/")
async def ask_question(
    q: str,
    document_ids: Optional[List[int]] = Query(default=None)
):
    async with SessionLocal() as session:
        stmt = select(EmbeddingChunk)
        if document_ids:
            stmt = stmt.where(EmbeddingChunk.document_id.in_(document_ids))

        result = await session.execute(stmt)
        chunks = result.scalars().all()

        if not chunks:
            return {"answer": "No relevant documents found.", "context_used": []}

        question_vec = OpenAIEmbeddings().embed_query(q)

        ranked = sorted(
            chunks,
            key=lambda c: cosine_similarity(question_vec, c.embedding),
            reverse=True
        )

        top_chunks = [c.content for c in ranked[:3]]
        context = "\n\n".join(top_chunks)

        answer = generate_answer(question=q, context=context)
        return {"answer": answer, "context_used": top_chunks}