# 🍳 Smart Recipe Generator

A React-based web application that intelligently generates recipe suggestions based on available ingredients, with support for dietary restrictions and ingredient substitutions.

## ✨ Features

### Core Functionality
- **AI-Powered Ingredient Detection**: Upload images to automatically detect ingredients using Google's Gemini Vision API
- **Recipe Matching Algorithm**: Smart matching based on ingredient overlap and compatibility
- **AI Recipe Generation**: Google Gemini AI creates custom recipes when no matches are found
- **Substitution Suggestions**: Get alternative ingredients for dietary needs or missing items
- **Dietary Restrictions**: Filter recipes by vegetarian, vegan, gluten-free, dairy-free, and more
**Save and rate recipes**: The App.jsx file already includes the core functionality for saving and rating recipes, which is well-integrated into the application's state management. The save and rate features are implemented via state variables and functions that are passed down to the components responsible for displaying and interacting with recipes.


### Recipe Database
- **20+ Recipes**: Diverse collection covering various cuisines and skill levels
- **Detailed Information**: Complete ingredients, instructions, cooking times, and difficulty levels
- **Smart Categorization**: Organized by dietary preferences and cooking methods

### User Experience
- **Mobile Responsive**: Optimized for all device sizes
- **Drag & Drop**: Easy image upload interface
- **Interactive UI**: Modern, intuitive design with smooth animations
- **Quick Add**: Pre-populated common ingredients for easy selection

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### AI Features Setup
The app includes Google Gemini AI integration for both ingredient detection and recipe generation.

1. **Get a Gemini API Key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Create a new API key (free tier available)

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```bash
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Restart the Development Server**:
   ```bash
   npm run dev
   ```

**Note**: The same API key is used for both ingredient detection and recipe generation.

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd recipe-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## 🎯 How to Use

### 1. Upload Ingredients
- **AI Image Analysis**: Drag and drop or click to upload food images - AI automatically detects ingredients
- **Manual Entry**: Type ingredients manually or use quick-add buttons
- **Ingredient Management**: Add/remove ingredients as needed

### 2. Set Dietary Preferences
- Select from available dietary restrictions:
  - Vegetarian
  - Vegan
  - Gluten-Free
  - Dairy-Free
  - Low-Carb
  - Keto

### 3. Discover Recipes
- View recipe matches with compatibility scores
- Browse detailed recipe information
- Select recipes to see full instructions

### 4. Get Substitutions
- View ingredient substitution suggestions
- Learn about dietary alternatives
- Get cooking tips and advice

### 5. AI Recipe Generation
- When no recipes match your ingredients, click "Generate AI Recipes"
- Get 3 custom recipes created by Google Gemini AI
- Recipes respect your dietary restrictions and use available ingredients
- Each AI recipe includes complete ingredients, instructions, and cooking details

## 🏗️ Technical Architecture

### Frontend Framework
- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **CSS3**: Custom styling with responsive design

### Key Libraries
- **react-dropzone**: Drag and drop file uploads
- **lucide-react**: Beautiful, customizable icons
- **@google/generative-ai**: Google Gemini AI integration for recipe generation
- **axios**: HTTP client for API calls (ready for backend integration)

### Component Structure
```
src/
├── components/
│   ├── ImageUpload.jsx      # Image upload and recognition
│   ├── IngredientList.jsx   # Ingredient management
│   ├── DietaryFilters.jsx   # Dietary preference selection
│   ├── RecipeDisplay.jsx    # Recipe listing and details
│   ├── SubstitutionPanel.jsx # Ingredient substitutions
│   └── AIRecipeSuggestions.jsx # AI-powered recipe generation
├── data/
│   └── recipes.js           # Recipe database
├── App.jsx                  # Main application component
└── App.css                  # Comprehensive styling
```

## 🔧 Customization

### Adding New Recipes
Edit `src/data/recipes.js` to add new recipes:

```javascript
{
  id: 21,
  name: "Your Recipe Name",
  description: "Recipe description",
  prepTime: 15,
  cookTime: 30,
  servings: 4,
  difficulty: "Easy",
  ingredients: [
    { name: "ingredient", amount: "1 cup", category: "category" }
  ],
  instructions: ["Step 1", "Step 2"],
  tags: ["tag1", "tag2"],
  category: "Main Course"
}
```

### Modifying Dietary Filters
Update the `dietaryOptions` array in `DietaryFilters.jsx`:

```javascript
const dietaryOptions = [
  { id: 'new-filter', label: 'New Filter', icon: IconComponent, color: '#hexcode' }
]
```

### Styling Changes
Modify `App.css` to customize colors, layouts, and animations.

## 🌐 Deployment

### Free Hosting Options
- **Vercel**: Easy deployment with Git integration
- **Netlify**: Drag and drop deployment
- **GitHub Pages**: Free hosting for public repositories
- **Firebase Hosting**: Google's hosting solution

### Deployment Steps
1. Build the project: `npm run build`
2. Upload the `dist` folder to your hosting service
3. Configure custom domain if desired

## 🔮 Future Enhancements

### Planned Features
- **Real AI Integration**: Connect to Google gemini API key for actual ingredient recognition
- **User Accounts**: Save favorite recipes and preferences
- **Recipe Sharing**: Social features for recipe sharing
- **Nutritional Information**: Calorie and macro tracking
- **Shopping Lists**: Generate shopping lists from selected recipes

### API Integration
- **Recipe APIs**: Spoonacular, Edamam, or similar services
- **Image Recognition**: Google Cloud Vision, AWS Rekognition
- **Nutrition Data**: USDA Food Database API

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For questions or issues:
- Create an issue in the repository
- Check the documentation
- Review the code comments

---

**Built with ❤️ using React and Vite**
