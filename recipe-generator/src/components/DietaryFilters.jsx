import React from 'react'
import { Leaf, Wheat, Milk, Heart } from 'lucide-react'

const DietaryFilters = ({ restrictions, onRestrictionsChange }) => {
  console.log('DietaryFilters component rendered with restrictions:', restrictions);
  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian', icon: Leaf, color: '#4CAF50' },
    { id: 'vegan', label: 'Vegan', icon: Leaf, color: '#8BC34A' },
    { id: 'gluten-free', label: 'Gluten-Free', icon: Wheat, color: '#FF9800' },
    { id: 'dairy-free', label: 'Dairy-Free', icon: Milk, color: '#2196F3' },
    { id: 'low-carb', label: 'Low-Carb', icon: Heart, color: '#E91E63' },
    { id: 'keto', label: 'Keto', icon: Heart, color: '#9C27B0' }
  ]

  const handleToggleRestriction = (restrictionId) => {
    if (restrictions.includes(restrictionId)) {
      onRestrictionsChange(restrictions.filter(r => r !== restrictionId))
    } else {
      onRestrictionsChange([...restrictions, restrictionId])
    }
  }

  return (
    <div className="dietary-filters" style={{ border: '3px solid red' }}>
      <h3>🥗 Dietary Preferences</h3>
      <p>Select your dietary restrictions to filter recipes</p>
      
      <div className="filters-grid" style={{ border: '2px solid green' }}>
        {dietaryOptions.map((option) => {
          const Icon = option.icon
          const isActive = restrictions.includes(option.id)
          console.log('Rendering filter button:', option.label, 'isActive:', isActive);
          
          return (
            <button
              key={option.id}
              onClick={() => handleToggleRestriction(option.id)}
              className={`filter-button ${isActive ? 'active' : ''}`}
              style={{ 
                '--accent-color': option.color,
                border: '2px solid blue',
                backgroundColor: isActive ? option.color : 'white'
              }}
            >
              <Icon size={18} />
              <span>{option.label}</span>
            </button>
          )
        })}
      </div>
      
      {restrictions.length > 0 && (
        <div className="active-filters">
          <h4>Active Filters:</h4>
          <div className="active-filter-tags">
            {restrictions.map((restriction) => {
              const option = dietaryOptions.find(opt => opt.id === restriction)
              return (
                <span key={restriction} className="active-filter-tag">
                  {option?.label}
                </span>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default DietaryFilters
