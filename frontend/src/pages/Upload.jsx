import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FileUploader from '../components/FileUploader'

const Upload = () => {
  const [files, setFiles] = useState([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleFileUpload = (uploadedFiles) => {
    setFiles(uploadedFiles)
    setError('')
  }

  const handleAnalyze = async () => {
    if (files.length === 0) {
      setError('Please upload at least one PDF file')
      return
    }

    setIsAnalyzing(true)
    setError('')

    try {
      // Create FormData
      const formData = new FormData()
      files.forEach(file => {
        formData.append('files', file)
      })

      // Send to backend
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      // Store results in localStorage for now (in a real app, you'd use context or state management)
      localStorage.setItem('researchGaps', JSON.stringify(data.research_gaps))
      
      // Navigate to results page
      navigate('/results')
      
    } catch (err) {
      setError('Failed to analyze papers. Please try again.')
      console.error('Analysis error:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-primary-800">Research Gap Analyzer</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Research Papers</h1>
            <p className="text-gray-600">
              Select up to 3 PDF research papers for analysis. Our AI will identify gaps and opportunities across these studies.
            </p>
          </div>

          <div className="card mb-8">
            <FileUploader 
              onFilesUpload={handleFileUpload}
              maxFiles={3}
              acceptedTypes={['application/pdf']}
            />
          </div>

          {files.length > 0 && (
            <div className="card mb-8">
              <h2 className="text-xl font-semibold mb-4">Selected Papers</h2>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                    <div className="flex items-center">
                      <div className="text-primary-600 mr-3">📄</div>
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      PDF
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="flex justify-center">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || files.length === 0}
              className={`btn-primary px-8 py-3 text-lg ${
                isAnalyzing || files.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isAnalyzing ? (
                <div className="flex items-center">
                  <div className="loading-spinner mr-3"></div>
                  Analyzing Papers...
                </div>
              ) : (
                'Analyze Research Gaps'
              )}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500">
            Research Gap Analyzer - AI-powered research insights
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Upload
