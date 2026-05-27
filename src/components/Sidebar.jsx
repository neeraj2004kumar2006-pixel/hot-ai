import React, { useState } from 'react';
import ArticleCard from './ArticleCard';
import AdBanner from './AdBanner';

const SIDEBAR_TOPICS = ["ChatGPT", "LLM Fine-Tuning", "Stable Diffusion", "Android ADB", "iOS Shortcuts", "Prompt Engineering"];

const Sidebar = ({ popularArticles = [], onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const popular = popularArticles.slice(0, 4);
  const latest = popularArticles.slice(4, 7);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <aside className="desktop-sidebar" aria-label="Sidebar Content">
      {/* Sidebar Top Ad */}
      <AdBanner slot="sidebarTop" />

      {/* Popular Posts */}
      {popular.length > 0 && (
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--card-radius)', padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '800', borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '12px', color: 'var(--primary)' }}>
            POPULAR POSTS
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {popular.map((art) => <ArticleCard key={art.id} article={art} onNavigate={onNavigate} />)}
          </div>
        </div>
      )}

      {/* Sidebar Middle Ad */}
      <AdBanner slot="sidebarMiddle" />

      {/* Latest Stories */}
      {latest.length > 0 && (
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--card-radius)', padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '800', borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '12px', color: 'var(--secondary)' }}>
            LATEST STORIES
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {latest.map((art) => <ArticleCard key={art.id} article={art} onNavigate={onNavigate} />)}
          </div>
        </div>
      )}

      {/* Trending Topics */}
      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--card-radius)', padding: '20px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '800', borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '12px', color: 'var(--primary)' }}>
          TRENDING TOPICS
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {SIDEBAR_TOPICS.map((topic) => (
            <button
              key={topic}
              onClick={() => onNavigate('search', { query: topic })}
              style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-secondary)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', transition: 'var(--transition)', cursor: 'pointer' }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--text)'; }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
            >
              #{topic}
            </button>
          ))}
        </div>
      </div>

      {/* Coming Soon */}
      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: 'var(--card-radius)', padding: '20px', textAlign: 'center' }}>
        <div style={{ fontSize: '1.2rem', marginBottom: '8px' }}>📬</div>
        <h4 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text)', marginBottom: '6px' }}>Newsletter Signup</h4>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
          Get weekly AI insights and tech tips delivered to your inbox.
        </p>
        {subscribed ? (
          <div style={{ fontSize: '0.8rem', color: 'var(--success)', fontWeight: 'bold', padding: '10px', background: 'rgba(0,214,143,0.1)', borderRadius: 'var(--btn-radius)' }}>
            ✓ Subscribed successfully!
          </div>
        ) : (
          <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '6px', flexDirection: 'column' }}>
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--btn-radius)',
                color: 'var(--text)',
                fontSize: '0.8rem',
                textAlign: 'center'
              }}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '8px',
                background: 'var(--primary)',
                border: 'none',
                color: 'var(--text)',
                fontWeight: '700',
                fontSize: '0.8rem',
                borderRadius: 'var(--btn-radius)',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
              onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
              onMouseOut={(e) => e.currentTarget.style.filter = 'none'}
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
