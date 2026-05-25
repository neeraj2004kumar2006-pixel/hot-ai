import React from 'react';
import { useAuthContext } from '../context/AuthContext';

const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #1A1D29', borderTopColor: '#00A8FF', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: '20px' }}>
        <div style={{ fontSize: '3rem', fontWeight: '900', background: 'linear-gradient(135deg, #00A8FF, #7B61FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '20px' }}>
          403
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '10px' }}>Access Denied</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center', maxWidth: '400px', lineHeight: '1.6' }}>
          You need admin credentials to access this area.
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{ marginTop: '30px', background: 'var(--primary)', color: '#FFF', padding: '12px 24px', borderRadius: 'var(--btn-radius)', fontSize: '0.85rem', fontWeight: '700', transition: 'var(--transition)' }}
        >
          Return to Home
        </button>
      </div>
    );
  }

  return children;
};

export { ProtectedAdminRoute };
export default ProtectedAdminRoute;