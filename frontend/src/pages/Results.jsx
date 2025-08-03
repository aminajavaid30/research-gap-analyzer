import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ResearchGapCard from '../components/ResearchGapCard'

const Results = () => {
  const [researchGaps, setResearchGaps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Load results from localStorage
    try {
      const gapsData = localStorage.getItem('researchGaps')
      if (gapsData) {
        const parsedData = JSON.parse(gapsData)
        setResearchGaps(parsedData)
      } else {
        setError('No research gaps data found. Please upload papers first.')
      }
    } catch (err) {
      setError('Failed to load research gaps data.')
      console.error('Error loading data:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleNewAnalysis = () => {
    localStorage.removeItem('researchGaps')
    navigate('/upload')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-primary-800">Research Gap Analyzer</h1>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-gray-600">Loading research gaps...</p>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-primary-800">Research Gap Analyzer</h1>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Results</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button onClick={handleNewAnalysis} className="btn-primary">
              Upload Papers
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-primary-800">Research Gap Analyzer</h1>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Research Gaps Analysis</h1>
            <p className="text-gray-600">
              AI-powered insights identifying gaps and opportunities across your uploaded research papers.
            </p>
          </div>

          {researchGaps.length > 0 ? (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Summary</h2>
                <p className="text-gray-600 mb-4">
                  Analysis complete! We've identified {researchGaps.length} key research gaps across your papers.
                  These gaps represent opportunities for further investigation and potential areas where additional research could make significant contributions.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm">
                    {researchGaps.length} Research Gaps
                  </span>
                  <span className="bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full text-sm">
                    AI-Powered Analysis
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {researchGaps.map((gap) => (
                  <ResearchGapCard key={gap.gap_id} gap={gap} />
                ))}
              </div>
            </div>
          ) : (
            <div className="card text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No Research Gaps Found</h2>
              <p className="text-gray-600 mb-6">
                Our analysis didn't identify any significant research gaps in the uploaded papers.
                This could indicate that the papers cover complementary areas or that the analysis needs different papers.
              </p>
              <button onClick={handleNewAnalysis} className="btn-primary">
                Upload Different Papers
              </button>
            </div>
          )}
        </div>
      </main>

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

export default Results
