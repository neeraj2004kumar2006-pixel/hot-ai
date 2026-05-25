import React, { useEffect } from 'react';
import { dummyArticles } from '../dummy-data/news-data';
import RelatedPosts from '../components/RelatedPosts';
import AdBanner from '../components/AdBanner';
import { generateSlug } from '../utils/helpers';
import ImageWithFallback from '../components/ImageWithFallback';

const Article = ({ params = {}, onNavigate }) => {
  const articleId = parseInt(params.id, 10) || 1;
  const article = dummyArticles.find((art) => art.id === articleId) || dummyArticles[0];

  const handlePrevClick = () => {
    const prevId = Math.max(1, articleId - 1);
    const prevArt = dummyArticles.find((art) => art.id === prevId);
    if (prevArt) onNavigate('article', { id: prevId, slug: generateSlug(prevArt.title) });
  };

  const handleNextClick = () => {
    const nextId = Math.min(dummyArticles.length, articleId + 1);
    const nextArt = dummyArticles.find((art) => art.id === nextId);
    if (nextArt) onNavigate('article', { id: nextId, slug: generateSlug(nextArt.title) });
  };

  // Progress bar
  useEffect(() => {
    const bar = document.getElementById('article-progress-bar');
    if (!bar) return;
    const update = () => {
      const pct = Math.min(100, Math.max(0, (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100));
      bar.style.width = `${pct}%`;
    };
    window.addEventListener('scroll', update);
    update();
    return () => window.removeEventListener('scroll', update);
  }, []);

  const formatDate = (d) => d instanceof Date ? d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '';

  // Split content into paragraphs for ad injection
  const paragraphs = article.content.split('\n\n');

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <article>
        {/* Breadcrumb */}
        <nav style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '16px', display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => onNavigate('home')}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >Home</span>
          <span>›</span>
          <span style={{ cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => onNavigate('category', { name: article.category })}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
          >{article.category}</span>
          <span>›</span>
          <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Article</span>
        </nav>

        {/* Category badge & Metadata */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap' }}>
          <span className="category-badge">{article.category}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{formatDate(article.publishDate)}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{article.readingTime}</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', lineHeight: '1.25', marginBottom: '20px', color: '#FFFFFF' }}>
          {article.title}
        </h1>

        {/* Author details and Share */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '15px', marginBottom: '25px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
              <ImageWithFallback src={article.author.avatar} alt={article.author.name} width={36} height={36} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: '600', color: '#FFFFFF' }}>{article.author.name}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{article.author.role}</div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }} aria-label="Share">
            {[
              { label: 'X', icon: '𝕏' },
              { label: 'Copy', icon: '🔗' },
              { label: 'Email', icon: '✉️' }
            ].map(({ label, icon }) => (
              <span key={label} title={`Share via ${label}`} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer', transition: 'var(--transition)' }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
              >{icon}</span>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '25px' }}>
          {article.tags.map((tag, i) => (
            <span key={i} style={{ fontSize: '0.75rem', background: 'rgba(123,97,255,0.15)', color: 'var(--secondary)', padding: '4px 12px', borderRadius: '4px', fontWeight: '600' }}>
              #{tag}
            </span>
          ))}
        </div>

        {/* Cover Image */}
        <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 'var(--card-radius)', overflow: 'hidden', marginBottom: '30px' }}>
          <ImageWithFallback src={article.featuredImage.url} alt={article.featuredImage.alt} width={article.featuredImage.width} height={article.featuredImage.height} loading="eager" />
        </div>

        {/* Progress Bar */}
        <div style={{ height: '4px', background: '#2B2F3D', borderRadius: '2px', marginBottom: '30px' }}>
          <div style={{ height: '100%', width: '0%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', borderRadius: '2px', transition: 'width 0.3s ease' }} id="article-progress-bar" />
        </div>

        {/* Body with inline ads */}
        <div style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
          {paragraphs.map((para, i) => (
            <React.Fragment key={i}>
              <p style={{ marginBottom: '20px' }}>{para}</p>
              {/* Ad after paragraph 2 */}
              {i === 1 && <AdBanner slot="articleInline1" />}
              {/* Ad after paragraph 6 (for longer articles) */}
              {i === 5 && paragraphs.length > 6 && <AdBanner slot="articleInline2" />}
            </React.Fragment>
          ))}
        </div>

        {/* Prev / Next */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '20px 0', margin: '40px 0' }}>
          <button onClick={handlePrevClick} disabled={articleId === 1} style={{ opacity: articleId === 1 ? 0.4 : 1, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
            ← Previous
          </button>
          <button onClick={handleNextClick} disabled={articleId === dummyArticles.length} style={{ opacity: articleId === dummyArticles.length ? 0.4 : 1, display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>
            Next →
          </button>
        </div>
      </article>

      {/* Pre-Related Posts Ad */}
      <AdBanner slot="articlePreRelated" />

      {/* Related Posts */}
      <RelatedPosts currentCategory={article.category} currentId={article.id} onNavigate={onNavigate} />
    </div>
  );
};

export default Article;
