/**
 * Sidebar Component
 * Dynamically generates sidebar navigation
 */

class Sidebar {
  constructor() {
    this.icons = {
      home: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>',
      about: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>',
      projects: '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>',
      interests: '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>',
      workspace: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>',
      cv: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline>',
      github: '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>',
      tryhackme: '<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><path d="M9 12l2 2 4-4"></path>',
      hackerrank: '<polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline>',
      linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>',
      x: '<path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>',
      instagram: '<rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>',
      external: '<line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline>'
    };
    
    this.init();
  }
  
  init() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    
    // Get current page
    const path = window.location.pathname;
    const currentPage = path.split('/').pop() || 'index.html';
    const isInPagesFolder = path.includes('/pages/');
    const pathPrefix = isInPagesFolder ? '../' : '';
    
    header.innerHTML = this.generateSidebar(currentPage, pathPrefix);
    
    // Initialize secondary sidebar for workspace and projects pages
    const projectPages = ['projects.html', 'pythonleague.html'];
    
    if (currentPage === 'workspace.html') {
      this.initSecondarySidebar('workspace');
    } else if (projectPages.includes(currentPage)) {
      this.initSecondarySidebar('projects');
    }
  }
  
  createSVG(iconPath, size = 16) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${iconPath}</svg>`;
  }
  
  generateSidebar(currentPage, pathPrefix) {
    const navItems = [
      { href: 'index.html', label: 'Home', icon: 'home' },
      { href: 'about.html', label: 'About', icon: 'about' },
      { href: 'projects.html', label: 'Projects', icon: 'projects' },
      { href: 'workspace.html', label: 'Workspace', icon: 'workspace' }
    ];
    
    const onlineLinks = [
      { href: 'https://github.com/karakayautku4', label: 'GitHub', icon: 'github' },
      { href: 'https://tryhackme.com/p/karakayautku4', label: 'TryHackMe', icon: 'tryhackme' },
      { href: 'https://www.hackerrank.com/karakayautku4', label: 'HackerRank', icon: 'hackerrank' }
    ];
    
    const socialLinks = [
      { href: 'https://linkedin.com/in/karakayautku4', label: 'LinkedIn', icon: 'linkedin' },
      { href: 'https://x.com/karakayautku4', label: 'X', icon: 'x' },
      { href: 'https://instagram.com/karakayautku4', label: 'Instagram', icon: 'instagram' }
    ];
    
    return `
    <div class="profile-section">
      <img src="${pathPrefix}assets/images/profile.webp" alt="Utku Karakaya" class="profile-photo">
      <div class="profile-info">
        <a class="brand" href="${pathPrefix}index.html">Utku Karakaya</a>
        <p class="profile-title">Software Test Engineer</p>
      </div>
    </div>
    <nav class="nav">
      ${navItems.map(item => {
        const isActive = currentPage === item.href;
        let href;
        if (item.href === 'index.html') {
          href = pathPrefix ? `${pathPrefix}index.html` : `index.html`;
        } else {
          href = pathPrefix ? `${pathPrefix}pages/${item.href}` : `pages/${item.href}`;
        }
        return `
      <a href="${href}"${isActive ? ' aria-current="page"' : ''}>
        ${this.createSVG(this.icons[item.icon])}
        ${item.label}
      </a>`;
      }).join('')}
      <a href="${pathPrefix}Utku-Karakaya-CV.pdf" data-cv-download>
        ${this.createSVG(this.icons.cv)}
        CV
      </a>
      <h3 class="sidebar-title">Online</h3>
      <div class="social-links">
        ${onlineLinks.map(item => `
        <a href="${item.href}" target="_blank" rel="noopener noreferrer">
          ${this.createSVG(this.icons[item.icon])}
          <span>${item.label}</span>
          ${this.createSVG(this.icons.external, 12)}
        </a>`).join('')}
      </div>
      <h3 class="sidebar-title">Social</h3>
      <div class="social-links">
        ${socialLinks.map(item => `
        <a href="${item.href}" target="_blank" rel="noopener noreferrer">
          ${this.createSVG(this.icons[item.icon])}
          <span>${item.label}</span>
          ${this.createSVG(this.icons.external, 12)}
        </a>`).join('')}
      </div>
    </nav>`;
  }
  
  initSecondarySidebar(pageType) {
    // Add body class
    document.body.classList.add('with-secondary-sidebar');
    
    // Create secondary sidebar
    const secondarySidebar = document.createElement('aside');
    secondarySidebar.className = 'secondary-sidebar active';
    
    if (pageType === 'workspace') {
      secondarySidebar.innerHTML = `
        <h3>Workspace Items</h3>
        <nav class="secondary-sidebar-nav">
          <a href="#coming-soon">Coming soon...</a>
        </nav>
      `;
    } else if (pageType === 'projects') {
      secondarySidebar.innerHTML = `
        <h3>Projects</h3>
        <nav class="secondary-sidebar-nav">
          <a href="pythonleague.html">PythonLeague</a>
          <a href="#coming-soon">Coming soon...</a>
        </nav>
        
        <h3>Notes</h3>
        <nav class="secondary-sidebar-nav">
          <a href="#coming-soon">Coming soon...</a>
        </nav>
        
        <h3>Practice</h3>
        <nav class="secondary-sidebar-nav">
          <a href="#coming-soon">Coming soon...</a>
        </nav>
        
        <h3>Tools</h3>
        <nav class="secondary-sidebar-nav">
          <a href="#coming-soon">Coming soon...</a>
        </nav>
      `;
    }
    
    document.body.appendChild(secondarySidebar);
  }
}

// Initialize sidebar when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new Sidebar();
  });
} else {
  new Sidebar();
}
