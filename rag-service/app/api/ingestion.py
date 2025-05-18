from fastapi import APIRouter, Form, UploadFile, File
from app.services.document_ingestor import ingest
from app.services.embedder_factory import get_embedder

router = APIRouter()

@router.post("/")
async def ingest_document(file: UploadFile = File(...), documentId: int = Form(...)):
    embedder = get_embedder("openai")
    print("Received documentId", documentId, flush=True)
    result = await ingest(file, embedder, documentId)
    return {"message": "Ingestion complete", "details": result}
