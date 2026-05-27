import React, { useEffect, useState } from 'react';
import { truncateText, generateSlug } from '../utils/helpers';
import ImageWithFallback from './ImageWithFallback';
import { motion, useSpring, useTransform } from 'framer-motion';

const Hero = ({ articles = [], onNavigate }) => {
  if (articles.length === 0) return null;

  const largeArticle = articles[0];
  const smallArticles = articles.slice(1, 4);

  const handleArticleClick = (e, article) => {
    e.preventDefault();
    if (onNavigate) onNavigate('article', { id: article.id, slug: generateSlug(article.title) });
  };

  const formatDate = (d) => d instanceof Date ? d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  // Mouse Parallax Logic
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const parallaxX1 = useTransform(mouseX, [-1, 1], [-20, 20]);
  const parallaxY1 = useTransform(mouseY, [-1, 1], [-20, 20]);
  const parallaxX2 = useTransform(mouseX, [-1, 1], [30, -30]);
  const parallaxY2 = useTransform(mouseY, [-1, 1], [30, -30]);

  return (
    <section className="hero-section" style={{ position: 'relative', paddingBottom: '40px' }}>
      
      {/* Background Cinematic Typography */}
      <motion.div 
        style={{ position: 'absolute', top: '10%', left: '-5%', fontSize: '15vw', fontWeight: '900', color: 'var(--primary)', opacity: 0.03, pointerEvents: 'none', x: parallaxX1, y: parallaxY1, zIndex: -1, letterSpacing: '-0.05em' }}
      >
        FUTURE
      </motion.div>
      <motion.div 
        style={{ position: 'absolute', bottom: '0%', right: '-5%', fontSize: '12vw', fontWeight: '900', color: 'var(--secondary)', opacity: 0.03, pointerEvents: 'none', x: parallaxX2, y: parallaxY2, zIndex: -1, letterSpacing: '-0.05em' }}
      >
        DISCOVER
      </motion.div>

      {/* Large Featured Card */}
      <div className="layered-card-wrapper" style={{ flex: 1 }}>
        <motion.article 
          className="premium-card" 
          style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
          whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.div 
            style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          >
          <ImageWithFallback
            src={largeArticle.featuredImage?.url}
            alt={largeArticle.featuredImage?.alt || largeArticle.title}
            width={largeArticle.featuredImage?.width || 1200}
            height={largeArticle.featuredImage?.height || 675}
            loading="eager"
          />
          <span className="category-badge" style={{ position: 'absolute', top: '15px', left: '15px', zIndex: 2 }}>
            {largeArticle.category}
          </span>
        </motion.div>

        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
          {/* Metadata row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {largeArticle.author && <span style={{ fontWeight: '600' }}>{largeArticle.author.name}</span>}
            <span>•</span>
            <span>{formatDate(largeArticle.publishDate)}</span>
            {largeArticle.readingTime && <><span>•</span><span>{largeArticle.readingTime}</span></>}
          </div>

          <h2
            style={{ fontSize: '1.5rem', fontWeight: '800', lineHeight: '1.3', color: 'var(--text)', cursor: 'pointer', transition: 'color 0.2s ease' }}
            onClick={(e) => handleArticleClick(e, largeArticle)}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text)'}
          >
            {largeArticle.title}
          </h2>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {truncateText(largeArticle.excerpt, 160)}
          </p>

          <a
            href={`#/article/${generateSlug(largeArticle.title)}`}
            onClick={(e) => handleArticleClick(e, largeArticle)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: '700', fontSize: '0.85rem', marginTop: '8px', width: 'fit-content' }}
          >
            Read Full Story
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </motion.article>
      </div>

      {/* 3 Smaller Cards */}
      {smallArticles.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'space-between' }}>
          {smallArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              className="premium-card"
              style={{ display: 'flex', padding: '12px', gap: '16px', alignItems: 'center', cursor: 'pointer', overflow: 'hidden' }}
              onClick={(e) => handleArticleClick(e, article)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.4 }}
              whileHover={{ scale: 1.02, x: -8, backgroundColor: 'var(--surface)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
            >
              <div style={{ width: '100px', aspectRatio: '4/3', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', overflow: 'hidden', flexShrink: 0 }}>
                <ImageWithFallback
                  src={article.featuredImage?.url}
                  alt={article.featuredImage?.alt || article.title}
                  width={100}
                  height={75}
                  loading="lazy"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{article.category}</span>
                  <span>•</span>
                  <span>{formatDate(article.publishDate)}</span>
                </span>
                <h3
                  style={{ fontSize: '0.95rem', fontWeight: '700', lineHeight: '1.3', color: 'var(--text)', transition: 'color 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text)'}
                >
                  {truncateText(article.title, 65)}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Hero;
