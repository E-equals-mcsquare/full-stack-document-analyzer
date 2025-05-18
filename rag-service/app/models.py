from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()

class Document(Base):
    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    chunks = relationship("EmbeddingChunk", back_populates="document")

class EmbeddingChunk(Base):
    __tablename__ = "embedding_chunks"

    id = Column(Integer, primary_key=True, index=True)
    document_id = Column(Integer, ForeignKey("documents.id"), nullable=False)
    chunk_index = Column(Integer, nullable=False)
    content = Column(String, nullable=False)
    embedding = Column(JSON, nullable=False)

    document = relationship("Document", back_populates="chunks")
