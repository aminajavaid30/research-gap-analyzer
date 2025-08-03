from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import os
from utils.pdf_parser import parse_pdf
from utils.prompt_builder import build_research_gap_prompt
from utils.llm_client import generate_research_gaps

app = FastAPI(title="Research Gap Analyzer API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Research Gap Analyzer API is running"}

@app.post("/analyze")
async def analyze_papers(files: List[UploadFile] = File(...)):
    """
    Analyze up to 3 research papers and identify research gaps across them.
    
    Args:
        files: List of PDF files (up to 3)
        
    Returns:
        JSON response with research gaps and associated sources
    """
    if len(files) > 3:
        raise HTTPException(status_code=400, detail="Maximum 3 files allowed")
    
    if len(files) == 0:
        raise HTTPException(status_code=400, detail="At least one file is required")
    
    try:
        # Parse PDF files
        papers_data = []
        for file in files:
            if not file.filename.endswith('.pdf'):
                raise HTTPException(status_code=400, detail=f"File {file.filename} is not a PDF")
            
            # Read file content
            content = await file.read()
            
            # Parse PDF content
            paper_data = parse_pdf(content)
            if not paper_data:
                raise HTTPException(status_code=400, detail=f"Could not parse PDF: {file.filename}")
            
            papers_data.append(paper_data)
        
        # Build prompt for LLM
        prompt = build_research_gap_prompt(papers_data)
        
        # Generate research gaps using Cerebras model
        research_gaps_json = generate_research_gaps(prompt)
        
        return {"research_gaps": research_gaps_json}
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing papers: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
