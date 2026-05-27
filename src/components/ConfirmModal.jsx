import React from 'react';

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel' }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 10000,
      display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px'
    }}>
      <div className="premium-card" style={{ width: '100%', maxWidth: '400px', padding: '30px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text)', marginBottom: '12px' }}>{title}</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.5' }}>
          {message}
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <button onClick={onCancel} style={{
            padding: '10px 18px', background: 'transparent', border: '1px solid var(--border)',
            color: 'var(--text-secondary)', borderRadius: 'var(--btn-radius)', fontSize: '0.85rem', fontWeight: '600',
            cursor: 'pointer'
          }}>
            {cancelText}
          </button>
          <button onClick={onConfirm} style={{
            padding: '10px 18px', background: 'var(--danger)', border: 'none',
            color: 'var(--text)', borderRadius: 'var(--btn-radius)', fontSize: '0.85rem', fontWeight: '700',
            cursor: 'pointer'
          }}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
