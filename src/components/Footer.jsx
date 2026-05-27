import AdBanner from './AdBanner';
import AnimatedSection from './AnimatedSection';
import { motion } from 'framer-motion';

const Footer = ({ onNavigate }) => {
  const handleLinkClick = (e, page, params = {}) => {
    e.preventDefault();
    if (onNavigate) onNavigate(page, params);
    window.scrollTo(0, 0);
  };

  return (
    <footer style={{ backgroundColor: 'var(--card-bg)', borderTop: '1px solid var(--border)', padding: '60px 20px 20px', marginTop: '40px', position: 'relative', overflow: 'hidden' }} aria-label="Site Footer">
      {/* Background Decorative Shapes */}
      <motion.div 
        style={{ position: 'absolute', top: '-10%', left: '-5%', width: '40%', paddingTop: '40%', background: 'var(--soft-accent)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.1, zIndex: 0 }}
        animate={{ scale: [1, 1.1, 1], x: [0, 20, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        style={{ position: 'absolute', bottom: '-10%', right: '-5%', width: '50%', paddingTop: '50%', background: 'var(--secondary)', borderRadius: '50%', filter: 'blur(100px)', opacity: 0.1, zIndex: 0 }}
        animate={{ scale: [1, 1.05, 1], x: [0, -20, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Compact footer ad */}
        <AnimatedSection>
          <AdBanner slot="footerBanner" />
        </AnimatedSection>
        <div className="footer-grid" style={{ marginTop: '30px' }}>
          {/* Brand */}
          <AnimatedSection delay={0.1}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <a href="#/" onClick={(e) => handleLinkClick(e, 'home')} style={{ fontSize: '1.4rem', fontWeight: '800', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', width: 'fit-content' }}>
              HOT AI
            </a>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.6', maxWidth: '350px' }}>
              Real AI news, practical tech tutorials, and verified AI tool reviews — no hype, no fluff, just authentic insights.
            </p>
            <div style={{ display: 'flex', gap: '12px' }} aria-label="Social media">
              {[
                { label: 'X', path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { label: 'GitHub', path: 'M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' }
              ].map(({ label, path }) => (
                <span key={label} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid var(--border)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'var(--transition)' }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                  title={label}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--text-secondary)"><path d={path} /></svg>
                </span>
              ))}
            </div>
            </div>
          </AnimatedSection>

          {/* Quick Links */}
          <AnimatedSection delay={0.2}>
            <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '15px', color: 'var(--text)', textTransform: 'uppercase' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0 }}>
              {[
                { label: 'Home', page: 'home' },
                { label: 'AI News', page: 'category', params: { name: 'AI News' } },
                { label: 'Tech Tricks', page: 'tech-tricks' },
                { label: 'AI Tools', page: 'ai-tools' },
                { label: 'Trending', page: 'trending' }
              ].map((link) => (
                <li key={link.label}>
                  <a href={`#/${link.page}`} onClick={(e) => handleLinkClick(e, link.page, link.params)} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', transition: 'var(--transition)' }}
                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            </div>
          </AnimatedSection>

          {/* Legal */}
          <AnimatedSection delay={0.3}>
            <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '15px', color: 'var(--text)', textTransform: 'uppercase' }}>Legal & Info</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', padding: 0 }}>
              {[
                { label: 'About', slug: 'about' },
                { label: 'Editorial', slug: 'editorial' },
                { label: 'Privacy Policy', slug: 'privacy' },
                { label: 'Terms of Service', slug: 'terms' },
                { label: 'Contact', slug: 'contact' }
              ].map(({ label, slug }) => (
                <li key={slug}>
                  <a href={`#/page/${slug}`} onClick={(e) => handleLinkClick(e, 'page', { slug })} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}
                    onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            </div>
          </AnimatedSection>
        </div>

        {/* Copyright */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px', marginTop: '10px', display: 'flex', justifyContent: 'center' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
            &copy; {new Date().getFullYear()} Hot AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
