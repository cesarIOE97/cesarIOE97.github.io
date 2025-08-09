// Enhanced main.js for sustainable portfolio website

let portfolioData = null;

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Load portfolio data first
    await loadPortfolioData();
    
    // Initialize all components
    initializeTheme();
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeParticles();
    initializeTypingEffect();
    initializeProgressIndicators();
    
    // Populate content with loaded data
    populateHeroSection();
    populateContactDetails();
    populateResearchSection();
    populateProjectsSection();
    populatePublicationsSection();
    
    // Initialize interactive features
    initializeFilterAndSearch();
    
    console.log('Portfolio website loaded successfully!');
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    showErrorMessage('Failed to load portfolio data. Please try refreshing the page.');
  }
});

// Load portfolio data from JSON
async function loadPortfolioData() {
  try {
    const response = await fetch('./data/portfolio.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    portfolioData = await response.json();
    return portfolioData;
  } catch (error) {
    console.error('Error loading portfolio data:', error);
    throw error;
  }
}

function initializeTheme() {
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  
  // Initialize theme based on stored preference or system preference
  if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    root.classList.add('dark');
  }
  
  // Update theme toggle icon
  updateThemeIcon(toggle, root.classList.contains('dark'));
  
  toggle?.addEventListener('click', () => {
    const isDark = root.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Update icon
    updateThemeIcon(toggle, isDark);
    
    // Add visual feedback
    toggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
      toggle.style.transform = 'scale(1)';
    }, 150);
  });
}

function updateThemeIcon(toggle, isDark) {
  if (!toggle) return;
  
  const icon = toggle.querySelector('i') || toggle;
  if (isDark) {
    icon.innerHTML = '☀️'; // Sun icon for light mode toggle
    toggle.setAttribute('aria-label', 'Switch to light mode');
  } else {
    icon.innerHTML = '🌙'; // Moon icon for dark mode toggle
    toggle.setAttribute('aria-label', 'Switch to dark mode');
  }
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

// Data population functions
function populateHeroSection() {
  if (!portfolioData?.personalInfo) return;
  
  const { personalInfo } = portfolioData;
  
  // Populate hero content
  const heroName = document.getElementById('hero-name');
  const heroTitle = document.getElementById('hero-title');
  const heroBio = document.getElementById('hero-bio');
  const heroImage = document.getElementById('hero-image');
  
  if (heroName) heroName.textContent = personalInfo.name;
  if (heroTitle) heroTitle.textContent = personalInfo.title;
  if (heroBio) heroBio.textContent = personalInfo.bio;
  if (heroImage && personalInfo.profileImage) {
    heroImage.src = personalInfo.profileImage;
    heroImage.alt = personalInfo.name;
  }
}

function populateContactDetails() {
  if (!portfolioData?.personalInfo || !portfolioData?.links) return;
  
  const { personalInfo, links } = portfolioData;
  
  // Update CV download button
  const cvButton = document.getElementById('cv-download');
  if (cvButton && (personalInfo.cv || links.cv)) {
    const cvPath = personalInfo.cv || links.cv;
    cvButton.href = cvPath;
    cvButton.onclick = null; // Remove any existing onclick handlers
  }
  
  // Update email in contact section
  const emailElements = document.querySelectorAll('[data-email]');
  emailElements.forEach(el => {
    if (personalInfo.email) {
      el.textContent = personalInfo.email;
      el.href = `mailto:${personalInfo.email}`;
    }
  });
  
  // Update social links
  const socialLinks = {
    github: links.github,
    linkedin: links.linkedin,
    twitter: links.twitter,
    orcid: links.orcid,
    'google-scholar': links.google_scholar
  };
  
  Object.entries(socialLinks).forEach(([platform, url]) => {
    const linkElement = document.getElementById(`${platform}-link`);
    if (linkElement && url) {
      linkElement.href = url;
      linkElement.target = '_blank';
      linkElement.rel = 'noopener noreferrer';
    }
  });
}

function populateResearchSection() {
  if (!portfolioData?.research_areas) return;
  
  const researchContainer = document.getElementById('research-areas');
  if (!researchContainer) return;
  
  researchContainer.innerHTML = portfolioData.research_areas.map(area => `
    <div class="research-card p-6 glass rounded-2xl border border-slate-200/20 dark:border-slate-700/30 hover:border-primary-300/50 transition-all duration-300">
      <h3 class="text-xl font-bold text-slate-800 dark:text-slate-200 mb-3">${area.title}</h3>
      <p class="text-slate-600 dark:text-slate-400 mb-4">${area.description}</p>
      ${area.tags ? `
        <div class="flex flex-wrap gap-2">
          ${area.tags.map(tag => `
            <span class="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
              ${tag}
            </span>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `).join('');
}

function populateProjectsSection() {
  if (!portfolioData?.projects) return;
  
  const projectsContainer = document.getElementById('projects-grid');
  if (!projectsContainer) return;
  
  projectsContainer.innerHTML = portfolioData.projects.map(project => `
    <div class="project-card interactive-card p-6 glass rounded-2xl border border-slate-200/20 dark:border-slate-700/30 hover:border-primary-300/50 transition-all duration-300">
      <div class="flex justify-between items-start mb-4">
        <h3 class="text-xl font-bold text-slate-800 dark:text-slate-200">${project.title}</h3>
        <span class="px-3 py-1 bg-${project.status === 'completed' ? 'green' : project.status === 'ongoing' ? 'blue' : 'yellow'}-100 dark:bg-${project.status === 'completed' ? 'green' : project.status === 'ongoing' ? 'blue' : 'yellow'}-900/30 text-${project.status === 'completed' ? 'green' : project.status === 'ongoing' ? 'blue' : 'yellow'}-700 dark:text-${project.status === 'completed' ? 'green' : project.status === 'ongoing' ? 'blue' : 'yellow'}-300 rounded-full text-sm font-medium capitalize">
          ${project.status}
        </span>
      </div>
      <p class="text-slate-600 dark:text-slate-400 mb-4">${project.description}</p>
      <div class="flex flex-wrap gap-2 mb-4">
        ${project.technologies?.map(tech => `
          <span class="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm">
            ${tech}
          </span>
        `).join('') || ''}
      </div>
      ${project.links ? `
        <div class="flex gap-3">
          ${project.links.github ? `
            <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium">
              🔗 Code
            </a>
          ` : ''}
          ${project.links.demo ? `
            <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium">
              🚀 Demo
            </a>
          ` : ''}
          ${project.links.paper ? `
            <a href="${project.links.paper}" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium">
              📄 Paper
            </a>
          ` : ''}
        </div>
      ` : ''}
    </div>
  `).join('');
}

function populatePublicationsSection() {
  if (!portfolioData?.publications) return;
  
  const publicationsContainer = document.getElementById('publications-list');
  if (!publicationsContainer) return;
  
  const sortedPublications = [...portfolioData.publications].sort((a, b) => 
    new Date(b.date || b.year) - new Date(a.date || a.year)
  );
  
  publicationsContainer.innerHTML = sortedPublications.map(pub => `
    <div class="interactive-card p-6 glass rounded-2xl border border-slate-200/20 dark:border-slate-700/30 hover:border-primary-300/50 transition-all duration-300">
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200 leading-tight">${pub.title}</h3>
        <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium ml-4">
          ${pub.type}
        </span>
      </div>
      <div class="text-slate-600 dark:text-slate-400 mb-3">
        <p class="font-medium">${pub.authors}</p>
        <p class="italic">${pub.venue}</p>
        <p class="text-sm">${pub.date || pub.year}</p>
      </div>
      ${pub.abstract ? `<p class="text-slate-600 dark:text-slate-400 mb-4">${pub.abstract}</p>` : ''}
      ${pub.links ? `
        <div class="flex flex-wrap gap-3">
          ${pub.links.pdf ? `
            <a href="${pub.links.pdf}" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium">
              📄 PDF
            </a>
          ` : ''}
          ${pub.links.doi ? `
            <a href="${pub.links.doi}" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium">
              🔗 DOI
            </a>
          ` : ''}
          ${pub.links.arxiv ? `
            <a href="${pub.links.arxiv}" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium">
              📖 arXiv
            </a>
          ` : ''}
        </div>
      ` : ''}
    </div>
  `).join('');
}

// Initialize all enhancements after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add small delay to ensure all content is rendered
  setTimeout(() => {
    initializeRippleEffects();
    initializeMobileOptimizations();
    initializeResponsiveDesign();
    initializeAccessibility();
  }, 500);
});

// Service worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered'))
      .catch(error => console.log('SW registration failed'));
  });
}

function populateExperienceSection() {
  if (!portfolioData?.experience) return;
  
  const experienceContainer = document.getElementById('experience-container');
  if (!experienceContainer) return;
  
  experienceContainer.innerHTML = portfolioData.experience.map(exp => `
    <div class="interactive-card p-6 glass rounded-2xl border border-slate-200/20 dark:border-slate-700/30 hover:border-primary-300/50 transition-all duration-300">
      <div class="flex justify-between items-start mb-3">
        <div>
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200">${exp.position}</h3>
          <p class="text-primary-600 dark:text-primary-400 font-medium">${exp.company}</p>
          <p class="text-slate-500 dark:text-slate-500 text-sm">${exp.location}</p>
        </div>
        <span class="text-slate-600 dark:text-slate-400 text-sm">${exp.date}</span>
      </div>
      ${exp.description ? `<p class="text-slate-600 dark:text-slate-400 mb-3">${exp.description}</p>` : ''}
      ${exp.achievements && exp.achievements.length > 0 ? `
        <ul class="text-slate-600 dark:text-slate-400 space-y-1">
          ${exp.achievements.map(achievement => `
            <li class="flex items-start">
              <span class="text-primary-500 mr-2">•</span>
              ${achievement}
            </li>
          `).join('')}
        </ul>
      ` : ''}
    </div>
  `).join('');
}

function populateSkillsSection() {
  if (!portfolioData?.skills) return;
  
  const skillsContainer = document.getElementById('skills-container');
  if (!skillsContainer) return;
  
  skillsContainer.innerHTML = Object.entries(portfolioData.skills).map(([category, skills]) => `
    <div class="interactive-card p-6 glass rounded-2xl border border-slate-200/20 dark:border-slate-700/30 hover:border-primary-300/50 transition-all duration-300">
      <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 capitalize">${category.replace('_', ' ')}</h3>
      <div class="flex flex-wrap gap-3">
        ${skills.map(skill => `
          <span class="px-4 py-2 bg-gradient-to-r from-primary-100 to-green-100 dark:from-primary-900/30 dark:to-green-900/30 text-primary-700 dark:text-primary-300 rounded-full font-medium border border-primary-200/50 dark:border-primary-700/30">
            ${skill}
          </span>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function populateImpactSection() {
  if (!portfolioData?.impact) return;
  
  const { impact } = portfolioData;
  
  // Update metrics if available
  if (impact.metrics) {
    Object.entries(impact.metrics).forEach(([key, value]) => {
      const element = document.getElementById(`metric-${key}`);
      if (element) {
        element.textContent = value;
      }
    });
  }
  
  // Initialize chart if citations data is available
  if (impact.citations_timeline) {
    initializeCitationsChart(impact.citations_timeline);
  }
}

function initializeCitationsChart(citationsData) {
  const ctx = document.getElementById('citations-chart');
  if (!ctx) return;
  
  try {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: citationsData.map(item => item.year),
        datasets: [{
          label: 'Citations',
          data: citationsData.map(item => item.citations),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(148, 163, 184, 0.2)'
            }
          },
          x: {
            grid: {
              color: 'rgba(148, 163, 184, 0.2)'
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Error initializing citations chart:', error);
  }
}

// Email copy functionality
function copyEmail() {
  if (!portfolioData?.personalInfo?.email) return;
  
  navigator.clipboard.writeText(portfolioData.personalInfo.email).then(() => {
    showNotification('Email copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy email:', err);
    showNotification('Failed to copy email', 'error');
  });
}

// Filter and search functionality
function initializeFilterAndSearch() {
  // Project filters
  const projectFilters = document.querySelectorAll('[data-filter]');
  projectFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      const filterValue = filter.dataset.filter;
      filterProjects(filterValue);
      
      // Update active filter
      projectFilters.forEach(f => f.classList.remove('bg-primary-600', 'text-white'));
      filter.classList.add('bg-primary-600', 'text-white');
    });
  });
  
  // Publication filters
  const publicationFilters = document.querySelectorAll('[data-pub-filter]');
  publicationFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      const filterValue = filter.dataset.pubFilter;
      filterPublications(filterValue);
      
      // Update active filter
      publicationFilters.forEach(f => f.classList.remove('bg-primary-600', 'text-white'));
      filter.classList.add('bg-primary-600', 'text-white');
    });
  });
  
  // Search functionality
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', debounce((e) => {
      const searchTerm = e.target.value.toLowerCase();
      searchContent(searchTerm);
    }, 300));
  }
}

function filterProjects(filterValue) {
  if (!portfolioData?.projects) return;
  
  const projectsContainer = document.getElementById('projects-grid');
  if (!projectsContainer) return;
  
  let filteredProjects = portfolioData.projects;
  
  if (filterValue !== 'all') {
    filteredProjects = portfolioData.projects.filter(project => {
      return project.status === filterValue || 
             project.technologies?.some(tech => tech.toLowerCase().includes(filterValue.toLowerCase()));
    });
  }
  
  projectsContainer.innerHTML = filteredProjects.map(project => {
    // Reuse the project card template from populateProjectsSection
    return `
      <div class="project-card interactive-card p-6 glass rounded-2xl border border-slate-200/20 dark:border-slate-700/30 hover:border-primary-300/50 transition-all duration-300">
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-xl font-bold text-slate-800 dark:text-slate-200">${project.title}</h3>
          <span class="px-3 py-1 bg-${project.status === 'completed' ? 'green' : project.status === 'ongoing' ? 'blue' : 'yellow'}-100 dark:bg-${project.status === 'completed' ? 'green' : project.status === 'ongoing' ? 'blue' : 'yellow'}-900/30 text-${project.status === 'completed' ? 'green' : project.status === 'ongoing' ? 'blue' : 'yellow'}-700 dark:text-${project.status === 'completed' ? 'green' : project.status === 'ongoing' ? 'blue' : 'yellow'}-300 rounded-full text-sm font-medium capitalize">
            ${project.status}
          </span>
        </div>
        <p class="text-slate-600 dark:text-slate-400 mb-4">${project.description}</p>
        <div class="flex flex-wrap gap-2 mb-4">
          ${project.technologies?.map(tech => `
            <span class="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm">
              ${tech}
            </span>
          `).join('') || ''}
        </div>
        ${project.links ? `
          <div class="flex gap-3">
            ${project.links.github ? `
              <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" 
                 class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium">
                🔗 Code
              </a>
            ` : ''}
            ${project.links.demo ? `
              <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" 
                 class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium">
                🚀 Demo
              </a>
            ` : ''}
            ${project.links.paper ? `
              <a href="${project.links.paper}" target="_blank" rel="noopener noreferrer" 
                 class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium">
                📄 Paper
              </a>
            ` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
  
  // Re-initialize animations for new content
  initializeAnimations();
}

function filterPublications(filterValue) {
  if (!portfolioData?.publications) return;
  
  const publicationsContainer = document.getElementById('publications-list');
  if (!publicationsContainer) return;
  
  let filteredPublications = portfolioData.publications;
  
  if (filterValue !== 'all') {
    filteredPublications = portfolioData.publications.filter(pub => 
      pub.type === filterValue
    );
  }
  
  const sortedPublications = [...filteredPublications].sort((a, b) => 
    new Date(b.date || b.year) - new Date(a.date || a.year)
  );
  
  publicationsContainer.innerHTML = sortedPublications.map(pub => `
    <div class="interactive-card p-6 glass rounded-2xl border border-slate-200/20 dark:border-slate-700/30 hover:border-primary-300/50 transition-all duration-300">
      <div class="flex justify-between items-start mb-3">
        <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200 leading-tight">${pub.title}</h3>
        <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium ml-4">
          ${pub.type}
        </span>
      </div>
      <div class="text-slate-600 dark:text-slate-400 mb-3">
        <p class="font-medium">${pub.authors}</p>
        <p class="italic">${pub.venue}</p>
        <p class="text-sm">${pub.date || pub.year}</p>
      </div>
      ${pub.abstract ? `<p class="text-slate-600 dark:text-slate-400 mb-4">${pub.abstract}</p>` : ''}
      ${pub.links ? `
        <div class="flex flex-wrap gap-3">
          ${pub.links.pdf ? `
            <a href="${pub.links.pdf}" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium">
              📄 PDF
            </a>
          ` : ''}
          ${pub.links.doi ? `
            <a href="${pub.links.doi}" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium">
              🔗 DOI
            </a>
          ` : ''}
          ${pub.links.arxiv ? `
            <a href="${pub.links.arxiv}" target="_blank" rel="noopener noreferrer" 
               class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium">
              📖 arXiv
            </a>
          ` : ''}
        </div>
      ` : ''}
    </div>
  `).join('');
  
  // Re-initialize animations for new content
  initializeAnimations();
}

function searchContent(searchTerm) {
  if (!searchTerm) {
    // Reset to show all content
    populateProjectsSection();
    populatePublicationsSection();
    return;
  }
  
  // Search projects
  if (portfolioData?.projects) {
    const filteredProjects = portfolioData.projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm) ||
      project.description.toLowerCase().includes(searchTerm) ||
      project.technologies?.some(tech => tech.toLowerCase().includes(searchTerm))
    );
    
    const projectsContainer = document.getElementById('projects-grid');
    if (projectsContainer && filteredProjects.length > 0) {
      // Update projects with filtered results using the same template as filterProjects
      projectsContainer.innerHTML = filteredProjects.map(project => `
        <div class="project-card interactive-card p-6 glass rounded-2xl border border-slate-200/20 dark:border-slate-700/30 hover:border-primary-300/50 transition-all duration-300">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-xl font-bold text-slate-800 dark:text-slate-200">${project.title}</h3>
            <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium capitalize">
              ${project.status}
            </span>
          </div>
          <p class="text-slate-600 dark:text-slate-400 mb-4">${project.description}</p>
          <div class="flex flex-wrap gap-2 mb-4">
            ${project.technologies?.map(tech => `
              <span class="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm">
                ${tech}
              </span>
            `).join('') || ''}
          </div>
        </div>
      `).join('');
    }
  }
  
  // Search publications
  if (portfolioData?.publications) {
    const filteredPublications = portfolioData.publications.filter(pub =>
      pub.title.toLowerCase().includes(searchTerm) ||
      pub.authors.toLowerCase().includes(searchTerm) ||
      pub.venue.toLowerCase().includes(searchTerm) ||
      (pub.abstract && pub.abstract.toLowerCase().includes(searchTerm))
    );
    
    const publicationsContainer = document.getElementById('publications-list');
    if (publicationsContainer && filteredPublications.length > 0) {
      // Update publications with filtered results using the same template as filterPublications
      publicationsContainer.innerHTML = filteredPublications.map(pub => `
        <div class="interactive-card p-6 glass rounded-2xl border border-slate-200/20 dark:border-slate-700/30 hover:border-primary-300/50 transition-all duration-300">
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">${pub.title}</h3>
          <div class="text-slate-600 dark:text-slate-400 mb-3">
            <p class="font-medium">${pub.authors}</p>
            <p class="italic">${pub.venue}</p>
            <p class="text-sm">${pub.date || pub.year}</p>
          </div>
        </div>
      `).join('');
    }
  }
}

// Utility functions
function showNotification(message, type = 'success') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
    type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
  }`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

function showErrorMessage(message) {
  const errorContainer = document.createElement('div');
  errorContainer.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50';
  errorContainer.innerHTML = `
    <div class="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl max-w-md mx-4">
      <h3 class="text-lg font-bold text-red-600 dark:text-red-400 mb-2">Error</h3>
      <p class="text-slate-600 dark:text-slate-400 mb-4">${message}</p>
      <button onclick="this.closest('.fixed').remove()" 
              class="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
        Close
      </button>
    </div>
  `;
  
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

// Loading state management
function showLoadingState(element) {
  element.classList.add('loading-shimmer');
  element.innerHTML = '<div class="animate-pulse bg-slate-200 dark:bg-slate-700 h-4 rounded"></div>';
}

function hideLoadingState(element, content) {
  element.classList.remove('loading-shimmer');
  element.innerHTML = content;
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
    img.style.height = 'auto';
  });
  
  // Add swipe gestures for mobile navigation
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  });
  
  document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });
  
  function handleSwipe() {
    const swipeThreshold = 100;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      const mobileMenu = document.getElementById('mobile-menu');
      if (diff > 0 && !mobileMenu?.classList.contains('hidden')) {
        // Swipe left - close menu
        mobileMenu.classList.add('hidden');
      }
    }
  }
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
    
    // Tab navigation for cards
    if (e.key === 'Tab') {
      const focusableElements = document.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
      );
      // Ensure proper tab order and focus visibility
      focusableElements.forEach(el => {
        el.addEventListener('focus', () => {
          el.style.outline = '2px solid #3B82F6';
          el.style.outlineOffset = '2px';
        });
        
        el.addEventListener('blur', () => {
          el.style.outline = 'none';
        });
      });
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
  // Could add user-friendly error messages here
});

// Initialize all enhancements after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add small delay to ensure all content is rendered
  setTimeout(() => {
    initializeRippleEffects();
    initializeMobileOptimizations();
    initializeResponsiveDesign();
    initializeAccessibility();
  }, 500);
});

// Service worker registration for offline functionality (optional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered'))
      .catch(error => console.log('SW registration failed'));
  });
}
