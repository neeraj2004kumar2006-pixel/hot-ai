import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

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

const Navbar = ({ isMobile, onCloseMobileMenu }) => {
  const location = useLocation();

  const handleItemClick = () => {
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
    fontWeight: '600',
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
        let toPath = '/';
        if (item.target === 'category') toPath = `/category/${encodeURIComponent(item.params.name)}`;
        else if (item.target === 'page') toPath = `/page/${item.params.slug}`;
        else if (item.target !== 'home') toPath = `/${item.target}`;

        const isActive = location.pathname === toPath;
        
        return (
          <li key={item.label} style={{ position: 'relative' }}>
            <Link
              to={toPath}
              onClick={handleItemClick}
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
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navbar;
