import React from 'react';
import { truncateText, generateSlug } from '../utils/helpers';
import ImageWithFallback from './ImageWithFallback';

const ArticleCard = ({ article, onNavigate }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate('article', { id: article.id, slug: generateSlug(article.title) });
  };

  const dateStr = article.publishDate instanceof Date
    ? article.publishDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : '';

  return (
    <div
      style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)', cursor: 'pointer' }}
      onClick={handleClick}
    >
      <div style={{ width: '70px', height: '50px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
        <ImageWithFallback
          src={article.featuredImage?.url}
          alt={article.featuredImage?.alt || article.title}
          width={70}
          height={50}
          loading="lazy"
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        <h4
          style={{ fontSize: '0.85rem', fontWeight: '600', lineHeight: '1.3', color: 'var(--text)', transition: 'color 0.2s ease' }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--text)'}
        >
          {truncateText(article.title, 55)}
        </h4>
        <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{dateStr}</span>
      </div>
    </div>
  );
};

export default ArticleCard;
