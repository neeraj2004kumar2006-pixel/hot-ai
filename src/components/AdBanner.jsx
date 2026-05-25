import React, { useState, useEffect, useRef } from 'react';
import { getAdSlot } from '../config/adConfig';

/**
 * Production-ready AdBanner component.
 *
 * Usage:
 *   <AdBanner slot="topBanner" />
 *   <AdBanner slot="sidebarTop" />
 *
 * Reads config from adConfig.js. If slot is disabled or
 * device doesn't match, renders nothing (zero layout impact).
 *
 * When provider is 'adsense':
 *   Renders a container with the slot's data-ad-slot for
 *   Google AdSense auto-initialization.
 *
 * When provider is 'none' (dev/demo mode):
 *   Renders a subtle branded placeholder that collapses
 *   if the slot fails to load.
 */
const AdBanner = ({ slot, className = '' }) => {
  const config = getAdSlot(slot);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);
  const observerRef = useRef(null);

  // Phase 4: If slot doesn't exist or is disabled, render nothing
  if (!config || !config.enabled) return null;

  // Device filter
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  if (config.devices === 'desktop' && isMobile) return null;
  if (config.devices === 'mobile' && !isMobile) return null;

  // Lazy load via IntersectionObserver
  useEffect(() => {
    if (!config.lazyLoad) {
      setIsVisible(true);
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
  }, [config.lazyLoad]);

  // Phase 4: If ad errored, collapse completely
  if (hasError) return null;

  const { sizes, responsive, label, provider, slotId } = config;
  const aspectRatio = `${sizes.width}/${sizes.height}`;

  // Sticky-specific wrapper for mobile sticky
  if (config.position === 'mobile-sticky') {
    return (
      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          display: 'flex',
          justifyContent: 'center',
          background: 'rgba(15,17,23,0.95)',
          backdropFilter: 'blur(8px)',
          borderTop: '1px solid var(--border)',
          padding: '6px 0',
        }}
        className={className}
      >
        {isVisible ? (
          <AdSlotContent
            provider={provider}
            slotId={slotId}
            sizes={sizes}
            responsive={false}
            label={label}
            onError={() => setHasError(true)}
          />
        ) : (
          <div style={{ width: sizes.width, height: sizes.height }} />
        )}
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
        <AdSlotContent
          provider={provider}
          slotId={slotId}
          sizes={sizes}
          responsive={responsive}
          label={label}
          aspectRatio={aspectRatio}
          onError={() => setHasError(true)}
        />
      ) : (
        /* Skeleton placeholder — prevents layout shift */
        <div
          style={{
            width: '100%',
            aspectRatio,
            maxHeight: `${sizes.height}px`,
            background: 'linear-gradient(90deg, #131622 25%, #1A1D29 50%, #131622 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.8s infinite',
            borderRadius: '8px',
          }}
        />
      )}
    </div>
  );
};

/**
 * Inner content renderer — switches by provider.
 */
const AdSlotContent = ({ provider, slotId, sizes, responsive, label, aspectRatio, onError }) => {
  // ─── Google AdSense ───────────────────────────────
  if (provider === 'adsense' && slotId) {
    return (
      <div style={{ width: '100%', textAlign: 'center' }}>
        {/* Phase 5: AdSense label */}
        <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', opacity: 0.5, marginBottom: '2px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Advertisement
        </div>
        {/*
          INSERT ADSENSE CODE HERE
          Replace the div below with:
          <ins className="adsbygoogle"
            style={{ display: responsive ? 'block' : 'inline-block', width: responsive ? '100%' : sizes.width, height: sizes.height }}
            data-ad-client="ca-pub-XXXXXXXXXX"
            data-ad-slot={slotId}
            data-ad-format={responsive ? 'auto' : ''}
            data-full-width-responsive={responsive ? 'true' : 'false'}
          />
          Then call: (adsbygoogle = window.adsbygoogle || []).push({});
        */}
        <div
          style={{
            width: responsive ? '100%' : `${sizes.width}px`,
            height: `${sizes.height}px`,
            background: '#131622',
            borderRadius: '6px',
            margin: '0 auto',
          }}
          data-ad-slot={slotId}
        />
      </div>
    );
  }

  // ─── Ezoic ────────────────────────────────────────
  if (provider === 'ezoic' && slotId) {
    return (
      <div style={{ width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', opacity: 0.5, marginBottom: '2px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Advertisement
        </div>
        {/*
          INSERT EZOIC CODE HERE
          Replace the div below with your Ezoic placeholder:
          <div id={`ezoic-pub-ad-placeholder-${slotId}`} />
        */}
        <div
          style={{
            width: responsive ? '100%' : `${sizes.width}px`,
            height: `${sizes.height}px`,
            background: '#131622',
            borderRadius: '6px',
            margin: '0 auto',
          }}
          id={`ezoic-pub-ad-placeholder-${slotId}`}
        />
      </div>
    );
  }

  // ─── Manual Banner ────────────────────────────────
  if (provider === 'manual' && slotId) {
    return (
      <div style={{ width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', opacity: 0.5, marginBottom: '2px', letterSpacing: '1px', textTransform: 'uppercase' }}>
          Sponsored
        </div>
        {/*
          INSERT MANUAL BANNER HERE
          Replace with <a href="sponsor-url"><img src="banner.jpg" /></a>
        */}
        <div
          style={{
            width: responsive ? '100%' : `${sizes.width}px`,
            height: `${sizes.height}px`,
            background: '#131622',
            borderRadius: '6px',
            margin: '0 auto',
          }}
        />
      </div>
    );
  }

  // ─── No Provider (Demo/Dev Mode) ──────────────────
  return (
    <div
      style={{
        width: '100%',
        maxWidth: responsive ? '100%' : `${sizes.width}px`,
        aspectRatio: aspectRatio || `${sizes.width}/${sizes.height}`,
        maxHeight: `${sizes.height}px`,
        background: '#0D0F15',
        border: '1px solid rgba(43,47,61,0.5)',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      <span style={{ fontSize: '0.55rem', color: 'var(--text-secondary)', opacity: 0.35, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: '600' }}>
        {label || 'Ad'}
      </span>
      <span style={{ fontSize: '0.5rem', color: 'var(--text-secondary)', opacity: 0.2 }}>
        {sizes.width}×{sizes.height}
      </span>
    </div>
  );
};

export default AdBanner;
