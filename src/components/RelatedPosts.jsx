import React, { useState, useEffect } from 'react';
import { getArticles, getTechTricks, getAiTools } from '../utils/dataStore';
import { generateSlug, truncateText } from '../utils/helpers';
import ImageWithFallback from './ImageWithFallback';

const RelatedPosts = ({ currentCategory, currentTags = [], currentId, onNavigate }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    // Collect all posts
    const allContent = [
      ...getArticles(),
      ...getTechTricks(),
      ...getAiTools()
    ].filter(a => a.status !== 'draft' && a.id !== currentId);

    // Score them based on relation
    const scored = allContent.map(post => {
      let score = 0;
      if (post.category === currentCategory) score += 10;
      
      const postTags = Array.isArray(post.tags) ? post.tags : [];
      const commonTags = postTags.filter(t => currentTags.includes(t)).length;
      score += commonTags * 2;
      
      return { post, score };
    });

    // Sort by score descending, then by newest (ID descending as proxy)
    scored.sort((a, b) => b.score - a.score || b.post.id - a.post.id);
    
    setRelated(scored.map(s => s.post).slice(0, 3));
  }, [currentCategory, currentTags, currentId]);

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
                style={{ fontSize: '0.9rem', fontWeight: '700', lineHeight: '1.3', color: 'var(--text)', transition: 'color 0.2s ease' }}
                onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--text)'}
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
