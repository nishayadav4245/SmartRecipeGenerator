## 🎬 Demo Video



[![Watch the video](https://img.youtube.com/vi/bf1H7X8f4L0/0.jpg)](https://youtu.be/bf1H7X8f4L0)


Languages: JavaScript (ES modules), JSX, CSS3
Framework: react@19.1.1, react-dom@19.1.1
Build tool: vite@^7.1.2 with @vitejs/plugin-react@^5.0.0
AI SDK: @google/generative-ai@^0.24.1 (uses VITE_GEMINI_API_KEY)
HTTP client: axios@^1.11.0
UI/UX libraries: lucide-react@^0.542.0, react-dropzone@^14.3.8
Linting: eslint@^9.33.0, @eslint/js@^9.33.0, eslint-plugin-react-hooks@^5.2.0, eslint-plugin-react-refresh@^0.4.20, globals@^16.3.0
NPM scripts: dev (vite), build (vite build), lint (eslint .), preview (vite preview)
Config files: vite.config.js (base "./", React plugin), eslint.config.js, package.json (type: "module")
HTML entry: index.html
App entry: src/main.jsx, src/App.jsx
Components: AIRecipeSuggestions.jsx, DietaryFilters.jsx, ImageUpload.jsx, IngredientList.jsx, Navbar.jsx, RecipeDisplay.jsx, RecipeRating.jsx, SavedRecipes.jsx, TopRatedRecipes.jsx, SubstitutionPanel.jsx
Styling: src/App.css, src/index.css, src/components/SavedRecipes.css
Data: src/data/recipes.js
Public assets: public/_redirects
Docs: README.md, AI_SETUP.md, DEPLOYMENT.md


Approach :

Frontend architecture: Build a single-page app with React 19 (hooks, functional components). Keep state co-located in App.jsx and pass narrowly scoped props to components (ImageUpload, DietaryFilters, RecipeDisplay, SavedRecipes, TopRatedRecipes).

Data model & matching: Store curated recipes in src/data/recipes.js. Implement an ingredient-overlap scoring function and dietary tag filters in App.jsx, returning ranked candidates.

AI integration (Gemini): Use @google/generative-ai with VITE_GEMINI_API_KEY to:

Generate recipes when no strong matches exist.
Optionally process uploaded images for ingredient detection. Add request timeouts, retries/backoff, and guardrails for token/size limits. Use axios for any future backend calls.
Image ingestion: Use react-dropzone for drag-and-drop; validate file type/size and show progress. Convert to base64 or Blob streams as required by Gemini Vision.

UI/UX: Use lucide-react icons and responsive CSS in App.css/index.css. Provide clear loading/empty/error states and optimistic interactions for save/rate flows.

Quality: Enforce ESLint (eslint.config.js) with React Hooks and Refresh plugins in CI. Run npm run lint on commit.

Build & deploy: Use Vite for fast dev (npm run dev) and production builds (npm run build). Keep vite.config.js base "./" for static hosts. Inject .env at build, deploy dist/ to Vercel/Netlify/GitHub Pages with public/_redirects as needed.
