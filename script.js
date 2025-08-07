async function loadContent() {
  const res = await fetch('data.json');
  const data = await res.json();

  document.title = `${data.name} - ${data.title}`;
  document.getElementById('name').textContent = data.name;
  document.getElementById('title').textContent = data.title;
  document.getElementById('summary').textContent = data.summary;
  document.getElementById('aboutContent').textContent = data.about;

  const cvList = document.getElementById('cvList');
  data.cv.forEach(section => {
    const sectionDiv = document.createElement('div');
    const heading = document.createElement('h4');
    heading.className = 'text-xl font-medium';
    heading.textContent = section.category;
    sectionDiv.appendChild(heading);

    section.items.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'mt-2';
      itemDiv.innerHTML = `<p class="font-semibold">${item.role}</p>` +
        `<p class="text-sm text-gray-600 dark:text-gray-400">${item.org} – ${item.period}</p>` +
        `<p class="mt-1 text-sm">${item.details}</p>`;
      sectionDiv.appendChild(itemDiv);
    });
    cvList.appendChild(sectionDiv);
  });

  const projectsList = document.getElementById('projectsList');
  data.projects.forEach(p => {
    const pDiv = document.createElement('div');
    pDiv.innerHTML = `<a class="text-blue-600 dark:text-blue-400 underline font-medium" target="_blank" href="${p.link}">${p.title}</a>` +
      `<p class="text-sm">${p.description}</p>`;
    projectsList.appendChild(pDiv);
  });

  const skillsList = document.getElementById('skillsList');
  data.skills.forEach(skill => {
    const li = document.createElement('li');
    li.textContent = skill;
    skillsList.appendChild(li);
  });

  const contactList = document.getElementById('contactList');
  Object.entries(data.contact).forEach(([key, value]) => {
    const li = document.createElement('li');
    const label = key.charAt(0).toUpperCase() + key.slice(1);
    if (key === 'email') {
      li.innerHTML = `<a href="mailto:${value}" class="underline">${value}</a>`;
    } else {
      li.innerHTML = `<a href="${value}" target="_blank" class="underline">${label}</a>`;
    }
    contactList.appendChild(li);
  });
}

function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  if (stored === 'dark') {
    root.classList.add('dark');
  }
  toggle.addEventListener('click', () => {
    root.classList.toggle('dark');
    localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  loadContent();
});
