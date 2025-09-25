# Professional Resume Website

A modern, responsive resume website built with HTML, CSS, and JavaScript, featuring EmailJS integration for contact form functionality.

## Features

- 🎨 Modern, responsive design with dark/light mode
- 📧 Working contact form with EmailJS integration
- 🔒 Secure deployment with GitHub Actions and secret injection
- ♿ Accessibility compliant with ARIA labels and screen reader support
- 📱 Mobile-first responsive design
- ⚡ Optimized performance with debounced scroll handlers

## Setup Instructions

### 1. Fork and Clone
```bash
git clone https://github.com/your-username/resume-website.git
cd resume-website
```

### 2. EmailJS Configuration
1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Set up an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{subject}}`
   - `{{message}}`

### 3. GitHub Secrets Setup
Add these secrets to your GitHub repository:
- `EMAILJS_SERVICE_ID`: Your EmailJS service ID
- `EMAILJS_TEMPLATE_ID`: Your EmailJS template ID  
- `EMAILJS_PUBLIC_KEY`: Your EmailJS public key

**To add secrets:**
1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with the exact names above

### 4. Local Development
```bash
# Install dependencies
npm install

# Start local server
npm run dev
```

### 5. Deployment
The site automatically deploys to GitHub Pages when you push to the `main` branch. GitHub Actions will:
1. Read your secrets
2. Inject them into the code
3. Deploy the secure version

## Customization

### Personal Information
Update the following files with your information:
- `index.html`: Personal details, experience, education, projects
- `style.css`: Colors, fonts, styling
- `script.js`: Additional functionality

### Contact Form
The contact form is pre-configured to work with EmailJS. Make sure your EmailJS template matches the variable names in the code.

## Security Features

- ✅ No hardcoded credentials in the repository
- ✅ Secrets injected during deployment via GitHub Actions
- ✅ Environment variables for local development
- ✅ `.env` file excluded from version control

## Technologies Used

- HTML5
- CSS3 (with CSS Variables)
- Vanilla JavaScript
- EmailJS
- GitHub Actions
- GitHub Pages

## License

MIT License - feel free to use this template for your own resume website!

## Support

If you encounter any issues, please check:
1. EmailJS configuration
2. GitHub Secrets setup
3. GitHub Actions workflow logs

---

Built with ❤️ by Thushshan Rameswaran