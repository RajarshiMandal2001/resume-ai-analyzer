from fastapi import APIRouter, UploadFile, File, HTTPException, Form
from app.services.pdf_parser import PDFParserService
from app.services.chunker import TextChunkService
from app.services.embeddings import EmbeddingService
from app.services.retriever import RetrievalService
from app.core.llm import LLMService
from app.models.schemas import AnalyzeResponseSchema

router = APIRouter(prefix="/api", tags=["Resume Analysis"])

chunk_service = TextChunkService()
embedding_service = EmbeddingService()
retrieval_service = RetrievalService()
llm_service = LLMService()


@router.post("/analyze", response_model=AnalyzeResponseSchema)
async def analyze_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    resume_text = await PDFParserService.extract_text(file)

    resume_chunks = chunk_service.split_text(resume_text)

    vector_store = embedding_service.create_vector_store(resume_chunks)

    relevant_chunks = retrieval_service.retrieve_relevant_chunks(
        vector_store,
        query=job_description
    )

    analysis = llm_service.analyze_resume(
        job_description=job_description,
        relevant_chunks=relevant_chunks
    )

    return {
        "filename": file.filename,
        "analysis": analysis
    }