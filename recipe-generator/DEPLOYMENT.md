# 🚀 Deployment Guide

This guide will help you deploy your Smart Recipe Generator to various free hosting platforms.

## 📋 Prerequisites

1. **Build the project**:
   ```bash
   npm run build
   ```
   This creates a `dist` folder with production-ready files.

2. **Ensure all files are committed** to your Git repository.

## 🌐 Free Hosting Options

### Option 1: Vercel (Recommended)

**Pros**: Easy deployment, automatic updates, great performance
**Cons**: Limited free tier for high-traffic sites

#### Steps:
1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect it's a Vite project
5. Click "Deploy"
6. Your site will be live in minutes!

#### Custom Domain:
- Go to your project dashboard
- Click "Settings" → "Domains"
- Add your custom domain

### Option 2: Netlify

**Pros**: Drag & drop deployment, form handling, great free tier
**Cons**: Slightly slower than Vercel

#### Steps:
1. Go to [netlify.com](https://netlify.com) and sign up
2. Drag and drop your `dist` folder to the deploy area
3. Your site is live instantly!
4. For automatic deployments, connect your GitHub repo

#### Custom Domain:
- Go to "Site settings" → "Domain management"
- Add your custom domain

### Option 3: GitHub Pages

**Pros**: Free, integrated with GitHub
**Cons**: Manual deployment process

#### Steps:
1. In your GitHub repository, go to "Settings"
2. Scroll to "Pages" section
3. Select "Deploy from a branch"
4. Choose `main` branch and `/docs` folder
5. Copy your `dist` folder contents to a `docs` folder in your repo
6. Push changes

### Option 4: Firebase Hosting

**Pros**: Google's infrastructure, great performance
**Cons**: Requires Google account, slightly more complex setup

#### Steps:
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Set public directory to `dist`
5. Deploy: `firebase deploy`

## 🔧 Build Configuration

### Environment Variables
Create a `.env` file for production settings:

```env
VITE_API_URL=your_api_endpoint
VITE_APP_NAME=Smart Recipe Generator
```

### Build Optimization
The default Vite build is already optimized, but you can customize `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable for production
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['axios', 'react-dropzone']
        }
      }
    }
  }
})
```

## 📱 Mobile Optimization

Your app is already mobile-responsive, but ensure:

1. **Viewport meta tag** is present in `index.html`
2. **Touch-friendly buttons** (minimum 44px)
3. **Fast loading** on mobile networks

## 🔍 SEO Optimization

### Meta Tags
Update `index.html` with proper meta tags:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Smart Recipe Generator - Find recipes based on your ingredients" />
  <meta name="keywords" content="recipes, cooking, ingredients, meal planning" />
  <meta name="author" content="Your Name" />
  <title>Smart Recipe Generator</title>
</head>
```

### Sitemap
Generate a sitemap for better SEO:

```bash
npm install sitemap
```

Create `scripts/generate-sitemap.js`:

```javascript
import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'

const sitemap = new SitemapStream({ hostname: 'https://yoursite.com' })

sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 })
sitemap.write({ url: '/recipes', changefreq: 'weekly', priority: 0.8 })

sitemap.end()

streamToPromise(sitemap).then(sm => {
  createWriteStream('./dist/sitemap.xml').write(sm.toString())
})
```

## 🚨 Troubleshooting

### Common Issues

1. **Build fails**:
   - Check for syntax errors in components
   - Ensure all dependencies are installed
   - Clear `node_modules` and reinstall

2. **Deployment fails**:
   - Verify `dist` folder exists
   - Check file permissions
   - Ensure build completed successfully

3. **Site not loading**:
   - Check deployment logs
   - Verify custom domain DNS settings
   - Clear browser cache

### Performance Issues

1. **Slow loading**:
   - Enable gzip compression on your hosting
   - Use CDN for static assets
   - Optimize images

2. **Large bundle size**:
   - Analyze with `npm run build -- --analyze`
   - Split code into smaller chunks
   - Use dynamic imports for heavy components

## 📊 Analytics

### Google Analytics
Add to your `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Performance Monitoring
- Use Lighthouse for performance audits
- Monitor Core Web Vitals
- Set up error tracking (Sentry, LogRocket)

## 🔄 Continuous Deployment

### GitHub Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🎯 Next Steps

After deployment:

1. **Test thoroughly** on different devices
2. **Set up monitoring** and analytics
3. **Optimize performance** based on real user data
4. **Plan scaling** strategies for growth

---

**Happy Deploying! 🚀**
