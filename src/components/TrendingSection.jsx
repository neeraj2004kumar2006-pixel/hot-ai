import React from 'react';
import { generateSlug, truncateText } from '../utils/helpers';
import ImageWithFallback from './ImageWithFallback';

const TrendingSection = ({ articles = [], onNavigate }) => {
  const trendingArticles = articles.slice(0, 5);

  // Phase 7: Don't render if too few articles
  if (trendingArticles.length < 3) return null;

  const handleArticleClick = (e, article) => {
    e.preventDefault();
    if (onNavigate) onNavigate('article', { id: article.id, slug: generateSlug(article.title) });
  };

  return (
    <section style={{ marginBottom: '45px' }} aria-labelledby="trending-title">
      <h2 id="trending-title" className="section-title">Trending Now</h2>

      <div className="trending-grid">
        {trendingArticles.map((article, index) => (
          <div
            key={article.id}
            className="premium-card"
            style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', minHeight: '180px' }}
            onClick={(e) => handleArticleClick(e, article)}
          >
            {/* Thumbnail */}
            <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}>
              <ImageWithFallback
                src={article.featuredImage?.url}
                alt={article.featuredImage?.alt || article.title}
                width={400}
                height={250}
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
              {/* Rank + Category */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontSize: '1rem', fontWeight: '900', lineHeight: '1',
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  userSelect: 'none'
                }}>
                  #{index + 1}
                </span>
                <span style={{ fontSize: '0.65rem', fontWeight: '700', color: 'var(--secondary)', textTransform: 'uppercase' }}>
                  {article.category}
                </span>
              </div>

              <h3
                style={{ fontSize: '0.85rem', fontWeight: '700', lineHeight: '1.35', color: '#FFFFFF', transition: 'color 0.2s ease' }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                onMouseOut={(e) => e.currentTarget.style.color = '#FFFFFF'}
              >
                {truncateText(article.title, 60)}
              </h3>

              <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: 'auto' }}>
                {article.publishDate instanceof Date ? article.publishDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
