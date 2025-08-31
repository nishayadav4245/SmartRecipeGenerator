# 🤖 AI Recipe Generation & Ingredient Detection Setup Guide

This guide will help you set up Google Gemini AI integration for both generating custom recipes and automatically detecting ingredients from uploaded images.

## 🚀 Quick Setup

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

**Note**: The free tier includes 15 requests per minute, which is perfect for personal use.

### 2. Configure Environment Variables

Create a `.env` file in the root directory of your project:

```bash
# .env
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

**Important**: 
- Replace `your_actual_api_key_here` with your actual API key
- Never commit this file to version control
- The `.env` file should already be in your `.gitignore`

### 3. Restart Development Server

```bash
npm run dev
```

## 🔧 How It Works

### AI-Powered Ingredient Detection

The AI ingredient detection feature automatically activates when:
- You upload an image to the app
- The image is processed using Google's Gemini Vision API
- AI analyzes the image and identifies visible food ingredients
- Detected ingredients are automatically added to your ingredient list

**What the AI can detect:**
- Raw ingredients (vegetables, fruits, meats, grains)
- Prepared ingredients (chopped, sliced, cooked items)
- Spices and seasonings (if clearly visible)
- Dairy products, eggs, and other food items

### When AI Recipes Are Generated

The AI recipe generation feature activates when:
- You have ingredients added to your list
- No recipes in the database match your ingredients
- You click the "Generate AI Recipes" button

### What the AI Creates

For each request, Gemini AI generates 3 unique recipes that:
- Use your available ingredients as main components
- Respect your dietary restrictions (vegetarian, vegan, gluten-free, etc.)
- Include complete cooking instructions
- Provide cooking time, difficulty, and serving information

### Ingredient Detection Response Format

The AI analyzes images and returns ingredients in this format:
```json
["tomato", "onion", "garlic", "olive oil", "basil"]
```

**Features:**
- Automatic ingredient identification from food images
- Standardized ingredient names for better recipe matching
- Duplicate removal and name normalization
- Fallback ingredients if AI analysis fails

### API Response Format

The AI generates recipes in this structured format:
```json
{
  "recipes": [
    {
      "name": "Recipe Name",
      "description": "Brief description",
      "ingredients": ["ingredient with quantity"],
      "instructions": ["step 1", "step 2", "step 3"],
      "cookingTime": "X minutes",
      "difficulty": "Easy/Medium/Hard",
      "servings": "X servings"
    }
  ]
}
```

## 🛠️ Troubleshooting

### Common Issues

1. **"Failed to generate recipe" error**
   - Check if your API key is correct
   - Verify the `.env` file is in the root directory
   - Ensure you've restarted the development server

2. **"AI analysis failed" error (ingredient detection)**
   - Check if your API key is correct
   - Verify the image format is supported (JPG, PNG, GIF, WebP)
   - Ensure the image clearly shows food ingredients
   - Try uploading a different image or retry the analysis

3. **"Invalid recipe format" error**
   - This is a fallback error when AI response parsing fails
   - The app will still show a basic recipe structure
   - Try generating again

4. **API rate limiting**
   - Free tier: 15 requests per minute
   - Wait a minute and try again
   - Consider upgrading for higher limits

### Environment Variable Issues

If the API key isn't being read:

1. **Check file location**: `.env` must be in the project root (same level as `package.json`)
2. **Check variable name**: Must start with `VITE_` for Vite to expose it
3. **Restart server**: Environment variables require a server restart

### Testing the Setup

1. **Test Ingredient Detection:**
   - Upload a clear image of food ingredients
   - Wait for AI analysis to complete
   - Verify detected ingredients appear in your list

2. **Test Recipe Generation:**
   - Add some ingredients to your list
   - Make sure no database recipes match (try unusual combinations)
   - Click "Generate AI Recipes"
   - You should see 3 AI-generated recipes appear

## 🔒 Security Notes

- **Never expose your API key** in client-side code
- **Use environment variables** for all sensitive data
- **Monitor API usage** to avoid unexpected charges
- **Consider API key rotation** for production use

## 📱 Production Deployment

When deploying to production:

1. Set environment variables on your hosting platform
2. Use the same variable name: `VITE_GEMINI_API_KEY`
3. Ensure your hosting service supports environment variables
4. Test the AI feature in production before going live

## 🎯 Best Practices

1. **Image Quality**: Use clear, well-lit images for better ingredient detection
2. **Ingredient Variety**: Add diverse ingredients for better AI recipes
3. **Dietary Restrictions**: Set preferences for more relevant suggestions
4. **API Management**: Monitor usage and set up alerts if needed
5. **User Experience**: Both AI features enhance the app significantly

## 🆘 Need Help?

- Check the [Google AI Studio documentation](https://ai.google.dev/docs)
- Review the main [README.md](README.md) for general setup
- Ensure all dependencies are installed: `npm install`
- Verify the build works: `npm run build`

---

**Happy cooking with AI! 🍳✨**
