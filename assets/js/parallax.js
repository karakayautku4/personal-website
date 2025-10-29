/**
 * Parallax Effect
 * Subtle parallax scrolling for hero and elements
 */

class ParallaxEffect {
  constructor() {
    this.elements = [];
    this.ticking = false;
    this.init();
  }
  
  init() {
    // Check for reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    
    this.setupElements();
    this.addEventListeners();
    this.update();
  }
  
  setupElements() {
    // Hero section parallax
    const hero = document.querySelector('.hero');
    if (hero) {
      this.elements.push({
        element: hero,
        speed: 0.3,
        type: 'translateY'
      });
    }
    
    // Cards parallax (subtle)
    const cards = document.querySelectorAll('.card, .company-card');
    cards.forEach((card, index) => {
      this.elements.push({
        element: card,
        speed: 0.05 + (index * 0.01),
        type: 'translateY'
      });
    });
    
    // Background pattern parallax
    const body = document.body;
    if (body && window.getComputedStyle(body).backgroundImage !== 'none') {
      this.elements.push({
        element: body,
        speed: 0.5,
        type: 'backgroundPosition'
      });
    }
  }
  
  addEventListeners() {
    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.update();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }, { passive: true });
  }
  
  update() {
    const scrollY = window.pageYOffset;
    
    this.elements.forEach(({ element, speed, type }) => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (!elementVisible) return;
      
      const offset = (scrollY - elementTop) * speed;
      
      if (type === 'translateY') {
        element.style.transform = `translateY(${offset}px)`;
      } else if (type === 'backgroundPosition') {
        element.style.backgroundPosition = `center ${offset}px`;
      }
    });
  }
}

// Initialize parallax
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ParallaxEffect();
  });
} else {
  new ParallaxEffect();
}
