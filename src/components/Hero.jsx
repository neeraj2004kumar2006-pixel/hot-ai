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

  const pDepth1X = useTransform(mouseX, [-1, 1], [-10, 10]);
  const pDepth1Y = useTransform(mouseY, [-1, 1], [-10, 10]);
  
  const pDepth2X = useTransform(mouseX, [-1, 1], [-30, 30]);
  const pDepth2Y = useTransform(mouseY, [-1, 1], [-30, 30]);
  
  const pDepth3X = useTransform(mouseX, [-1, 1], [40, -40]);
  const pDepth3Y = useTransform(mouseY, [-1, 1], [40, -40]);

  return (
    <section className="hero-section" style={{ position: 'relative', padding: '40px 0 80px', overflow: 'hidden' }}>
      
      {/* 1. Giant Organic Floating Blobs */}
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.1, 0.9, 1] }} 
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: '-20%', left: '-10%', width: '60vw', height: '60vw', background: 'var(--primary)', opacity: 0.04, filter: 'blur(100px)', borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%', zIndex: -2, pointerEvents: 'none' }}
      />
      <motion.div 
        animate={{ rotate: -360, scale: [1, 1.2, 0.8, 1] }} 
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: '10%', right: '-20%', width: '70vw', height: '70vw', background: 'var(--secondary)', opacity: 0.04, filter: 'blur(120px)', borderRadius: '60% 40% 30% 70% / 50% 60% 40% 50%', zIndex: -2, pointerEvents: 'none' }}
      />
      <motion.div 
        animate={{ rotate: 360, scale: [0.9, 1.1, 1, 0.9] }} 
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', bottom: '-20%', left: '20%', width: '50vw', height: '50vw', background: 'var(--soft-accent)', opacity: 0.04, filter: 'blur(90px)', borderRadius: '50%', zIndex: -2, pointerEvents: 'none' }}
      />

      {/* 2. Orbit System (Rings & Particles) */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: 'linear' }}
        style={{ position: 'absolute', top: '50%', left: '50%', width: '120vw', height: '120vw', marginLeft: '-60vw', marginTop: '-60vw', pointerEvents: 'none', zIndex: -1, opacity: 0.3 }}
      >
        <div style={{ position: 'absolute', top: '15%', left: '15%', right: '15%', bottom: '15%', border: '1px solid var(--border)', borderRadius: '50%', opacity: 0.15 }} />
        <div style={{ position: 'absolute', top: '25%', left: '25%', right: '25%', bottom: '25%', border: '1px dashed var(--border)', borderRadius: '50%', opacity: 0.1 }} />
        
        {/* Orbital Objects */}
        <div style={{ position: 'absolute', top: '15%', left: '50%', width: '10px', height: '10px', background: 'var(--primary)', borderRadius: '50%', transform: 'translate(-50%, -50%)', filter: 'blur(1px)' }} />
        <div style={{ position: 'absolute', top: '50%', right: '25%', width: '16px', height: '16px', border: '3px solid var(--secondary)', borderRadius: '50%', transform: 'translate(50%, -50%)' }} />
        <div style={{ position: 'absolute', bottom: '15%', left: '35%', width: '8px', height: '8px', background: 'var(--soft-accent)', borderRadius: '50%' }} />
      </motion.div>

      {/* 3. Background Cinematic Typography with Depth */}
      <motion.div style={{ position: 'absolute', top: '2%', left: '-5%', fontFamily: 'var(--font-heading)', fontSize: '14vw', fontWeight: '900', color: 'var(--primary)', opacity: 0.02, pointerEvents: 'none', x: pDepth1X, y: pDepth1Y, zIndex: -1, letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>
        AI
      </motion.div>
      <motion.div style={{ position: 'absolute', top: '22%', right: '-10%', fontFamily: 'var(--font-heading)', fontSize: '11vw', fontWeight: '900', color: 'var(--secondary)', opacity: 0.02, pointerEvents: 'none', x: pDepth2X, y: pDepth2Y, zIndex: -1, letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>
        FUTURE
      </motion.div>
      <motion.div style={{ position: 'absolute', top: '48%', left: '-10%', fontFamily: 'var(--font-heading)', fontSize: '13vw', fontWeight: '900', color: 'var(--soft-accent)', opacity: 0.02, pointerEvents: 'none', x: pDepth3X, y: pDepth3Y, zIndex: -1, letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>
        TOOLS
      </motion.div>
      <motion.div style={{ position: 'absolute', bottom: '12%', right: '-5%', fontFamily: 'var(--font-heading)', fontSize: '9vw', fontWeight: '900', color: 'var(--text)', opacity: 0.02, pointerEvents: 'none', x: pDepth1X, y: pDepth1Y, zIndex: -1, letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>
        DISCOVER
      </motion.div>
      <motion.div style={{ position: 'absolute', bottom: '-8%', left: '15%', fontFamily: 'var(--font-heading)', fontSize: '15vw', fontWeight: '900', color: 'var(--primary)', opacity: 0.02, pointerEvents: 'none', x: pDepth2X, y: pDepth2Y, zIndex: -1, letterSpacing: '-0.05em', whiteSpace: 'nowrap' }}>
        NEXT
      </motion.div>

      {/* 4. Ambient Floating Particles (Desktop Only) */}
      <div className="desktop-sidebar" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            animate={{ y: [0, -600], x: [0, Math.random() * 100 - 50], opacity: [0, 0.4, 0] }}
            transition={{ duration: 15 + i * 3, repeat: Infinity, ease: 'linear', delay: i * 2 }}
            style={{
              position: 'absolute',
              bottom: '-10%',
              left: `${10 + i * 10}%`,
              width: `${Math.random() * 4 + 3}px`,
              height: `${Math.random() * 4 + 3}px`,
              background: i % 2 === 0 ? 'var(--primary)' : 'var(--secondary)',
              borderRadius: '50%',
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Large Featured Card */}
      <div className="layered-card-wrapper" style={{ flex: 1 }}>
        <motion.article 
          className="premium-card" 
          style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
          whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <motion.div 
            style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden' }}
            whileHover={{ scale: 1.02 }}
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
              whileHover={{ scale: 1.01, x: -4, backgroundColor: 'var(--surface)', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
            >
              <div style={{ width: '100px', aspectRatio: '4/3', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
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
