from app.services.embedder_openai import OpenAIEmbedder
from app.interfaces.embedder import BaseEmbedder

def get_embedder(strategy: str = "openai") -> BaseEmbedder:
    if strategy == "openai":
        return OpenAIEmbedder()
    raise ValueError("Unknown embedder strategy")
