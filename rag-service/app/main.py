from fastapi import FastAPI
from app.api import ingestion, qa, documents

app = FastAPI()

app.include_router(ingestion.router, prefix="/ingest", tags=["Ingestion"])
app.include_router(qa.router, prefix="/qa", tags=["Q&A"])
app.include_router(documents.router, prefix="/documents", tags=["Documents"])
