import pdfplumber
from fastapi import UploadFile


class PDFParserService:
    @staticmethod
    async def extract_text(file: UploadFile) -> str:
        text = ""

        with pdfplumber.open(file.file) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"

        return text.strip()