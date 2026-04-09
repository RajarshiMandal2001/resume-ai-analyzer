from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings


class EmbeddingService:
    def __init__(self):
        self.embedding_model = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L6-v2"
        )

    def create_vector_store(self, chunks):
        vector_store = FAISS.from_texts(
            texts=chunks,
            embedding=self.embedding_model
        )
        return vector_store