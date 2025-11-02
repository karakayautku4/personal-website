/**
 * Bookmarks Data
 * Central data source for favorite websites and resources
 * 
 * To add a new bookmark:
 * 1. Add to appropriate category array below
 * 2. Use this template:
 * {
 *   id: 'unique-slug',
 *   title: 'Bookmark Title',
 *   author: 'Author Name', // optional
 *   category: 'Category Name',
 *   url: 'https://example.com',
 *   favicon: 'https://example.com/favicon.ico', // optional, will use emoji fallback
 *   description: 'Brief description of the bookmark',
 *   tags: ['Tag1', 'Tag2', 'Tag3']
 * }
 */

const BOOKMARKS_DATA = {
  articles: [
    {
      id: 'mechanical-watch',
      title: 'Mechanical Watch',
      author: 'Bartosz Ciechanowski',
      category: 'Articles',
      url: 'https://ciechanow.ski/mechanical-watch/',
      favicon: 'https://ciechanow.ski/favicon.ico',
      description: 'An absolutely stunning interactive explanation of how mechanical watches work. Beautiful visualizations and deep dive into horology.',
      tags: ['Engineering', 'Interactive', 'Watches']
    }
  ],
  
  tools: [
    // Add tool bookmarks here
  ],
  
  learning: [
    // Add learning resource bookmarks here
  ],
  
  inspiration: [
    // Add inspiration bookmarks here
  ]
};

/**
 * Bookmarks API
 * Centralized methods for bookmark operations
 */
const BookmarksAPI = {
  /**
   * Get all bookmarks as a flat array
   */
  getAll() {
    return [
      ...BOOKMARKS_DATA.articles,
      ...BOOKMARKS_DATA.tools,
      ...BOOKMARKS_DATA.learning,
      ...BOOKMARKS_DATA.inspiration
    ];
  },

  /**
   * Get bookmarks grouped by category
   */
  getByCategory() {
    const categories = {};
    
    if (BOOKMARKS_DATA.articles.length > 0) {
      categories['Articles'] = BOOKMARKS_DATA.articles;
    }
    if (BOOKMARKS_DATA.tools.length > 0) {
      categories['Tools'] = BOOKMARKS_DATA.tools;
    }
    if (BOOKMARKS_DATA.learning.length > 0) {
      categories['Learning'] = BOOKMARKS_DATA.learning;
    }
    if (BOOKMARKS_DATA.inspiration.length > 0) {
      categories['Inspiration'] = BOOKMARKS_DATA.inspiration;
    }
    
    return categories;
  },

  /**
   * Render favicon or fallback emoji
   */
  renderIcon(item) {
    if (item.favicon) {
      return `<img src="${item.favicon}" alt="${item.title}" class="bookmark-favicon" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
              <span class="bookmark-emoji" style="display: none;">🔖</span>`;
    }
    return `<span class="bookmark-emoji">🔖</span>`;
  },

  /**
   * Render tags HTML
   */
  renderTags(tags) {
    if (!tags || tags.length === 0) return '';
    return `
      <div class="bookmark-tags">
        ${tags.map(tag => `<span class="bookmark-tag">${tag}</span>`).join('')}
      </div>`;
  },

  /**
   * Create bookmark card template
   */
  createCardTemplate(item) {
    return `
      <a href="${item.url}" 
         target="_blank" 
         rel="noopener noreferrer" 
         class="bookmark-card" 
         id="${item.id}"
         data-category="${item.category}">
        <div class="bookmark-icon">${this.renderIcon(item)}</div>
        <div class="bookmark-content">
          <div class="bookmark-header">
            <h3>${item.title}</h3>
            ${item.author ? `<span class="bookmark-author">by ${item.author}</span>` : ''}
          </div>
          ${item.description ? `<p class="bookmark-description">${item.description}</p>` : ''}
          <div class="bookmark-meta">
            <span class="bookmark-category">${item.category}</span>
            ${this.renderTags(item.tags)}
          </div>
        </div>
      </a>`;
  }
};

/**
 * Generate HTML for bookmarks list (Compact style)
 */
function generateBookmarksGrid() {
  const bookmarks = BookmarksAPI.getAll();
  return bookmarks.map(item => BookmarksAPI.createCardTemplate(item)).join('');
}

/**
 * Get sidebar menu structure for bookmarks
 */
function getBookmarksSidebarData() {
  const categories = BookmarksAPI.getByCategory();
  const totalCount = BookmarksAPI.getAll().length;
  
  // SVG bookmark icon matching sidebar
  const bookmarkIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin-right: 6px;"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>';
  
  return {
    title: 'Bookmarks',
    sections: Object.entries(categories).map(([heading, items]) => ({
      heading: heading === 'Articles' 
        ? `<span class="category-with-icon">${bookmarkIcon}Bookmarks</span><span class="count-badge">${totalCount}</span>` 
        : heading,
      links: items.map(item => ({
        href: `#${item.id}`,
        label: item.title
      }))
    }))
  };
}
