import React, { useState } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { ChefHat, Loader2, Sparkles, Bookmark, Activity } from 'lucide-react'

const AIRecipeSuggestions = ({ ingredients, dietaryRestrictions, onSaveRecipe, savedRecipes }) => {
  const [aiRecipes, setAiRecipes] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const generateAIRecipe = async () => {
    if (ingredients.length === 0) {
      setError('Please add some ingredients first')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Initialize Google Generative AI
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      console.log('API Key available:', !!apiKey)
      if (!apiKey) {
        throw new Error('No API key found. Please check your .env file.')
      }
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

      // Create prompt for recipe generation
      const dietaryText = dietaryRestrictions.length > 0 
        ? ` Make sure the recipe is ${dietaryRestrictions.join(', ')}.`
        : ''

      const prompt = `Generate 3 creative and delicious recipes using these ingredients: ${ingredients.join(', ')}.${dietaryText}

For each recipe, provide:
1. Recipe name
2. Brief description
3. Ingredients list with quantities
4. Step-by-step cooking instructions
5. Cooking time
6. Difficulty level (Easy/Medium/Hard)
7. Servings
8. Estimated nutrition information per serving

Format the response as JSON with this structure:
{
  "recipes": [
    {
      "name": "Recipe Name",
      "description": "Brief description",
      "ingredients": ["ingredient with quantity"],
      "instructions": ["step 1", "step 2", "step 3"],
      "cookingTime": "X minutes",
      "difficulty": "Easy/Medium/Hard",
      "servings": "X servings",
      "nutrition": {
        "calories": 300,
        "protein": 15,
        "carbs": 35,
        "fat": 12,
        "fiber": 5,
        "sugar": 8
      }
    }
  ]
}

Make the recipes creative and ensure they use the provided ingredients as the main components. Provide realistic nutrition estimates based on the ingredients used.`

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      // Try to parse JSON response
      try {
        const jsonStart = text.indexOf('{')
        const jsonEnd = text.lastIndexOf('}') + 1
        const jsonText = text.substring(jsonStart, jsonEnd)
        const parsedRecipes = JSON.parse(jsonText)
        
        if (parsedRecipes.recipes && Array.isArray(parsedRecipes.recipes)) {
          setAiRecipes(parsedRecipes.recipes)
        } else {
          throw new Error('Invalid recipe format')
        }
      } catch (parseError) {
        // Fallback: create a simple recipe structure from text
        const fallbackRecipe = {
          name: "AI-Generated Recipe",
          description: "A creative recipe using your ingredients",
          ingredients: ingredients.map(ing => `${ing} (as needed)`),
          instructions: ["Follow the AI-generated instructions above"],
          cookingTime: "30 minutes",
          difficulty: "Medium",
          servings: "4 servings",
          nutrition: {
            calories: 250,
            protein: 12,
            carbs: 30,
            fat: 10,
            fiber: 4,
            sugar: 6
          }
        }
        setAiRecipes([fallbackRecipe])
      }

    } catch (err) {
      console.error('Error generating AI recipe:', err)
      if (err.message.includes('API key')) {
        setError('API key not found. Please check your .env file and restart the server.')
      } else if (err.message.includes('rate limit') || err.message.includes('quota')) {
        setError('API rate limit exceeded. Please wait a moment and try again.')
      } else {
        setError(`Failed to generate recipe: ${err.message}`)
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (ingredients.length === 0) {
    return null
  }

  return (
    <div className="ai-recipe-suggestions">
      <div className="ai-header">
        <div className="ai-title">
          <Sparkles className="ai-icon" />
          <h3>AI Recipe Suggestions</h3>
        </div>
        <p>No recipes found? Let AI create some for you!</p>
        <button 
          className="ai-generate-btn"
          onClick={generateAIRecipe}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="spinner" />
              Generating Recipes...
            </>
          ) : (
            <>
              <ChefHat />
              Generate AI Recipes
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="ai-error">
          <p>{error}</p>
          <small>Make sure you have a valid Gemini API key in your environment variables</small>
        </div>
      )}

      {aiRecipes.length > 0 && (
        <div className="ai-recipes">
          <h4>AI-Generated Recipes</h4>
          <div className="ai-recipes-grid">
            {aiRecipes.map((recipe, index) => (
              <div key={index} className="ai-recipe-card">
                <div className="ai-recipe-header">
                  <h5>{recipe.name}</h5>
                  <div className="ai-recipe-meta">
                    <span className="difficulty">{recipe.difficulty}</span>
                    <span className="time">{recipe.cookingTime}</span>
                    <span className="servings">{recipe.servings}</span>
                  </div>
                </div>
                
                <p className="ai-recipe-description">{recipe.description}</p>
                
                {/* Nutrition Information for AI Recipes */}
                {recipe.nutrition && (
                  <div className="nutrition-info">
                    <div className="nutrition-header">
                      <Activity size={14} />
                      <span>Nutrition (per serving)</span>
                    </div>
                    <div className="nutrition-grid">
                      <div className="nutrition-item">
                        <span className="nutrition-label">Calories</span>
                        <span className="nutrition-value">{recipe.nutrition.calories}</span>
                      </div>
                      <div className="nutrition-item">
                        <span className="nutrition-label">Protein</span>
                        <span className="nutrition-value">{recipe.nutrition.protein}g</span>
                      </div>
                      <div className="nutrition-item">
                        <span className="nutrition-label">Carbs</span>
                        <span className="nutrition-value">{recipe.nutrition.carbs}g</span>
                      </div>
                      <div className="nutrition-item">
                        <span className="nutrition-label">Fat</span>
                        <span className="nutrition-value">{recipe.nutrition.fat}g</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="ai-recipe-ingredients">
                  <h6>Ingredients:</h6>
                  <ul>
                    {recipe.ingredients.map((ingredient, idx) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="ai-recipe-instructions">
                  <h6>Instructions:</h6>
                  <ol>
                    {recipe.instructions.map((instruction, idx) => (
                      <li key={idx}>{instruction}</li>
                    ))}
                  </ol>
                </div>
                
                <div className="ai-recipe-actions">
                  <button 
                    className={`save-recipe-btn ${savedRecipes?.some(saved => saved.name === recipe.name) ? 'saved' : ''}`}
                    onClick={() => onSaveRecipe(recipe)}
                    aria-label={`${savedRecipes?.some(saved => saved.name === recipe.name) ? 'Remove from' : 'Add to'} saved recipes`}
                  >
                    <Bookmark size={16} />
                    {savedRecipes?.some(saved => saved.name === recipe.name) ? 'Saved' : 'Save Recipe'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default AIRecipeSuggestions
