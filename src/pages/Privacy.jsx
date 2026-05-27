import React, { useEffect } from 'react';
import { updateMetaTags } from '../utils/helpers';

const Privacy = ({ onNavigate }) => {
  useEffect(() => {
    updateMetaTags({
      title: "Privacy Policy - Hot AI's Data Collection & Security Practices",
      description: "Hot AI's privacy policy explaining our minimal data collection practices, security measures, third-party services, and your rights regarding personal information.",
      canonicalUrl: "https://hotai.news/page/privacy"
    });
  }, []);

  return (
    <div style={{ paddingBottom: '30px' }} aria-labelledby="privacy-page-title">
      <div 
        style={{
          borderBottom: '1px solid var(--border)',
          paddingBottom: '12px',
          marginBottom: '24px'
        }}
      >
        <h1 
          id="privacy-page-title"
          style={{
            fontSize: '1.8rem',
            fontWeight: '800',
            color: 'var(--text)'
          }}
        >
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          Last updated: May 23, 2026
        </p>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: 'var(--text)' }}>
          Information Collection and Use
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
          We collect minimal information to provide our services:
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
          <li><strong>Anonymous Analytics:</strong> We use Plausible Analytics to track anonymous page views, engagement metrics, and referral sources. No personal data is collected.</li>
          <li><strong>Contact Form Data:</strong> When you submit our contact form, we collect your name, email, subject, and message to respond to your inquiry. This data is stored securely and never shared with third parties.</li>
          <li><strong>No Tracking Cookies:</strong> We do not use tracking cookies, advertising networks, or behavioral analytics tools that identify individual users.</li>
        </ul>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: 'var(--text)' }}>
          Data Security
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
          We take data security seriously and implement industry-standard practices:
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
          <li><strong>Encryption:</strong> All data transmission is protected using TLS 1.3 encryption.</li>
          <li><strong>Secure Storage:</strong> Contact form data is encrypted at rest using AES-256 encryption.</li>
          <li><strong>Access Controls:</strong> Only authorized editorial staff have access to contact form submissions.</li>
          <li><strong>Data Retention:</strong> Contact form data is retained for 90 days before automatic deletion.</li>
        </ul>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: 'var(--text)' }}>
          Third-Party Services
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
          We use the following third-party services:
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
          <li><strong>Plausible Analytics:</strong> Anonymous website analytics. No cookies, no personal data collection.</li>
          <li><strong>Vercel:</strong> Hosting platform. They maintain strict security standards and comply with GDPR.</li>
          <li><strong>Cloudflare:</strong> DNS and CDN services. Provides DDoS protection and performance optimization.</li>
          <li><strong>Cloudflare Page Rules:</strong> Dynamic caching.</li>
        </ul>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: 'var(--text)' }}>
          Your Rights
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
          You have the right to:
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '15px' }}>
          <li><strong>Access:</strong> Request a copy of any personal data we hold about you.</li>
          <li><strong>Correction:</strong> Request correction of inaccurate information.</li>
          <li><strong>Deletion:</strong> Request deletion of your contact form data (within 90 days).</li>
        </ul>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)', marginTop: '15px' }}>
          To exercise these rights, please contact us at privacy@hotai.news.
        </p>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: 'var(--text)' }}>
          Changes to This Policy
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
          We may update this Privacy Policy periodically. The latest version will always be available on this page. Significant changes will be communicated through our newsletter and site notifications.
        </p>
      </div>
    </div>
  );
};

export default Privacy;
