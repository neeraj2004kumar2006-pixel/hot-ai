import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  if (!message) return null;

  const bgColors = {
    success: 'rgba(34, 197, 94, 0.95)',
    error: 'rgba(239, 68, 68, 0.95)',
    loading: 'rgba(59, 130, 246, 0.95)'
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: bgColors[type],
      color: 'var(--text)',
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '0.9rem',
      zIndex: 10000,
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      animation: 'toast-slide-up 0.3s ease-out forwards'
    }}>
      <span>
        {type === 'success' && '✅'}
        {type === 'error' && '❌'}
        {type === 'loading' && '⏳'}
      </span>
      <span>{message}</span>
      <button onClick={onClose} style={{
        background: 'none', border: 'none', color: 'var(--text)', fontSize: '1.2rem', 
        cursor: 'pointer', marginLeft: '12px', padding: 0, lineHeight: 1
      }}>×</button>
      <style>{`
        @keyframes toast-slide-up {
          from { transform: translate(-50%, 100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Toast;
