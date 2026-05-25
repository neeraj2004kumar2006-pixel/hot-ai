import React from 'react';

const NotFound = ({ onNavigate }) => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '20px'
      }}
    >
      <h1 
        style={{
          fontSize: '6rem',
          fontWeight: '900',
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: '1',
          marginBottom: '20px'
        }}
      >
        404
      </h1>
      
      <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '10px' }}>
        Tweak Not Found
      </h2>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '400px', lineHeight: '1.6', marginBottom: '30px' }}>
        The tech trick, AI guide, or parameter page you are looking for has either evolved to the next version or been relocated.
      </p>

      <button
        onClick={() => onNavigate('home')}
        style={{
          background: 'var(--primary)',
          color: '#FFFFFF',
          padding: '12px 24px',
          borderRadius: 'var(--btn-radius)',
          fontSize: '0.85rem',
          fontWeight: '700',
          transition: 'var(--transition)'
        }}
        onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.filter = 'none'}
      >
        Return to Home Stream
      </button>
    </div>
  );
};

export default NotFound;
