import React, { useState, useEffect, useRef } from 'react';
import { getAdSlot } from '../config/adConfig';

/**
 * Production-ready AdBanner component.
 * Reads config from adConfig.js. If slot is disabled or
 * device doesn't match, renders nothing (zero layout impact).
 */
const AdBanner = ({ slot, className = '' }) => {
  const config = getAdSlot(slot);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const storageKey = `ad_dismissed_${slot}`;
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        if (Date.now() - Number(saved) < 24 * 60 * 60 * 1000) return true;
        localStorage.removeItem(storageKey);
      }
    } catch {}
    return false;
  });

  const handleDismiss = () => {
    setDismissed(true);
    try { localStorage.setItem(storageKey, Date.now().toString()); } catch {}
  };
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  // Device check (responsive via state)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lazy load via IntersectionObserver
  useEffect(() => {
    if (!config || !config.enabled || !config.lazyLoad) {
      if (config && config.enabled) setIsVisible(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observerRef.current?.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    observerRef.current.observe(el);
    return () => observerRef.current?.disconnect();
  }, [config]);

  // All hooks called above — safe to do early returns now
  if (!config || !config.enabled) return null;
  if (config.devices === 'desktop' && isMobile) return null;
  if (config.devices === 'mobile' && !isMobile) return null;
  if (hasError) return null;
  if (dismissed) return null;

  const { sizes, responsive, label, provider, slotId } = config;
  const aspectRatio = `${sizes.width}/${sizes.height}`;

  // Mobile sticky wrapper
  if (config.position === 'mobile-sticky') {
    return (
      <div
        ref={containerRef}
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 900,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          background: 'rgba(15,17,23,0.95)', backdropFilter: 'blur(8px)',
          borderTop: '1px solid var(--border)', padding: '6px 0',
        }}
        className={className}
      >
        {isVisible ? (
          <AdSlotContent provider={provider} slotId={slotId} sizes={sizes} responsive={false} label={label} onError={() => setHasError(true)} />
        ) : (
          <div style={{ width: sizes.width, height: sizes.height }} />
        )}
        <button
          onClick={handleDismiss}
          style={{ position: 'absolute', top: '-10px', right: '10px', width: '20px', height: '20px', borderRadius: '50%', background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)', fontSize: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', lineHeight: '1' }}
          aria-label="Close ad"
        >×</button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`ad-slot ${className}`}
      style={{
        width: '100%',
        maxWidth: responsive ? '100%' : `${sizes.width}px`,
        margin: '20px auto',
        minHeight: isVisible ? undefined : `${sizes.height}px`,
      }}
    >
      {isVisible ? (
        <AdSlotContent provider={provider} slotId={slotId} sizes={sizes} responsive={responsive} label={label} aspectRatio={aspectRatio} onError={() => setHasError(true)} />
      ) : (
        <div style={{ width: '100%', aspectRatio, maxHeight: `${sizes.height}px`, background: 'linear-gradient(90deg, #131622 25%, #1A1D29 50%, #131622 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.8s infinite', borderRadius: '8px' }} />
      )}
    </div>
  );
};

/**
 * Inner content renderer — switches by provider.
 */
const AdSlotContent = ({ provider, slotId, sizes, responsive, label, aspectRatio, onError }) => {
  if (provider === 'adsense' && slotId) {
    return (
      <div style={{ width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', opacity: 0.5, marginBottom: '2px', letterSpacing: '1px', textTransform: 'uppercase' }}>Advertisement</div>
        {/* INSERT ADSENSE CODE HERE: Replace div below with <ins className="adsbygoogle" data-ad-client="ca-pub-XXXXXXXXXX" data-ad-slot={slotId} /> then call (adsbygoogle = window.adsbygoogle || []).push({}); */}
        <div style={{ width: responsive ? '100%' : `${sizes.width}px`, height: `${sizes.height}px`, background: '#131622', borderRadius: '6px', margin: '0 auto' }} data-ad-slot={slotId} />
      </div>
    );
  }

  if (provider === 'ezoic' && slotId) {
    return (
      <div style={{ width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', opacity: 0.5, marginBottom: '2px', letterSpacing: '1px', textTransform: 'uppercase' }}>Advertisement</div>
        {/* INSERT EZOIC CODE HERE: Replace div below with <div id={`ezoic-pub-ad-placeholder-${slotId}`} /> */}
        <div style={{ width: responsive ? '100%' : `${sizes.width}px`, height: `${sizes.height}px`, background: '#131622', borderRadius: '6px', margin: '0 auto' }} id={`ezoic-pub-ad-placeholder-${slotId}`} />
      </div>
    );
  }

  if (provider === 'manual' && slotId) {
    return (
      <div style={{ width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', opacity: 0.5, marginBottom: '2px', letterSpacing: '1px', textTransform: 'uppercase' }}>Sponsored</div>
        {/* INSERT MANUAL BANNER HERE: Replace with <a href="sponsor-url"><img src="banner.jpg" /></a> */}
        <div style={{ width: responsive ? '100%' : `${sizes.width}px`, height: `${sizes.height}px`, background: '#131622', borderRadius: '6px', margin: '0 auto' }} />
      </div>
    );
  }

  // No Provider (Demo/Dev Mode)
  if (import.meta.env.DEV) {
    return (
      <div style={{ width: '100%', maxWidth: responsive ? '100%' : `${sizes.width}px`, aspectRatio: aspectRatio || `${sizes.width}/${sizes.height}`, maxHeight: `${sizes.height}px`, background: '#0D0F15', border: '1px solid rgba(43,47,61,0.5)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', margin: '0 auto', overflow: 'hidden' }}>
        <span style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', opacity: 0.35, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>{label || 'Ad'}</span>
        <span style={{ fontSize: '0.5rem', color: 'var(--text-secondary)', opacity: 0.2 }}>{sizes.width}×{sizes.height}</span>
      </div>
    );
  }
  
  return null;
};

export default AdBanner;
