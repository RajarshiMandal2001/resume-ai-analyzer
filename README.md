# 🚀 AI Resume Analyzer (RAG + ATS)

A production-ready AI-powered ATS resume analyzer built with:

## 🧠 Backend
- FastAPI
- LangChain
- FAISS
- HuggingFace Embeddings
- Groq LLM

## 🌐 Frontend
- React
- Vite
- Tailwind CSS

## ✨ Features
- PDF resume upload
- Job description matching
- ATS score generation
- matched skills detection
- missing skills suggestions
- recruiter-style recommendations
- semantic RAG retrieval

## 🏗️ Architecture
Resume PDF → Parsing → Chunking → Embeddings → FAISS → Retrieval → Groq → JSON ATS Analysis

## ▶️ Run Backend
```bash
cd backend
uvicorn app.main:app --reload
```

## ▶️ Run Frontend
```bash
cd frontend
npm install
npm run dev
```