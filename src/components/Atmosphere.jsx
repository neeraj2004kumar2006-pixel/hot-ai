import React from 'react';
import { motion } from 'framer-motion';

const Atmosphere = () => {
  return (
    <>
      <div className="noise-overlay" />
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Soft Background Gradient */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255, 249, 230, 1) 0%, rgba(255, 245, 215, 1) 100%)' }} />

        {/* Floating Organic Blobs */}
        <motion.div
          animate={{
            x: [0, 50, 0, -30, 0],
            y: [0, 30, -20, 10, 0],
            rotate: [0, 45, 90, 135, 180],
            scale: [1, 1.05, 1, 0.95, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            width: '60vw',
            height: '60vw',
            background: 'var(--soft-accent)',
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
            filter: 'blur(120px)',
            opacity: 0.15
          }}
        />

        <motion.div
          animate={{
            x: [0, -40, 20, 0],
            y: [0, -50, 20, 0],
            rotate: [0, -45, -90, -180],
            scale: [1, 0.95, 1.05, 1]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{
            position: 'absolute',
            bottom: '-20%',
            right: '-10%',
            width: '70vw',
            height: '70vw',
            background: 'var(--secondary)',
            borderRadius: '60% 40% 30% 70% / 50% 60% 40% 50%',
            filter: 'blur(140px)',
            opacity: 0.12
          }}
        />

        <motion.div
          animate={{
            x: [0, 30, -30, 0],
            y: [0, 40, -40, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: '40%',
            left: '30%',
            width: '40vw',
            height: '40vw',
            background: 'var(--primary)',
            borderRadius: '50%',
            filter: 'blur(150px)',
            opacity: 0.08
          }}
        />
      </div>
    </>
  );
};

export default Atmosphere;
