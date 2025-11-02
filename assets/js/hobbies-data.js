/**
 * Hobbies Data
 * Central data source for hobbies and collections
 * 
 * To add a new hobby item:
 * 1. Add to appropriate category array below
 * 2. Use this template:
 * {
 *   id: 'unique-slug',
 *   name: 'Item Name',
 *   category: 'Category Name',
 *   details: 'Additional details', // optional
 *   url: 'https://example.com', // product or info URL
 *   image: 'https://example.com/image.jpg', // optional, will use emoji fallback
 *   description: 'Brief description of the item',
 *   specs: { // optional object for technical specs
 *     key1: 'value1',
 *     key2: 'value2'
 *   }
 * }
 */

const HOBBIES_DATA = {
  watches: [
    {
      id: 'seiko-srpg29k1',
      name: 'Seiko 5 Sports SRPG29K1',
      category: 'Automatic Watch',
      details: 'Field Watch',
      url: 'https://www.seikowatches.com/global-en/products/5sports/srpg29',
      image: 'https://www.seikowatches.com/global-en/-/media/Images/Product--Image/All/Seiko/2022/02/20/02/37/SRPG29K1/SRPG29K1.png?mh=1200&mw=1200',
      description: 'Japanese automatic movement with 40-hour power reserve. A reliable daily companion.',
      specs: {
        movement: 'Automatic 4R36',
        diameter: '39.4mm',
        waterResistance: '100m'
      }
    }
  ],
  
  books: [
    // Add book collection items here
  ],
  
  cameras: [
    // Add camera collection items here
  ]
};

/**
 * Hobbies API
 * Centralized methods for hobby operations
 */
const HobbiesAPI = {
  /**
   * Get all hobby items as a flat array
   */
  getAll() {
    return [
      ...HOBBIES_DATA.watches,
      ...HOBBIES_DATA.books,
      ...HOBBIES_DATA.cameras
    ];
  },

  /**
   * Get hobby items grouped by category
   */
  getByCategory() {
    const categories = {};
    
    if (HOBBIES_DATA.watches.length > 0) {
      categories['Watch Collection'] = HOBBIES_DATA.watches;
    }
    if (HOBBIES_DATA.books.length > 0) {
      categories['Book Collection'] = HOBBIES_DATA.books;
    }
    if (HOBBIES_DATA.cameras.length > 0) {
      categories['Camera Gear'] = HOBBIES_DATA.cameras;
    }
    
    return categories;
  },

  /**
   * Get emoji for hobby
   */
  getEmoji(id) {
    const emojiMap = {
      'seiko-srpg29k1': '⌚'
    };
    return emojiMap[id] || '🎯';
  },

  /**
   * Create specs HTML
   */
  renderSpecs(specs) {
    if (!specs) return '';
    return Object.entries(specs)
      .map(([key, value]) => `<div class="hobby-spec"><span>${key}:</span>${value}</div>`)
      .join('');
  },

  /**
   * Create hobby card template
   */
  createCardTemplate(item) {
    const detailsText = item.details ? ` · ${item.details}` : '';
    const emoji = this.getEmoji(item.id);
    const specsHTML = this.renderSpecs(item.specs);
    
    return `
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="hobby-showcase" id="${item.id}">
        <div class="hobby-image-section">
          ${item.image ? `<img src="${item.image}" alt="${item.name}" class="hobby-image">` : `<div class="hobby-emoji">${emoji}</div>`}
        </div>
        <div class="hobby-details">
          <div class="hobby-header">
            <p class="hobby-category">${item.category}${detailsText}</p>
            <h3>${item.name}</h3>
          </div>
          ${item.description ? `<p class="hobby-description">${item.description}</p>` : ''}
          ${specsHTML ? `<div class="hobby-specs">${specsHTML}</div>` : ''}
        </div>
      </a>`;
  }
};

/**
 * Generate HTML for hobbies grid (all items)
 */
function generateHobbiesGrid() {
  const items = HobbiesAPI.getAll();
  return items.map(item => HobbiesAPI.createCardTemplate(item)).join('\n');
}

/**
 * Generate HTML for all hobby sections
 * Automatically creates sections for each category
 */
function generateHobbiesSections() {
  const categories = HobbiesAPI.getByCategory();
  const categoryDescriptions = {
    'Watch Collection': 'Mechanical and automatic timepieces I admire',
    'Book Collection': 'Books that shaped my thinking',
    'Camera Gear': 'Photography equipment and tools'
  };
  
  return Object.entries(categories).map(([categoryName, items]) => {
    const description = categoryDescriptions[categoryName] || '';
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
    
    return `
      <section class="section">
        <h2>${categoryName}</h2>
        ${description ? `<p class="text-muted">${description}</p>` : ''}
        <div class="workspace-grid hobbies-grid" id="${categorySlug}">
          ${items.map(item => HobbiesAPI.createCardTemplate(item)).join('\n')}
        </div>
      </section>`;
  }).join('\n');
}

/**
 * Get sidebar menu structure for hobbies
 */
function getHobbiesSidebarData() {
  const categories = HobbiesAPI.getByCategory();
  const totalCount = HobbiesAPI.getAll().length;
  
  // SVG watch icon matching watch collection theme
  const watchIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin-right: 6px;"><circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path></svg>';
  
  return {
    title: 'Hobbies',
    sections: Object.entries(categories).map(([heading, items]) => ({
      heading: heading === 'Watch Collection' 
        ? `<span class="category-with-icon">${watchIcon}Watches</span><span class="count-badge">${totalCount}</span>` 
        : heading,
      links: items.map(item => ({
        href: `#${item.id}`,
        label: item.name
      }))
    }))
  };
}
