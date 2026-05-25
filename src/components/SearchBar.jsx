import React, { useState } from 'react';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [query, setQuery] = useState(initialValue);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        alignItems: 'center',
        background: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--btn-radius)',
        padding: '6px 12px',
        width: '100%',
        maxWidth: '400px',
        transition: 'all 0.2s ease'
      }}
      className="search-form-container"
    >
      <input
        type="text"
        placeholder="Search AI and tech tricks..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          flex: 1,
          fontSize: '0.9rem',
          color: 'var(--text)',
          background: 'none',
          border: 'none',
          outline: 'none'
        }}
        aria-label="Search posts"
      />
      <button 
        type="submit" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          padding: '2px'
        }}
        aria-label="Submit Search"
      >
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
