/**
 * Navigation Module
 * Handles mobile navigation toggle and overlay
 */

class Navigation {
  constructor() {
    this.navToggle = null;
    this.nav = null;
    this.navOverlay = null;
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    // Get references
    this.header = document.querySelector('.site-header');
    this.nav = document.querySelector('.nav');
    
    // Create mobile nav toggle button
    this.createNavToggle();
    
    // Create overlay
    this.createOverlay();
    
    // Bind events
    this.bindEvents();
    
    // Handle window resize
    this.handleResize();
  }
  
  createNavToggle() {
    const header = document.querySelector('.site-header');
    
    if (!header) return;
    
    // Check if toggle already exists
    if (document.querySelector('.nav-toggle')) return;
    
    const toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Toggle navigation menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.innerHTML = `
      <span></span>
      <span></span>
      <span></span>
    `;
    
    // Append to body (not header, since header is sidebar)
    document.body.appendChild(toggle);
    this.navToggle = toggle;
  }
  
  createOverlay() {
    // Check if overlay already exists
    if (document.querySelector('.nav-overlay')) {
      this.navOverlay = document.querySelector('.nav-overlay');
      return;
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    document.body.appendChild(overlay);
    this.navOverlay = overlay;
  }
  
  bindEvents() {
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggle());
    }
    
    if (this.navOverlay) {
      this.navOverlay.addEventListener('click', () => this.close());
    }
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });
    
    // Handle CV download confirmation
    this.handleCVDownload();
    
    // Close on nav link click (mobile)
    if (this.nav) {
      const links = this.nav.querySelectorAll('a:not([data-cv-download])');
      links.forEach(link => {
        link.addEventListener('click', () => {
          if (window.innerWidth <= 768) {
            this.close();
          }
        });
      });
    }
    
    // Handle window resize
    window.addEventListener('resize', () => this.handleResize());
  }
  
  handleCVDownload() {
    const cvLinks = document.querySelectorAll('a[data-cv-download]');
    cvLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create custom modal
        const modal = document.createElement('div');
        modal.className = 'cv-modal';
        modal.innerHTML = `
          <div class="cv-modal-overlay"></div>
          <div class="cv-modal-content">
            <div class="cv-modal-header">
              <h3>Download CV</h3>
              <button class="cv-modal-close" aria-label="Close">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div class="cv-modal-body">
              <p>Would you like to download my CV?</p>
            </div>
            <div class="cv-modal-footer">
              <button class="cv-modal-btn cv-modal-cancel">Cancel</button>
              <button class="cv-modal-btn cv-modal-confirm">Download</button>
            </div>
          </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        // Animate in
        requestAnimationFrame(() => {
          modal.classList.add('active');
        });
        
        const closeModal = () => {
          modal.classList.remove('active');
          document.body.style.overflow = '';
          setTimeout(() => {
            document.body.removeChild(modal);
          }, 200);
        };
        
        // Handle close
        modal.querySelector('.cv-modal-close').addEventListener('click', closeModal);
        modal.querySelector('.cv-modal-cancel').addEventListener('click', closeModal);
        modal.querySelector('.cv-modal-overlay').addEventListener('click', closeModal);
        
        // Handle download
        modal.querySelector('.cv-modal-confirm').addEventListener('click', () => {
          const url = link.getAttribute('href');
          const tempLink = document.createElement('a');
          tempLink.href = url;
          tempLink.download = url.split('/').pop();
          document.body.appendChild(tempLink);
          tempLink.click();
          document.body.removeChild(tempLink);
          closeModal();
        });
        
        // Handle escape key
        const handleEscape = (e) => {
          if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
          }
        };
        document.addEventListener('keydown', handleEscape);
        
        // Close mobile nav if open
        if (window.innerWidth <= 768 && this.isOpen) {
          this.close();
        }
      });
    });
  }
  
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }
  
  open() {
    this.isOpen = true;
    this.navToggle?.classList.add('active');
    this.header?.classList.add('active');
    this.navOverlay?.classList.add('active');
    this.navToggle?.setAttribute('aria-expanded', 'true');
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
  }
  
  close() {
    this.isOpen = false;
    this.navToggle?.classList.remove('active');
    this.header?.classList.remove('active');
    this.navOverlay?.classList.remove('active');
    this.navToggle?.setAttribute('aria-expanded', 'false');
    
    // Restore body scroll
    document.body.style.overflow = '';
  }
  
  handleResize() {
    // Close nav if window is resized to desktop size
    if (window.innerWidth > 768 && this.isOpen) {
      this.close();
    }
  }
}

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
  });
} else {
  new Navigation();
}
