// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Consolidated scroll handler for better performance
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // Navbar background on scroll (class-based to respect themes)
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Update scroll progress
    updateScrollProgress();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .education-card, .stat, .achievement-card');
    animateElements.forEach(el => observer.observe(el));
    
    // Resume download analytics (track downloads)
    const downloadBtn = document.querySelector('.btn-download');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Track download event for analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'download', {
                    'event_category': 'Resume',
                    'event_label': 'PDF Download'
                });
            }
            showNotification('Resume download started! Thank you for your interest.', 'success');
        });
    }
    
    // Enhanced profile photo functionality
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.addEventListener('click', function() {
            showNotification('Click here to upload your professional photo!', 'info');
        });
    }
});

// Contact form handling with EmailJS
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        const honeypot = formData.get('_hp');

        // Honeypot spam check
        if (honeypot) {
            showNotification('Submission blocked. Please try again.', 'error');
            return;
        }

        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }

        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // EmailJS configuration placeholders
        const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
        const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
        const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

        // Ensure EmailJS is initialized
        try {
            if (window.emailjs && typeof emailjs.init === 'function') {
                emailjs.init(EMAILJS_PUBLIC_KEY);
            }
        } catch (err) {
            // ignore if already initialized
        }

        // Debug logging
        console.log('🔍 DEBUG: EmailJS configuration:');
        console.log('EMAILJS_SERVICE_ID:', EMAILJS_SERVICE_ID);
        console.log('EMAILJS_TEMPLATE_ID:', EMAILJS_TEMPLATE_ID);
        console.log('EMAILJS_PUBLIC_KEY:', EMAILJS_PUBLIC_KEY);
        console.log('🔍 DEBUG: EmailJS available:', !!window.emailjs);
        console.log('🔍 DEBUG: emailjs.send function available:', !!(window.emailjs && typeof emailjs.send === 'function'));
        console.log('🔍 DEBUG: Data being sent:', {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        });

        // Send email via EmailJS
        if (window.emailjs && typeof emailjs.send === 'function') {
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message
            }).then(() => {
                console.log('🔍 DEBUG: EmailJS send successful!');
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                this.reset();
            }).catch((error) => {
                console.error('🔍 DEBUG: EmailJS error details:', error);
                console.error('🔍 DEBUG: Error status:', error.status);
                console.error('🔍 DEBUG: Error text:', error.text);
                showNotification('Failed to send message. Please try again later.', 'error');
            }).finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        } else {
            console.error('🔍 DEBUG: EmailJS not available or send function missing');
            showNotification('Email service is unavailable. Please try again later.', 'error');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    // Create notification content safely to prevent XSS
    const notificationContent = document.createElement('div');
    notificationContent.className = 'notification-content';
    
    const messageSpan = document.createElement('span');
    messageSpan.textContent = message; // Use textContent to prevent XSS
    
    const closeButton = document.createElement('button');
    closeButton.className = 'notification-close';
    closeButton.textContent = '×';
    closeButton.setAttribute('aria-label', 'Close notification');
    
    notificationContent.appendChild(messageSpan);
    notificationContent.appendChild(closeButton);
    notification.appendChild(notificationContent);

    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);

    // Close button functionality
    closeButton.addEventListener('click', () => {
        notification.remove();
    });

    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Enhanced typing animation for subtitle
function typeWriterCycle(element, words, speed = 100) {
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            element.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            element.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = speed;
        if (isDeleting) typeSpeed /= 2;
        
        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Initialize enhanced typing animation
document.addEventListener('DOMContentLoaded', () => {
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const words = typingElement.getAttribute('data-words').split(',');
        typeWriterCycle(typingElement, words, 80);
    }
});

// Skill tags hover effect
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');

    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });

        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Project cards 3D effect
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }

    updateCounter();
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const target = entry.target.querySelector('h3');
            const value = parseInt(target.textContent);
            
            animateCounter(target, value);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

// Skill bars animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillFills = entry.target.querySelectorAll('.skill-fill');
            skillFills.forEach((fill, index) => {
                setTimeout(() => {
                    const width = fill.getAttribute('data-width');
                    fill.style.width = width;
                }, index * 200);
            });
        }
    });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => statsObserver.observe(stat));
    
    // Observe skill categories for progress bar animation
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => skillObserver.observe(category));
});


// Dark mode toggle functionality
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    
    // Update theme toggle icon
    const themeToggle = document.querySelector('#theme-toggle i');
    if (themeToggle) {
        themeToggle.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Load dark mode preference
document.addEventListener('DOMContentLoaded', () => {
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'true') {
        document.body.classList.add('dark-mode');
        const themeToggle = document.querySelector('#theme-toggle i');
        if (themeToggle) {
            themeToggle.className = 'fas fa-sun';
        }
    }
    
    // Add theme toggle event listener
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleDarkMode);
    }
});

// Add CSS for notifications
const notificationStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification-success {
        background-color: #10b981;
        color: white;
    }
    
    .notification-error {
        background-color: #ef4444;
        color: white;
    }
    
    .notification-info {
        background-color: #3b82f6;
        color: white;
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 1.25rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
    
    @media (max-width: 480px) {
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
            transform: translateY(-100px);
        }
        
        .notification.show {
            transform: translateY(0);
        }
    }
    
    /* Animation classes */
    .animate-in {
        animation: slideUp 0.6s ease forwards;
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    /* Dark mode styles */
    .dark-mode {
        --bg-primary: #1f2937;
        --bg-secondary: #111827;
        --text-primary: #f9fafb;
        --text-secondary: #d1d5db;
        --border-color: #374151;
    }
    
    .dark-mode .navbar {
        background: rgba(31, 41, 55, 0.95);
    }
    
    .dark-mode .timeline-content,
    .dark-mode .education-card,
    .dark-mode .skill-category,
    .dark-mode .project-card,
    .dark-mode .contact-form {
        background: #374151;
        border-color: #4b5563;
    }
    
    .dark-mode .stat {
        background: #374151;
    }
`;

// Inject notification styles
const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Preloader (optional)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to consolidated scroll handler
const debouncedScrollHandler = debounce(handleScroll, 16); // ~60fps
window.addEventListener('scroll', debouncedScrollHandler);

// Scroll progress indicator
function updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
    
    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        if (scrollTop > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    }
}

// Back to top functionality
document.addEventListener('DOMContentLoaded', () => {
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});


// Enhanced skill tags interaction
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag, .tech-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Show skill info (could be expanded to show more details)
            const skillName = this.textContent;
            showNotification(`${skillName} - Click to learn more about my experience!`, 'info');
        });
    });
});


// Enhanced project card interactions
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const details = card.querySelector('.project-details');
        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Show Details';
        toggleBtn.className = 'details-toggle';
        toggleBtn.style.cssText = `
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            cursor: pointer;
            margin-top: 1rem;
            font-size: 0.875rem;
            transition: all 0.3s ease;
        `;
        
        if (details) {
            details.style.display = 'none';
            card.querySelector('.project-content').appendChild(toggleBtn);
            
            toggleBtn.addEventListener('click', () => {
                const isHidden = details.style.display === 'none';
                details.style.display = isHidden ? 'block' : 'none';
                toggleBtn.textContent = isHidden ? 'Hide Details' : 'Show Details';
            });
        }
    });
});

// Add structured data for SEO
document.addEventListener('DOMContentLoaded', () => {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Thushshan Rameswaran",
        "jobTitle": "Management and IT Graduate",
        "alumniOf": {
            "@type": "University",
            "name": "University of Toronto"
        },
        "email": "thushshan123@gmail.com",
        // "telephone": "REDACTED",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Toronto",
            "addressRegion": "ON"
        },
        "url": "https://thushshan1.github.io/thushshan",
        "sameAs": [
            "https://www.linkedin.com/in/thushshan-rameswaran/"
        ]
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
});
