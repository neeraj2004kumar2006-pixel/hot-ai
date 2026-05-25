import React, { useState } from 'react';
import { getArticles, getTechTricks, getAiTools } from '../utils/dataStore';
import SearchBar from '../components/SearchBar';
import NewsCard from '../components/NewsCard';

const Search = ({ params = {}, onNavigate }) => {
  const initialQuery = params.query || '';
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const performSearch = (query) => {
    const allArticles = getArticles();
    const allTech = getTechTricks();
    const allTools = getAiTools();

    if (!query.trim()) {
      return allArticles.slice(0, 6);
    }

    const q = query.toLowerCase();

    // Filter news articles
    const matchedArticles = allArticles.filter(art => 
      art.title.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q) ||
      (art.excerpt && art.excerpt.toLowerCase().includes(q))
    );

    // Filter tech tricks and map to article shape
    const matchedTech = allTech.filter(trick => 
      trick.name.toLowerCase().includes(q) ||
      trick.category.toLowerCase().includes(q) ||
      (trick.excerpt && trick.excerpt.toLowerCase().includes(q))
    ).map(t => ({
      id: t.id,
      title: t.name,
      category: t.category,
      excerpt: t.excerpt,
      featuredImage: t.featuredImage,
      author: t.author,
      publishDate: t.publishDate,
      readingTime: t.readingTime,
      isTechTrick: true,
      slug: t.slug
    }));

    // Filter AI tools and map to article shape
    const matchedTools = allTools.filter(tool => 
      tool.name.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q) ||
      (tool.description && tool.description.toLowerCase().includes(q))
    ).map(tool => ({
      id: tool.id,
      title: `${tool.name} — AI Tool`,
      category: 'AI Tools',
      excerpt: tool.description,
      featuredImage: { url: tool.logo, alt: tool.name },
      isAiTool: true,
      slug: tool.slug
    }));

    return [...matchedArticles, ...matchedTech, ...matchedTools];
  };

  const [results, setResults] = useState(() => performSearch(initialQuery));

  const handleSearch = (query) => {
    setSearchQuery(query);
    setResults(performSearch(query));
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
            {results.map((article, index) => (
              <NewsCard key={`${article.id}-${index}`} article={article} onNavigate={onNavigate} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
