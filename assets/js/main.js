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

// Research Journey Section Population
function populateResearchJourney() {
  fetch('data/portfolio_real.json')
    .then(response => response.json())
    .then(data => {
      // Populate research metrics
      populateResearchMetrics(data);
      
      // Populate current research focus
      populateCurrentResearch(data);
      
      // Populate research tools
      populateResearchTools(data);
    })
    .catch(error => {
      console.error('Error loading research journey data:', error);
    });
}

function populateResearchMetrics(data) {
  const metricsGrid = document.getElementById('metrics-grid');
  if (!metricsGrid) return;
  
  const metrics = [
    {
      number: data.publications ? data.publications.length : 0,
      label: 'Publications',
      icon: '📚',
      color: 'from-blue-500 to-blue-600'
    },
    {
      number: data.projects ? data.projects.length : 0,
      label: 'Active Projects',
      icon: '🔬',
      color: 'from-green-500 to-green-600'
    },
    {
      number: data.research_areas ? data.research_areas.length : 0,
      label: 'Research Areas',
      icon: '🎯',
      color: 'from-purple-500 to-purple-600'
    },
    {
      number: data.news ? data.news.filter(n => n.type === 'Award').length : 0,
      label: 'Awards',
      icon: '🏆',
      color: 'from-amber-500 to-amber-600'
    }
  ];
  
  metricsGrid.innerHTML = metrics.map(metric => `
    <div class="glass rounded-2xl p-6 text-center interactive-card hover:scale-105 transition-all duration-300">
      <div class="w-12 h-12 bg-gradient-to-br ${metric.color} rounded-full flex items-center justify-center mx-auto mb-3">
        <span class="text-xl">${metric.icon}</span>
      </div>
      <div class="text-3xl font-bold text-slate-800 dark:text-white mb-1">${metric.number}</div>
      <div class="text-sm text-slate-600 dark:text-slate-300">${metric.label}</div>
    </div>
  `).join('');
}

function populateCurrentResearch(data) {
  const currentResearch = document.getElementById('current-research');
  if (!currentResearch || !data.research_areas) return;
  
  currentResearch.innerHTML = data.research_areas.slice(0, 3).map(area => `
    <div class="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-l-4 border-green-500">
      <h4 class="font-semibold text-slate-800 dark:text-white mb-2">${area.name}</h4>
      <p class="text-sm text-slate-600 dark:text-slate-300">${area.description}</p>
    </div>
  `).join('');
}

function populateResearchTools(data) {
  const researchTools = document.getElementById('research-tools');
  if (!researchTools) return;
  
  const tools = [
    { name: 'Machine Learning', icon: '🤖', description: 'TensorFlow, PyTorch, Scikit-learn' },
    { name: 'Cloud Computing', icon: '☁️', description: 'Google Cloud Platform' },
    { name: 'Data Analysis', icon: '📊', description: 'Python, Jupyter, Pandas' },
    { name: 'Sustainability', icon: '🌱', description: 'CodeCarbon, RAPL tools' }
  ];
  
  researchTools.innerHTML = tools.map(tool => `
    <div class="p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border-l-4 border-primary-500">
      <div class="flex items-center mb-2">
        <span class="text-lg mr-2">${tool.icon}</span>
        <h4 class="font-semibold text-slate-800 dark:text-white">${tool.name}</h4>
      </div>
      <p class="text-sm text-slate-600 dark:text-slate-300">${tool.description}</p>
    </div>
  `).join('');
}

// Error handling for data loading
window.addEventListener('error', (e) => {
  console.error('Website error:', e.error);
});