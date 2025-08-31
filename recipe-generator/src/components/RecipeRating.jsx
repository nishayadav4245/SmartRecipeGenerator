import React, { useState, useEffect } from 'react'
import { Star, StarHalf, Heart, Edit3 } from 'lucide-react'

const RecipeRating = ({ recipe, onRatingChange, savedRecipes, onSaveRecipe }) => {
  const [userRating, setUserRating] = useState(0)
  const [isHovered, setIsHovered] = useState(0)
  const [showRatingForm, setShowRatingForm] = useState(false)
  const [currentUserRating, setCurrentUserRating] = useState(0)

  // Check if recipe is saved
  const isSaved = savedRecipes?.some(saved => saved.id === recipe.id)

  // Check if user has already rated this recipe
  useEffect(() => {
    // Check localStorage for user's previous rating
    const userRatings = JSON.parse(localStorage.getItem('userRecipeRatings') || '{}')
    const previousRating = userRatings[recipe.id]
    if (previousRating) {
      setCurrentUserRating(previousRating)
    }
  }, [recipe.id])

  // Handle rating submission
  const handleRatingSubmit = () => {
    if (userRating > 0) {
      // Save rating to localStorage
      const userRatings = JSON.parse(localStorage.getItem('userRecipeRatings') || '{}')
      userRatings[recipe.id] = userRating
      localStorage.setItem('userRecipeRatings', JSON.stringify(userRatings))
      
      // Update current user rating
      setCurrentUserRating(userRating)
      
      // Call parent function to update recipe rating
      onRatingChange(recipe.id, userRating)
      
      // Reset form
      setUserRating(0)
      setShowRatingForm(false)
    }
  }

  // Handle rating change
  const handleRatingChange = (newRating) => {
    if (currentUserRating === newRating) {
      // If clicking the same rating, remove it
      setCurrentUserRating(0)
      setUserRating(0)
      
      // Remove from localStorage
      const userRatings = JSON.parse(localStorage.getItem('userRecipeRatings') || '{}')
      delete userRatings[recipe.id]
      localStorage.setItem('userRecipeRatings', JSON.stringify(userRatings))
      
      // Call parent function to remove rating
      onRatingChange(recipe.id, 0, true) // true indicates removal
    } else {
      // Set new rating
      setUserRating(newRating)
    }
  }

  // Render star rating display
  const renderStars = (rating, size = 16) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          size={size}
          className="text-yellow-400 fill-current"
        />
      )
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half"
          size={size}
          className="text-yellow-400 fill-current"
        />
      )
    }

    // Add empty stars
    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          size={size}
          className="text-gray-300"
        />
      )
    }

    return stars
  }

  // Render interactive rating stars
  const renderInteractiveStars = () => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (isHovered || userRating || currentUserRating)
      const isCurrentRating = i === currentUserRating
      
      stars.push(
        <Star
          key={i}
          size={20}
          className={`cursor-pointer transition-colors ${
            isFilled ? 'text-yellow-400 fill-current' : 'text-gray-300'
          } ${isCurrentRating ? 'ring-2 ring-blue-500 ring-offset-1' : ''}`}
          onMouseEnter={() => setIsHovered(i)}
          onMouseLeave={() => setIsHovered(0)}
          onClick={() => handleRatingChange(i)}
        />
      )
    }
    return stars
  }

  return (
    <div className="recipe-rating">
      {/* Rating Display */}
      <div className="rating-display">
        <div className="stars-container">
          {renderStars(recipe.rating, 18)}
        </div>
        <div className="rating-info">
          <span className="rating-value">{recipe.rating}</span>
          <span className="rating-count">({recipe.ratingCount} ratings)</span>
        </div>
      </div>

      {/* User's Current Rating */}
      {currentUserRating > 0 && (
        <div className="user-rating-display">
          <span className="user-rating-label">Your rating:</span>
          <div className="user-stars">
            {renderStars(currentUserRating, 16)}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="rating-actions-container">
        {/* Save Recipe Button */}
        <button
          className={`save-recipe-btn ${isSaved ? 'saved' : ''}`}
          onClick={() => onSaveRecipe(recipe)}
          title={isSaved ? 'Remove from saved' : 'Save recipe'}
        >
          <Heart
            size={18}
            className={isSaved ? 'fill-current text-red-500' : 'text-gray-400'}
          />
          <span>{isSaved ? 'Saved' : 'Save'}</span>
        </button>

        {/* Rate/Edit Recipe Button */}
        <button
          className={`rate-recipe-btn ${currentUserRating > 0 ? 'edit-rating' : ''}`}
          onClick={() => setShowRatingForm(!showRatingForm)}
        >
          {currentUserRating > 0 ? (
            <>
              <Edit3 size={16} />
              Change Rating
            </>
          ) : (
            'Rate Recipe'
          )}
        </button>
      </div>

      {/* Rating Form */}
      {showRatingForm && (
        <div className="rating-form">
          <div className="rating-form-header">
            <h5>{currentUserRating > 0 ? 'Change Your Rating' : 'Rate This Recipe'}</h5>
            {currentUserRating > 0 && (
              <p className="current-rating-info">
                Current rating: {currentUserRating} star{currentUserRating > 1 ? 's' : ''}
              </p>
            )}
          </div>
          
          <div className="rating-stars">
            {renderInteractiveStars()}
          </div>
          
          <div className="rating-actions">
            <button
              className="submit-rating-btn"
              onClick={handleRatingSubmit}
              disabled={userRating === 0}
            >
              {currentUserRating > 0 ? 'Update Rating' : 'Submit Rating'}
            </button>
            <button
              className="cancel-rating-btn"
              onClick={() => {
                setShowRatingForm(false)
                setUserRating(0)
              }}
            >
              Cancel
            </button>
          </div>
          
          {userRating > 0 && (
            <p className="rating-preview">
              You selected: {userRating} star{userRating > 1 ? 's' : ''}
            </p>
          )}
          
          {currentUserRating > 0 && userRating === 0 && (
            <p className="rating-tip">
              💡 Click on a star to change your rating, or click the same star to remove it
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default RecipeRating
