import React, { useEffect } from 'react';
import { updateMetaTags } from '../utils/helpers';

const NotFound = ({ onNavigate }) => {
  useEffect(() => {
    updateMetaTags({
      title: 'Page Not Found - Hot AI',
      description: 'The page you are looking for could not be found.',
      url: window.location.href
    });
  }, []);

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        textAlign: 'center',
        padding: '20px'
      }}
    >
      <div style={{ marginBottom: '30px' }}>
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </div>

      <h1 
        style={{
          fontSize: '5rem',
          fontWeight: '900',
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1',
          marginBottom: '10px'
        }}
      >
        404
      </h1>
      
      <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text)', marginBottom: '12px' }}>
        Page Not Found
      </h2>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '420px', lineHeight: '1.6', marginBottom: '36px' }}>
        Oops! The page you're looking for doesn't exist. It might have been moved, deleted, or you may have mistyped the URL.
      </p>

      <button
        onClick={() => onNavigate('home')}
        style={{
          background: 'var(--primary)',
          color: 'var(--text)',
          padding: '14px 28px',
          borderRadius: 'var(--btn-radius)',
          fontSize: '0.9rem',
          fontWeight: '700',
          transition: 'var(--transition)',
          border: 'none',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.filter = 'none'}
      >
        Back Home
      </button>
    </div>
  );
};

export default NotFound;
