# Research Gap Analyzer

An AI-powered web application that analyzes research papers and identifies gaps across multiple studies. Built with React (Vite) frontend and FastAPI backend.

## Features

- Upload up to 3 research papers in PDF format
- AI analysis to identify research gaps across papers
- Clean, professional UI with responsive design
- Drag-and-drop file upload interface
- Detailed gap analysis with paper references

## Project Structure

```
├── frontend/                 # React application (Vite)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Application pages
│   │   ├── App.jsx           # Main application component
│   │   └── main.jsx          # Entry point
│   ├── index.html            # HTML template
│   └── vite.config.js        # Vite configuration
└── backend/                  # FastAPI application
    ├── main.py              # Main FastAPI application
    ├── utils/
    │   ├── pdf_parser.py     # PDF content extraction
    │   ├── prompt_builder.py # LLM prompt construction
    │   └── llm_client.py     # Cerebras LLM integration
    ├── requirements.txt      # Python dependencies
    └── .env.example          # Environment variables example
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   ```bash
   # On Windows
   venv\Scripts\activate
   
   # On macOS/Linux
   source venv/bin/activate
   ```

4. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   
6. Add your Cerebras API key to the `.env` file:
   ```bash
   CEREBRAS_API_KEY=your_actual_api_key_here
   ```

7. Run the FastAPI server:
   ```bash
   python main.py
   ```
   
   Or with uvicorn:
   ```bash
   uvicorn main:app --reload --host localhost --port 8000
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:3000`

## API Endpoints

### POST /analyze
Analyze up to 3 research papers and identify research gaps.

**Request:**
- Method: POST
- URL: `/analyze`
- Body: multipart/form-data with PDF files

**Response:**
```json
{
  "research_gaps": [
    {
      "gap_id": 1,
      "title": "Gap title",
      "description": "Detailed description of the research gap",
      "papers_referenced": ["Paper title 1", "Paper title 2"],
      "category": "methodology|theory|application|data|other"
    }
  ]
}
```

## Development

### Backend
The backend uses FastAPI for handling file uploads and AI analysis:
- `main.py`: FastAPI application with endpoints
- `utils/pdf_parser.py`: Extracts content from PDF files using PyMuPDF
- `utils/prompt_builder.py`: Constructs prompts for LLM analysis
- `utils/llm_client.py`: Integrates with Cerebras LLM (currently mocked)

### Frontend
The frontend uses React with Vite and Tailwind CSS:
- `src/App.jsx`: Main routing component
- `src/pages/`: Page components (Home, Upload, Results)
- `src/components/`: Reusable UI components
- `src/index.css`: Tailwind CSS configuration

## Environment Variables

Create a `.env` file in the backend directory with the following variables:
- `CEREBRAS_API_KEY`: Your Cerebras API key for LLM access
- `HOST`: Server host (default: localhost)
- `PORT`: Server port (default: 8000)

## Error Handling

The application includes error handling for:
- Invalid or empty PDF files
- File upload limits (max 3 files)
- Network errors during analysis
- Missing environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.
