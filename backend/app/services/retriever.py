class RetrievalService:
    @staticmethod
    def retrieve_relevant_chunks(vector_store, query: str, k: int = 4):
        results = vector_store.similarity_search(query, k=k)
        return [doc.page_content for doc in results]