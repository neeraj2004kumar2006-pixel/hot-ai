import React from 'react';
import { getAiTools } from '../utils/dataStore';

const AiTools = ({ onNavigate }) => {
  const tools = getAiTools();

  return (
    <div style={{ paddingBottom: '30px' }} aria-labelledby="tools-page-title">
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '24px' }}>
        <h1 id="tools-page-title" style={{ fontSize: '1.8rem', fontWeight: '800', color: '#FFFFFF' }}>
          Verified AI Tools Directory
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          Expert-reviewed AI tools with real-world testing and practical implementation guides.
        </p>
      </div>

      <div className="grid-3-col" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
        {tools.map((tool) => (
          <div key={tool.id} className="premium-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '15px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#FFFFFF' }}>{tool.name}</h3>
                  <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase' }}>{tool.category}</span>
                </div>
                {tool.verified && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#242938', padding: '4px 8px', borderRadius: '6px' }}>
                    <span style={{ color: '#00D68F', fontSize: '0.85rem' }}>✓</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#FFFFFF' }}>Verified</span>
                  </div>
                )}
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{tool.description}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                {tool.tags && tool.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} style={{ fontSize: '0.7rem', background: '#242938', color: 'var(--primary)', padding: '3px 8px', borderRadius: '4px', fontWeight: '600' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '15px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-secondary)' }}>
                {tool.pricing === 'freemium' ? 'Freemium' : tool.pricing === 'free-trial' ? 'Free Trial' : tool.pricing === 'open-source' ? 'Open Source' : 'Paid'}
              </span>
              <a href={tool.website} target="_blank" rel="noopener noreferrer" style={{ background: 'var(--primary)', color: '#FFFFFF', padding: '6px 12px', borderRadius: 'var(--btn-radius)', fontSize: '0.75rem', fontWeight: '700', transition: 'var(--transition)' }}
                onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.15)'}
                onMouseOut={(e) => e.currentTarget.style.filter = 'none'}
              >Visit Site ↗</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;
