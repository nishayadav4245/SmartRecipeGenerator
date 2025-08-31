import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, Image as ImageIcon, Loader2, Eye, RefreshCw } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'

const ImageUpload = ({ onImageUpload, uploadedImage, isLoading, onIngredientsDetected }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisError, setAnalysisError] = useState(null)
  const [detectedIngredients, setDetectedIngredients] = useState([])

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0])
      // Automatically analyze the image for ingredients
      analyzeImageForIngredients(acceptedFiles[0])
    }
  }, [onImageUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: false
  })

  // AI-powered ingredient detection using Gemini Vision API
  const analyzeImageForIngredients = async (imageFile) => {
    setIsAnalyzing(true)
    setAnalysisError(null)
    setDetectedIngredients([])

    try {
      // Check for API key
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      if (!apiKey) {
        throw new Error('No Gemini API key found. Please check your .env file.')
      }

      // Initialize Google Generative AI
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

      // Convert image to base64 for API
      const base64Image = await fileToBase64(imageFile)
      
      // Create the prompt for ingredient detection
      const prompt = `Analyze this food image and identify all visible ingredients. 

Focus on:
- Raw ingredients (vegetables, fruits, meats, grains, etc.)
- Prepared ingredients (chopped, sliced, cooked items)
- Spices and seasonings if visible
- Dairy products, eggs, etc.

Return ONLY a JSON array of ingredient names, like this format:
["tomato", "onion", "garlic", "olive oil", "basil"]

Important:
- Use common ingredient names (e.g., "tomato" not "red tomato fruit")
- Don't include quantities or descriptions
- Don't include utensils, plates, or non-food items
- If you can't identify ingredients clearly, return an empty array []
- Be specific but use standard names that would be found in recipes

Only return valid JSON, no other text.`

      // Generate content with image
      const result = await model.generateContent([prompt, base64Image])
      const response = await result.response
      const text = response.text()
      
      // Parse the AI response
      let ingredients = []
      try {
        // Try to extract JSON from the response
        const jsonMatch = text.match(/\[.*\]/s)
        if (jsonMatch) {
          ingredients = JSON.parse(jsonMatch[0])
        } else {
          // Fallback: try to parse the entire response as JSON
          ingredients = JSON.parse(text)
        }
        
        // Validate that we got an array of strings
        if (Array.isArray(ingredients) && ingredients.every(item => typeof item === 'string')) {
          // Clean and normalize ingredient names
          const cleanedIngredients = ingredients
            .map(ing => ing.toLowerCase().trim())
            .filter(ing => ing.length > 0)
            .filter((ing, index, arr) => arr.indexOf(ing) === index) // Remove duplicates
          
          setDetectedIngredients(cleanedIngredients)
          
          // Notify parent component about detected ingredients
          if (onIngredientsDetected) {
            onIngredientsDetected(cleanedIngredients)
          }
        } else {
          throw new Error('Invalid ingredient format received')
        }
      } catch (parseError) {
        console.error('Error parsing AI response:', parseError)
        console.log('Raw AI response:', text)
        throw new Error('Failed to parse ingredient detection results')
      }

    } catch (error) {
      console.error('Error analyzing image:', error)
      setAnalysisError(error.message)
      
      // Fallback: provide some common ingredients for user to select from
      const fallbackIngredients = [
        'tomato', 'onion', 'garlic', 'olive oil', 'salt', 'pepper',
        'chicken', 'rice', 'pasta', 'cheese', 'milk', 'eggs',
        'carrot', 'broccoli', 'spinach', 'bell pepper', 'mushroom'
      ]
      setDetectedIngredients(fallbackIngredients)
      
      if (onIngredientsDetected) {
        onIngredientsDetected(fallbackIngredients)
      }
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Helper function to convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        // Extract base64 data from data URL
        const base64 = reader.result.split(',')[1]
        resolve(base64)
      }
      reader.onerror = error => reject(error)
    })
  }

  // Retry analysis with current image
  const retryAnalysis = () => {
    if (uploadedImage) {
      analyzeImageForIngredients(uploadedImage)
    }
  }

  return (
    <div className="image-upload">
      <h3>📸 Upload Image</h3>
      <p>Drop an image here or click to select ingredients</p>
      
      <div 
        {...getRootProps()} 
        className={`dropzone ${isDragActive ? 'active' : ''} ${uploadedImage ? 'has-image' : ''}`}
      >
        <input {...getInputProps()} />
        
        {isLoading || isAnalyzing ? (
          <div className="loading">
            <Loader2 className="spinner" />
            <p>{isAnalyzing ? 'AI analyzing ingredients...' : 'Processing image...'}</p>
          </div>
        ) : uploadedImage ? (
          <div className="image-preview">
            <img 
              src={URL.createObjectURL(uploadedImage)} 
              alt="Uploaded ingredients" 
            />
            <p>Image uploaded successfully!</p>
            
            {/* Show detected ingredients */}
            {detectedIngredients.length > 0 && (
              <div className="detected-ingredients">
                <h4>🤖 AI Detected Ingredients:</h4>
                <div className="ingredients-tags">
                  {detectedIngredients.map((ingredient, index) => (
                    <span key={index} className="ingredient-tag">
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {/* Show analysis error if any */}
            {analysisError && (
              <div className="analysis-error">
                <p>⚠️ AI analysis failed: {analysisError}</p>
                <button 
                  className="retry-btn"
                  onClick={retryAnalysis}
                >
                  <RefreshCw size={16} />
                  Retry Analysis
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="upload-content">
            {isDragActive ? (
              <>
                <Upload className="upload-icon" />
                <p>Drop the image here...</p>
              </>
            ) : (
              <>
                <ImageIcon className="upload-icon" />
                <p>Drag & drop an image here, or click to select</p>
                <small>Supports: JPG, PNG, GIF, WebP</small>
                <div className="ai-feature">
                  <Eye size={16} />
                  <span>AI will automatically detect ingredients!</span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      
      {uploadedImage && !isLoading && !isAnalyzing && (
        <div className="image-actions">
          <button 
            className="retry-analysis-btn"
            onClick={retryAnalysis}
            disabled={isAnalyzing}
          >
            <RefreshCw size={16} />
            {isAnalyzing ? 'Analyzing...' : 'Re-analyze with AI'}
          </button>
          <button 
            className="reset-button"
            onClick={() => {
              onImageUpload(null)
              setDetectedIngredients([])
              setAnalysisError(null)
            }}
          >
            Upload New Image
          </button>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
