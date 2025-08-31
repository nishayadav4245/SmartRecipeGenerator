import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import ImageUpload from './components/ImageUpload'
import RecipeDisplay from './components/RecipeDisplay'
import IngredientList from './components/IngredientList'
import DietaryFilters from './components/DietaryFilters'
import SubstitutionPanel from './components/SubstitutionPanel'
import AIRecipeSuggestions from './components/AIRecipeSuggestions'
import SavedRecipes from './components/SavedRecipes'
import TopRatedRecipes from './components/TopRatedRecipes'
import { recipes } from './data/recipes'

function App() {
  const [uploadedImage, setUploadedImage] = useState(null)
  const [recognizedIngredients, setRecognizedIngredients] = useState([])
  const [matchedRecipes, setMatchedRecipes] = useState([])
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const [dietaryRestrictions, setDietaryRestrictions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [savedRecipes, setSavedRecipes] = useState([])
  const [currentView, setCurrentView] = useState('home') // 'home' or 'saved'

  // Load saved recipes from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedRecipes')
    if (saved) {
      setSavedRecipes(JSON.parse(saved))
    }
  }, [])

  // Save recipes to localStorage whenever savedRecipes changes
  useEffect(() => {
    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes))
  }, [savedRecipes])

  // Handle navigation
  const handleNavigation = (view) => {
    setCurrentView(view)
    setSelectedRecipe(null) // Clear selected recipe when switching views
  }

  // Save recipe functionality
  const handleSaveRecipe = (recipe) => {
    const isAlreadySaved = savedRecipes.some(saved => saved.id === recipe.id)
    if (!isAlreadySaved) {
      setSavedRecipes([...savedRecipes, recipe])
    }
  }

  // Unsave recipe functionality
  const handleUnsaveRecipe = (recipeId) => {
    setSavedRecipes(savedRecipes.filter(recipe => recipe.id !== recipeId))
  }

  // Handle AI-detected ingredients from image
  const handleIngredientsDetected = (ingredients) => {
    setRecognizedIngredients(ingredients)
  }
  
  // Get ingredient suggestions based on current ingredients
  const getIngredientSuggestions = (currentIngredients) => {
    if (!currentIngredients || currentIngredients.length === 0) return []
    
    const suggestions = new Map()
    
    // Analyze current ingredients to find patterns
    const analyses = currentIngredients.map(ing => {
      const lowerIng = ing.toLowerCase()
      // Check if ingredient exists in our synonym database
      for (const [key, synonyms] of Object.entries(ingredientSynonyms)) {
        if (key === lowerIng || synonyms.includes(lowerIng)) {
          return { ingredient: key, synonyms: synonyms }
        }
      }
      return { ingredient: lowerIng, synonyms: [] }
    })
    
    // Find complementary ingredients
    for (const [key, synonyms] of Object.entries(ingredientSynonyms)) {
      if (currentIngredients.includes(key)) continue
      
      let score = 0
      const currentSynonyms = new Set(currentIngredients.map(ing => ing.toLowerCase()))
      
      // Check for category complementarity
      const categories = ['vegetable', 'protein', 'dairy', 'grain', 'herb', 'spice']
      const currentCategories = new Set()
      
      analyses.forEach(analysis => {
        if (analysis.synonyms.length > 0) {
          // Try to infer category from ingredient name
          if (analysis.ingredient.includes('chicken') || analysis.ingredient.includes('beef') || 
              analysis.ingredient.includes('fish') || analysis.ingredient.includes('egg')) {
            currentCategories.add('protein')
          } else if (analysis.ingredient.includes('cheese') || analysis.ingredient.includes('milk') || 
                     analysis.ingredient.includes('cream') || analysis.ingredient.includes('yogurt')) {
            currentCategories.add('dairy')
          } else if (analysis.ingredient.includes('rice') || analysis.ingredient.includes('pasta') || 
                     analysis.ingredient.includes('bread') || analysis.ingredient.includes('flour')) {
            currentCategories.add('grain')
          } else if (analysis.ingredient.includes('basil') || analysis.ingredient.includes('oregano') || 
                     analysis.ingredient.includes('thyme') || analysis.ingredient.includes('rosemary')) {
            currentCategories.add('herb')
          } else if (analysis.ingredient.includes('salt') || analysis.ingredient.includes('pepper') || 
                     analysis.ingredient.includes('cumin') || analysis.ingredient.includes('paprika')) {
            currentCategories.add('spice')
          } else {
            currentCategories.add('vegetable')
          }
        }
      })
      
      // Score based on category balance
      if (currentCategories.has('protein') && (key.includes('vegetable') || key.includes('herb'))) score += 15
      if (currentCategories.has('vegetable') && (key.includes('protein') || key.includes('grain'))) score += 12
      if (currentCategories.has('grain') && (key.includes('vegetable') || key.includes('protein'))) score += 10
      
      // Score based on common recipe combinations
      const commonPairs = {
        'tomato': ['basil', 'garlic', 'onion', 'olive oil'],
        'chicken': ['garlic', 'onion', 'herbs', 'lemon'],
        'beef': ['garlic', 'onion', 'herbs', 'wine'],
        'pasta': ['garlic', 'olive oil', 'herbs', 'cheese'],
        'rice': ['garlic', 'onion', 'herbs', 'vegetables']
      }
      
      for (const [base, pairs] of Object.entries(commonPairs)) {
        if (currentSynonyms.has(base) && pairs.includes(key)) {
          score += 20
        }
      }
      
      if (score > 15) {
        suggestions.set(key, {
          ingredient: key,
          score: score,
          reason: getSuggestionReason(key, currentCategories, currentSynonyms)
        })
      }
    }
    
    // Return top 6 suggestions sorted by score
    return Array.from(suggestions.values())
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
  }
  
  // Generate human-readable reason for suggestion
  const getSuggestionReason = (ingredient, currentCategories, currentSynonyms) => {
    const reasons = []
    
    if (currentCategories.has('protein') && (ingredient.includes('vegetable') || ingredient.includes('herb'))) {
      reasons.push('Adds vegetables/herbs to balance your protein')
    }
    
    if (currentCategories.has('vegetable') && ingredient.includes('protein')) {
      reasons.push('Adds protein to make it a complete meal')
    }
    
    if (currentCategories.has('grain') && ingredient.includes('vegetable')) {
      reasons.push('Adds vegetables to complement your grains')
    }
    
    // Common pairing reasons
    const commonPairings = {
      'tomato': 'Pairs perfectly with basil, garlic, and olive oil',
      'chicken': 'Goes great with herbs, garlic, and lemon',
      'beef': 'Complements garlic, onions, and herbs',
      'pasta': 'Perfect with garlic, olive oil, and herbs',
      'rice': 'Excellent with vegetables and aromatics'
    }
    
    for (const [base, reason] of Object.entries(commonPairings)) {
      if (currentSynonyms.has(base)) {
        reasons.push(reason)
        break
      }
    }
    
    return reasons.length > 0 ? reasons[0] : 'Complements your current ingredients'
  }

  // Comprehensive ingredient synonyms for better recipe matching
  const ingredientSynonyms = {
    // Vegetables
    'tomato': ['tomatoes', 'cherry tomato', 'roma tomato', 'tomato sauce', 'tomato paste', 'tomato puree', 'sun dried tomato'],
    'onion': ['onions', 'red onion', 'white onion', 'yellow onion', 'shallot', 'shallots', 'scallion', 'green onion', 'spring onion'],
    'garlic': ['garlic cloves', 'minced garlic', 'garlic powder', 'garlic paste', 'roasted garlic'],
    'carrot': ['carrots', 'baby carrots', 'carrot sticks', 'carrot coins'],
    'broccoli': ['broccoli florets', 'broccoli head', 'broccoli crowns'],
    'spinach': ['baby spinach', 'fresh spinach', 'frozen spinach', 'spinach leaves'],
    'lettuce': ['iceberg lettuce', 'romaine lettuce', 'leaf lettuce', 'butter lettuce', 'bibb lettuce'],
    'bell pepper': ['bell peppers', 'red pepper', 'green pepper', 'yellow pepper', 'orange pepper', 'sweet pepper', 'capsicum'],
    'mushroom': ['mushrooms', 'button mushrooms', 'portobello mushrooms', 'cremini mushrooms', 'shiitake mushrooms'],
    'zucchini': ['zucchini squash', 'courgette', 'summer squash'],
    'eggplant': ['aubergine', 'brinjal', 'japanese eggplant', 'chinese eggplant'],
    
    // Proteins
    'chicken': ['chicken breast', 'chicken thighs', 'chicken wings', 'chicken meat', 'chicken tenderloin', 'chicken cutlets', 'ground chicken'],
    'beef': ['ground beef', 'beef mince', 'beef steak', 'beef meat', 'beef tenderloin', 'beef sirloin', 'beef ribeye', 'beef chuck'],
    'pork': ['pork chops', 'pork meat', 'bacon', 'ham', 'pork tenderloin', 'pork shoulder', 'ground pork'],
    'fish': ['salmon', 'tuna', 'cod', 'tilapia', 'white fish', 'halibut', 'sea bass', 'trout', 'mackerel'],
    'shrimp': ['prawns', 'shrimp meat', 'jumbo shrimp', 'medium shrimp', 'peeled shrimp'],
    'eggs': ['egg', 'chicken eggs', 'large eggs', 'fresh eggs'],
    
    // Dairy
    'cheese': ['cheddar cheese', 'mozzarella cheese', 'parmesan cheese', 'cheese blend', 'feta cheese', 'goat cheese', 'blue cheese', 'brie cheese'],
    'milk': ['whole milk', 'skim milk', 'almond milk', 'soy milk', 'oat milk', 'coconut milk'],
    'cream': ['heavy cream', 'whipping cream', 'sour cream', 'half and half', 'light cream'],
    'yogurt': ['greek yogurt', 'plain yogurt', 'vanilla yogurt', 'greek style yogurt'],
    'butter': ['unsalted butter', 'salted butter', 'clarified butter', 'ghee'],
    
    // Grains & Starches
    'rice': ['white rice', 'brown rice', 'basmati rice', 'jasmine rice', 'arborio rice', 'wild rice', 'black rice'],
    'pasta': ['spaghetti', 'penne', 'fettuccine', 'linguine', 'macaroni', 'rigatoni', 'fusilli', 'orecchiette', 'ravioli'],
    'bread': ['sliced bread', 'whole wheat bread', 'sourdough bread', 'ciabatta', 'baguette', 'focaccia', 'naan'],
    'flour': ['all purpose flour', 'whole wheat flour', 'bread flour', 'cake flour', 'pastry flour'],
    'pizza dough': ['pizza crust', 'dough', 'pizza base'],
    
    // Oils & Fats
    'olive oil': ['extra virgin olive oil', 'olive oil', 'light olive oil'],
    'vegetable oil': ['canola oil', 'sunflower oil', 'cooking oil', 'neutral oil'],
    'coconut oil': ['virgin coconut oil', 'refined coconut oil'],
    
    // Herbs & Spices
    'basil': ['fresh basil', 'dried basil', 'basil leaves', 'holy basil', 'thai basil'],
    'oregano': ['dried oregano', 'fresh oregano', 'greek oregano', 'mexican oregano'],
    'thyme': ['fresh thyme', 'dried thyme', 'lemon thyme'],
    'rosemary': ['fresh rosemary', 'dried rosemary'],
    'salt': ['sea salt', 'table salt', 'kosher salt', 'himalayan salt', 'flaky salt'],
    'pepper': ['black pepper', 'white pepper', 'ground pepper', 'peppercorns', 'cracked pepper'],
    'ginger': ['fresh ginger', 'ginger root', 'ground ginger', 'ginger paste'],
    'cumin': ['ground cumin', 'cumin seeds', 'whole cumin'],
    'paprika': ['smoked paprika', 'sweet paprika', 'hot paprika'],
    
    // Other common ingredients
    'sugar': ['white sugar', 'brown sugar', 'granulated sugar', 'powdered sugar', 'cane sugar'],
    'honey': ['raw honey', 'organic honey', 'wildflower honey', 'clover honey'],
    'lemon': ['lemon juice', 'fresh lemon', 'lemon zest', 'lemon wedges', 'meyer lemon'],
    'lime': ['lime juice', 'fresh lime', 'lime zest', 'lime wedges', 'key lime'],
    'vinegar': ['apple cider vinegar', 'white vinegar', 'balsamic vinegar', 'red wine vinegar', 'rice vinegar'],
    'soy sauce': ['light soy sauce', 'dark soy sauce', 'tamari', 'shoyu', 'low sodium soy sauce'],
    'tomato sauce': ['marinara sauce', 'pasta sauce', 'tomato puree', 'crushed tomatoes'],
    'chicken broth': ['chicken stock', 'vegetable broth', 'beef broth', 'bone broth'],
    'wine': ['red wine', 'white wine', 'cooking wine', 'dry wine', 'sweet wine'],
    
    // Additional ingredients from recipes
    'taco seasoning': ['taco mix', 'taco spices', 'mexican seasoning'],
    'heavy cream': ['whipping cream', 'double cream', 'heavy whipping cream'],
    'parmesan cheese': ['parmesan', 'parmigiano reggiano', 'grated parmesan'],
    'tortillas': ['taco shells', 'corn tortillas', 'flour tortillas', 'wraps'],
    'avocado': ['avocados', 'ripe avocado', 'hass avocado'],
    'cilantro': ['fresh cilantro', 'coriander', 'chinese parsley'],
    'jalapeno': ['jalapenos', 'jalapeno pepper', 'hot pepper'],
    'lime juice': ['fresh lime juice', 'bottled lime juice'],
    'sour cream': ['dairy sour cream', 'cultured sour cream'],
    'cheddar cheese': ['sharp cheddar', 'mild cheddar', 'aged cheddar'],
    'ground beef': ['beef mince', 'hamburger meat', 'lean ground beef'],
    'taco shells': ['hard taco shells', 'corn taco shells', 'taco bowls'],
    'black beans': ['black bean', 'canned black beans', 'dried black beans'],
    'corn': ['sweet corn', 'corn kernels', 'fresh corn', 'canned corn'],
    'red onion': ['red onions', 'purple onion', 'spanish onion'],
    'chili powder': ['chili powder', 'mexican chili powder', 'ancho chili powder'],
    'garlic powder': ['garlic powder', 'granulated garlic', 'dehydrated garlic'],
    'onion powder': ['onion powder', 'granulated onion', 'dehydrated onion'],
    'black pepper': ['black pepper', 'ground black pepper', 'peppercorns']
  }

  // Enhanced ingredient matching with comprehensive synonym handling
  const getRelatedWords = (ingredient) => {
    const lowerIngredient = ingredient.toLowerCase().trim()
    
    // Direct match
    if (ingredientSynonyms[lowerIngredient]) {
      return [lowerIngredient, ...ingredientSynonyms[lowerIngredient]]
    }
    
    // Check if ingredient is in any synonym list
    for (const [key, synonyms] of Object.entries(ingredientSynonyms)) {
      if (synonyms.includes(lowerIngredient) || key === lowerIngredient) {
        return [key, ...synonyms]
      }
    }
    
    // Check for partial matches
    const partialMatches = []
    for (const [key, synonyms] of Object.entries(ingredientSynonyms)) {
      if (key.includes(lowerIngredient) || lowerIngredient.includes(key)) {
        partialMatches.push(key, ...synonyms)
      }
      for (const synonym of synonyms) {
        if (synonym.includes(lowerIngredient) || lowerIngredient.includes(synonym)) {
          partialMatches.push(key, ...synonyms)
        }
      }
    }
    
    // Enhanced partial matching for compound ingredients
    if (partialMatches.length === 0) {
      const words = lowerIngredient.split(/\s+/)
      for (const [key, synonyms] of Object.entries(ingredientSynonyms)) {
        for (const word of words) {
          if (word.length >= 3) { // Only consider words with 3+ characters
            if (key.includes(word) || word.includes(key)) {
              partialMatches.push(key, ...synonyms)
              break
            }
            for (const synonym of synonyms) {
              if (synonym.includes(word) || word.includes(synonym)) {
                partialMatches.push(key, ...synonyms)
                break
              }
            }
          }
        }
      }
    }
    
    return partialMatches.length > 0 ? [...new Set(partialMatches)] : [lowerIngredient]
  }

  // Enhanced recipe matching algorithm with AND logic - recipes must contain ALL specified ingredients
  const findMatchingRecipes = (ingredients) => {
    if (ingredients.length === 0) return []
    
    const matches = recipes.map(recipe => {
      const recipeIngredients = recipe.ingredients.map(ing => ing.name.toLowerCase())
      const userIngredients = ingredients.map(ing => ing.toLowerCase())
      
      // Get all related words for user ingredients
      const userIngredientVariations = userIngredients.map(ing => getRelatedWords(ing))
      
      // Enhanced ingredient matching with detailed analysis
      const ingredientMatches = []
      const unmatchedIngredients = []
      
      for (let i = 0; i < userIngredients.length; i++) {
        const userIng = userIngredients[i]
        const variations = userIngredientVariations[i]
        let bestMatch = null
        let bestMatchScore = 0
        
        for (const recipeIng of recipeIngredients) {
          // Direct exact match
          if (variations.includes(recipeIng)) {
            bestMatch = { ingredient: recipeIng, score: 1.0, type: 'exact' }
            break
          }
          
          // Check for partial matches
          let partialScore = 0
          for (const variation of variations) {
            // One ingredient contains the other
            if (recipeIng.includes(variation) || variation.includes(recipeIng)) {
              const longer = Math.max(recipeIng.length, variation.length)
              const shorter = Math.min(recipeIng.length, variation.length)
              const score = shorter / longer
              if (score > partialScore) partialScore = score
            }
            
            // Word-by-word matching for compound ingredients
            const recipeWords = recipeIng.split(/\s+/)
            const variationWords = variation.split(/\s+/)
            
            for (const recipeWord of recipeWords) {
              for (const variationWord of variationWords) {
                if (recipeWord.length >= 3 && variationWord.length >= 3) {
                  if (recipeWord === variationWord) {
                    partialScore = Math.max(partialScore, 0.9)
                  } else if (recipeWord.includes(variationWord) || variationWord.includes(recipeWord)) {
                    const longer = Math.max(recipeWord.length, variationWord.length)
                    const shorter = Math.min(recipeWord.length, variationWord.length)
                    partialScore = Math.max(partialScore, shorter / longer * 0.8)
                  }
                }
              }
            }
          }
          
          if (partialScore > bestMatchScore) {
            bestMatchScore = partialScore
            bestMatch = { ingredient: recipeIng, score: partialScore, type: 'partial' }
          }
        }
        
        if (bestMatch && bestMatch.score > 0.3) {
          ingredientMatches.push({
            userIngredient: userIng,
            recipeIngredient: bestMatch.ingredient,
            matchScore: bestMatch.score,
            matchType: bestMatch.type
          })
        } else {
          unmatchedIngredients.push(userIng)
        }
      }
      
      // AND LOGIC: Recipe must contain ALL specified ingredients to be considered a match
      if (unmatchedIngredients.length > 0) {
        return {
          ...recipe,
          matchScore: 0,
          matchingIngredients: ingredientMatches.map(m => m.userIngredient),
          unmatchedIngredients: unmatchedIngredients,
          matchDetails: {
            baseScore: 0,
            exactBonus: 0,
            qualityBonus: 0,
            complexityBonus: 0,
            totalMatches: ingredientMatches.length,
            exactMatches: ingredientMatches.filter(m => m.matchType === 'exact').length,
            partialMatches: ingredientMatches.filter(m => m.matchType === 'partial').length,
            reason: `Missing ingredients: ${unmatchedIngredients.join(', ')}`
          }
        }
      }
      
      // Calculate comprehensive match score for recipes that contain ALL ingredients
      const baseScore = (ingredientMatches.length / userIngredients.length) * 100
      
      // Bonus for exact matches
      const exactMatches = ingredientMatches.filter(match => match.matchType === 'exact').length
      const exactBonus = exactMatches * 10
      
      // Bonus for high-quality partial matches
      const highQualityMatches = ingredientMatches.filter(match => match.matchScore > 0.7).length
      const qualityBonus = highQualityMatches * 5
      
      // Recipe complexity bonus
      const complexityBonus = recipeIngredients.length >= 8 ? 15 : recipeIngredients.length >= 5 ? 10 : 5
      
      // Perfect match bonus (recipe contains all ingredients)
      const perfectMatchBonus = 25
      
      const finalScore = Math.min(100, baseScore + exactBonus + qualityBonus + complexityBonus + perfectMatchBonus)
      
      return {
        ...recipe,
        matchScore: Math.round(finalScore),
        matchingIngredients: ingredientMatches.map(m => m.userIngredient),
        unmatchedIngredients: [],
        matchDetails: {
          baseScore: Math.round(baseScore),
          exactBonus: Math.round(exactBonus),
          qualityBonus: Math.round(qualityBonus),
          complexityBonus: Math.round(complexityBonus),
          perfectMatchBonus: Math.round(perfectMatchBonus),
          totalMatches: ingredientMatches.length,
          exactMatches: exactMatches,
          partialMatches: ingredientMatches.length - exactMatches,
          reason: 'Perfect match - contains all ingredients'
        }
      }
    })
    
    // Filter by dietary restrictions
    const filteredMatches = matches.filter(recipe => {
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
    
    // Only return recipes that contain ALL ingredients (AND logic)
    return filteredMatches
      .filter(recipe => recipe.matchScore > 0) // Only recipes with all ingredients
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10)
  }

  useEffect(() => {
    if (recognizedIngredients.length > 0) {
      const matches = findMatchingRecipes(recognizedIngredients)
      setMatchedRecipes(matches)
    }
  }, [recognizedIngredients, dietaryRestrictions])

  const handleImageUpload = (file) => {
    setUploadedImage(file)
    // AI analysis is now handled automatically in the ImageUpload component
  }

  const handleIngredientAdd = (ingredient) => {
    if (!recognizedIngredients.includes(ingredient)) {
      setRecognizedIngredients([...recognizedIngredients, ingredient])
    }
  }

  const handleIngredientRemove = (ingredient) => {
    setRecognizedIngredients(recognizedIngredients.filter(ing => ing !== ingredient))
  }

  // Handle recipe rating changes
  const handleRecipeRating = (recipeId, userRating, isRemoval = false) => {
    setMatchedRecipes(prevRecipes => 
      prevRecipes.map(recipe => {
        if (recipe.id === recipeId) {
          if (isRemoval) {
            // Handle rating removal
            const newRatingCount = Math.max(0, recipe.ratingCount - 1)
            let newRating = recipe.rating
            
            if (newRatingCount > 0) {
              // Recalculate average without the removed rating
              const totalRating = recipe.rating * recipe.ratingCount
              newRating = totalRating / newRatingCount
            } else {
              newRating = 0
            }
            
            return {
              ...recipe,
              rating: Math.round(newRating * 10) / 10,
              ratingCount: newRatingCount,
              userRatings: recipe.userRatings.slice(0, -1)
            }
          } else {
            // Handle new rating
            const newRatingCount = recipe.ratingCount + 1
            const newRating = ((recipe.rating * recipe.ratingCount) + userRating) / newRatingCount
            
            return {
              ...recipe,
              rating: Math.round(newRating * 10) / 10,
              ratingCount: newRatingCount,
              userRatings: [...recipe.userRatings, userRating]
            }
          }
        }
        return recipe
      })
    )

    // Also update saved recipes if the recipe is saved
    setSavedRecipes(prevSaved => 
      prevSaved.map(recipe => {
        if (recipe.id === recipeId) {
          if (isRemoval) {
            // Handle rating removal
            const newRatingCount = Math.max(0, recipe.ratingCount - 1)
            let newRating = recipe.rating
            
            if (newRatingCount > 0) {
              const totalRating = recipe.rating * recipe.ratingCount
              newRating = totalRating / newRatingCount
            } else {
              newRating = 0
            }
            
            return {
              ...recipe,
              rating: Math.round(newRating * 10) / 10,
              ratingCount: newRatingCount,
              userRatings: recipe.userRatings.slice(0, -1)
            }
          } else {
            // Handle new rating
            const newRatingCount = recipe.ratingCount + 1
            const newRating = ((recipe.rating * recipe.ratingCount) + userRating) / newRatingCount
            
            return {
              ...recipe,
              rating: Math.round(newRating * 10) / 10,
              ratingCount: newRatingCount,
              userRatings: [...recipe.userRatings, userRating]
            }
          }
        }
        return recipe
      })
    )
  }



  return (
    <div className="app">
      <Navbar 
        onNavigation={handleNavigation} 
        currentView={currentView}
      />
      
      {currentView === 'home' ? (
        <>
          <header className="app-header">
            <h1>🍳 Smart Recipe Generator</h1>
            <p>Upload an image or add ingredients to discover delicious recipes</p>
          </header>

          <main className="app-main">
            <div className="left-panel">
              <ImageUpload 
                onImageUpload={handleImageUpload}
                uploadedImage={uploadedImage}
                isLoading={isLoading}
                onIngredientsDetected={handleIngredientsDetected}
              />
              
              <IngredientList
                ingredients={recognizedIngredients}
                onAddIngredient={handleIngredientAdd}
                onRemoveIngredient={handleIngredientRemove}
              />
              
              <DietaryFilters
                restrictions={dietaryRestrictions}
                onRestrictionsChange={setDietaryRestrictions}
              />
            </div>

            <div className="right-panel">
              {matchedRecipes.length > 0 ? (
                <RecipeDisplay
                  recipes={matchedRecipes}
                  selectedRecipe={selectedRecipe}
                  onRecipeSelect={setSelectedRecipe}
                  onSaveRecipe={handleSaveRecipe}
                  onRatingChange={handleRecipeRating}
                  savedRecipes={savedRecipes}
                />
              ) : selectedRecipe ? (
                <RecipeDisplay
                  recipes={[]}
                  selectedRecipe={selectedRecipe}
                  onRecipeSelect={setSelectedRecipe}
                  onSaveRecipe={handleSaveRecipe}
                  onRatingChange={handleRecipeRating}
                  savedRecipes={savedRecipes}
                />
              ) : (
                <div className="no-recipes">
                  <h3>No recipes found</h3>
                  <p>Try adding more ingredients or adjusting your dietary preferences</p>
                  {recognizedIngredients.length > 0 && (
                    <div className="no-recipes-help">
                      <p><strong>🔍 Current Search:</strong> Looking for recipes containing ALL of: {recognizedIngredients.join(', ')}</p>
                
                    </div>
                  )}
                  
                  {/* Offer AI suggestions above Top Rated */}
                  <AIRecipeSuggestions 
                    ingredients={recognizedIngredients}
                    dietaryRestrictions={dietaryRestrictions}
                    onSaveRecipe={handleSaveRecipe}
                    savedRecipes={savedRecipes}
                  />

                  {/* Show top rated recipes when no matches found */}
                  <TopRatedRecipes 
                    recipes={recipes}
                    dietaryRestrictions={dietaryRestrictions}
                    onSaveRecipe={handleSaveRecipe}
                    savedRecipes={savedRecipes}
                    onRecipeSelect={setSelectedRecipe}
                  />
                </div>
              )}
              
              {selectedRecipe && (
                <SubstitutionPanel recipe={selectedRecipe} />
              )}
              
              {matchedRecipes.length > 0 && (
                <AIRecipeSuggestions 
                  ingredients={recognizedIngredients}
                  dietaryRestrictions={dietaryRestrictions}
                  onSaveRecipe={handleSaveRecipe}
                  savedRecipes={savedRecipes}
                />
              )}
            </div>
          </main>
        </>
      ) : (
        <>
          <header className="app-header">
            <h1>📖 Saved Recipes</h1>
            <p>Your favorite recipes and culinary discoveries</p>
          </header>

          <main className="app-main">
            <SavedRecipes 
              savedRecipes={savedRecipes}
              onUnsaveRecipe={handleUnsaveRecipe}
              onRecipeSelect={setSelectedRecipe}
              selectedRecipe={selectedRecipe}
              onRatingChange={handleRecipeRating}
            />
          </main>
        </>
      )}
    </div>
  )
}

export default App  