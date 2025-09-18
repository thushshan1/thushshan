# Deployment Guide

This document provides step-by-step instructions for deploying your resume website to GitHub Pages with the CI/CD pipeline.

## 📋 Prerequisites

Before deploying, ensure you have:

1. ✅ GitHub account
2. ✅ Git installed locally
3. ✅ Node.js (v16+) and npm installed
4. ✅ Your resume website files ready

## 🚀 Initial Setup & Deployment

### Step 1: Create GitHub Repository

1. **Create a new repository on GitHub:**
   - Repository name: `resume-website` (or your preferred name)
   - Make it public (required for free GitHub Pages)
   - Don't initialize with README (we already have one)

2. **Note your repository URL:**
   ```
   https://github.com/YOUR_USERNAME/resume-website
   ```

### Step 2: Initialize Local Repository

```bash
# Navigate to your project directory
cd /path/to/your/resume-website

# Initialize Git repository
git init

# Add all files
git add .

# Make initial commit
git commit -m "Initial commit: Add resume website with CI/CD pipeline"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/resume-website.git

# Push to GitHub
git push -u origin main
```

### Step 3: Configure GitHub Pages

1. **Go to your GitHub repository**
2. **Click on "Settings" tab**
3. **Scroll down to "Pages" section**
4. **Under "Source", select "GitHub Actions"**
5. **Save the settings**

### Step 4: Enable GitHub Actions

1. **Go to "Actions" tab in your repository**
2. **If prompted, click "I understand my workflows, go ahead and enable them"**
3. **The CI/CD pipelines should start automatically**

## 🔄 How the CI/CD Pipeline Works

### Continuous Integration (CI) - `.github/workflows/ci.yml`

**Triggers:**
- Push to `main` or `develop` branches
- Pull requests to `main` branch

**What it does:**
1. **Code Quality Checks:**
   - Lints HTML, CSS, and JavaScript
   - Validates HTML structure
   - Checks for security vulnerabilities

2. **Build Testing:**
   - Creates production build
   - Tests build process
   - Uploads build artifacts

3. **Performance Testing:**
   - Runs Lighthouse performance audit
   - Tests accessibility compliance
   - Generates performance reports

4. **Cross-Browser Testing:**
   - Tests on Chrome, Firefox, and Edge
   - Takes screenshots for visual verification

### Continuous Deployment (CD) - `.github/workflows/cd.yml`

**Triggers:**
- Push to `main` branch only
- Manual workflow dispatch

**What it does:**
1. **Build Optimization:**
   - Minifies CSS and JavaScript
   - Optimizes HTML
   - Prepares production assets

2. **Deployment:**
   - Deploys to GitHub Pages
   - Updates live website automatically

3. **Post-Deployment:**
   - Tests live website accessibility
   - Runs Lighthouse audit on live site
   - Sends deployment notifications

## 🛠️ Local Development Workflow

### Making Changes

```bash
# Create a new branch for your changes
git checkout -b feature/update-content

# Make your changes to index.html, style.css, or script.js

# Test locally
npm start

# Run quality checks
npm run lint
npm test

# Commit your changes
git add .
git commit -m "Update: Describe your changes"

# Push to GitHub
git push origin feature/update-content
```

### Creating Pull Request

1. **Go to your GitHub repository**
2. **Click "Compare & pull request"**
3. **Add description of your changes**
4. **Create pull request**
5. **Wait for CI checks to pass**
6. **Merge to main branch**

### Automatic Deployment

Once merged to `main`:
1. ✅ CD pipeline triggers automatically
2. ✅ Website builds and optimizes
3. ✅ Deploys to GitHub Pages
4. ✅ Live site updates (usually within 2-3 minutes)

## 🌐 Accessing Your Website

After successful deployment:

- **Your website URL:** `https://YOUR_USERNAME.github.io/resume-website`
- **Custom domain:** You can configure a custom domain in repository settings

## 📊 Monitoring & Reports

### GitHub Actions Dashboard

- **View pipeline status:** Go to "Actions" tab in your repository
- **Check build logs:** Click on any workflow run
- **Download reports:** Artifacts section in completed runs

### Available Reports

1. **Lighthouse Performance Report**
   - Performance metrics
   - Accessibility scores
   - SEO analysis
   - Best practices audit

2. **Accessibility Report**
   - WCAG compliance check
   - Screen reader compatibility
   - Color contrast analysis

3. **Cross-Browser Screenshots**
   - Visual verification across browsers
   - Responsive design testing

## 🔧 Customizing the Pipeline

### Modifying CI/CD Behavior

**To change deployment branch:**
```yaml
# In .github/workflows/cd.yml
on:
  push:
    branches: [ your-branch-name ]  # Change from 'main'
```

**To add more browsers for testing:**
```yaml
# In .github/workflows/ci.yml
strategy:
  matrix:
    browser: [chrome, firefox, edge, safari]  # Add safari
```

**To modify performance thresholds:**
```javascript
// In lighthouserc.js
assertions: {
  'categories:performance': ['warn', { minScore: 0.9 }],  // Increase from 0.8
}
```

## 🚨 Troubleshooting

### Common Issues

**1. Pipeline Fails on First Run**
- **Solution:** Check if all dependencies are correctly specified in `package.json`
- **Check:** Ensure Node.js version compatibility

**2. GitHub Pages Not Updating**
- **Solution:** Verify Pages source is set to "GitHub Actions"
- **Wait:** Sometimes takes 5-10 minutes for changes to appear

**3. Build Fails**
- **Solution:** Run `npm run build` locally to test
- **Check:** Review error logs in Actions tab

**4. Lighthouse Scores Too Low**
- **Solution:** Optimize images, minify code, improve accessibility
- **Check:** Review Lighthouse report for specific recommendations

### Getting Help

**Check logs in this order:**
1. GitHub Actions workflow logs
2. Local terminal output when running `npm` commands
3. Browser developer console for runtime errors

**Useful Commands for Debugging:**
```bash
# Test build locally
npm run build

# Run all tests locally
npm test

# Check for linting issues
npm run lint

# Start local server to test
npm start
```

## 🔒 Security Considerations

### Repository Settings

1. **Enable branch protection:**
   - Require pull request reviews
   - Require status checks to pass
   - Restrict pushes to main branch

2. **Secrets management:**
   - Never commit sensitive data
   - Use GitHub Secrets for API keys if needed

3. **Dependency security:**
   - Regular `npm audit` runs in CI
   - Dependabot alerts enabled

## 📈 Performance Optimization

### Automatic Optimizations

The pipeline automatically:
- ✅ Minifies CSS and JavaScript
- ✅ Optimizes HTML structure
- ✅ Compresses assets
- ✅ Enables browser caching

### Manual Optimizations

For better performance:
1. **Optimize images** before committing
2. **Use WebP format** for images when possible
3. **Minimize external dependencies**
4. **Enable compression** in server settings

## 🎯 Next Steps

After successful deployment:

1. **Share your website URL** on LinkedIn and resume
2. **Monitor performance** regularly through reports
3. **Keep content updated** with new experiences
4. **Consider adding analytics** (Google Analytics)
5. **Add more sections** as your career grows

---

🎉 **Congratulations! Your resume website is now live with a professional CI/CD pipeline!**

For questions or issues, refer to the GitHub Actions documentation or create an issue in your repository.
