import React from 'react'

const ResearchGapCard = ({ gap }) => {
  const getCategoryColor = (category) => {
    const colors = {
      methodology: 'bg-blue-100 text-blue-800',
      theory: 'bg-purple-100 text-purple-800',
      application: 'bg-green-100 text-green-800',
      data: 'bg-yellow-100 text-yellow-800',
      other: 'bg-gray-100 text-gray-800'
    }
    return colors[category] || colors.other
  }

  const getCategoryIcon = (category) => {
    const icons = {
      methodology: '⚙️',
      theory: '📚',
      application: '📱',
      data: '📊',
      other: '🔍'
    }
    return icons[category] || icons.other
  }

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 flex-1">{gap.title}</h3>
        <div className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(gap.category)}`}>
          <span className="mr-2">{getCategoryIcon(gap.category)}</span>
          {gap.category.charAt(0).toUpperCase() + gap.category.slice(1)}
        </div>
      </div>
      
      <p className="text-gray-700 mb-6 leading-relaxed">
        {gap.description}
      </p>
      
      {gap.papers_referenced && gap.papers_referenced.length > 0 && (
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Referenced Papers:</h4>
          <div className="flex flex-wrap gap-2">
            {gap.papers_referenced.map((paper, index) => (
              <span 
                key={index} 
                className="bg-primary-50 text-primary-700 px-3 py-1 rounded-md text-sm border border-primary-200"
              >
                {paper}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ResearchGapCard
