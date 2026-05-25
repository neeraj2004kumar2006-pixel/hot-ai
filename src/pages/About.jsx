import React, { useEffect } from 'react';
import { updateMetaTags } from '../utils/helpers';

const About = ({ onNavigate }) => {
  useEffect(() => {
    updateMetaTags({
      title: "About Hot AI - Our Mission, Team & Editorial Standards",
      description: "Learn about Hot AI's mission to deliver authentic AI news, practical tech tutorials, and verified AI tool reviews. Meet our team of experienced developers and AI researchers.",
      canonicalUrl: "https://hotai.news/page/about"
    });
  }, []);

  return (
    <div style={{ paddingBottom: '30px' }} aria-labelledby="about-page-title">
      <div 
        style={{
          borderBottom: '1px solid var(--border)',
          paddingBottom: '12px',
          marginBottom: '24px'
        }}
      >
        <h1 
          id="about-page-title"
          style={{
            fontSize: '1.8rem',
            fontWeight: '800',
            color: '#FFFFFF'
          }}
        >
          About Hot AI
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          Our mission is to deliver authentic AI news, practical tech tutorials, and verified AI tool reviews.
        </p>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: '#FFFFFF' }}>
          Who We Are
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
          Hot AI is a community-driven technology publication founded by experienced developers and AI researchers. Unlike many AI news sites that focus on hype and speculation, we prioritize practical insights, real-world implementation details, and verified performance metrics.
        </p>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)', marginTop: '20px' }}>
          Our team includes senior engineers with over 15 years of experience in AI development, frontend architecture, and performance optimization. We believe in transparency, authenticity, and delivering content that actually helps developers build better software.
        </p>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: '#FFFFFF' }}>
          Our Editorial Standards
        </h2>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li><strong>Real Testing:</strong> Every AI tool review includes hands-on testing, performance benchmarks, and real-world use cases.</li>
          <li><strong>No Hype:</strong> We avoid speculative claims and focus on what works today, not theoretical future capabilities.</li>
          <li><strong>Developer-First:</strong> Content is written by practitioners for practitioners, with code examples and implementation details.</li>
          <li><strong>Transparency:</strong> We disclose our testing methodology, tools used, and any potential conflicts of interest.</li>
        </ul>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: '#FFFFFF' }}>
          Meet Our Team
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#131622', marginBottom: '15px' }}>
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60" alt="Sarah Johnson" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '5px' }}>Sarah Johnson</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Senior AI Researcher & Editor-in-Chief</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '10px', lineHeight: '1.5' }}>12+ years in AI research and development, former lead at major AI labs.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#131622', marginBottom: '15px' }}>
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60" alt="Michael Chen" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '5px' }}>Michael Chen</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Developer Advocate & Technical Writer</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '10px', lineHeight: '1.5' }}>8+ years building developer tools and creating technical documentation.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#131622', marginBottom: '15px' }}>
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=60" alt="Alex Rivera" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '5px' }}>Alex Rivera</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Mobile Optimization Specialist</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '10px', lineHeight: '1.5' }}>Expert in Android and iOS performance optimization and battery life.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
