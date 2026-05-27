import React, { useState, useRef } from 'react';
import Navbar from './Navbar';
import HiddenAdminTrigger from './HiddenAdminTrigger';
import AdminLoginModal from './AdminLoginModal';
import { useAuthContext } from '../context/AuthContext';

const Header = ({ activePage, activeParams, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const logoClicksRef = useRef({ count: 0, lastTime: 0 });
  const { isAuthenticated } = useAuthContext();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const handleLogoClick = (e) => {
    e.preventDefault();
    onNavigate('home');
    closeMobileMenu();

    // Hidden admin: 5 rapid clicks on logo
    const now = Date.now();
    const ref = logoClicksRef.current;
    if (now - ref.lastTime < 800) {
      ref.count++;
      if (ref.count >= 5) { setShowAdminLogin(true); ref.count = 0; }
    } else {
      ref.count = 1;
    }
    ref.lastTime = now;
  };

  const handleAdminTrigger = () => setShowAdminLogin(true);
  const handleLoginSuccess = () => onNavigate('admin-dashboard');

  return (
    <>
      <header style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '64px', backgroundColor: 'rgba(255,249,230,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid var(--border)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px' }}>
        {/* Logo */}
        <a href="#/" onClick={handleLogoClick} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '800', fontSize: '1.3rem', letterSpacing: '1px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', userSelect: 'none' }}>
          HOT AI
        </a>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: 'block' }}>
          <Navbar activePage={activePage} activeParams={activeParams} onNavigate={onNavigate} isMobile={false} />
        </nav>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={() => { onNavigate('search'); closeMobileMenu(); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', transition: 'var(--transition)' }}
            onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
            onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            aria-label="Search"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>

          {/* Mobile burger */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ display: 'none', flexDirection: 'column', gap: '4px', zIndex: 1001 }} className="mobile-burger-btn" aria-label="Toggle menu">
            <span style={{ width: '22px', height: '2px', backgroundColor: 'var(--text)', transition: 'var(--transition)', transform: mobileMenuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
            <span style={{ width: '22px', height: '2px', backgroundColor: 'var(--text)', transition: 'var(--transition)', opacity: mobileMenuOpen ? 0 : 1 }} />
            <span style={{ width: '22px', height: '2px', backgroundColor: 'var(--text)', transition: 'var(--transition)', transform: mobileMenuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div style={{ position: 'fixed', top: '64px', left: 0, right: 0, bottom: 0, backgroundColor: 'var(--bg-color)', borderTop: '1px solid var(--border)', padding: '20px', zIndex: 1000, display: 'flex', flexDirection: 'column' }}>
            <Navbar activePage={activePage} activeParams={activeParams} onNavigate={onNavigate} isMobile={true} onCloseMobileMenu={closeMobileMenu} />
          </div>
        )}

        <HiddenAdminTrigger onTrigger={handleAdminTrigger} />
      </header>

      <AdminLoginModal isOpen={showAdminLogin} onClose={() => setShowAdminLogin(false)} onLoginSuccess={handleLoginSuccess} />
    </>
  );
};

export default Header;
