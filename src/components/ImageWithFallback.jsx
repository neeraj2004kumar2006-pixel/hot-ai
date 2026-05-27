import React, { useState, useEffect } from 'react';

const ImageWithFallback = ({
  src,
  alt = '',
  width,
  height,
  loading = 'lazy',
  className = '',
  style = {}
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setLoaded(false);
    setErrored(false);
  }, [src]);

  const aspectRatio = width && height ? `${width}/${height}` : '16/9';

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio,
        overflow: 'hidden',
        backgroundColor: 'var(--surface)',
        borderRadius: 'inherit',
        ...style
      }}
    >
      {/* Shimmer skeleton */}
      {!loaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, var(--surface) 25%, var(--card-bg) 50%, var(--surface) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.8s infinite'
          }}
        />
      )}

      {/* Branded fallback */}
      {errored && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: 'var(--text-secondary)'
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span style={{ fontSize: '0.7rem', fontWeight: '600', letterSpacing: '1px', opacity: 0.6 }}>HOT AI</span>
        </div>
      )}

      {!errored && (
        <img
          src={imgSrc}
          alt={alt}
          loading={loading}
          width={width}
          height={height}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
      )}
    </div>
  );
};

export default ImageWithFallback;