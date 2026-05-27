import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useSpring(-100, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28 });
  const cursorRingX = useSpring(-100, { stiffness: 150, damping: 20 });
  const cursorRingY = useSpring(-100, { stiffness: 150, damping: 20 });

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      setIsMobile(true);
      return;
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      cursorRingX.set(e.clientX);
      cursorRingY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('premium-card') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, cursorRingX, cursorRingY, isVisible]);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--primary)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          translateX: '-50%',
          translateY: '-50%',
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
          boxShadow: '0 0 10px var(--primary)'
        }}
        animate={{
          scale: isPointer ? 0.5 : 1
        }}
        transition={{ duration: 0.2 }}
      />
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          border: '1px solid rgba(255, 94, 108, 0.4)',
          backgroundColor: isPointer ? 'rgba(255, 94, 108, 0.05)' : 'transparent',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          translateX: '-50%',
          translateY: '-50%',
          x: cursorRingX,
          y: cursorRingY,
          opacity: isVisible ? 1 : 0
        }}
        animate={{
          scale: isPointer ? 1.5 : 1,
          borderColor: isPointer ? 'rgba(255, 94, 108, 0.8)' : 'rgba(255, 94, 108, 0.4)'
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
};

export default CustomCursor;
