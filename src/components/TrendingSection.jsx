import React from 'react';
import { generateSlug, truncateText } from '../utils/helpers';
import ImageWithFallback from './ImageWithFallback';
import { motion } from 'framer-motion';

const TrendingSection = ({ articles = [], onNavigate }) => {
  const trendingArticles = articles.slice(0, 5);

  // Phase 7: Don't render if too few articles
  if (trendingArticles.length < 3) return null;

  const handleArticleClick = (e, article) => {
    e.preventDefault();
    if (onNavigate) onNavigate('article', { id: article.id, slug: generateSlug(article.title) });
  };

  return (
    <section style={{ marginBottom: '60px', position: 'relative' }} aria-labelledby="trending-title">
      <h2 id="trending-title" className="section-title">Trending Now</h2>

      <div style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '30px', margin: '0 -20px', padding: '0 20px 30px', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
        {trendingArticles.map((article, index) => (
          <motion.div
            key={article.id}
            className="layered-card-wrapper"
            style={{ minWidth: '280px', maxWidth: '280px', cursor: 'pointer', flexShrink: 0 }}
            onClick={(e) => handleArticleClick(e, article)}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.div 
              className="premium-card" 
              style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
              whileHover={{ y: -4 }}
            >
              {/* Thumbnail */}
              <div style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden' }}>
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }} style={{ width: '100%', height: '100%' }}>
                  <ImageWithFallback
                    src={article.featuredImage?.url}
                    alt={article.featuredImage?.alt || article.title}
                    width={400}
                    height={225}
                    loading="lazy"
                  />
                </motion.div>
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
                  style={{ fontSize: '0.85rem', fontWeight: '700', lineHeight: '1.35', color: 'var(--text)', transition: 'color 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text)'}
                >
                  {truncateText(article.title, 60)}
                </h3>

                <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', marginTop: 'auto' }}>
                  {article.publishDate instanceof Date ? article.publishDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrendingSection;
