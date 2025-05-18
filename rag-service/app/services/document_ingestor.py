import tempfile
from app.services.s3 import upload_to_s3
from app.interfaces.embedder import BaseEmbedder
from app.core.db import SessionLocal
from app.models import Document, EmbeddingChunk
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

async def ingest(file, embedder: BaseEmbedder, document_id: int):
    print("document_id", document_id, flush=True)
    
    # Save the file temporarily
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        contents = await file.read()
        tmp.write(contents)
        tmp_path = tmp.name

    # Upload the file to S3
    upload_to_s3(tmp_path, file.filename)

    # Load the PDF and split it into chunks
    loader = PyPDFLoader(tmp_path)
    docs = loader.load()
    splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    chunks = splitter.split_documents(docs)

    texts = [chunk.page_content for chunk in chunks]
    vectors = embedder.embed(texts)

    # Store embeddings in the database
    async with SessionLocal() as session:
        for i, vec in enumerate(vectors):
            chunk = EmbeddingChunk(
                document_id=document_id, 
                chunk_index=i, 
                content=texts[i], 
                embedding=vec
            )
            session.add(chunk)

        await session.commit()

    return {"document_id": document_id, "chunks": len(chunks)}
