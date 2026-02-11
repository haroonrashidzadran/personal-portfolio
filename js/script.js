// Dynamic year for copyright
document.getElementById('year').textContent = new Date().getFullYear();

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

// Newsletter form handling with better UX
const newsletterForm = document.querySelector('form[name="newsletter-form"]');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = document.getElementById('mail');
        const email = emailInput.value.trim();
        const submitBtn = document.getElementById('submit-btn');
        
        if (email && email.includes('@') && email.includes('.')) {
            // Success feedback
            submitBtn.textContent = 'Subscribed!';
            submitBtn.style.backgroundColor = '#28a745';
            submitBtn.style.borderColor = '#28a745';
            emailInput.value = '';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = 'Subscribe';
                submitBtn.style.backgroundColor = '';
                submitBtn.style.borderColor = '';
            }, 3000);
        } else {
            // Error feedback
            emailInput.style.borderColor = '#dc3545';
            setTimeout(() => {
                emailInput.style.borderColor = '';
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
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

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
