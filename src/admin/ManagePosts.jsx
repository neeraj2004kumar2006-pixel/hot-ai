import React from 'react';
import { dummyArticles } from '../dummy-data/news-data';
import ImageWithFallback from '../components/ImageWithFallback';

const ManagePosts = ({ onNavigate }) => {
  const posts = dummyArticles;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FFF' }}>Manage Posts</h1>
        <button onClick={() => onNavigate('admin-create')} style={{ background: 'var(--primary)', color: '#FFF', padding: '8px 18px', borderRadius: 'var(--btn-radius)', fontSize: '0.8rem', fontWeight: '700', transition: 'var(--transition)' }}
          onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.filter = 'none'}
        >+ New Post</button>
      </div>

      <div className="admin-nav">
        {[
          { label: 'Dashboard', page: 'admin-dashboard' },
          { label: 'Manage Posts', page: 'admin-manage' },
          { label: 'Create Post', page: 'admin-create' }
        ].map(({ label, page }) => (
          <button key={page} onClick={() => onNavigate(page)} className={page === 'admin-manage' ? 'active' : ''}>
            {label}
          </button>
        ))}
      </div>

      <div className="premium-card" style={{ overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', minWidth: '650px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['', 'Title', 'Category', 'Date', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '12px 14px', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.72rem', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => {
              const dateStr = p.publishDate instanceof Date ? p.publishDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
              const isPub = p.status === 'published';
              return (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '10px 14px' }}>
                    <div style={{ width: '48px', height: '34px', borderRadius: '6px', overflow: 'hidden' }}>
                      <ImageWithFallback src={p.featuredImage?.url} alt={p.title} width={48} height={34} loading="lazy" />
                    </div>
                  </td>
                  <td style={{ padding: '10px 14px', color: '#FFF', fontWeight: '600', maxWidth: '260px' }}>{p.title}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--primary)', fontSize: '0.76rem', fontWeight: '700' }}>{p.category}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{dateStr}</td>
                  <td style={{ padding: '10px 14px' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '700', padding: '3px 10px', borderRadius: '4px', background: isPub ? 'rgba(0,214,143,0.15)' : 'rgba(255,217,61,0.15)', color: isPub ? '#00D68F' : '#FFD93D' }}>
                      {isPub ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '10px 14px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => onNavigate('admin-edit', { id: p.id })} style={{ padding: '5px 12px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '700', border: '1px solid var(--primary)', color: 'var(--primary)', transition: 'var(--transition)' }}
                        onMouseOver={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#FFF'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--primary)'; }}
                      >Edit</button>
                      <button onClick={() => alert('Delete demo: ' + p.title)} style={{ padding: '5px 12px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '700', border: '1px solid #FF6B6B', color: '#FF6B6B', transition: 'var(--transition)' }}
                        onMouseOver={(e) => { e.currentTarget.style.background = '#FF6B6B'; e.currentTarget.style.color = '#FFF'; }}
                        onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#FF6B6B'; }}
                      >Delete</button>
                    </div>
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

export default ManagePosts;
