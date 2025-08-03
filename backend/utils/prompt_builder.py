from typing import List, Dict
import json

def build_research_gap_prompt(papers_data: List[Dict]) -> str:
    """
    Build a structured prompt for the LLM to analyze research gaps across papers.
    
    Args:
        papers_data: List of dictionaries containing paper metadata and content
        
    Returns:
        Formatted prompt string for research gap analysis
    """
    prompt = """You are a research expert tasked with identifying research gaps across multiple academic papers. Analyze the provided papers and find areas where research is lacking, incomplete, or where new opportunities exist.

Papers to analyze:
"""
    
    for i, paper in enumerate(papers_data, 1):
        prompt += f"""
Paper {i}: {paper['title']}
Abstract: {paper['abstract']}
Introduction: {paper['introduction']}
Methods: {paper['methods']}
Conclusion: {paper['conclusion']}
---
"""
    
    prompt += """
Instructions:
1. Compare the papers and identify research gaps across them
2. Focus on areas where:
   - Research is incomplete or superficial
   - Methodologies have limitations or inconsistencies
   - Findings conflict or don't address the same questions
   - New opportunities or unexplored areas exist
3. Each gap should reference specific paper titles when relevant
4. Provide clear, concise summaries of each gap
5. Return your response as a JSON array of objects with the following structure:
[
  {
    "gap_id": 1,
    "title": "Gap title",
    "description": "Detailed description of the research gap",
    "papers_referenced": ["Paper title 1", "Paper title 2"],
    "category": "methodology|theory|application|data|other"
  }
]

Ensure you identify at least 3-5 research gaps. Return only the JSON array, no other text.
"""
    
    return prompt

def format_research_gaps_response(gaps_data: List[Dict]) -> str:
    """
    Format the research gaps data into a standardized JSON response.
    
    Args:
        gaps_data: List of research gap dictionaries
        
    Returns:
        JSON formatted string
    """
    return json.dumps(gaps_data, indent=2)
