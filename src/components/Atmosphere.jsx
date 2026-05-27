import React from 'react';

const Atmosphere = () => {
  return (
    <>
      <div className="noise-overlay" />
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
        {/* Soft Background Gradient */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 50% 50%, rgba(255, 249, 230, 1) 0%, rgba(255, 245, 215, 1) 100%)' }} />
      </div>
    </>
  );
};

export default Atmosphere;
