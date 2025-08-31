# 🍳 Smart Recipe Generator

AI-powered recipe generator that suggests meals based on ingredients you have. Built with **React 19 + Vite** and integrated with **Google Gemini AI** for intelligent recipe generation.

---

## 🎬 Demo Video

[![Watch the video](https://img.youtube.com/vi/bf1H7X8f4L0/0.jpg)](https://youtu.be/bf1H7X8f4L0)

---

## 🚀 Tech Stack

**Languages & Frameworks**
- JavaScript (ES modules)
- JSX, CSS3
- React 19.1.1 + React DOM 19.1.1
- Vite 7.1.2 with @vitejs/plugin-react

**AI SDK**
- [@google/generative-ai@^0.24.1](https://www.npmjs.com/package/@google/generative-ai)  
  Uses **VITE_GEMINI_API_KEY**

**HTTP Client**
- axios@^1.11.0

**UI/UX**
- lucide-react@^0.542.0 (icons)
- react-dropzone@^14.3.8 (file uploads)

**Quality & Linting**
- eslint@^9.33.0
- @eslint/js@^9.33.0
- eslint-plugin-react-hooks@^5.2.0
- eslint-plugin-react-refresh@^0.4.20
- globals@^16.3.0

---

## ⚡ NPM Scripts

- `npm run dev` → Start dev server (Vite)  
- `npm run build` → Build for production  
- `npm run preview` → Preview production build  
- `npm run lint` → Run ESLint checks  

---

## 🧩 Approach

### 🎨 Frontend Architecture
- **Single-page React app** with hooks + functional components  
- State managed in `App.jsx`  
- Narrowly scoped props passed to child components  

### 🥗 Data Model & Matching
- Recipes stored in `src/data/recipes.js`  
- Ingredient-overlap scoring function  
- Dietary tag filters (vegetarian, vegan, gluten-free, etc.)  

### 🤖 AI Integration (Gemini)
- Uses `@google/generative-ai` with `VITE_GEMINI_API_KEY`  
- Generates new recipes when no strong matches exist  
- Can process uploaded images for ingredient detection  
- Implements **timeouts, retries, backoff, and guardrails**  

### 📸 Image Ingestion
- Drag-and-drop via `react-dropzone`  
- Validates file type/size  
- Converts to Base64/Blob streams for Gemini Vision  

### 🖼️ UI/UX
- Clean and responsive design with **lucide-react** icons  
- Clear **loading, empty, and error states**  
- Optimistic UI for save/rating interactions  

### ✅ Quality
- Enforced ESLint rules (`eslint.config.js`)  
- React Hooks + Refresh plugins  
- `npm run lint` before commits  

### 🌍 Build & Deploy
- Vite for blazing-fast dev and builds  
- Configured for static hosts (`vite.config.js` with base `"./"`)  
- Deployable to **Vercel, Netlify, or GitHub Pages**  
- `public/_redirects` for SPA routing support  

---

## 📖 Docs

- [AI Setup Guide](./AI_SETUP.md)  
- [Deployment Guide](./DEPLOYMENT.md)  

---

## ✨ Highlights
✔ Ingredient-based recipe matching  
✔ Gemini AI fallback for creative recipes  
✔ Image upload support  
✔ Save and rate recipes  
✔ Responsive, modern UI  

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---

## 📜 License

MIT License © 2025 [Nisha Yadav](https://github.com/nishayadav4245)
