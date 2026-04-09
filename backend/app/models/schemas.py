from pydantic import BaseModel
from typing import List


class ResumeAnalysisSchema(BaseModel):
    match_score: int
    matched_skills: List[str]
    missing_skills: List[str]
    strengths: List[str]
    recommendations: List[str]


class AnalyzeResponseSchema(BaseModel):
    filename: str
    analysis: ResumeAnalysisSchema