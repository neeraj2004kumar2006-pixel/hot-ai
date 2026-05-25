import React from 'react';
import NewsCard from './NewsCard';

const FeaturedSection = ({ articles = [], onNavigate }) => {
  const featuredArticles = articles.slice(4, 10);

  // Phase 7: Don't render if too few articles
  if (featuredArticles.length < 2) return null;

  return (
    <section style={{ marginBottom: '40px' }} aria-labelledby="featured-title">
      <h2 id="featured-title" className="section-title">Featured AI News</h2>

      <div className="grid-3-col">
        {featuredArticles.map((article) => (
          <NewsCard key={article.id} article={article} onNavigate={onNavigate} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
