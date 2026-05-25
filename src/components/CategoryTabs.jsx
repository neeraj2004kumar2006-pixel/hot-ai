import React from 'react';

const CATEGORIES = [
  "All",
  "AI News",
  "Tech Tricks",
  "AI Tools",
  "ChatGPT",
  "Mobile Tips",
  "Apps",
  "Updates"
];

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  return (
    <div 
      style={{
        display: 'flex',
        gap: '10px',
        overflowX: 'auto',
        padding: '5px 0 15px',
        margin: '10px 0 25px',
        scrollbarWidth: 'none', // For Firefox
        msOverflowStyle: 'none' // For IE/Edge
      }}
      className="category-tabs-container"
    >
      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '0.85rem',
              fontWeight: '600',
              whiteSpace: 'nowrap',
              background: isActive 
                ? 'linear-gradient(135deg, var(--primary), var(--secondary))' 
                : 'var(--card-bg)',
              color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
              border: `1px solid ${isActive ? 'transparent' : 'var(--border)'}`,
              transition: 'var(--transition)'
            }}
            className="category-pill-btn"
            aria-pressed={isActive}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;
