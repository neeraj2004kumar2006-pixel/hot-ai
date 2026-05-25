import React, { useState, useEffect, useRef } from 'react';
import { useAuthContext } from '../context/AuthContext';

const AdminLoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTime, setLockTime] = useState(0);
  const modalRef = useRef(null);
  const { login } = useAuthContext();

  // Lock countdown
  useEffect(() => {
    if (!isLocked || lockTime <= 0) return;
    const t = setTimeout(() => {
      setLockTime(prev => {
        if (prev <= 1) { setIsLocked(false); setAttempts(0); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearTimeout(t);
  }, [isLocked, lockTime]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose]);

  // Reset on open
  useEffect(() => {
    if (isOpen) { setEmail(''); setPassword(''); setError(''); setShowPassword(false); }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLocked) { setError(`Locked for ${lockTime}s. Try again later.`); return; }

    const trimmedId = email.trim();
    const trimmedPass = password.trim();

    const success = await login(trimmedId, trimmedPass);
    if (success) {
      setError(''); setAttempts(0);
      if (onLoginSuccess) onLoginSuccess();
      onClose();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        setIsLocked(true); setLockTime(30);
        setError('Too many failed attempts. Locked for 30 seconds.');
      } else {
        setError('Invalid credentials.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div ref={modalRef} className="premium-card" style={{ width: '100%', maxWidth: '400px', padding: '36px', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '16px', color: 'var(--text-secondary)', fontSize: '1.2rem', padding: '4px' }} aria-label="Close">×</button>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: '800', background: 'linear-gradient(135deg, #00A8FF, #7B61FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '6px' }}>HOT AI</div>
          <h1 style={{ fontSize: '1.15rem', fontWeight: '700', color: '#FFFFFF' }}>Admin Login</h1>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Enter credentials to access the dashboard</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#2c1b1b', color: '#ff6b6b', padding: '12px', borderRadius: 'var(--btn-radius)', marginBottom: '18px', fontSize: '0.85rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label htmlFor="admin-email" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Admin ID</label>
            <input id="admin-email" type="text" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin ID" style={{ width: '100%', padding: '10px 14px', background: '#131622', border: '1px solid var(--border)', borderRadius: 'var(--btn-radius)', fontSize: '0.88rem', color: '#FFF' }} />
          </div>

          <div>
            <label htmlFor="admin-pass" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input id="admin-pass" type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" style={{ width: '100%', padding: '10px 14px', paddingRight: '40px', background: '#131622', border: '1px solid var(--border)', borderRadius: 'var(--btn-radius)', fontSize: '0.88rem', color: '#FFF' }} />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLocked} style={{
            background: isLocked ? 'var(--border)' : 'var(--primary)', color: '#FFF', padding: '12px',
            borderRadius: 'var(--btn-radius)', fontSize: '0.85rem', fontWeight: '700', marginTop: '6px', transition: 'var(--transition)', opacity: isLocked ? 0.6 : 1
          }}>
            {isLocked ? `Locked (${lockTime}s)` : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;