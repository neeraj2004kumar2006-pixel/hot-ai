import React from 'react';
import { getArticles } from '../utils/dataStore';
import NewsCard from '../components/NewsCard';

const Category = ({ params = {}, onNavigate }) => {
  const categoryName = params.name || 'AI News';
  const articles = getArticles();
  const filteredArticles = articles.filter(
    (art) => art.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div style={{ paddingBottom: '30px' }} aria-labelledby="category-page-title">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '24px' }}>
        <h1 id="category-page-title" style={{ fontSize: '1.8rem', fontWeight: '800', color: '#FFFFFF' }}>
          {categoryName}
        </h1>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          {filteredArticles.length} {filteredArticles.length === 1 ? 'Article' : 'Articles'}
        </span>
      </div>

      {filteredArticles.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px' }}>
          <p>No articles found in this category yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid-3-col">
          {filteredArticles.map((article) => (
            <NewsCard key={article.id} article={article} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
