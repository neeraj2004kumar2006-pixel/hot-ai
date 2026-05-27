import React from 'react';
import { motion } from 'framer-motion';

const MENU_ITEMS = [
  { label: 'Home', target: 'home' },
  { label: 'AI News', target: 'category', params: { name: 'AI News' } },
  { label: 'Tech Tricks', target: 'tech-tricks' },
  { label: 'AI Tools', target: 'ai-tools' },
  { label: 'Trending', target: 'trending' },
  { label: 'About', target: 'page', params: { slug: 'about' } },
  { label: 'Editorial', target: 'page', params: { slug: 'editorial' } },
  { label: 'Privacy', target: 'page', params: { slug: 'privacy' } },
  { label: 'Terms', target: 'page', params: { slug: 'terms' } },
  { label: 'Contact', target: 'page', params: { slug: 'contact' } }
];

const Navbar = ({ activePage, activeParams, onNavigate, isMobile, onCloseMobileMenu }) => {
  const handleItemClick = (e, item) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(item.target, item.params || {});
    }
    if (onCloseMobileMenu) {
      onCloseMobileMenu();
    }
  };

  const navStyles = isMobile 
    ? {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '100%',
        padding: '20px 0'
      }
    : {
        display: 'flex',
        alignItems: 'center',
        gap: '25px',
        listStyle: 'none'
      };

  const linkStyles = (isActive) => ({
    fontSize: isMobile ? '1.1rem' : '0.95rem',
    fontWeight: isActive ? '400' : '600',
    fontFamily: isActive ? 'var(--font-heading)' : 'var(--font-body)',
    color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
    letterSpacing: isActive ? '0.5px' : '0px',
    transition: 'var(--transition)',
    position: 'relative',
    cursor: 'pointer'
  });

  return (
    <ul style={navStyles}>
      {MENU_ITEMS.map((item) => {
        const isCatMatch = item.target === 'category' && activeParams?.name === item.params?.name;
        const isActive = activePage === item.target || isCatMatch;
        
        return (
          <li key={item.label} style={{ position: 'relative' }}>
            <a
              href={`#/${item.target}`}
              onClick={(e) => handleItemClick(e, item)}
              style={linkStyles(isActive)}
              onMouseOver={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text)';
              }}
              onMouseOut={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {item.label}
              {!isMobile && isActive && (
                <motion.span 
                  layoutId="nav-underline"
                  style={{
                    position: 'absolute',
                    bottom: '-6px',
                    left: '0',
                    right: '0',
                    height: '2px',
                    background: 'linear-gradient(90deg, var(--primary), var(--secondary))',
                    borderRadius: '2px'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Navbar;
