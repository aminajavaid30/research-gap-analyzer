import os
import json
import logging
from typing import List, Dict

from cerebras.cloud.sdk import Cerebras

from dotenv import load_dotenv
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# def generate_research_gaps(prompt: str) -> List[Dict]:
#     """
#     Generate research gaps using Cerebras LLM.
#     This is a mock implementation that returns sample data.
#     In a real implementation, this would call the Cerebras API.
    
#     Args:
#         prompt: Formatted prompt for research gap analysis
        
#     Returns:
#         JSON array of research gaps
#     """
#     # Mock implementation - in production this would call Cerebras API
#     logger.info("Generating research gaps with Cerebras LLM...")
#     logger.info(f"Prompt length: {len(prompt)} characters")
    
#     # Sample response structure
#     sample_gaps = [
#         {
#             "gap_id": 1,
#             "title": "Limited Dataset Diversity",
#             "description": "The analyzed papers primarily use datasets from similar domains, lacking diversity in data sources and experimental conditions. This limits the generalizability of the findings across different contexts and populations.",
#             "papers_referenced": ["Paper 1", "Paper 2"],
#             "category": "data"
#         },
#         {
#             "gap_id": 2,
#             "title": "Methodology Validation Gap",
#             "description": "While the papers propose novel methodologies, there's insufficient cross-validation between different approaches. Paper 1 uses method A while Paper 2 uses method B, but neither compares their results against the other's approach.",
#             "papers_referenced": ["Paper 1", "Paper 2"],
#             "category": "methodology"
#         },
#         {
#             "gap_id": 3,
#             "title": "Theoretical Framework Integration",
#             "description": "The papers operate within separate theoretical frameworks without attempting to integrate or compare their underlying assumptions. This creates a gap in understanding how different theoretical perspectives might complement each other.",
#             "papers_referenced": ["Paper 2", "Paper 3"],
#             "category": "theory"
#         },
#         {
#             "gap_id": 4,
#             "title": "Long-term Impact Assessment",
#             "description": "None of the papers address the long-term implications or sustainability of their proposed solutions. While short-term results are presented, the longitudinal effects and real-world deployment challenges remain unexplored.",
#             "papers_referenced": ["Paper 1", "Paper 3"],
#             "category": "application"
#         }
#     ]
    
#     return sample_gaps

# Real implementation to call Cerebras API
import requests

def generate_research_gaps(prompt: str) -> List[Dict]:
    '''
    Generate research gaps using Cerebras LLM.
    
    Args:
        prompt: Formatted prompt for research gap analysis
        
    Returns:
        JSON array of research gaps
    '''
    try:
        # Get API key from environment
        cerebras_api_key = os.getenv('CEREBRAS_API_KEY')
        if not cerebras_api_key:
            raise ValueError("CEREBRAS_API_KEY environment variable not set")
        
        # Cerebras API endpoint
        client = Cerebras(
            api_key=cerebras_api_key
        )

        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "user", "content": prompt,}
            ],
            # model="llama-4-scout-17b-16e-instruct",
            model="qwen-3-235b-a22b-instruct-2507",
        )

        content = chat_completion.choices[0].message.content
        
        # Parse JSON response
        research_gaps = json.loads(content)
        
        return research_gaps
        
    except Exception as e:
        logger.error(f"Error calling Cerebras API: {str(e)}")
        raise