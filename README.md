# Thushshan Rameswaran - Resume Website

[![CI Pipeline](https://github.com/thushshan-rameswaran/resume-website/actions/workflows/ci.yml/badge.svg)](https://github.com/thushshan-rameswaran/resume-website/actions/workflows/ci.yml)
[![CD Pipeline](https://github.com/thushshan-rameswaran/resume-website/actions/workflows/cd.yml/badge.svg)](https://github.com/thushshan-rameswaran/resume-website/actions/workflows/cd.yml)
[![Website](https://img.shields.io/website?url=https%3A//thushshan-rameswaran.github.io/resume-website)](https://thushshan-rameswaran.github.io/resume-website)

A modern, responsive resume website for Thushshan Rameswaran - Business Analyst & Software Developer.

## 🌟 Features

- **Responsive Design**: Perfect viewing experience across all devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Hover effects, smooth scrolling, and dynamic content
- **Performance Optimized**: Fast loading times and optimized assets
- **SEO Friendly**: Proper meta tags and semantic HTML structure
- **Accessibility Compliant**: WCAG guidelines followed for inclusive design

## 🚀 Live Demo

Visit the live website: [https://thushshan-rameswaran.github.io/resume-website](https://thushshan-rameswaran.github.io/resume-website)

## 🛠️ Technologies Used

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox and Grid
- **JavaScript (ES6+)**: Interactive functionality and animations
- **Font Awesome**: Icons and visual elements
- **Google Fonts**: Typography (Inter font family)

### Development & Deployment
- **Node.js**: Development environment and build tools
- **GitHub Actions**: CI/CD pipeline automation
- **GitHub Pages**: Static site hosting
- **ESLint**: JavaScript linting and code quality
- **Stylelint**: CSS linting and formatting
- **HTML Validate**: HTML structure validation
- **Lighthouse**: Performance and accessibility auditing

## 📋 Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)
- Git

## 🏃‍♂️ Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/thushshan-rameswaran/resume-website.git
   cd resume-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Available Scripts

### Development
- `npm start` - Start development server with live reload
- `npm run lint` - Run all linting checks
- `npm run lint:fix` - Fix auto-fixable linting issues

### Testing
- `npm test` - Run all tests (HTML, CSS, JS, Lighthouse)
- `npm run test:html` - Validate HTML structure
- `npm run test:css` - Lint CSS files
- `npm run test:js` - Lint JavaScript files
- `npm run test:lighthouse` - Run Lighthouse performance audit

### Building
- `npm run build` - Build optimized production files
- `npm run clean` - Clean build directory
- `npm run preview` - Preview built files locally

### Deployment
- `npm run deploy` - Deploy to GitHub Pages
- `npm run security:audit` - Run security audit

## 🔄 CI/CD Pipeline

This project includes a comprehensive CI/CD pipeline with GitHub Actions:

### Continuous Integration (CI)
- **Code Quality**: ESLint, Stylelint, HTML validation
- **Security**: npm audit for vulnerability scanning
- **Performance**: Lighthouse audits for performance metrics
- **Accessibility**: Automated accessibility testing
- **Cross-browser**: Testing across Chrome, Firefox, and Edge
- **Build Verification**: Ensures code builds successfully

### Continuous Deployment (CD)
- **Automated Deployment**: Deploys to GitHub Pages on main branch push
- **Asset Optimization**: Minifies CSS and JavaScript
- **Post-deployment Testing**: Validates live website functionality
- **Performance Monitoring**: Lighthouse audits on live site

### Pipeline Triggers
- **Push to main**: Triggers full CI/CD pipeline
- **Pull Requests**: Runs CI checks only
- **Manual Dispatch**: Allows manual deployment

## 📁 Project Structure

```
resume-website/
├── .github/
│   └── workflows/
│       ├── ci.yml              # CI pipeline configuration
│       └── cd.yml              # CD pipeline configuration
├── dist/                       # Build output (auto-generated)
├── reports/                    # Test reports (auto-generated)
├── index.html                  # Main HTML file
├── style.css                   # Stylesheet
├── script.js                   # JavaScript functionality
├── package.json                # Dependencies and scripts
├── .eslintrc.json             # ESLint configuration
├── .stylelintrc.json          # Stylelint configuration
├── .htmlvalidate.json         # HTML validation rules
├── lighthouserc.js            # Lighthouse CI configuration
├── .gitignore                 # Git ignore rules
└── README.md                  # Project documentation
```

## 🎨 Customization

### Colors
The website uses CSS custom properties for easy theming:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #1e40af;
    --accent-color: #3b82f6;
    /* ... more variables */
}
```

### Content
Update personal information in `index.html`:
- Contact details
- Professional experience
- Education background
- Skills and certifications
- Project portfolio

## 📊 Performance Metrics

The website is optimized for:
- **Performance**: >90 Lighthouse score
- **Accessibility**: >90 Lighthouse score
- **Best Practices**: >90 Lighthouse score
- **SEO**: >90 Lighthouse score

## 🔒 Security

- Regular dependency audits via npm audit
- No sensitive data in repository
- Secure deployment practices
- HTTPS enforcement

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Thushshan Rameswaran**
- Email: thushshan123@gmail.com
- Phone: 647-809-3316
- LinkedIn: [thushshan-rameswaran](https://www.linkedin.com/in/thushshan-rameswaran/)
- Location: Toronto, ON

## 🙏 Acknowledgments

- University of Toronto for educational foundation
- Toronto Transit Commission for professional development opportunity
- Open source community for tools and inspiration

---

⭐ **Star this repository if you found it helpful!**
