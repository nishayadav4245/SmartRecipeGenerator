import React, { useState } from 'react'
import { Clock, Users, Star, ChefHat, ArrowRight, Bookmark, Activity } from 'lucide-react'
import RecipeRating from './RecipeRating'

const RecipeDisplay = ({ recipes, selectedRecipe, onRecipeSelect, onSaveRecipe, onRatingChange, savedRecipes }) => {
  const [clickedButton, setClickedButton] = useState(null);

  if (!recipes || recipes.length === 0) {
    return (
      <div className="recipe-display">
        <h3>🍽️ Recipe Matches</h3>
        <div className="no-recipes-message">
          <p>No recipes found containing ALL your ingredients</p>
          <p className="search-logic-info">
            <strong>🔍 Search Logic:</strong> Recipes must contain ALL specified ingredients (AND logic). 
            For example, searching "potato + paneer" will only show recipes with both ingredients.
          </p>
          <p className="no-recipes-tips">
            <strong>💡 Tips:</strong>
            <br />• Try searching with fewer ingredients
            <br />• Check ingredient spelling
            <br />• Use common ingredient names
          </p>
        </div>
      </div>
    )
  }

  const handleButtonClick = (e, recipe) => {
    e.stopPropagation(); // Prevent triggering the card's onClick
    console.log('View Recipe button clicked for:', recipe.name);
    setClickedButton(recipe.id);
    
    // Reset the button state after a brief delay
    setTimeout(() => setClickedButton(null), 500);
    
    onRecipeSelect(recipe);
    
    // Scroll to recipe details after a short delay to ensure the details are rendered
    setTimeout(() => {
      const recipeDetailsElement = document.getElementById('selected-recipe-details');
      if (recipeDetailsElement) {
        recipeDetailsElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100);
  };

  return (
    <div className="recipe-display">
      <h3>🍽️ Recipe Matches</h3>
      <p>Found {recipes.length} recipes containing ALL your ingredients</p>
      <p className="search-criteria">
        <strong>🔍 Current Search:</strong> Looking for recipes containing ALL of: {recipes[0]?.matchingIngredients?.join(', ') || 'No ingredients specified'}
      </p>
      <p className="search-logic-info">
        <strong>🔍 Search Logic:</strong> Recipes must contain ALL specified ingredients (AND logic). 
        For example, searching "potato + paneer" will only show recipes with both ingredients.
      </p>
      
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div 
            key={recipe.id} 
            className={`recipe-card ${selectedRecipe?.id === recipe.id ? 'selected' : ''}`}
            onClick={() => onRecipeSelect(recipe)}
          >
            {recipe.image && (
              <div className="recipe-image">
                <img src={recipe.image} alt={recipe.name} />
              </div>
            )}
            <div className="recipe-header">
              <h4>{recipe.name}</h4>
              <div className="match-score">
                <Star size={16} />
                <span>{recipe.matchScore}% match</span>
              </div>
            </div>
            
            <div className="recipe-meta">
              <div className="meta-item">
                <Clock size={14} />
                <span>{recipe.cookTime} min</span>
              </div>
              <div className="meta-item">
                <Users size={14} />
                <span>{recipe.servings} servings</span>
              </div>
              <div className="meta-item">
                <ChefHat size={14} />
                <span>{recipe.difficulty}</span>
              </div>
            </div>
            
            {/* Nutrition Information */}
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
            
            <p className="recipe-description" id={`recipe-${recipe.id}-description`}>{recipe.description}</p>
            
            {/* Recipe Rating */}
            <RecipeRating 
              recipe={recipe}
              onRatingChange={onRatingChange}
              savedRecipes={savedRecipes}
              onSaveRecipe={onSaveRecipe}
            />
            
            <div className="matching-ingredients">
              <small>Matching ingredients: {recipe.matchingIngredients.join(', ')}</small>
            </div>
            
            <div className="recipe-tags">
              {recipe.tags.map((tag, index) => (
                <span key={index} className="recipe-tag">{tag}</span>
              ))}
            </div>
            
            <div className="recipe-actions">
              <button 
                className="view-recipe-btn"
                onClick={(e) => handleButtonClick(e, recipe)}
                disabled={clickedButton === recipe.id}
                aria-label={`View recipe details for ${recipe.name}`}
                aria-describedby={`recipe-${recipe.id}-description`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleButtonClick(e, recipe);
                  }
                }}
              >
                {clickedButton === recipe.id ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-spin"
                  >
                    <path d="M12 2v4M12 18v4M2 12h4M20 12h4" />
                  </svg>
                ) : (
                  <>
                    View Recipe <ArrowRight size={16} className="arrow-icon" />
                  </>
                )}
              </button>
              
              <button 
                className={`save-recipe-btn ${savedRecipes?.some(saved => saved.id === recipe.id) ? 'saved' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSaveRecipe(recipe);
                }}
                aria-label={`${savedRecipes?.some(saved => saved.id === recipe.id) ? 'Remove from' : 'Add to'} saved recipes`}
              >
                <Bookmark size={16} />
                {savedRecipes?.some(saved => saved.id === recipe.id) ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {selectedRecipe && (
        <div id="selected-recipe-details" className="selected-recipe-details">
          <h4>📖 {selectedRecipe.name}</h4>
          
          <div className="recipe-info">
            <div className="info-section">
              <h5>Ingredients:</h5>
              <ul className="ingredients-list">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <strong>{ingredient.amount}</strong> {ingredient.name}
                    {ingredient.notes && <small> ({ingredient.notes})</small>}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="info-section">
              <h5>Instructions:</h5>
              <ol className="instructions-list">
                {selectedRecipe.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            </div>
            
            <div className="recipe-stats">
              <div className="stat">
                <Clock size={16} />
                <span>Prep: {selectedRecipe.prepTime} min</span>
              </div>
              <div className="stat">
                <Clock size={16} />
                <span>Cook: {selectedRecipe.cookTime} min</span>
              </div>
              <div className="stat">
                <Users size={16} />
                <span>Serves: {selectedRecipe.servings}</span>
              </div>
            </div>
            
            {/* Detailed Nutrition Information */}
            {selectedRecipe.nutrition && (
              <div className="info-section">
                <h5>Nutrition Information (per serving):</h5>
                <div className="detailed-nutrition">
                  <div className="nutrition-row">
                    <div className="nutrition-item-detailed">
                      <span className="nutrition-label-detailed">Calories</span>
                      <span className="nutrition-value-detailed">{selectedRecipe.nutrition.calories}</span>
                    </div>
                    <div className="nutrition-item-detailed">
                      <span className="nutrition-label-detailed">Protein</span>
                      <span className="nutrition-value-detailed">{selectedRecipe.nutrition.protein}g</span>
                    </div>
                    <div className="nutrition-item-detailed">
                      <span className="nutrition-label-detailed">Carbohydrates</span>
                      <span className="nutrition-value-detailed">{selectedRecipe.nutrition.carbs}g</span>
                    </div>
                    <div className="nutrition-item-detailed">
                      <span className="nutrition-label-detailed">Fat</span>
                      <span className="nutrition-value-detailed">{selectedRecipe.nutrition.fat}g</span>
                    </div>
                    <div className="nutrition-item-detailed">
                      <span className="nutrition-label-detailed">Fiber</span>
                      <span className="nutrition-value-detailed">{selectedRecipe.nutrition.fiber}g</span>
                    </div>
                    <div className="nutrition-item-detailed">
                      <span className="nutrition-label-detailed">Sugar</span>
                      <span className="nutrition-value-detailed">{selectedRecipe.nutrition.sugar}g</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default RecipeDisplay
