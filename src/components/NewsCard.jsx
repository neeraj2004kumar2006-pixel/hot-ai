import React from 'react';
import { truncateText, generateSlug } from '../utils/helpers';
import ImageWithFallback from './ImageWithFallback';
import { motion } from 'framer-motion';

const NewsCard = ({ article, onNavigate }) => {
  const slug = article.slug || generateSlug(article.title);

  const handleClick = (e) => {
    e.preventDefault();
    if (onNavigate) {
      if (article.isAiTool) {
        onNavigate('ai-tools');
      } else {
        onNavigate('article', { id: article.id, slug });
      }
    }
  };

  const dateStr = article.publishDate instanceof Date
    ? article.publishDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : '';

  return (
    <div className="layered-card-wrapper" style={{ height: '100%' }}>
      <motion.article 
        className="premium-card" 
        style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
        whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.06)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <motion.div 
          style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', position: 'relative', borderBottomLeftRadius: '20px', borderBottomRightRadius: '5px' }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
        <ImageWithFallback
          src={article.featuredImage?.url}
          alt={article.featuredImage?.alt || article.title}
          width={article.featuredImage?.width || 1200}
          height={article.featuredImage?.height || 675}
          loading="lazy"
        />
        <span className="category-badge" style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 2 }}>
          {article.category}
        </span>
      </motion.div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          {dateStr && <span>{dateStr}</span>}
          {dateStr && article.readingTime && <span>•</span>}
          {article.readingTime && <span>{article.readingTime}</span>}
        </div>

        <h3
          style={{ fontSize: '1.05rem', fontWeight: '700', lineHeight: '1.4', color: 'var(--text)', cursor: 'pointer', transition: 'color 0.2s ease' }}
          onClick={handleClick}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--text)'}
        >
          {truncateText(article.title, 70)}
        </h3>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5', flex: 1 }}>
          {truncateText(article.excerpt, 100)}
        </p>

        {article.author && (
          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
            By {article.author.name}
          </span>
        )}

        <a
          href={article.isAiTool ? '#/ai-tools' : `#/article/${slug}`}
          onClick={handleClick}
          style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--primary)', display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '4px', width: 'fit-content' }}
        >
          {article.isAiTool ? 'View Directory' : 'Read More'}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
        </div>
      </motion.article>
    </div>
  );
};

export default NewsCard;
