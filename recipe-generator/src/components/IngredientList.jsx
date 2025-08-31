import React, { useState, useEffect, useRef } from 'react'
import { Plus, X, ChefHat, Search } from 'lucide-react'

const IngredientList = ({ ingredients, onAddIngredient, onRemoveIngredient }) => {
  const [newIngredient, setNewIngredient] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])
  const inputRef = useRef(null)

  const handleAddIngredient = (e) => {
    e.preventDefault()
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim())) {
      onAddIngredient(newIngredient.trim())
      setNewIngredient('')
      setShowSuggestions(false)
    }
  }

  // Enhanced ingredient database with categories
  const ingredientDatabase = {
    'Vegetables': [
      'tomato', 'tomatoes', 'onion', 'onions', 'garlic', 'carrot', 'carrots',
      'broccoli', 'spinach', 'lettuce', 'bell pepper', 'mushroom', 'mushrooms',
      'zucchini', 'eggplant', 'cucumber', 'celery', 'corn', 'peas', 'green beans'
    ],
    'Proteins': [
      'chicken', 'chicken breast', 'beef', 'ground beef', 'pork', 'fish', 'salmon',
      'tuna', 'shrimp', 'eggs', 'tofu', 'tempeh', 'lentils', 'beans', 'chickpeas'
    ],
    'Dairy': [
      'cheese', 'mozzarella cheese', 'cheddar cheese', 'milk', 'cream', 'yogurt',
      'butter', 'sour cream', 'cottage cheese', 'feta cheese', 'parmesan cheese'
    ],
    'Grains': [
      'rice', 'pasta', 'bread', 'flour', 'quinoa', 'oats', 'barley', 'couscous',
      'spaghetti', 'penne', 'fettuccine', 'brown rice', 'white rice'
    ],
    'Oils & Fats': [
      'olive oil', 'vegetable oil', 'coconut oil', 'sesame oil', 'avocado oil'
    ],
    'Herbs & Spices': [
      'basil', 'oregano', 'thyme', 'rosemary', 'salt', 'pepper', 'ginger',
      'cumin', 'paprika', 'cinnamon', 'nutmeg', 'bay leaves', 'parsley'
    ],
    'Other': [
      'sugar', 'honey', 'lemon', 'lime', 'vinegar', 'soy sauce', 'tomato sauce',
      'chicken broth', 'vegetable broth', 'wine', 'baking soda', 'baking powder'
    ]
  }

  // Flatten all ingredients for suggestions
  const allIngredients = Object.values(ingredientDatabase).flat()

  // Filter suggestions based on input
  useEffect(() => {
    if (newIngredient.trim()) {
      const filtered = allIngredients.filter(ingredient =>
        ingredient.toLowerCase().includes(newIngredient.toLowerCase()) &&
        !ingredients.includes(ingredient)
      ).slice(0, 8)
      setFilteredSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setShowSuggestions(false)
    }
  }, [newIngredient, ingredients])

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    onAddIngredient(suggestion)
    setNewIngredient('')
    setShowSuggestions(false)
  }

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="ingredient-list">
      <h3>🥕 Ingredients</h3>
      <p className="ingredient-logic-info">
        <strong>🔍 Search Logic:</strong> Recipes must contain ALL ingredients you add (AND logic). 
        Adding more ingredients will show fewer, more specific recipes.
      </p>
      
      <form onSubmit={handleAddIngredient} className="add-ingredient-form">
        <div className="input-group" ref={inputRef}>
          <input
            type="text"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder="Add ingredient..."
            className="ingredient-input"
            autoComplete="off"
          />
          <button type="submit" className="add-button">
            <Plus size={16} />
          </button>
          
          {/* Autocomplete suggestions */}
          {showSuggestions && (
            <div className="suggestions-dropdown">
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <Search size={14} />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>

      {ingredients.length > 0 ? (
        <div className="ingredients-container">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-tag">
              <ChefHat size={14} />
              <span>{ingredient}</span>
              <button
                onClick={() => onRemoveIngredient(ingredient)}
                className="remove-ingredient"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-ingredients">No ingredients added yet</p>
      )}

      <div className="quick-add">
        <h4>Quick Add Popular Ingredients:</h4>
        <div className="quick-add-categories">
          {Object.entries(ingredientDatabase).map(([category, items]) => (
            <div key={category} className="category-section">
              <h5>{category}</h5>
              <div className="quick-add-buttons">
                {items.slice(0, 4).map((ingredient) => (
                  <button
                    key={ingredient}
                    onClick={() => onAddIngredient(ingredient)}
                    disabled={ingredients.includes(ingredient)}
                    className="quick-add-button"
                  >
                    {ingredient}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default IngredientList
