import React, { useState } from 'react';
import { getArticles, getTechTricks, getAiTools, deletePost } from '../utils/dataStore';
import ImageWithFallback from '../components/ImageWithFallback';
import { AdminNav } from './AdminDashboard';
import Toast from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';

const ManagePosts = ({ onNavigate }) => {
  const [selectedType, setSelectedType] = useState('article'); // 'article' | 'tech' | 'tool'
  const [filterQuery, setFilterQuery] = useState('');
  const [toast, setToast] = useState(null);
  const [confirmState, setConfirmState] = useState({ isOpen: false, id: null, title: '' });

  const showToast = (message, type = 'success') => setToast({ message, type });

  const loadPosts = () => {
    if (selectedType === 'article') return getArticles();
    if (selectedType === 'tech') return getTechTricks();
    return getAiTools();
  };

  const allPosts = loadPosts();

  const posts = allPosts.filter(p => {
    const title = p.title || p.name || '';
    const cat = p.category || '';
    return title.toLowerCase().includes(filterQuery.toLowerCase()) ||
           cat.toLowerCase().includes(filterQuery.toLowerCase());
  });

  const confirmDelete = (id, title) => {
    setConfirmState({ isOpen: true, id, title });
  };

  const handleDelete = () => {
    const { id, title } = confirmState;
    if (!id) return;
    
    const success = deletePost(selectedType, id);
    if (success) {
      setFilterQuery(prev => prev); // dummy state change to refresh
      showToast(`Deleted "${title}" successfully.`);
    } else {
      showToast('Failed to delete post.', 'error');
    }
    setConfirmState({ isOpen: false, id: null, title: '' });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text)' }}>Manage Posts</h1>
        <button onClick={() => onNavigate('admin-create')} style={{ background: 'var(--primary)', color: 'var(--text)', padding: '8px 18px', borderRadius: 'var(--btn-radius)', fontSize: '0.8rem', fontWeight: '700', transition: 'var(--transition)', cursor: 'pointer', border: 'none' }}
          onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.filter = 'none'}
        >+ New Post</button>
      </div>

      <AdminNav active="admin-manage" onNavigate={onNavigate} />

      {/* Content Type Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
        {[
          { id: 'article', label: 'News Articles' },
          { id: 'tech', label: 'Tech Tricks' },
          { id: 'tool', label: 'AI Tools' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => { setSelectedType(t.id); setFilterQuery(''); }}
            style={{
              background: selectedType === t.id ? 'rgba(255,94,108,0.15)' : 'transparent',
              border: selectedType === t.id ? '1px solid var(--primary)' : '1px solid transparent',
              color: selectedType === t.id ? 'var(--primary)' : 'var(--text-secondary)',
              padding: '6px 14px',
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder={`Search ${selectedType === 'article' ? 'articles' : selectedType === 'tech' ? 'tricks' : 'tools'}...`}
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          style={{
            width: '100%',
            maxWidth: '360px',
            padding: '8px 12px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--btn-radius)',
            color: 'var(--text)',
            fontSize: '0.82rem'
          }}
        />
      </div>

      <div className="premium-card" style={{ overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', minWidth: '650px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {selectedType !== 'tool' ? (
                ['', 'Title', 'Category', 'Date', 'Status', 'Actions'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 14px', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.72rem', textTransform: 'uppercase' }}>{h}</th>
                ))
              ) : (
                ['', 'Name', 'Category', 'Pricing', 'Website', 'Actions'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '12px 14px', color: 'var(--text-secondary)', fontWeight: '600', fontSize: '0.72rem', textTransform: 'uppercase' }}>{h}</th>
                ))
              )}
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                  No items found matching your filters.
                </td>
              </tr>
            ) : (
              posts.map((p) => {
                const title = p.title || p.name;
                const isPub = p.status === 'published';

                if (selectedType !== 'tool') {
                  const dateStr = p.publishDate instanceof Date ? p.publishDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ width: '48px', height: '34px', borderRadius: '6px', overflow: 'hidden' }}>
                          <ImageWithFallback src={p.featuredImage?.url} alt={title} width={48} height={34} loading="lazy" />
                        </div>
                      </td>
                      <td style={{ padding: '10px 14px', color: 'var(--text)', fontWeight: '600', maxWidth: '260px' }}>{title}</td>
                      <td style={{ padding: '10px 14px', color: 'var(--primary)', fontSize: '0.76rem', fontWeight: '700' }}>{p.category}</td>
                      <td style={{ padding: '10px 14px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{dateStr}</td>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{ fontSize: '0.7rem', fontWeight: '700', padding: '3px 10px', borderRadius: '4px', background: isPub ? 'rgba(0,214,143,0.15)' : 'rgba(255,217,61,0.15)', color: isPub ? 'var(--success)' : 'var(--warning)' }}>
                          {isPub ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => onNavigate('admin-edit', { id: p.id, type: selectedType })} style={{ padding: '5px 12px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '700', border: '1px solid var(--primary)', color: 'var(--primary)', background: 'transparent', transition: 'var(--transition)', cursor: 'pointer' }}
                            onMouseOver={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'var(--text)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--primary)'; }}
                          >Edit</button>
                          <button onClick={() => confirmDelete(p.id, title)} style={{ padding: '5px 12px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '700', border: '1px solid #FF6B6B', color: 'var(--danger)', background: 'transparent', transition: 'var(--transition)', cursor: 'pointer' }}
                            onMouseOver={(e) => { e.currentTarget.style.background = 'var(--danger)'; e.currentTarget.style.color = 'var(--text)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--danger)'; }}
                          >Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '6px', overflow: 'hidden' }}>
                          <ImageWithFallback src={p.logo} alt={title} width={32} height={32} loading="lazy" />
                        </div>
                      </td>
                      <td style={{ padding: '10px 14px', color: 'var(--text)', fontWeight: '600', maxWidth: '260px' }}>{title}</td>
                      <td style={{ padding: '10px 14px', color: 'var(--primary)', fontSize: '0.76rem', fontWeight: '700' }}>{p.category}</td>
                      <td style={{ padding: '10px 14px', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'capitalize' }}>{p.pricing}</td>
                      <td style={{ padding: '10px 14px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                        <a href={p.website} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>{p.website?.replace(/^https?:\/\//, '')}</a>
                      </td>
                      <td style={{ padding: '10px 14px' }}>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button onClick={() => onNavigate('admin-edit', { id: p.id, type: 'tool' })} style={{ padding: '5px 12px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '700', border: '1px solid var(--primary)', color: 'var(--primary)', background: 'transparent', transition: 'var(--transition)', cursor: 'pointer' }}
                            onMouseOver={(e) => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = 'var(--text)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--primary)'; }}
                          >Edit</button>
                          <button onClick={() => confirmDelete(p.id, title)} style={{ padding: '5px 12px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '700', border: '1px solid #FF6B6B', color: 'var(--danger)', background: 'transparent', transition: 'var(--transition)', cursor: 'pointer' }}
                            onMouseOver={(e) => { e.currentTarget.style.background = 'var(--danger)'; e.currentTarget.style.color = 'var(--text)'; }}
                            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--danger)'; }}
                          >Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              })
            )}
          </tbody>
        </table>
      </div>
      
      <ConfirmModal 
        isOpen={confirmState.isOpen}
        title="Delete Post"
        message={`Are you sure you want to permanently delete "${confirmState.title}"? This action cannot be undone.`}
        confirmText="Delete"
        onConfirm={handleDelete}
        onCancel={() => setConfirmState({ isOpen: false, id: null, title: '' })}
      />
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default ManagePosts;
