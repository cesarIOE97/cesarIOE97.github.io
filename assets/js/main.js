// Enhanced main.js for sustainable portfolio website - Provides additional interactive features

document.addEventListener('DOMContentLoaded', () => {
  try {
    // Initialize enhanced features that complement the inline HTML script
    setTimeout(() => {
      initializeRippleEffects();
      initializeMobileOptimizations();
      initializeResponsiveDesign();
      initializeAccessibility();
    }, 1000); // Wait for HTML script to load first
    
    console.log('Enhanced features loaded successfully!');
  } catch (error) {
    console.error('Error loading enhanced features:', error);
  }
});

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

// Add ripple effect to buttons after content is loaded
function initializeRippleEffects() {
  document.querySelectorAll('button, .btn, .interactive-card').forEach(addRippleEffect);
}

// Enhanced mobile responsiveness
function initializeMobileOptimizations() {
  // Add touch-friendly interactions
  document.querySelectorAll('.interactive-card').forEach(card => {
    card.addEventListener('touchstart', function() {
      this.style.transform = 'scale(0.98)';
    });
    
    card.addEventListener('touchend', function() {
      this.style.transform = 'scale(1)';
    });
  });
  
  // Optimize images for mobile
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.loading = 'lazy';
    img.style.maxWidth = '100%';
    // img.style.height = 'auto';
  });
}

// Responsive typography and spacing
function initializeResponsiveDesign() {
  function updateResponsiveElements() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    
    // Adjust card spacing on mobile
    const cards = document.querySelectorAll('.interactive-card, .research-card, .project-card');
    cards.forEach(card => {
      if (vw < 768) {
        card.classList.add('mb-4');
        card.classList.remove('mb-6');
      } else {
        card.classList.add('mb-6');
        card.classList.remove('mb-4');
      }
    });
    
    // Adjust text sizes
    const titles = document.querySelectorAll('h1, h2, h3');
    titles.forEach(title => {
      if (vw < 640) {
        title.style.fontSize = 'clamp(1.25rem, 4vw, 2rem)';
      }
    });
  }
  
  // Update on load and resize
  updateResponsiveElements();
  window.addEventListener('resize', debounce(updateResponsiveElements, 250));
}

// Accessibility improvements
function initializeAccessibility() {
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
      const mobileMenu = document.getElementById('mobile-menu');
      if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.add('hidden');
      }
    }
  });
  
  // Add ARIA labels for dynamic content
  const updateAriaLabels = () => {
    const cards = document.querySelectorAll('.interactive-card');
    cards.forEach((card, index) => {
      if (!card.getAttribute('aria-label')) {
        const title = card.querySelector('h3')?.textContent;
        if (title) {
          card.setAttribute('aria-label', `${title} - Interactive card ${index + 1}`);
        }
      }
    });
  };
  
  // Update ARIA labels after content loads
  setTimeout(updateAriaLabels, 1000);
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

// Optimized scroll handler with performance improvements
const optimizedScrollHandler = debounce(() => {
  // Handle scroll-based animations and effects
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  
  // Parallax effect for hero section
  const hero = document.getElementById('home');
  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${rate}px)`;
  }
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler, { passive: true });

// Error handling for data loading
window.addEventListener('error', (e) => {
  console.error('Website error:', e.error);
});