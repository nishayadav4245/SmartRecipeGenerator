import React, { useState } from 'react'
import { RefreshCw, Lightbulb, AlertTriangle } from 'lucide-react'

const SubstitutionPanel = ({ recipe }) => {
  const [showSubstitutions, setShowSubstitutions] = useState(false)

  // Common ingredient substitutions
  const substitutions = {
    'eggs': [
      { name: 'Flaxseed meal + water', ratio: '1 tbsp + 3 tbsp water', notes: 'Vegan alternative' },
      { name: 'Applesauce', ratio: '1/4 cup', notes: 'For baking, adds moisture' },
      { name: 'Banana', ratio: '1/4 cup mashed', notes: 'For baking, adds sweetness' }
    ],
    'milk': [
      { name: 'Almond milk', ratio: '1:1', notes: 'Dairy-free alternative' },
      { name: 'Oat milk', ratio: '1:1', notes: 'Creamy, dairy-free' },
      { name: 'Coconut milk', ratio: '1:1', notes: 'Rich, tropical flavor' }
    ],
    'butter': [
      { name: 'Coconut oil', ratio: '1:1', notes: 'Vegan alternative' },
      { name: 'Olive oil', ratio: '1:1', notes: 'Healthier option' },
      { name: 'Applesauce', ratio: '1/2 cup for 1 cup butter', notes: 'Lower fat option' }
    ],
    'flour': [
      { name: 'Almond flour', ratio: '1:1', notes: 'Gluten-free, low-carb' },
      { name: 'Coconut flour', ratio: '1/4 cup for 1 cup flour', notes: 'Gluten-free, high fiber' },
      { name: 'Oat flour', ratio: '1:1', notes: 'Gluten-free, whole grain' }
    ],
    'sugar': [
      { name: 'Honey', ratio: '3/4 cup for 1 cup sugar', notes: 'Natural sweetener' },
      { name: 'Maple syrup', ratio: '3/4 cup for 1 cup sugar', notes: 'Natural sweetener' },
      { name: 'Stevia', ratio: '1/2 tsp for 1 cup sugar', notes: 'Zero-calorie sweetener' }
    ]
  }

  const getSubstitutionsForRecipe = () => {
    const recipeSubstitutions = {}
    
    recipe.ingredients.forEach(ingredient => {
      const ingredientName = ingredient.name.toLowerCase()
      
      for (const [key, subs] of Object.entries(substitutions)) {
        if (ingredientName.includes(key) || key.includes(ingredientName)) {
          recipeSubstitutions[ingredient.name] = subs
          break
        }
      }
    })
    
    return recipeSubstitutions
  }

  const recipeSubstitutions = getSubstitutionsForRecipe()

  return (
    <div className="substitution-panel">
      <div className="panel-header">
        <h4>🔄 Ingredient Substitutions</h4>
        <button 
          onClick={() => setShowSubstitutions(!showSubstitutions)}
          className="toggle-button"
        >
          <RefreshCw size={16} />
          {showSubstitutions ? 'Hide' : 'Show'} Substitutions
        </button>
      </div>
      
      {showSubstitutions && (
        <div className="substitutions-content">
          {Object.keys(recipeSubstitutions).length > 0 ? (
            <div className="substitutions-list">
              {Object.entries(recipeSubstitutions).map(([ingredient, subs]) => (
                <div key={ingredient} className="substitution-item">
                  <h5>
                    <AlertTriangle size={16} />
                    {ingredient}
                  </h5>
                  <div className="substitution-options">
                    {subs.map((sub, index) => (
                      <div key={index} className="substitution-option">
                        <div className="sub-name">
                          <Lightbulb size={14} />
                          <strong>{sub.name}</strong>
                        </div>
                        <div className="sub-ratio">{sub.ratio}</div>
                        <div className="sub-notes">{sub.notes}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-substitutions">
              <p>No common substitutions found for this recipe's ingredients.</p>
              <p>All ingredients are standard and easily available!</p>
            </div>
          )}
          
          <div className="substitution-tips">
            <h5>💡 Substitution Tips:</h5>
            <ul>
              <li>When substituting, start with small amounts and adjust to taste</li>
              <li>Some substitutions may affect texture and cooking time</li>
              <li>Consider the flavor profile - some swaps change the taste significantly</li>
              <li>For baking, substitutions may require recipe adjustments</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default SubstitutionPanel
