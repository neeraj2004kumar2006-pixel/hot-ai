import React from 'react';
import { dummyArticles } from '../dummy-data/news-data';
import { generateSlug, truncateText } from '../utils/helpers';
import ImageWithFallback from './ImageWithFallback';

const RelatedPosts = ({ currentCategory, currentId, onNavigate }) => {
  const related = dummyArticles
    .filter(a => a.category === currentCategory && a.id !== currentId)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid var(--border)' }}>
      <h2 className="section-title">Related Posts</h2>

      <div className="related-posts-grid">
        {related.map((article) => (
          <div
            key={article.id}
            className="premium-card"
            style={{ cursor: 'pointer' }}
            onClick={() => onNavigate('article', { id: article.id, slug: generateSlug(article.title) })}
          >
            <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}>
              <ImageWithFallback
                src={article.featuredImage?.url}
                alt={article.featuredImage?.alt || article.title}
                width={400}
                height={250}
                loading="lazy"
              />
            </div>
            <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase' }}>
                {article.category}
              </span>
              <h3
                style={{ fontSize: '0.9rem', fontWeight: '700', lineHeight: '1.3', color: '#FFFFFF', transition: 'color 0.2s ease' }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                onMouseOut={(e) => e.currentTarget.style.color = '#FFFFFF'}
              >
                {truncateText(article.title, 60)}
              </h3>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                {article.publishDate instanceof Date ? article.publishDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;
