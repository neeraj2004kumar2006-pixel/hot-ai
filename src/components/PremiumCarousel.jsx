import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion, AnimatePresence } from 'framer-motion';

const PremiumCarousel = ({ children, itemGap = '20px' }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [canScroll, setCanScroll] = useState(false);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
    setCanScroll(emblaApi.scrollSnapList().length > 1);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    
    // Add window resize listener to force reInit to check if scroll is needed
    const handleResize = () => emblaApi.reInit();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    }
  }, [emblaApi, onSelect]);

  const buttonStyle = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    backgroundColor: 'var(--card-bg)',
    color: 'var(--primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    cursor: 'pointer',
    border: '1px solid var(--border)',
    zIndex: 10,
    outline: 'none',
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ overflow: 'hidden' }} ref={emblaRef}>
        <div style={{ display: 'flex', gap: itemGap }}>
          {React.Children.map(children, (child) => (
            <div style={{ flex: '0 0 auto' }}>
              {child}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {canScroll && prevBtnEnabled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1, backgroundColor: 'var(--primary)', color: '#fff', borderColor: 'var(--primary)' }}
            style={{ ...buttonStyle, left: '-22px' }}
            onClick={scrollPrev}
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {canScroll && nextBtnEnabled && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1, backgroundColor: 'var(--primary)', color: '#fff', borderColor: 'var(--primary)' }}
            style={{ ...buttonStyle, right: '-22px' }}
            onClick={scrollNext}
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PremiumCarousel;
