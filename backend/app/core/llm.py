from groq import Groq
from app.core.config import GROQ_API_KEY
import json


class LLMService:
    def __init__(self):
        self.client = Groq(api_key=GROQ_API_KEY)

    def analyze_resume(self, job_description: str, relevant_chunks: list[str]):
        context = "\n\n".join(relevant_chunks)

        prompt = f"""
Return ONLY a valid JSON object.

Job Description:
{job_description}

Relevant Resume Sections:
{context}

Required JSON format:
{{
    "match_score": 85,
    "matched_skills": ["Python", "FastAPI"],
    "missing_skills": ["Docker"],
    "strengths": ["Strong backend experience"],
    "recommendations": ["Add Docker projects"]
}}
"""

        response = self.client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": "Return only valid JSON."},
                {"role": "user", "content": prompt}
            ],
            response_format={"type": "json_object"},
            temperature=0.2
        )

        content = response.choices[0].message.content
        return json.loads(content)