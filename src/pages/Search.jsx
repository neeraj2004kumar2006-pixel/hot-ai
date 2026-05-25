import React, { useState } from 'react';
import { dummyArticles } from '../dummy-data/news-data';
import SearchBar from '../components/SearchBar';
import NewsCard from '../components/NewsCard';

const Search = ({ params = {}, onNavigate }) => {
  const initialQuery = params.query || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [results, setResults] = useState(
    initialQuery
      ? dummyArticles.filter(art => art.title.toLowerCase().includes(initialQuery.toLowerCase()))
      : dummyArticles.slice(0, 6)
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) { setResults(dummyArticles.slice(0, 6)); return; }
    const q = query.toLowerCase();
    const filtered = dummyArticles.filter(
      (art) =>
        art.title.toLowerCase().includes(q) ||
        art.category.toLowerCase().includes(q) ||
        (art.excerpt && art.excerpt.toLowerCase().includes(q))
    );
    setResults(filtered);
  };

  return (
    <div style={{ paddingBottom: '30px' }} aria-labelledby="search-page-title">
      <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 40px' }}>
        <h1 id="search-page-title" style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '15px', color: '#FFFFFF' }}>
          Explore <span style={{ color: 'var(--primary)' }}>Hot AI</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '25px' }}>
          Search across AI news, tech tutorials, and tool reviews instantly.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
        </div>
      </div>

      <div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '20px', color: 'var(--text)', borderLeft: '3px solid var(--primary)', paddingLeft: '10px' }}>
          {searchQuery ? `Results for "${searchQuery}"` : "Featured AI News & Tech Guides"}
        </h2>

        {results.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)', background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px' }}>
            <p style={{ marginBottom: '10px', fontSize: '1.1rem', color: '#FFFFFF', fontWeight: '600' }}>No matches found</p>
            <p style={{ fontSize: '0.85rem' }}>Try different keywords or browse categories for more content.</p>
          </div>
        ) : (
          <div className="grid-3-col">
            {results.map((article) => (
              <NewsCard key={article.id} article={article} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
