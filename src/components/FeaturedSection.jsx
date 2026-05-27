import React from 'react';
import NewsCard from './NewsCard';
import PremiumCarousel from './PremiumCarousel';

const FeaturedSection = ({ articles = [], onNavigate }) => {
  const featuredArticles = articles.slice(4, 10);

  // Phase 7: Don't render if too few articles
  if (featuredArticles.length < 2) return null;

  return (
    <section style={{ marginBottom: '40px' }} aria-labelledby="featured-title">
      <h2 id="featured-title" className="section-title">Featured AI News</h2>

      <PremiumCarousel itemGap="20px">
        {featuredArticles.map((article) => (
          <div key={article.id} style={{ minWidth: '280px', maxWidth: '300px', height: '100%' }}>
            <NewsCard article={article} onNavigate={onNavigate} />
          </div>
        ))}
      </PremiumCarousel>
    </section>
  );
};

export default FeaturedSection;
