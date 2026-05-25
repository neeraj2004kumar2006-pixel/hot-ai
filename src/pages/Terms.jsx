import React, { useEffect } from 'react';
import { updateMetaTags } from '../utils/helpers';

const Terms = ({ onNavigate }) => {
  useEffect(() => {
    updateMetaTags({
      title: "Terms of Service - Hot AI's Usage Policies & Legal Requirements",
      description: "Hot AI's terms of service outlining acceptable use policies, content licensing, user conduct requirements, and liability limitations.",
      canonicalUrl: "https://hotai.news/page/terms"
    });
  }, []);

  return (
    <div style={{ paddingBottom: '30px' }} aria-labelledby="terms-page-title">
      <div 
        style={{
          borderBottom: '1px solid var(--border)',
          paddingBottom: '12px',
          marginBottom: '24px'
        }}
      >
        <h1 
          id="terms-page-title"
          style={{
            fontSize: '1.8rem',
            fontWeight: '800',
            color: '#FFFFFF'
          }}
        >
          Terms of Service
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          Last updated: May 23, 2026
        </p>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: '#FFFFFF' }}>
          Acceptance of Terms
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
          By accessing or using Hot AI's website, you agree to be bound by these Terms of Service. If you do not agree with these terms, please do not use our services.
        </p>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: '#FFFFFF' }}>
          Use of Content
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
          All content on Hot AI is provided for informational and educational purposes only. You may:
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
          <li><strong>Personal Use:</strong> Read, share, and reference our content for personal, non-commercial purposes.</li>
          <li><strong>Attribution:</strong> Quote reasonable portions of our content with proper attribution and a link back to the original article.</li>
          <li><strong>Education:</strong> Use our content in classroom settings with appropriate credit.</li>
        </ul>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)', marginTop: '15px' }}>
          You may NOT:
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
          <li><strong>Commercial Use:</strong> Republish, resell, or use our content for commercial purposes without explicit written permission.</li>
          <li><strong>Automated Scraping:</strong> Use bots, scrapers, or automated tools to extract content from our site.</li>
          <li><strong>Derivative Works:</strong> Create derivative works based on our content without permission.</li>
        </ul>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: '#FFFFFF' }}>
          User Conduct
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
          When using our site, you agree to:
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
          <li><strong>Respectful Communication:</strong> Engage respectfully in any community features (coming soon).</li>
          <li><strong>No Malicious Activity:</strong> Do not attempt to disrupt, compromise, or harm our systems.</li>
          <li><strong>Accurate Information:</strong> Provide truthful information when contacting us.</li>
          <li><strong>Compliance:</strong> Follow all applicable laws and regulations.</li>
        </ul>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: '#FFFFFF' }}>
          Limitation of Liability
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
          Hot AI provides content "as is" and makes no representations or warranties about accuracy, reliability, or completeness. While we strive for accuracy, we are not liable for any errors or omissions in our content.
        </p>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: '#FFFFFF' }}>
          Changes to Terms
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
          We reserve the right to modify these Terms at any time. The most current version will always be posted here. Continued use after changes constitutes acceptance of the revised terms.
        </p>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: '#FFFFFF' }}>
          Contact Us
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
          Questions about these Terms should be directed to legal@hotai.news.
        </p>
      </div>
    </div>
  );
};

export default Terms;
