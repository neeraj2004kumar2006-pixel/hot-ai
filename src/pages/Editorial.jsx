import React from 'react';

const Editorial = ({ onNavigate }) => {
  return (
    <div style={{ paddingBottom: '30px' }} aria-labelledby="editorial-page-title">
      <div 
        style={{
          borderBottom: '1px solid var(--border)',
          paddingBottom: '12px',
          marginBottom: '24px'
        }}
      >
        <h1 
          id="editorial-page-title"
          style={{
            fontSize: '1.8rem',
            fontWeight: '800',
            color: '#FFFFFF'
          }}
        >
          Our Editorial Process
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          How we research, write, test, and verify every piece of content.
        </p>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: '#FFFFFF' }}>
          Research & Verification
        </h2>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li><strong>Source Verification:</strong> We only cite primary sources (research papers, official documentation, developer interviews) and never rely solely on press releases or marketing materials.</li>
          <li><strong>Cross-Validation:</strong> Technical claims are verified through multiple independent sources and real-world testing.</li>
          <li><strong>Expert Review:</strong> Every technical article is reviewed by domain experts before publication.</li>
          <li><strong>Fact-Checking:</strong> A dedicated fact-checking team verifies all statistics, benchmarks, and performance claims.</li>
        </ul>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: '#FFFFFF' }}>
          AI Tool Reviews Process
        </h2>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li><strong>Hands-On Testing:</strong> Each tool undergoes at least 40 hours of hands-on testing across multiple use cases.</li>
          <li><strong>Benchmarking:</strong> Performance metrics are collected using standardized benchmarks and compared against industry standards.</li>
          <li><strong>Real-World Use:</strong> Tools are tested in production-like environments with realistic workloads.</li>
          <li><strong>Transparency Report:</strong> Every review includes a detailed methodology section with exact testing parameters.</li>
        </ul>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: '#FFFFFF' }}>
          Content Guidelines
        </h2>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <li><strong>No Hype Policy:</strong> We avoid speculative claims about future capabilities and focus on what works today.</li>
          <li><strong>Developer-Centric:</strong> All content prioritizes practical implementation details over theoretical discussions.</li>
          <li><strong>Code-First:</strong> Technical articles include working code examples, configuration files, and deployment instructions.</li>
          <li><strong>Performance-Focused:</strong> We emphasize optimization techniques, performance metrics, and scalability considerations.</li>
        </ul>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: '#FFFFFF' }}>
          Corrections & Updates
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
          We maintain a transparent corrections policy. If we discover an error in published content, we:
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
          <li><strong>Immediate Correction:</strong> The original content is corrected within 24 hours of verification.</li>
          <li><strong>Transparent Note:</strong> A visible correction note is added to the top of the article explaining what was changed.</li>
          <li><strong>Version History:</strong> All major revisions are tracked and available upon request.</li>
          <li><strong>Reader Feedback:</strong> We welcome reader feedback and corrections via our contact form.</li>
        </ul>
      </div>
      <meta name="title" content="Our Editorial Process - Hot AI's Content Standards & Verification" />
      <meta name="description" content="How Hot AI researches, writes, tests, and verifies every piece of content. Learn about our rigorous editorial standards, AI tool review process, and corrections policy." />
      <link rel="canonical" href="https://hotai.news/page/editorial" />
    </div>
  );
};

export default Editorial;
