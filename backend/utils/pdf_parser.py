import fitz  # PyMuPDF
import io
from typing import Dict, Optional
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def parse_pdf(pdf_content: bytes) -> Optional[Dict]:
    """
    Parse PDF content and extract title, abstract, and key sections.
    
    Args:
        pdf_content: PDF file content as bytes
        
    Returns:
        Dictionary containing paper metadata and content sections, or None if parsing fails
    """
    try:
        # Create PDF document from bytes
        pdf_file = io.BytesIO(pdf_content)
        doc = fitz.open(stream=pdf_file, filetype="pdf")
        
        # Extract text from all pages
        text = ""
        for page in doc:
            text += page.get_text()
        
        doc.close()
        
        if not text.strip():
            logger.warning("PDF content is empty")
            return None
        
        # Extract title (first non-empty line or line with larger font)
        title = extract_title(text)
        
        # Extract abstract
        abstract = extract_abstract(text)
        
        # Extract key sections
        introduction = extract_section(text, "introduction")
        methods = extract_section(text, "methods")
        conclusion = extract_section(text, "conclusion")
        
        return {
            "title": title or "Unknown Title",
            "abstract": abstract or "No abstract found",
            "introduction": introduction or "No introduction found",
            "methods": methods or "No methods section found",
            "conclusion": conclusion or "No conclusion found",
            "full_text": text
        }
        
    except Exception as e:
        logger.error(f"Error parsing PDF: {str(e)}")
        return None

def extract_title(text: str) -> Optional[str]:
    """
    Extract title from PDF text.
    Looks for the first prominent text or the first few lines.
    """
    lines = text.strip().split('\n')
    
    # Look for title-like content (short lines at the beginning with potential formatting)
    for i, line in enumerate(lines[:10]):  # Check first 10 lines
        line = line.strip()
        if line and len(line) < 200 and line != "Abstract" and not line.lower().startswith("abstract"):
            # Check if this line looks like a title (shorter, more prominent)
            if len(line.split()) <= 20 and len(line) > 10:  # Reasonable title length
                return line
    
    return lines[0].strip() if lines else None

def extract_abstract(text: str) -> Optional[str]:
    """
    Extract abstract section from PDF text.
    """
    # Common abstract section markers
    abstract_markers = [
        "abstract",
        "Abstract",
        "ABSTRACT"
    ]
    
    lines = text.split('\n')
    
    # Find abstract start
    abstract_start = -1
    for i, line in enumerate(lines):
        if any(marker in line.strip() for marker in abstract_markers):
            abstract_start = i
            break
    
    if abstract_start == -1:
        return None
    
    # Find abstract end (next section header or end of reasonable length)
    abstract_end = len(lines)
    section_markers = [
        "introduction", "Introduction", "INTRODUCTION",
        "methods", "Methods", "METHODS",
        "results", "Results", "RESULTS",
        "discussion", "Discussion", "DISCUSSION",
        "conclusion", "Conclusion", "CONCLUSION",
        "references", "References", "REFERENCES"
    ]
    
    for i in range(abstract_start + 1, len(lines)):
        line = lines[i].strip()
        if any(marker in line for marker in section_markers) and len(line.split()) <= 5:
            abstract_end = i
            break
    
    # Extract abstract content
    abstract_lines = lines[abstract_start + 1:abstract_end]
    abstract_content = '\n'.join(line.strip() for line in abstract_lines if line.strip())
    
    return abstract_content if abstract_content else None

def extract_section(text: str, section_name: str) -> Optional[str]:
    """
    Extract a specific section from PDF text.
    
    Args:
        text: Full PDF text
        section_name: Name of section to extract (introduction, methods, conclusion)
        
    Returns:
        Section content or None if not found
    """
    section_markers = {
        "introduction": ["introduction", "Introduction", "INTRODUCTION"],
        "methods": ["methods", "methodology", "Method", "Methods", "METHODOLOGY", "METHODS"],
        "conclusion": ["conclusion", "Conclusion", "CONCLUSION", "conclusions", "Conclusions"]
    }
    
    if section_name not in section_markers:
        return None
    
    markers = section_markers[section_name]
    lines = text.split('\n')
    
    # Find section start
    section_start = -1
    for i, line in enumerate(lines):
        line = line.strip()
        # Check if line contains section marker and is likely a section header
        if any(marker in line for marker in markers) and len(line.split()) <= 5:
            section_start = i
            break
    
    if section_start == -1:
        return None
    
    # Find section end (next section header)
    section_end = len(lines)
    all_section_markers = [item for sublist in section_markers.values() for item in sublist]
    
    for i in range(section_start + 1, len(lines)):
        line = lines[i].strip()
        if any(marker in line for marker in all_section_markers) and len(line.split()) <= 5:
            section_end = i
            break
    
    # Extract section content
    section_lines = lines[section_start + 1:section_end]
    section_content = '\n'.join(line.strip() for line in section_lines if line.strip())
    
    return section_content if section_content else None
