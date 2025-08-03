import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-primary-800">Research Gap Analyzer</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Discover Research Gaps with AI
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Upload up to 3 research papers and let our AI-powered system analyze them to 
              identify gaps, opportunities, and areas for further investigation across multiple studies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/upload" className="btn-primary inline-block">
                Get Started
              </Link>
              <a href="#how-it-works" className="btn-outline inline-block">
                How It Works
              </a>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="card">
                <div className="text-primary-600 text-2xl mb-4">📄</div>
                <h3 className="text-lg font-semibold mb-2">PDF Analysis</h3>
                <p className="text-gray-600">
                  Upload research papers in PDF format and our system will extract key sections 
                  including abstracts, introductions, methods, and conclusions.
                </p>
              </div>
              
              <div className="card">
                <div className="text-primary-600 text-2xl mb-4">🤖</div>
                <h3 className="text-lg font-semibold mb-2">AI-Powered Insights</h3>
                <p className="text-gray-600">
                  Advanced AI models analyze the content to identify research gaps, 
                  conflicting findings, and unexplored opportunities across multiple papers.
                </p>
              </div>
              
              <div className="card">
                <div className="text-primary-600 text-2xl mb-4">📊</div>
                <h3 className="text-lg font-semibold mb-2">Clear Presentation</h3>
                <p className="text-gray-600">
                  Research gaps are presented in an organized format with clear summaries 
                  and references to the source papers for easy understanding.
                </p>
              </div>
            </div>

            {/* How It Works */}
            <div id="how-it-works" className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary-800 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Upload Papers</h3>
                  <p className="text-gray-600 text-sm">Select up to 3 research papers in PDF format</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary-800 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">AI Processing</h3>
                  <p className="text-gray-600 text-sm">Our system extracts and analyzes key content</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary-800 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Gap Identification</h3>
                  <p className="text-gray-600 text-sm">AI identifies research gaps and opportunities</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary-800 font-bold">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">View Results</h3>
                  <p className="text-gray-600 text-sm">Explore findings with clear summaries and references</p>
                </div>
              </div>
            </div>
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

export default Home
