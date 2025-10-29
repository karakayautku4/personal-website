/**
 * Lazy Loading with Intersection Observer
 * Optimizes image and content loading
 */

class LazyLoader {
  constructor() {
    this.imageObserver = null;
    this.contentObserver = null;
    this.init();
  }
  
  init() {
    // Check for Intersection Observer support
    if (!('IntersectionObserver' in window)) {
      this.loadAllImages();
      return;
    }
    
    this.setupImageObserver();
    this.setupContentObserver();
    this.observeElements();
  }
  
  setupImageObserver() {
    const imageOptions = {
      root: null,
      rootMargin: '50px',
      threshold: 0.01
    };
    
    this.imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, imageOptions);
  }
  
  setupContentObserver() {
    const contentOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    this.contentObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, contentOptions);
  }
  
  observeElements() {
    // Observe images
    const lazyImages = document.querySelectorAll('img[data-src], img[loading="lazy"]');
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        this.imageObserver.observe(img);
      }
    });
    
    // Observe content for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in, .card, .company-card, .skills-card');
    fadeElements.forEach(el => {
      el.classList.add('fade-in-element');
      this.contentObserver.observe(el);
    });
  }
  
  loadImage(img) {
    if (img.dataset.src) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      img.classList.add('loaded');
    }
  }
  
  loadAllImages() {
    // Fallback for browsers without Intersection Observer
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    });
  }
}

// Initialize lazy loader
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new LazyLoader();
  });
} else {
  new LazyLoader();
}
