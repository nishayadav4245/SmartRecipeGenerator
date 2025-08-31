import React, { useState } from 'react'
import { Clock, Users, Star, ChefHat, Trash2, Activity } from 'lucide-react'
import RecipeRating from './RecipeRating'
import './SavedRecipes.css'

const SavedRecipes = ({ savedRecipes, onUnsaveRecipe, onRecipeSelect, selectedRecipe, onRatingChange }) => {
  if (savedRecipes.length === 0) {
    return (
      <div className="saved-recipes">
        <div className="empty-saved-recipes">
          <Bookmark size={64} className="empty-icon" />
          <h3>No saved recipes yet</h3>
          <p>Start exploring recipes and save your favorites!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="saved-recipes">
      <div className="saved-recipes-header">
        <p>You have {savedRecipes.length} saved recipe{savedRecipes.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="saved-recipes-grid">
        {savedRecipes.map((recipe) => (
          <div 
            key={recipe.id} 
            className={`saved-recipe-card ${selectedRecipe?.id === recipe.id ? 'selected' : ''}`}
            onClick={() => {
              onRecipeSelect(recipe);
              // Scroll to recipe details after a short delay
              setTimeout(() => {
                const recipeDetailsElement = document.getElementById('saved-recipe-details');
                if (recipeDetailsElement) {
                  recipeDetailsElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start',
                    inline: 'nearest'
                  });
                }
              }, 100);
            }}
          >
            {recipe.image && (
              <div className="saved-recipe-image">
                <img src={recipe.image} alt={recipe.name} />
              </div>
            )}
            <div className="saved-recipe-header">
              <h4>{recipe.name}</h4>
              <button 
                className="unsave-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  onUnsaveRecipe(recipe.id)
                }}
                aria-label={`Remove ${recipe.name} from saved recipes`}
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            <div className="saved-recipe-meta">
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
            
            <p className="saved-recipe-description">{recipe.description}</p>
            
            {/* Recipe Rating */}
            <RecipeRating 
              recipe={recipe}
              onRatingChange={onRatingChange}
              savedRecipes={savedRecipes}
              onSaveRecipe={() => {}} // No-op since it's already saved
            />
            
            <div className="saved-recipe-tags">
              {recipe.tags && recipe.tags.map((tag, index) => (
                <span key={index} className="recipe-tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {selectedRecipe && (
        <div id="saved-recipe-details" className="selected-recipe-details">
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

export default SavedRecipes
