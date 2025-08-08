// Enhanced main.js for sustainable portfolio website

document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle functionality
  initializeTheme();
  
  // Mobile menu functionality
  initializeMobileMenu();
  
  // Smooth scrolling
  initializeSmoothScrolling();
  
  // Intersection observer for animations
  initializeAnimations();
  
  // Particle effect for hero section
  initializeParticles();
  
  // Typing effect for hero text
  initializeTypingEffect();
  
  // Progress indicators
  initializeProgressIndicators();
});

function initializeTheme() {
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  
  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.classList.add('dark');
  }
  
  toggle?.addEventListener('click', () => {
    root.classList.toggle('dark');
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
    
    // Add visual feedback
    toggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
      toggle.style.transform = 'scale(1)';
    }, 150);
  });
}

function initializeMobileMenu() {
  const menuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  menuToggle?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('hidden');
    
    // Add animation classes
    if (!mobileMenu?.classList.contains('hidden')) {
      mobileMenu?.classList.add('fade-in-up');
    }
  });
  
  // Close menu when clicking on a link
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle?.contains(e.target) && !mobileMenu?.contains(e.target)) {
      mobileMenu?.classList.add('hidden');
    }
  });
}

function initializeSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initializeAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-4');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  // Observe elements for fade-in animation
  document.querySelectorAll('.fade-in, .interactive-card, .research-card, .project-card').forEach((el) => {
    el.classList.add('opacity-0', 'translate-y-4', 'transition', 'duration-700');
    observer.observe(el);
  });
}

function initializeParticles() {
  // Simple particle effect for hero section
  const heroSection = document.getElementById('home');
  if (!heroSection) return;
  
  const particleCount = 15;
  const particles = [];
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'absolute w-1 h-1 bg-primary-400/30 rounded-full animate-float';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (4 + Math.random() * 4) + 's';
    
    heroSection.appendChild(particle);
    particles.push(particle);
  }
}

function initializeTypingEffect() {
  const heroTitle = document.querySelector('#hero-name');
  if (!heroTitle) return;
  
  const originalText = heroTitle.textContent;
  const typingSpeed = 100;
  const erasingSpeed = 50;
  const delayBetween = 2000;
  
  let i = 0;
  let isErasing = false;
  
  function typeWriter() {
    if (!isErasing && i < originalText.length) {
      heroTitle.textContent = originalText.substring(0, i + 1);
      i++;
      setTimeout(typeWriter, typingSpeed);
    } else if (isErasing && i > 0) {
      heroTitle.textContent = originalText.substring(0, i - 1);
      i--;
      setTimeout(typeWriter, erasingSpeed);
    } else if (!isErasing && i === originalText.length) {
      setTimeout(() => {
        isErasing = true;
        typeWriter();
      }, delayBetween);
    } else if (isErasing && i === 0) {
      isErasing = false;
      setTimeout(typeWriter, typingSpeed);
    }
  }
  
  // Start typing effect after a short delay
  setTimeout(() => {
    heroTitle.textContent = '';
    typeWriter();
  }, 1000);
}

function initializeProgressIndicators() {
  // Add scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'fixed top-0 left-0 h-1 bg-gradient-to-r from-primary-500 to-green-500 z-50 transition-all duration-300';
  progressBar.style.width = '0%';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = Math.min(scrolled, 100) + '%';
  });
}

// Utility functions for enhanced interactivity
function addRippleEffect(element) {
  element.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
}

// Add ripple effect to buttons
document.querySelectorAll('button, .btn').forEach(addRippleEffect);

// Loading state management
function showLoadingState(element) {
  element.classList.add('loading-shimmer');
  element.innerHTML = '<div class="animate-pulse bg-slate-200 dark:bg-slate-700 h-4 rounded"></div>';
}

function hideLoadingState(element, content) {
  element.classList.remove('loading-shimmer');
  element.innerHTML = content;
}

// Performance optimization
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
  // Handle scroll-based animations and effects
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Error handling for data loading
window.addEventListener('error', (e) => {
  console.error('Website error:', e.error);
  // Could add user-friendly error messages here
});

// Service worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered'))
      .catch(error => console.log('SW registration failed'));
  });
}
