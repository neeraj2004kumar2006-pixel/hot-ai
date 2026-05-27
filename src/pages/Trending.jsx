import React from 'react';
import { getArticles } from '../utils/dataStore';
import NewsCard from '../components/NewsCard';

const Trending = ({ onNavigate }) => {
  const articles = getArticles();
  const trendingArticles = articles.slice(0, 6);

  return (
    <div style={{ paddingBottom: '30px' }} aria-labelledby="trending-page-title">
      <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '24px' }}>
        <h1 id="trending-page-title" style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text)' }}>
          Trending Now
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          Most-read articles based on reader engagement this week.
        </p>
      </div>

      <div className="grid-3-col" style={{ marginTop: '20px' }}>
        {trendingArticles.map((article, index) => {
          const rankStr = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
          return (
            <div key={article.id} style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '15px', fontSize: '3.5rem', fontWeight: '900', color: 'var(--primary)', opacity: 0.12, zIndex: 10, pointerEvents: 'none', lineHeight: '1', fontFamily: 'system-ui' }}>
                {rankStr}
              </div>
              <NewsCard article={article} onNavigate={onNavigate} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;
