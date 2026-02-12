// Dynamic year for copyright
try {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
} catch (error) {
    console.warn('Year element not found:', error);
}

// Mobile Navigation Toggle with better UX
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('nav ul');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        
        // Trap focus in mobile menu when open
        if (navMenu.classList.contains('active')) {
            const firstLink = navMenu.querySelector('a');
            if (firstLink) firstLink.focus();
        }
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            document.querySelector('nav ul').classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Newsletter form handling with better UX and accessibility
const newsletterForm = document.querySelector('form[name="newsletter-form"]');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = document.getElementById('mail');
        const email = emailInput.value.trim();
        const submitBtn = document.getElementById('submit-btn');
        const originalBtnText = submitBtn.textContent;
        
        // Email validation with better feedback
        if (email && email.includes('@') && email.includes('.')) {
            // Success feedback with screen reader announcement
            submitBtn.textContent = '✓ Subscribed!';
            submitBtn.setAttribute('aria-label', 'Successfully subscribed to newsletter');
            submitBtn.style.backgroundColor = '#28a745';
            submitBtn.style.borderColor = '#28a745';
            emailInput.value = '';
            emailInput.removeAttribute('aria-invalid');
            
            // Announce success to screen readers
            const announcement = document.createElement('div');
            announcement.setAttribute('role', 'status');
            announcement.setAttribute('aria-live', 'polite');
            announcement.className = 'sr-only';
            announcement.textContent = 'Successfully subscribed to newsletter!';
            document.body.appendChild(announcement);
            setTimeout(() => announcement.remove(), 3000);
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.removeAttribute('aria-label');
                submitBtn.style.backgroundColor = '';
                submitBtn.style.borderColor = '';
            }, 3000);
        } else {
            // Error feedback with accessibility
            emailInput.style.borderColor = '#dc3545';
            emailInput.setAttribute('aria-invalid', 'true');
            emailInput.setAttribute('aria-describedby', 'email-error');
            submitBtn.setAttribute('aria-label', 'Invalid email, please try again');
            
            // Focus on input for accessibility
            emailInput.focus();
            
            setTimeout(() => {
                emailInput.style.borderColor = '';
                emailInput.removeAttribute('aria-invalid');
                emailInput.removeAttribute('aria-describedby');
                submitBtn.removeAttribute('aria-label');
            }, 2000);
        }
    });
}

// Contact button functionality
const contactBtn = document.getElementById('contact-btn');
if (contactBtn) {
    contactBtn.addEventListener('click', function() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    console.log('Portfolio loaded successfully');
});

// Scroll to top button
const scrollTopBtn = document.querySelector('.scroll-top');
if (scrollTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
}

// Animated counter for stats
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60;
    const duration = 2000;
    const stepTime = duration / 60;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Stats counter animation using Intersection Observer
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                // Prevent double animation
                if (!stat.dataset.animated) {
                    stat.dataset.animated = 'true';
                    const target = parseInt(stat.getAttribute('data-target'));
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5, rootMargin: '0px' });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});
