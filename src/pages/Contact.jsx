import React from 'react';

const Contact = ({ onNavigate }) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will respond within 24 hours.');
  };

  return (
    <div style={{ paddingBottom: '30px' }} aria-labelledby="contact-page-title">
      <div 
        style={{
          borderBottom: '1px solid var(--border)',
          paddingBottom: '12px',
          marginBottom: '24px'
        }}
      >
        <h1 
          id="contact-page-title"
          style={{
            fontSize: '1.8rem',
            fontWeight: '800',
            color: '#FFFFFF'
          }}
        >
          Get In Touch
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '4px' }}>
          Have questions? Want to contribute? Reach out to our team.
        </p>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: '#FFFFFF' }}>
          Contact Information
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '15px' }}>General Inquiries</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>info@hotai.news</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '15px' }}>Editorial & Press</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>editorial@hotai.news</p>
          </div>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FFFFFF', marginBottom: '15px' }}>Partnerships</h3>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-secondary)' }}>partners@hotai.news</p>
          </div>
        </div>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: '#FFFFFF' }}>
          Send Us a Message
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="contact-name" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Name</label>
            <input id="contact-name" type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Your full name" style={{ width: '100%', padding: '10px 14px', background: '#131622', border: '1px solid var(--border)', borderRadius: 'var(--btn-radius)', fontSize: '0.88rem', color: '#FFF' }} />
          </div>
          <div>
            <label htmlFor="contact-email" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Email</label>
            <input id="contact-email" type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="your@email.com" style={{ width: '100%', padding: '10px 14px', background: '#131622', border: '1px solid var(--border)', borderRadius: 'var(--btn-radius)', fontSize: '0.88rem', color: '#FFF' }} />
          </div>
          <div>
            <label htmlFor="contact-subject" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Subject</label>
            <select id="contact-subject" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})}
              style={{ width: '100%', padding: '10px 14px', background: '#131622', border: '1px solid var(--border)', borderRadius: 'var(--btn-radius)', fontSize: '0.88rem', color: '#FFF', cursor: 'pointer' }}>
              <option value="">Select a subject...</option>
              <option value="general">General Inquiry</option>
              <option value="editorial">Editorial Question</option>
              <option value="partnership">Partnership Opportunity</option>
              <option value="bug-report">Bug Report</option>
              <option value="feedback">Feedback or Suggestion</option>
            </select>
          </div>
          <div>
            <label htmlFor="contact-message" style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Message</label>
            <textarea id="contact-message" rows="6" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Tell us about your question, feedback, or idea..." style={{ width: '100%', padding: '10px 14px', background: '#131622', border: '1px solid var(--border)', borderRadius: 'var(--btn-radius)', fontSize: '0.88rem', color: '#FFF', resize: 'vertical', lineHeight: '1.7' }} />
          </div>
          <button type="submit" style={{
            background: 'var(--primary)', color: '#FFF', padding: '12px',
            borderRadius: 'var(--btn-radius)', fontSize: '0.85rem', fontWeight: '700',
            transition: 'var(--transition)'
          }}
            onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.filter = 'none'}
          >Send Message</button>
        </form>
      </div>

      <div className="premium-card" style={{ padding: '30px', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '700', marginBottom: '20px', color: '#FFFFFF' }}>
          Office Hours
        </h2>
        <p style={{ fontSize: '1.05rem', lineHeight: '1.75', color: 'var(--text-secondary)' }}>
          Our editorial team is available Monday through Friday, 9am to 5pm EST. We aim to respond to all inquiries within 24 business hours.
        </p>
      </div>
      <meta name="title" content="Contact Hot AI - Get in Touch with Our Editorial Team" />
      <meta name="description" content="Reach out to Hot AI's editorial team for inquiries, feedback, partnership opportunities, or technical support. We respond to all messages within 24 business hours." />
      <link rel="canonical" href="https://hotai.news/page/contact" />
    </div>
  );
};

export default Contact;
