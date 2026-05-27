import React from 'react';
import { getTechTricks } from '../utils/dataStore';

const TechTricks = ({ onNavigate }) => {
  const tricks = getTechTricks();

  return (
    <div style={{ paddingBottom: '30px' }} aria-labelledby="tricks-page-title">
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '24px' }}>
        <h1 id="tricks-page-title" style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text)' }}>
          Tech & Mobile Tricks
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          Practical tech tutorials and mobile optimization guides for power users.
        </p>
      </div>

      <div className="grid-3-col" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {tricks.map((trick) => (
          <div key={trick.id} className="premium-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '15px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span
                  onClick={() => onNavigate && onNavigate('category', { name: trick.category })}
                  style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', cursor: 'pointer' }}
                >{trick.category}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{trick.readingTime}</span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text)', marginBottom: '10px' }}>{trick.name}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{trick.excerpt}</p>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
              <span
                style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: '700', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                onClick={() => onNavigate && onNavigate('article', { id: trick.id, slug: trick.slug })}
              >
                Read Guide
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechTricks;
