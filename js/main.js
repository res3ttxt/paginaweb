// Main JavaScript Functions
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize website
function initializeWebsite() {
    setupNavigation();
    setupScrollEffects();
    setupAnimations();
    setupFormHandlers();
    setupSmoothScrolling();
    setupScrollToTop();
    setupLazyLoading();
    setupMobileMenu();
}

// Navigation Setup
function setupNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Add active state to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            closeMobileMenu();
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Mobile Menu Setup
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

// Close mobile menu
function closeMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
}

// Scroll Effects Setup
function setupScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.product-card, .feature, .contact-item, .footer-section'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// Animations Setup
function setupAnimations() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('button, .cta-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Form Handlers Setup
function setupFormHandlers() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitForm(e);
        });
    }
    
    // Real-time form validation
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Submit contact form
function submitForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.submit-btn');
    
    // Show loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading"></div> Enviando...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Restore button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        showMessage('¡Mensaje enviado exitosamente! Te contactaremos pronto.', 'success');
    }, 2000);
}

// Validate form field
function validateField(event) {
    const field = event.target;
    const value = field.value.trim();
    
    // Remove existing error
    clearFieldError(event);
    
    let isValid = true;
    let errorMessage = '';
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo es obligatorio';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Ingresa un email válido';
        }
    }
    
    // Show error if validation fails
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    field.classList.add('error');
    
    let errorElement = field.parentNode.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

// Clear field error
function clearFieldError(event) {
    const field = event.target;
    field.classList.remove('error');
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Smooth Scrolling Setup
function setupSmoothScrolling() {
    // Smooth scroll to products section
    window.scrollToProducts = function() {
        const productsSection = document.getElementById('products');
        if (productsSection) {
            const offsetTop = productsSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    };
}

// Scroll to Top Button Setup
function setupScrollToTop() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.title = 'Volver arriba';
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Lazy Loading Setup
function setupLazyLoading() {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Utility Functions

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Generate unique ID
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showMessage('Copiado al portapapeles', 'success');
    }).catch(function() {
        showMessage('Error al copiar', 'error');
    });
}

// Share product (Web Share API)
function shareProduct(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    if (navigator.share) {
        navigator.share({
            title: product.name,
            text: `Mira este increíble polo anime: ${product.name}`,
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback to copying URL
        const url = `${window.location.href}?product=${productId}`;
        copyToClipboard(url);
    }
}

// Print page
function printPage() {
    window.print();
}

// Toggle dark mode (future feature)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    showMessage(`Modo ${isDarkMode ? 'oscuro' : 'claro'} activado`, 'success');
}

// Performance monitoring
function monitorPerformance() {
    // Monitor page load time
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`Página cargada en ${loadTime.toFixed(2)}ms`);
        
        // Track to analytics (if implemented)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_load_time', {
                custom_map: {
                    load_time: Math.round(loadTime)
                }
            });
        }
    });
}

// Initialize performance monitoring
document.addEventListener('DOMContentLoaded', monitorPerformance);

// Error handling
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
    showMessage('Ha ocurrido un error. Por favor, recarga la página.', 'error');
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promesa rechazada:', e.reason);
    e.preventDefault();
});

// Service Worker registration (for future PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('Service Worker registrado:', registration);
            })
            .catch(function(error) {
                console.log('Error al registrar Service Worker:', error);
            });
    });
}

// Export functions for use in other scripts
window.AnimeWear = {
    showMessage,
    formatCurrency,
    generateId,
    copyToClipboard,
    shareProduct,
    toggleDarkMode,
    debounce,
    throttle
};
