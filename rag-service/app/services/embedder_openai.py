from langchain.embeddings import OpenAIEmbeddings
from app.interfaces.embedder import BaseEmbedder

class OpenAIEmbedder(BaseEmbedder):
    def __init__(self):
        self.model = OpenAIEmbeddings()

    def embed(self, texts: list[str]) -> list[list[float]]:
        return self.model.embed_documents(texts)
