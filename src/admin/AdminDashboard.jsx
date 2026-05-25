import React from 'react';
import { dummyArticles } from '../dummy-data/news-data';
import { techTricksData } from '../dummy-data/tech-data';
import { aiToolsData } from '../dummy-data/tool-data';
import { useAuthContext } from '../context/AuthContext';

const AdminNav = ({ active, onNavigate }) => (
  <div className="admin-nav">
    {[
      { label: 'Dashboard', page: 'admin-dashboard' },
      { label: 'Manage Posts', page: 'admin-manage' },
      { label: 'Create Post', page: 'admin-create' }
    ].map(({ label, page }) => (
      <button key={page} onClick={() => onNavigate(page)} className={active === page ? 'active' : ''}>
        {label}
      </button>
    ))}
  </div>
);

const AdminDashboard = ({ onNavigate }) => {
  const { logout } = useAuthContext();
  const totalPosts = dummyArticles.length + techTricksData.length;
  const categories = [...new Set([...dummyArticles.map(a => a.category), ...techTricksData.map(t => t.category)])];
  const published = dummyArticles.filter(a => a.status === 'published').length;
  const tools = aiToolsData.length;

  const handleLogout = () => { logout(); window.location.reload(); };

  const recentPosts = [...dummyArticles, ...techTricksData]
    .sort((a, b) => b.publishDate - a.publishDate)
    .slice(0, 5);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FFF' }}>Admin Dashboard</h1>
        <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid var(--danger)', color: 'var(--danger)', padding: '6px 16px', borderRadius: 'var(--btn-radius)', fontSize: '0.8rem', fontWeight: '700', transition: 'var(--transition)' }}
          onMouseOver={(e) => { e.currentTarget.style.background = 'var(--danger)'; e.currentTarget.style.color = '#FFF'; }}
          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--danger)'; }}
        >Logout</button>
      </div>

      <AdminNav active="admin-dashboard" onNavigate={onNavigate} />

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '36px' }}>
        {[
          { label: 'Total Posts', value: totalPosts, color: 'var(--primary)' },
          { label: 'Categories', value: categories.length, color: 'var(--secondary)' },
          { label: 'Published', value: published, color: 'var(--success)' },
          { label: 'AI Tools', value: tools, color: 'var(--warning)' }
        ].map(({ label, value, color }) => (
          <div key={label} className="premium-card" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '900', color, marginBottom: '6px' }}>{value}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Recent Posts */}
      <h2 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#FFF', marginBottom: '16px' }}>Recent Posts</h2>
      <div className="premium-card" style={{ overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Title', 'Category', 'Date', 'Status'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 16px', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.75rem', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recentPosts.map((r, i) => {
              const title = r.title || r.name;
              const dateStr = r.publishDate instanceof Date ? r.publishDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
              const isPub = r.status === 'published';
              return (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '12px 16px', color: '#FFF', fontWeight: '600' }}>{title}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--primary)', fontSize: '0.78rem', fontWeight: '700' }}>{r.category}</td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-secondary)' }}>{dateStr}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '700', padding: '3px 10px', borderRadius: '4px', background: isPub ? 'rgba(0,214,143,0.15)' : 'rgba(255,217,61,0.15)', color: isPub ? '#00D68F' : '#FFD93D' }}>
                      {isPub ? 'Published' : 'Draft'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
