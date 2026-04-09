from fastapi import FastAPI
from app.api.routes.analyze import router as analyze_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Resume AI Analyzer",
    version="1.0.0"
)

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router)


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "resume-ai-analyzer"
    }