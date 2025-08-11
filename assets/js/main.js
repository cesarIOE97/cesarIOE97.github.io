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
      
      // Only populate research tools (removed current research focus)
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
      label: 'Projects & Contributions',
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

function populateResearchTools(data) {
  const researchTools = document.getElementById('research-tools');
  if (!researchTools) return;
  
  const tools = [
    { 
      name: 'Artificial Intelligence', 
      icon: '🤖', 
      description: 'TensorFlow, PyTorch, Scikit-learn, Hugging Face',
      category: 'AI/ML/GenAI'
    },
    { 
      name: 'Cloud Computing', 
      icon: '☁️', 
      description: 'Google Cloud Platform, Triton',
      category: 'Infrastructure'
    },
    { 
      name: 'Data Analysis', 
      icon: '📊', 
      description: 'Python, Jupyter, Pandas',
      category: 'Analytics'
    },
    { 
      name: 'Sustainability', 
      icon: '🌱', 
      description: 'CodeCarbon, Electricity Maps',
      category: 'Environment'
    },
    { 
      name: 'Research Methods', 
      icon: '🔬', 
      description: 'Experimental Design, Statistical Analysis',
      category: 'Methodology'
    },
    { 
      name: 'Visualization', 
      icon: '📈', 
      description: 'Matplotlib, Plotly',
      category: 'Presentation'
    }
  ];
  
  researchTools.innerHTML = tools.map(tool => `
    <div class="group p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-600 transition-all duration-300 hover:shadow-md">
      <div class="flex items-start space-x-3">
        <div class="flex-shrink-0 w-8 h-8 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <span class="text-sm">${tool.icon}</span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between mb-1">
            <h4 class="font-semibold text-slate-800 dark:text-white text-sm">${tool.name}</h4>
            <span class="px-2 py-0.5 text-xs font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/30 rounded-full">
              ${tool.category}
            </span>
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">${tool.description}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// Professional Activities and Media Coverage
function populateActivitiesAndMedia() {
  fetch('data/portfolio_real.json')
    .then(response => response.json())
    .then(data => {
      populateActivities(data);
      populateMedia(data);
    })
    .catch(error => {
      console.error('Error loading activities and media data:', error);
    });
}

function populateActivities(data) {
  const activitiesList = document.getElementById('activities-list');
  if (!activitiesList) return;
  
  if (!data.activities || data.activities.length === 0) {
    activitiesList.innerHTML = `
      <div class="text-center py-12 text-slate-500 dark:text-slate-400">
        <div class="text-4xl mb-4">🤝</div>
        <p class="text-lg font-medium mb-2">Activities Coming Soon</p>
        <p class="text-sm">Expanding community engagement and professional activities</p>
      </div>
    `;
    return;
  }
  
  activitiesList.innerHTML = data.activities.map(activity => `
    <div class="group bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-lg">
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <h4 class="text-lg font-semibold text-slate-800 dark:text-white mb-1">${activity.title}</h4>
          <p class="text-primary-600 dark:text-primary-400 font-medium text-sm">${activity.organization}</p>
        </div>
        ${activity.role ? `
          <span class="px-3 py-1 bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium shrink-0">
            ${activity.role}
          </span>
        ` : ''}
      </div>
      
      <div class="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
        ${activity.date ? `<span class="flex items-center gap-1"><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg> ${activity.date}</span>` : ''}
        ${activity.location ? `<span class="flex items-center gap-1"><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg> ${activity.location}</span>` : ''}
      </div>
      
      <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">${activity.description}</p>
      
      ${activity.tags && activity.tags.length > 0 ? `
        <div class="flex flex-wrap gap-2">
          ${activity.tags.slice(0, 3).map(tag => `
            <span class="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md text-xs">
              ${tag}
            </span>
          `).join('')}
          ${activity.tags.length > 3 ? `<span class="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-md text-xs">+${activity.tags.length - 3} more</span>` : ''}
        </div>
      ` : ''}
    </div>
  `).join('');
}

function populateMedia(data) {
  const mediaList = document.getElementById('media-list');
  if (!mediaList) return;
  
  if (!data.media || data.media.length === 0) {
    mediaList.innerHTML = `
      <div class="text-center py-12 text-slate-500 dark:text-slate-400">
        <div class="text-4xl mb-4">📰</div>
        <p class="text-lg font-medium mb-2">Media Coverage Coming Soon</p>
        <p class="text-sm">Sharing research insights with the world</p>
      </div>
    `;
    return;
  }
  
  // For minimal media items, use a more compact, highlighted design
  mediaList.innerHTML = data.media.map(media => `
    <div class="group bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 hover:shadow-lg">
      <div class="flex items-start justify-between mb-4">
        <div class="flex-1">
          <h4 class="text-lg font-semibold text-slate-800 dark:text-white mb-1">${media.title}</h4>
          <p class="text-green-600 dark:text-green-400 font-medium text-sm">${media.outlet}</p>
        </div>
        ${media.type ? `
          <span class="px-3 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full text-xs font-medium shrink-0">
            ${media.type}
          </span>
        ` : ''}
      </div>
      
      <div class="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-3">
        ${media.date ? `<span class="flex items-center gap-1"><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path></svg> ${new Date(media.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>` : ''}
        ${media.location ? `<span class="flex items-center gap-1"><svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path></svg> ${media.location}</span>` : ''}
      </div>
      
      <p class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">${media.description}</p>
      
      <div class="flex items-center justify-between">
        ${media.tags && media.tags.length > 0 ? `
          <div class="flex flex-wrap gap-2">
            ${media.tags.slice(0, 3).map(tag => `
              <span class="px-2 py-1 bg-green-100 dark:bg-green-800/50 text-green-700 dark:text-green-300 rounded-md text-xs">
                ${tag}
              </span>
            `).join('')}
          </div>
        ` : '<div></div>'}
        
        ${media.link ? `
          <a href="${media.link}" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors group">
            Read Article
            <svg class="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        ` : ''}
      </div>
    </div>
  `).join('');
}

// Error handling for data loading
window.addEventListener('error', (e) => {
  console.error('Website error:', e.error);
});