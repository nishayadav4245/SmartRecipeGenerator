export const recipes = [
  {
    id: 1,
    name: "Classic Margherita Pizza",
    description: "A traditional Italian pizza with fresh mozzarella, basil, and tomato sauce",
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop",
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: "Medium",
    rating: 4.5,
    ratingCount: 127,
    userRatings: [],
    nutrition: {
      calories: 285,
      protein: 12,
      carbs: 35,
      fat: 12,
      fiber: 3,
      sugar: 4
    },
    ingredients: [
      { name: "pizza dough", amount: "1 lb", category: "gluten" },
      { name: "tomato sauce", amount: "1/2 cup", category: "vegetable" },
      { name: "mozzarella cheese", amount: "8 oz", category: "dairy" },
      { name: "fresh basil", amount: "1/4 cup", category: "herbs" },
      { name: "olive oil", amount: "2 tbsp", category: "oil" },
      { name: "salt", amount: "1 tsp", category: "spices" }
    ],
    instructions: [
      "Preheat oven to 450°F (230°C)",
      "Roll out pizza dough on a floured surface",
      "Spread tomato sauce evenly over dough",
      "Add mozzarella cheese",
      "Bake for 12-15 minutes until crust is golden",
      "Garnish with fresh basil and drizzle with olive oil"
    ],
    tags: ["Italian", "Pizza", "Vegetarian"],
    category: "Main Course"
  },
  {
    id: 2,
    name: "Chicken Stir Fry",
    description: "Quick and healthy stir-fried chicken with vegetables in a savory sauce",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    difficulty: "Easy",
    rating: 3.6,
    ratingCount: 97,
    userRatings: [],
    nutrition: {
      calories: 245,
      protein: 28,
      carbs: 8,
      fat: 12,
      fiber: 4,
      sugar: 3
    },
    ingredients: [
      { name: "chicken breast", amount: "1 lb", category: "meat" },
      { name: "broccoli", amount: "2 cups", category: "vegetable" },
      { name: "carrots", amount: "1 cup", category: "vegetable" },
      { name: "soy sauce", amount: "3 tbsp", category: "sauce" },
      { name: "garlic", amount: "3 cloves", category: "vegetable" },
      { name: "ginger", amount: "1 tbsp", category: "spices" },
      { name: "vegetable oil", amount: "2 tbsp", category: "oil" }
    ],
    instructions: [
      "Cut chicken into bite-sized pieces",
      "Heat oil in a wok or large pan",
      "Stir-fry chicken until golden brown",
      "Add vegetables and stir-fry for 3-4 minutes",
      "Add soy sauce, garlic, and ginger",
      "Cook for 2 more minutes and serve"
    ],
    tags: ["Asian", "Stir Fry", "Quick"],
    category: "Main Course"
  },
  {
    id: 3,
    name: "Vegetarian Pasta Primavera",
    description: "Fresh spring vegetables tossed with al dente pasta in a light cream sauce",
    image: "https://www.cookingclassy.com/wp-content/uploads/2018/09/pasta-primavera-2.jpg",
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    rating: 3.7,
    ratingCount: 133,
    userRatings: [],
    nutrition: {
      calories: 320,
      protein: 14,
      carbs: 45,
      fat: 12,
      fiber: 6,
      sugar: 5
    },
    ingredients: [
      { name: "pasta", amount: "1 lb", category: "gluten" },
      { name: "broccoli", amount: "2 cups", category: "vegetable" },
      { name: "carrots", amount: "1 cup", category: "vegetable" },
      { name: "zucchini", amount: "2 medium", category: "vegetable" },
      { name: "heavy cream", amount: "1 cup", category: "dairy" },
      { name: "parmesan cheese", amount: "1/2 cup", category: "dairy" },
      { name: "garlic", amount: "3 cloves", category: "vegetable" },
      { name: "olive oil", amount: "2 tbsp", category: "oil" }
    ],
    instructions: [
      "Cook pasta according to package directions",
      "Steam vegetables until tender-crisp",
      "Heat oil and sauté garlic",
      "Add cream and simmer for 5 minutes",
      "Toss with pasta and vegetables",
      "Sprinkle with parmesan cheese"
    ],
    tags: ["Italian", "Vegetarian", "Pasta"],
    category: "Main Course"
  },
  {
    id: 4,
    name: "Beef Tacos",
    description: "Flavorful ground beef tacos with fresh toppings and warm tortillas",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
    prepTime: 15,
    cookTime: 20,
    servings: 6,
    difficulty: "Easy",
    rating: 3.7,
    ratingCount: 65,
    userRatings: [],
    nutrition: {
      calories: 285,
      protein: 18,
      carbs: 25,
      fat: 14,
      fiber: 4,
      sugar: 2
    },
    ingredients: [
      { name: "ground beef", amount: "1 lb", category: "meat" },
      { name: "taco seasoning", amount: "1 packet", category: "spices" },
      { name: "tortillas", amount: "12", category: "gluten" },
      { name: "lettuce", amount: "2 cups", category: "vegetable" },
      { name: "tomatoes", amount: "2 medium", category: "vegetable" },
      { name: "cheese", amount: "1 cup", category: "dairy" },
      { name: "onion", amount: "1 medium", category: "vegetable" }
    ],
    instructions: [
      "Brown ground beef in a large skillet",
      "Add taco seasoning and water",
      "Simmer for 10 minutes",
      "Warm tortillas",
      "Assemble tacos with beef and toppings"
    ],
    tags: ["Mexican", "Tacos", "Quick"],
    category: "Main Course"
  },
  {
    id: 5,
    name: "Quinoa Buddha Bowl",
    description: "Nutritious bowl with quinoa, roasted vegetables, and tahini dressing",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: "Easy",
    rating: 4.2,
    ratingCount: 148,
    userRatings: [],
    nutrition: {
      calories: 385,
      protein: 16,
      carbs: 52,
      fat: 18,
      fiber: 12,
      sugar: 8
    },
    ingredients: [
      { name: "quinoa", amount: "1 cup", category: "grain" },
      { name: "sweet potato", amount: "2 medium", category: "vegetable" },
      { name: "chickpeas", amount: "1 can", category: "legume" },
      { name: "kale", amount: "4 cups", category: "vegetable" },
      { name: "tahini", amount: "3 tbsp", category: "sauce" },
      { name: "lemon", amount: "1", category: "fruit" },
      { name: "olive oil", amount: "2 tbsp", category: "oil" }
    ],
    instructions: [
      "Cook quinoa according to package directions",
      "Roast sweet potatoes and chickpeas",
      "Massage kale with olive oil",
      "Make tahini dressing with lemon",
      "Assemble bowls with all ingredients"
    ],
    tags: ["Healthy", "Vegan", "Bowl"],
    category: "Main Course"
  },
  {
    id: 6,
    name: "Pani Puri",
    description: "Hollow, crispy fried puris filled with a mixture of flavored water (pani), tamarind chutney, chaat masala, potato, onion and chickpeas.",
    image: "https://www.indianveggiedelight.com/wp-content/uploads/2022/11/pani-puri-featured.jpg",
    prepTime: 30,
    cookTime: 10,
    servings: 4,
    difficulty: "Medium",
    rating: 4.5,
    ratingCount: 156,
    userRatings: [],
    nutrition: {
      calories: 245,
      protein: 8,
      carbs: 35,
      fat: 10,
      fiber: 6,
      sugar: 4
    },
    ingredients: [
      { name: "puri", amount: "20-25", category: "gluten" },
      { name: "potatoes", amount: "2 medium", category: "vegetable" },
      { name: "chickpeas", amount: "1/2 cup", category: "legume" },
      { name: "tamarind chutney", amount: "1/4 cup", category: "sauce" },
      { name: "mint leaves", amount: "1/2 cup", category: "herbs" },
      { name: "coriander leaves", amount: "1/4 cup", category: "herbs" },
      { name: "green chilies", amount: "1-2", category: "vegetable" },
      { name: "roasted cumin powder", amount: "1 tsp", category: "spices" },
      { name: "black salt", amount: "1/2 tsp", category: "spices" }
    ],
    instructions: [
      "Boil and mash potatoes, and boil chickpeas.",
      "For the 'pani', blend mint leaves, coriander leaves, and green chilies with water. Add spices and chill.",
      "Crack a hole in the top of a puri, fill with potato and chickpeas.",
      "Pour in tamarind chutney and the spiced water.",
      "Serve immediately."
    ],
    tags: ["Indian", "Street Food", "Snack", "Vegan"],
    category: "Appetizer"
  },
  {
    id: 7,
    name: "Vada Pav",
    description: "A popular Mumbai street food consisting of a deep-fried potato dumpling (vada) placed inside a pav (bread bun) sliced almost in half through the middle.",
    image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/10/vada-pav-recipe.jpg",
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    rating: 4.5,
    ratingCount: 175,
    userRatings: [],
    nutrition: {
      calories: 325,
      protein: 12,
      carbs: 45,
      fat: 14,
      fiber: 5,
      sugar: 3
    },
    ingredients: [
      { name: "potatoes", amount: "3 large", category: "vegetable" },
      { name: "gram flour", amount: "1 cup", category: "gluten" },
      { name: "ginger-garlic paste", amount: "1 tbsp", category: "spices" },
      { name: "mustard seeds", amount: "1 tsp", category: "spices" },
      { name: "turmeric powder", amount: "1/2 tsp", category: "spices" },
      { name: "curry leaves", amount: "1 sprig", category: "herbs" },
      { name: "pav", amount: "4", category: "gluten" },
      { name: "green chutney", amount: "as needed", category: "sauce" },
      { name: "dry garlic chutney", amount: "as needed", category: "sauce" },
      { name: "oil", amount: "for frying", category: "oil" }
    ],
    instructions: [
      "Boil and mash potatoes. Sauté mustard seeds, curry leaves, ginger-garlic paste and turmeric, then add to the potatoes.",
      "Shape the mixture into small balls (vadas).",
      "Prepare a batter with gram flour, salt, and water.",
      "Dip the vadas in the batter and deep-fry until golden.",
      "Slice the pav, spread with chutneys, and place the vada inside."
    ],
    tags: ["Indian", "Street Food", "Mumbai", "Snack", "Vegetarian"],
    category: "Appetizer"
  },
  {
    id: 8,
    name: "Samosa",
    description: "A crispy, triangular pastry filled with a savory mixture of spiced potatoes and peas.",
    image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/12/samosa-recipe.jpg",
    prepTime: 30,
    cookTime: 20,
    servings: 6,
    difficulty: "Medium",
    rating: 4.8,
    ratingCount: 21,
    userRatings: [],
    nutrition: {
      calories: 285,
      protein: 8,
      carbs: 32,
      fat: 16,
      fiber: 4,
      sugar: 2
    },
    ingredients: [
      { name: "all-purpose flour", amount: "2 cups", category: "gluten" },
      { name: "potatoes", amount: "3 medium", category: "vegetable" },
      { name: "green peas", amount: "1/2 cup", category: "vegetable" },
      { name: "ginger-garlic paste", amount: "1 tbsp", category: "spices" },
      { name: "cumin seeds", amount: "1 tsp", category: "spices" },
      { name: "coriander powder", amount: "1 tsp", category: "spices" },
      { name: "garam masala", amount: "1/2 tsp", category: "spices" },
      { name: "oil", amount: "for frying", category: "oil" }
    ],
    instructions: [
      "Prepare a stiff dough with flour, salt, and a little oil. Let it rest.",
      "Boil potatoes and peas. Mash the potatoes lightly.",
      "Sauté spices and ginger-garlic paste. Add potatoes and peas, and season.",
      "Roll out small portions of dough, cut into a semi-circle, and fold into a cone.",
      "Fill with the potato mixture, seal the edges, and deep-fry until golden brown."
    ],
    tags: ["Indian", "Street Food", "Snack", "Vegetarian"],
    category: "Appetizer"
  },
  {
    id: 9,
    name: "Aloo Tikki Chaat",
    description: "Crispy potato patties (aloo tikki) topped with yogurt, chutneys, and spices.",
    image: "https://www.vegrecipesofindia.com/wp-content/uploads/2017/12/aloo-tikki-chaat-recipe-2.jpg",
    prepTime: 20,
    cookTime: 15,
    servings: 4,
    difficulty: "Easy",
    rating: 3.2,
    ratingCount: 72,
    userRatings: [],
    nutrition: {
      calories: 265,
      protein: 6,
      carbs: 38,
      fat: 12,
      fiber: 5,
      sugar: 4
    },
    ingredients: [
      { name: "potatoes", amount: "3 large", category: "vegetable" },
      { name: "corn flour", amount: "2 tbsp", category: "gluten" },
      { name: "cumin powder", amount: "1 tsp", category: "spices" },
      { name: "yogurt", amount: "1 cup", category: "dairy" },
      { name: "tamarind chutney", amount: "1/4 cup", category: "sauce" },
      { name: "green chutney", amount: "1/4 cup", category: "sauce" },
      { name: "chaat masala", amount: "1 tsp", category: "spices" },
      { name: "sev", amount: "1/4 cup", category: "garnish" }
    ],
    instructions: [
      "Boil, peel, and mash potatoes. Mix with corn flour, cumin powder, and salt.",
      "Shape into flat patties (tikkis) and shallow-fry until crispy and golden.",
      "Place the tikkis on a plate. Top with yogurt, tamarind chutney, and green chutney.",
      "Sprinkle with chaat masala and sev before serving."
    ],
    tags: ["Indian", "Chaat", "Street Food", "Vegetarian"],
    category: "Appetizer"
  },
  {
    id: 10,
    name: "Chole Bhature",
    description: "Spicy and tangy chickpea curry (chole) served with a large, fluffy fried bread (bhature).",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqgguTha_pZlLAq2MSrLennevo4Ly1kZo1T5EtgzZJp4j6NkBVk-Z9Bp9FpBC_661PaI4&usqp=CAU",
    prepTime: 60,
    cookTime: 30,
    servings: 4,
    difficulty: "Medium",
    rating: 3.5,
    ratingCount: 167,
    userRatings: [],
    nutrition: {
      calories: 425,
      protein: 18,
      carbs: 58,
      fat: 18,
      fiber: 12,
      sugar: 6
    },
    ingredients: [
      { name: "chickpeas", amount: "1 cup", category: "legume" },
      { name: "onion", amount: "1 large", category: "vegetable" },
      { name: "tomatoes", amount: "2 large", category: "vegetable" },
      { name: "ginger-garlic paste", amount: "1 tbsp", category: "spices" },
      { name: "chole masala", amount: "2 tbsp", category: "spices" },
      { name: "all-purpose flour", amount: "2 cups", category: "gluten" },
      { name: "semolina", amount: "2 tbsp", category: "grain" },
      { name: "yogurt", amount: "1/4 cup", category: "dairy" },
      { name: "baking soda", amount: "1/2 tsp", category: "spices" }
    ],
    instructions: [
      "Soak chickpeas overnight and boil until tender.",
      "Sauté onions, ginger-garlic paste, and tomatoes. Add chole masala and the boiled chickpeas. Simmer.",
      "For bhature, knead a soft dough with flour, semolina, yogurt, salt, sugar, and baking soda. Let it rest for 1-2 hours.",
      "Roll out portions of the dough into large, oval shapes.",
      "Deep-fry the bhature until they puff up and are golden brown.",
      "Serve chole hot with the bhature and pickled onions."
    ],
    tags: ["Indian", "Punjabi", "Street Food", "Vegetarian"],
    category: "Main Course"
  },
  {
    id: 11,
    name: "Dahi Vada",
    description: "Soft lentil fritters (vadas) soaked in creamy, sweet yogurt and topped with tangy chutneys and spices.",
    image: "https://ministryofcurry.com/wp-content/uploads/2016/08/Dahi-Vada-5.jpg",
    prepTime: 60,
    cookTime: 20,
    servings: 4,
    difficulty: "Medium",
    rating: 3.9,
    ratingCount: 203,
    userRatings: [],
    nutrition: {
      calories: 285,
      protein: 12,
      carbs: 42,
      fat: 8,
      fiber: 6,
      sugar: 8
    },
    ingredients: [
      { name: "urad dal", amount: "1 cup", category: "legume" },
      { name: "yogurt", amount: "2 cups", category: "dairy" },
      { name: "sugar", amount: "2 tbsp", category: "sugar" },
      { name: "roasted cumin powder", amount: "1 tsp", category: "spices" },
      { name: "red chili powder", amount: "1 tsp", category: "spices" },
      { name: "black salt", amount: "1/2 tsp", category: "spices" },
      { name: "tamarind chutney", amount: "as needed", category: "sauce" }
    ],
    instructions: [
      "Soak urad dal overnight. Grind into a smooth, fluffy paste.",
      "Shape the batter into small, flattened vadas and deep-fry until golden.",
      "Soak the fried vadas in warm water for 15-20 minutes, then gently squeeze out excess water.",
      "Whisk yogurt with sugar and a pinch of salt. Arrange the vadas in a dish and pour the yogurt over them.",
      "Garnish with tamarind chutney, roasted cumin powder, red chili powder, and black salt."
    ],
    tags: ["Indian", "Street Food", "Snack", "Vegetarian"],
    category: "Appetizer"
  },
  {
    id: 12,
    name: "Pav Bhaji",
    description: "A spicy vegetable mash (bhaji) served with buttered, soft bread rolls (pav).",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmUyYSWYcIh7o9f8WKkP28LYyJhPykjfAG957F_gYgEhS5S_jD5-uP7mIre-hTQ-D8svY&usqp=CAU",
    prepTime: 20,
    cookTime: 25,
    servings: 4,
    difficulty: "Easy",
    rating: 3.2,
    ratingCount: 74,
    userRatings: [],
    nutrition: {
      calories: 345,
      protein: 10,
      carbs: 48,
      fat: 14,
      fiber: 8,
      sugar: 6
    },
    ingredients: [
      { name: "mixed vegetables", amount: "2 cups", category: "vegetable" },
      { name: "onion", amount: "1 large", category: "vegetable" },
      { name: "tomatoes", amount: "2 large", category: "vegetable" },
      { name: "pav bhaji masala", amount: "2 tbsp", category: "spices" },
      { name: "butter", amount: "4 tbsp", category: "dairy" },
      { name: "pav", amount: "8", category: "gluten" },
      { name: "lemon", amount: "1", category: "fruit" }
    ],
    instructions: [
      "Boil and mash the mixed vegetables.",
      "Sauté chopped onion and tomatoes in butter. Add pav bhaji masala and the mashed vegetables. Mash further to a thick consistency.",
      "Add more butter and cook for a few more minutes.",
      "Slice pav and toast on a hot pan with a generous amount of butter.",
      "Serve the bhaji hot with the buttered pav, a squeeze of lemon, and chopped onion."
    ],
    tags: ["Indian", "Mumbai", "Street Food", "Vegetarian"],
    category: "Main Course"
  },
  {
    id: 13,
    name: "Bhel Puri",
    description: "A savory snack made of puffed rice, vegetables, and a tangy tamarind sauce.",
    image: "https://www.indianveggiedelight.com/wp-content/uploads/2017/03/bhel-puri-featured.jpg",
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    rating: 3.7,
    ratingCount: 42,
    userRatings: [],
    nutrition: {
      calories: 185,
      protein: 6,
      carbs: 28,
      fat: 6,
      fiber: 4,
      sugar: 5
    },
    ingredients: [
      { name: "puffed rice", amount: "2 cups", category: "grain" },
      { name: "sev", amount: "1/4 cup", category: "garnish" },
      { name: "onion", amount: "1/4 cup", category: "vegetable" },
      { name: "tomatoes", amount: "1/4 cup", category: "vegetable" },
      { name: "boiled potatoes", amount: "1/4 cup", category: "vegetable" },
      { name: "tamarind chutney", amount: "2 tbsp", category: "sauce" },
      { name: "green chutney", amount: "2 tbsp", category: "sauce" },
      { name: "chaat masala", amount: "1 tsp", category: "spices" }
    ],
    instructions: [
      "In a large bowl, combine puffed rice, finely chopped onion, tomatoes, and boiled potatoes.",
      "Add tamarind and green chutneys, and chaat masala.",
      "Mix well and top with sev.",
      "Serve immediately to prevent the puffed rice from becoming soggy."
    ],
    tags: ["Indian", "Street Food", "Snack", "Vegetarian"],
    category: "Appetizer"
  },
  {
    id: 14,
    name: "Misal Pav",
    description: "A spicy curry made from sprouted lentils and topped with crunchy farsan, onions, and coriander, served with pav.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQQigUlfbb48GHHuMQiK5_LVRNBjpyxSwAXHy4tS1vgPxlwbGGQGF0U6BfLJfVAXairOE&usqp=CAU",
    prepTime: 20,
    cookTime: 30,
    servings: 4,
    difficulty: "Medium",
    rating: 4.5,
    ratingCount: 37,
    userRatings: [],
    nutrition: {
      calories: 385,
      protein: 16,
      carbs: 52,
      fat: 14,
      fiber: 10,
      sugar: 4
    },
    ingredients: [
      { name: "moth beans", amount: "1 cup", category: "legume" },
      { name: "onion", amount: "1 large", category: "vegetable" },
      { name: "garlic", amount: "4 cloves", category: "vegetable" },
      { name: "ginger", amount: "1 inch", category: "spices" },
      { name: "misal masala", amount: "2 tbsp", category: "spices" },
      { name: "pav (buns)", amount: "4", category: "gluten" },
      { name: "farsan", amount: "1/2 cup", category: "garnish" },
      { name: "lemon", amount: "1", category: "fruit" }
    ],
    instructions: [
      "Soak and sprout moth beans. Boil until soft.",
      "Sauté onion, ginger, and garlic. Add misal masala and cook.",
      "Add the boiled moth beans and water to make a thin, spicy curry (tarri).",
      "To serve, place a portion of farsan in a bowl, pour misal over it, and top with chopped onion and coriander.",
      "Serve with pav and a lemon wedge."
    ],
    tags: ["Indian", "Maharashtrian", "Street Food", "Vegetarian"],
    category: "Main Course"
  },
  {
    id: 15,
    name: "Momos",
    description: "Steamed or fried dumplings filled with a savory mixture of minced vegetables or meat, served with a spicy dipping sauce.",
    image: "https://butfirstchai.com/wp-content/uploads/2022/08/beef-momos-recipe.jpg",
    prepTime: 45,
    cookTime: 15,
    servings: 4,
    difficulty: "Medium",
    rating: 3.6,
    ratingCount: 38,
    userRatings: [],
    nutrition: {
      calories: 265,
      protein: 12,
      carbs: 38,
      fat: 8,
      fiber: 4,
      sugar: 2
    },
    ingredients: [
      { name: "all-purpose flour", amount: "2 cups", category: "gluten" },
      { name: "cabbage", amount: "1 cup", category: "vegetable" },
      { name: "carrot", amount: "1/2 cup", category: "vegetable" },
      { name: "onion", amount: "1/2 cup", category: "vegetable" },
      { name: "ginger", amount: "1 tbsp", category: "spices" },
      { name: "garlic", amount: "1 tbsp", category: "spices" },
      { name: "soy sauce", amount: "1 tbsp", category: "sauce" }
    ],
    instructions: [
      "Knead a firm dough with flour, salt, and water. Let it rest.",
      "Finely chop or grate all vegetables. Squeeze out excess water.",
      "Mix vegetables with ginger, garlic, soy sauce, and a pinch of salt and pepper.",
      "Roll out small, thin circles of dough. Place a spoonful of filling in the center and pleat the edges to form a momo.",
      "Steam in a steamer for 10-15 minutes.",
      "Serve hot with momo chutney."
    ],
    tags: ["Indian", "Street Food", "Tibetan", "Snack"],
    category: "Appetizer"
  },
  {
    id: 16,
    name: "Kathi Roll",
    description: "A street food from Kolkata, a skewer-roasted kebab (chicken or paneer) wrapped in a paratha with onions and sauces.",
    image: "https://www.sharmispassions.com/wp-content/uploads/2020/12/6465386163_d83aa96fdb_z-420x270.jpg",
    prepTime: 25,
    cookTime: 20,
    servings: 2,
    difficulty: "Medium",
    rating: 5.0,
    ratingCount: 166,
    userRatings: [],
    nutrition: {
      calories: 425,
      protein: 22,
      carbs: 45,
      fat: 18,
      fiber: 6,
      sugar: 4
    },
    ingredients: [
      { name: "boneless chicken or paneer", amount: "1/2 lb", category: "meat" },
      { name: "all-purpose flour (for paratha)", amount: "1 cup", category: "gluten" },
      { name: "yogurt", amount: "1/4 cup", category: "dairy" },
      { name: "ginger-garlic paste", amount: "1 tbsp", category: "spices" },
      { name: "tandoori masala", amount: "1 tbsp", category: "spices" },
      { name: "onion", amount: "1/2 medium", category: "vegetable" },
      { name: "green chutney", amount: "as needed", category: "sauce" }
    ],
    instructions: [
      "Marinate chicken/paneer in yogurt, ginger-garlic paste, and tandoori masala. Grill or pan-fry until cooked.",
      "Prepare a soft dough for paratha and roll it out.",
      "Cook the paratha on a tawa with oil or ghee until golden and flaky.",
      "Place the cooked chicken/paneer, sliced onions, and a drizzle of green chutney on the paratha. Roll tightly.",
      "Wrap in foil or paper and serve."
    ],
    tags: ["Indian", "Kolkata", "Street Food", "Non-Vegetarian", "Vegetarian"],
    category: "Main Course"
  },
  {
    id: 17,
    name: "Masala Chai",
    description: "A spiced milk tea, a quintessential street-side beverage in India.",
    image: "https://masalaandchai.com/wp-content/uploads/2021/07/Masala-Chai-Featured.jpg",
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    rating: 4.4,
    ratingCount: 24,
    userRatings: [],
    nutrition: {
      calories: 85,
      protein: 4,
      carbs: 12,
      fat: 3,
      fiber: 0,
      sugar: 10
    },
    ingredients: [
      { name: "water", amount: "1 cup", category: "liquid" },
      { name: "milk", amount: "1 cup", category: "dairy" },
      { name: "black tea leaves", amount: "2 tsp", category: "other" },
      { name: "ginger", amount: "1/2 inch", category: "spices" },
      { name: "cardamom pods", amount: "2", category: "spices" },
      { name: "cinnamon stick", amount: "1 small", category: "spices" },
      { name: "sugar", amount: "2 tbsp", category: "sugar" }
    ],
    instructions: [
      "In a saucepan, bring water to a boil. Crush ginger, cardamom, and cinnamon and add to the water.",
      "Add tea leaves and simmer for 2-3 minutes.",
      "Add milk and sugar. Bring to a boil and then simmer for another 2-3 minutes, stirring occasionally.",
      "Strain the chai into cups and serve hot."
    ],
    tags: ["Indian", "Beverage", "Street Food", "Drink"],
    category: "Drink"
  },
  {
    id: 18,
    name: "Lassi",
    description: "A creamy, yogurt-based drink, often sweetened and flavored with fruits or spices.",
    image: "https://www.indianveggiedelight.com/wp-content/uploads/2023/01/sweet-lassi-recipe-featured.jpg",
    prepTime: 5,
    cookTime: 0,
    servings: 2,
    difficulty: "Easy",
    rating: 3.1,
    ratingCount: 19,
    userRatings: [],
    nutrition: {
      calories: 145,
      protein: 6,
      carbs: 18,
      fat: 6,
      fiber: 0,
      sugar: 16
    },
    ingredients: [
      { name: "yogurt", amount: "1.5 cups", category: "dairy" },
      { name: "milk", amount: "1/2 cup", category: "dairy" },
      { name: "sugar", amount: "3-4 tbsp", category: "sugar" },
      { name: "cardamom powder", amount: "1/4 tsp", category: "spices" },
      { name: "ice cubes", amount: "as needed", category: "other" }
    ],
    instructions: [
      "In a blender, combine yogurt, milk, sugar, and cardamom powder.",
      "Blend until smooth and frothy.",
      "Add ice cubes and blend for a few more seconds.",
      "Serve chilled in tall glasses."
    ],
    tags: ["Indian", "Beverage", "Street Food", "Drink"],
    category: "Drink"
  },
  {
    id: 19,
    name: "Idli Sambhar",
    description: "Soft, fluffy steamed rice cakes (idlis) served with a tangy lentil and vegetable stew (sambhar).",
    image: "https://shwetainthekitchen.com/wp-content/uploads/2022/01/Idli-Sambar.jpg",
    prepTime: 240,
    cookTime: 30,
    servings: 4,
    difficulty: "Medium",
    rating: 4.7,
    ratingCount: 43,
    userRatings: [],
    nutrition: {
      calories: 285,
      protein: 14,
      carbs: 48,
      fat: 6,
      fiber: 8,
      sugar: 3
    },
    ingredients: [
      { name: "idli batter", amount: "2 cups", category: "gluten" },
      { name: "toor dal", amount: "1 cup", category: "legume" },
      { name: "mixed vegetables", amount: "1 cup", category: "vegetable" },
      { name: "sambhar powder", amount: "2 tbsp", category: "spices" },
      { name: "tamarind paste", amount: "1 tbsp", category: "sauce" }
    ],
    instructions: [
      "Steam the idli batter in an idli stand for 10-15 minutes.",
      "Cook toor dal with vegetables until tender. Add sambhar powder and tamarind paste.",
      "Prepare a tempering of mustard seeds, asafoetida, and curry leaves and add to the sambhar.",
      "Serve hot idlis with sambhar and coconut chutney."
    ],
    tags: ["Indian", "South Indian", "Street Food", "Breakfast", "Vegetarian"],
    category: "Main Course"
  },
  {
    id: 20,
    name: "Poha",
    description: "Flattened rice flakes (poha) cooked with onions, potatoes, and spices, a popular breakfast and snack.",
    image: "https://www.spiceupthecurry.com/wp-content/uploads/2014/04/batata-poha-recipe-1-500x500.jpg",
    prepTime: 10,
    cookTime: 10,
    servings: 2,
    difficulty: "Easy",
    rating: 4.9,
    ratingCount: 84,
    userRatings: [],
    nutrition: {
      calories: 225,
      protein: 8,
      carbs: 42,
      fat: 4,
      fiber: 6,
      sugar: 2
    },
    ingredients: [
      { name: "flattened rice (poha)", amount: "1.5 cups", category: "grain" },
      { name: "onion", amount: "1 medium", category: "vegetable" },
      { name: "potatoes", amount: "1 medium", category: "vegetable" },
      { name: "mustard seeds", amount: "1 tsp", category: "spices" },
      { name: "turmeric powder", amount: "1/2 tsp", category: "spices" },
      { name: "curry leaves", amount: "1 sprig", category: "herbs" },
      { name: "roasted peanuts", amount: "1/4 cup", category: "nut" }
    ],
    instructions: [
      "Rinse the poha and drain. It should be soft but not mushy.",
      "In a pan, heat oil and add mustard seeds, curry leaves, and peanuts. Let them splutter.",
      "Add chopped onion and potato, and sauté until soft.",
      "Add turmeric and salt, then add the soaked poha. Mix gently.",
      "Garnish with fresh coriander and a squeeze of lemon."
    ],
    tags: ["Indian", "Maharashtrian", "Breakfast", "Snack", "Vegetarian"],
    category: "Breakfast"
  }
];