import React from 'react'
import { Star, Clock, Users, ChefHat, Bookmark, Activity } from 'lucide-react'
import RecipeRating from './RecipeRating'

const TopRatedRecipes = ({ recipes, dietaryRestrictions = [], onSaveRecipe, savedRecipes, onRecipeSelect }) => {
  // Filter recipes by dietary restrictions first
  const filteredRecipes = recipes.filter(recipe => {
    if (dietaryRestrictions.length === 0) return true
    
    return dietaryRestrictions.every(restriction => {
      switch (restriction) {
        case 'vegetarian':
          return !recipe.ingredients.some(ing => ing.category === 'meat')
        case 'vegan':
          return !recipe.ingredients.some(ing => 
            ing.category === 'meat' || ing.category === 'dairy'
          )
        case 'gluten-free':
          return !recipe.ingredients.some(ing => ing.category === 'gluten')
        case 'dairy-free':
          return !recipe.ingredients.some(ing => ing.category === 'dairy')
        default:
          return true
      }
    })
  })

  // Sort recipes by rating (highest first) and take top 6
  const topRatedRecipes = filteredRecipes
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6)

  if (topRatedRecipes.length === 0) {
    return (
      <div className="top-rated-recipes">
        <div className="top-rated-header">
          <div className="top-rated-title">
            <Star className="top-rated-icon" />
            <h3>Top Rated Recipes</h3>
          </div>
          <p>No top-rated recipes match your dietary preferences</p>
        </div>
      </div>
    )
  }

  return (
    <div className="top-rated-recipes">
      <div className="top-rated-header">
        <div className="top-rated-title">
          <Star className="top-rated-icon" />
          <h3>Top Rated Recipes</h3>
        </div>
        <p>
          {dietaryRestrictions.length > 0 
            ? `Discover the most popular ${dietaryRestrictions.join(', ')} recipes`
            : 'Discover the most popular and highly-rated recipes'
          }
        </p>
      </div>

      <div className="top-rated-grid">
        {topRatedRecipes.map((recipe) => (
          <div 
            key={recipe.id} 
            className="top-rated-card"
            onClick={() => onRecipeSelect(recipe)}
          >
            {recipe.image && (
              <div className="top-rated-image">
                <img src={recipe.image} alt={recipe.name} />
                <div className="rating-badge">
                  <Star size={14} />
                  <span>{recipe.rating}</span>
                </div>
              </div>
            )}
            
            <div className="top-rated-content">
              <div className="top-rated-header">
                <h4>{recipe.name}</h4>
                <div className="rating-display">
                  <Star size={14} className="star-icon" />
                  <span>{recipe.rating}</span>
                  <span className="rating-count">({recipe.ratingCount} reviews)</span>
                </div>
              </div>
              
              <div className="top-rated-meta">
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
              
              <p className="top-rated-description">{recipe.description}</p>
              
              {/* Recipe Rating */}
              <RecipeRating 
                recipe={recipe}
                onRatingChange={() => {}} // No-op since we're just displaying
                savedRecipes={savedRecipes}
                onSaveRecipe={onSaveRecipe}
              />
              
              <div className="top-rated-tags">
                {recipe.tags.map((tag, index) => (
                  <span key={index} className="recipe-tag">{tag}</span>
                ))}
              </div>
              
              <div className="top-rated-actions">
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default TopRatedRecipes
