import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { getArticles } from '../utils/dataStore';
import RelatedPosts from '../components/RelatedPosts';
import AdBanner from '../components/AdBanner';
import AnimatedSection from '../components/AnimatedSection';
import { generateSlug, updateMetaTags } from '../utils/helpers';
import ImageWithFallback from '../components/ImageWithFallback';

const Article = ({ params = {}, onNavigate }) => {
  const articleId = parseInt(params.id, 10);
  const articles = getArticles();
  const currentIndex = articles.findIndex((art) => art.id === articleId);
  const article = currentIndex !== -1 ? articles[currentIndex] : articles[0];

  const [copied, setCopied] = useState(false);

  // If there are no articles at all (edge case)
  if (!article) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '100px 20px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Article not found</h1>
        <p style={{ color: 'var(--text-secondary)' }}>The article you are looking for does not exist.</p>
        <button onClick={() => onNavigate('home')} style={{ background: 'var(--primary)', color: 'var(--text)', padding: '8px 18px', borderRadius: 'var(--btn-radius)', marginTop: '16px' }}>Go Home</button>
      </div>
    );
  }

  const { scrollYProgress } = useScroll();

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex !== -1 && currentIndex < articles.length - 1;

  const handlePrevClick = () => {
    if (hasPrev) {
      const prevArt = articles[currentIndex - 1];
      onNavigate('article', { id: prevArt.id, slug: generateSlug(prevArt.title) });
    }
  };

  const handleNextClick = () => {
    if (hasNext) {
      const nextArt = articles[currentIndex + 1];
      onNavigate('article', { id: nextArt.id, slug: generateSlug(nextArt.title) });
    }
  };

  // SEO & Meta
  useEffect(() => {
    if (article) {
      document.title = `${article.seoTitle || article.title} - Hot AI`;
      updateMetaTags({
        title: `${article.seoTitle || article.title} - Hot AI`,
        description: article.seoDescription || article.excerpt || article.title,
        url: window.location.href,
        image: article.featuredImage?.url,
        type: 'article',
        articleData: article
      });
    }
  }, [article, articleId]);

  const paragraphs = article.content ? article.content.split('\n\n') : [];
  const words = paragraphs.join(' ').split(/\s+/).length;
  const readTime = Math.max(1, Math.ceil(words / 200));

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article.title;
    if (platform === 'X') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'Copy') {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else if (platform === 'Email') {
      window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=Check this out: ${encodeURIComponent(url)}`;
    }
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
          transformOrigin: '0%',
          scaleX: scrollYProgress,
          zIndex: 1000
        }}
      />
      <div style={{ display: 'flex', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        {/* Floating Share Sidebar (Desktop Only) */}
        <div style={{ width: '60px', display: 'flex', flexDirection: 'column', gap: '15px', paddingTop: '150px', position: 'sticky', top: '0', height: '100vh', paddingLeft: '20px' }}>
          {['X', 'Copy', 'Email'].map((p, i) => (
            <motion.button 
              key={p} 
              onClick={() => handleShare(p)} 
              whileHover={{ scale: 1.1, backgroundColor: 'var(--primary)', color: '#fff', borderColor: 'var(--primary)' }}
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'var(--transition)' }}
            >
              {p === 'X' ? 'X' : p === 'Copy' ? '🔗' : '✉'}
            </motion.button>
          ))}
        </div>

        <div style={{ flex: 1, padding: '40px 20px', maxWidth: '800px' }}>
          <article>
          {/* Breadcrumb */}
          <nav style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '16px', display: 'flex', gap: '6px', alignItems: 'center' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('home')}>Home</span>
            <span>›</span>
            <span style={{ cursor: 'pointer' }} onClick={() => onNavigate('category', { name: article.category })}>{article.category}</span>
          </nav>

          {/* Category & Date */}
          <AnimatedSection>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <span className="category-badge">{article.category}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                {new Date(article.publishDate || Date.now()).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                {readTime} min read
              </span>
            </div>
          </AnimatedSection>

          {/* Title */}
          <AnimatedSection delay={0.1}>
            <h1 style={{ fontSize: '2.5rem', lineHeight: '1.3', marginBottom: '20px', fontWeight: '800', color: 'var(--text)' }}>
              {article.title}
            </h1>
          </AnimatedSection>

          {/* Author */}
          <AnimatedSection delay={0.2}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)', paddingBottom: '25px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden' }}>
                  <ImageWithFallback src={article.author?.avatar} alt={article.author?.name} width={40} height={40} />
                </div>
                <div>
                  <div style={{ fontWeight: '600' }}>{article.author?.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{article.author?.role}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {copied && <span style={{ fontSize: '0.7rem', color: 'var(--success)', fontWeight: 'bold' }}>Link Copied!</span>}
              </div>
            </div>
          </AnimatedSection>

          {/* Featured Image */}
          <AnimatedSection delay={0.3}>
            <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', marginBottom: '40px' }}>
              <ImageWithFallback className="article-featured-img" src={article.featuredImage?.url} alt={article.featuredImage?.alt} width={800} height={450} />
            </div>
          </AnimatedSection>

          {/* Content */}
          <div className="article-content" style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text)' }}>
            {paragraphs.map((p, index) => (
              <React.Fragment key={index}>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  style={{ marginBottom: '24px' }}
                >
                  {p}
                </motion.p>
                {index === 1 && <AdBanner slot="articleInline1" />}
                {index === 5 && <AdBanner slot="articleInline2" />}
              </React.Fragment>
            ))}
          </div>

          {/* Tags */}
          <AnimatedSection delay={0.1}>
            {article.tags && article.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
                {article.tags.map((tag, i) => (
                  <span key={i} style={{ fontSize: '0.8rem', background: 'var(--surface)', padding: '4px 10px', borderRadius: '4px' }}>#{tag}</span>
                ))}
              </div>
            )}
          </AnimatedSection>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '40px 0' }}>
            <button onClick={handlePrevClick} disabled={!hasPrev} style={{ cursor: hasPrev ? 'pointer' : 'default', opacity: hasPrev ? 1 : 0.5 }}>← Previous</button>
            <button onClick={handleNextClick} disabled={!hasNext} style={{ cursor: hasNext ? 'pointer' : 'default', opacity: hasNext ? 1 : 0.5 }}>Next →</button>
          </div>
        </article>

        {/* Related Posts */}
        <AnimatedSection delay={0.2}>
          <AdBanner slot="articlePreRelated" />
          <RelatedPosts currentId={article.id} category={article.category} onNavigate={onNavigate} />
        </AnimatedSection>
        </div>
      </div>
    </>
  );
};

export default Article;
