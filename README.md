# 🚀 AI Resume Analyzer (RAG + ATS)

<img width="1905" height="914" alt="Screenshot 2026-04-10 154101" src="https://github.com/user-attachments/assets/1788fe06-4d02-4b49-a4f1-ef54a902a72b" />

<img width="1875" height="886" alt="Screenshot 2026-04-10 155103" src="https://github.com/user-attachments/assets/c949d83f-5f77-440c-8e4c-1c4195d07ff9" />

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
