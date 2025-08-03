import React, { useState, useRef } from 'react'

const FileUploader = ({ onFilesUpload, maxFiles = 3, acceptedTypes = ['application/pdf'] }) => {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (files) => {
    setError('')
    const newFiles = Array.from(files)
    
    // Filter by accepted types
    const validFiles = newFiles.filter(file => 
      acceptedTypes.includes(file.type)
    )
    
    // Check file count limit
    if (uploadedFiles.length + validFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed. Please remove some files.`)
      return
    }
    
    // Check for invalid files
    const invalidFiles = newFiles.filter(file => 
      !acceptedTypes.includes(file.type)
    )
    
    if (invalidFiles.length > 0) {
      setError('Only PDF files are allowed')
      return
    }
    
    // Add valid files
    const updatedFiles = [...uploadedFiles, ...validFiles]
    setUploadedFiles(updatedFiles)
    onFilesUpload(updatedFiles)
  }

  const removeFile = (index) => {
    const updatedFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(updatedFiles)
    onFilesUpload(updatedFiles)
    setError('')
  }

  const onButtonClick = () => {
    fileInputRef.current.click()
  }

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          dragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-primary-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleChange}
          className="hidden"
        />
        
        <div className="text-4xl mb-4">📁</div>
        <p className="text-lg font-medium mb-2">
          Drag and drop your research papers here
        </p>
        <p className="text-gray-500 mb-4">
          or click to browse files (PDF format only)
        </p>
        <button className="btn-outline">
          Select Files
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {uploadedFiles.length > 0 && (
        <div>
          <h3 className="font-medium mb-3">Uploaded Files ({uploadedFiles.length}/{maxFiles})</h3>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div className="flex items-center">
                  <div className="text-primary-600 mr-3">📄</div>
                  <div>
                    <p className="font-medium text-sm">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUploader
