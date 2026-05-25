import React, { useState } from 'react';
import { generateSlug } from '../utils/helpers';

const CATEGORIES = ['AI News', 'ChatGPT', 'AI Tools', 'Tech Tricks', 'Android Tips', 'Mobile Tips', 'Apps', 'Updates'];

const inputStyle = {
  width: '100%', padding: '10px 14px', background: '#131622',
  border: '1px solid var(--border)', borderRadius: 'var(--btn-radius)',
  fontSize: '0.88rem', color: '#FFF'
};

const labelStyle = {
  fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600',
  display: 'block', marginBottom: '6px'
};

const CreatePost = ({ initialValues, isEdit, onNavigate }) => {
  const defaults = initialValues || { title: '', category: 'AI News', excerpt: '', content: '', seoTitle: '', seoDescription: '', tags: '' };
  const [title, setTitle] = useState(defaults.title);
  const [category, setCategory] = useState(defaults.category);
  const [excerpt, setExcerpt] = useState(defaults.excerpt);
  const [content, setContent] = useState(defaults.content);
  const [seoTitle, setSeoTitle] = useState(defaults.seoTitle || '');
  const [seoDesc, setSeoDesc] = useState(defaults.seoDescription || '');
  const [tags, setTags] = useState(Array.isArray(defaults.tags) ? defaults.tags.join(', ') : (defaults.tags || ''));
  const [status, setStatus] = useState('published');

  const slug = generateSlug(title);

  const handlePublish = (e) => {
    e.preventDefault();
    alert(isEdit ? 'Post updated (demo)' : 'Post published (demo)');
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      {onNavigate && (
        <button onClick={() => onNavigate('admin-dashboard')} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '20px', transition: 'var(--transition)' }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
        >← Back to Dashboard</button>
      )}

      <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FFF', marginBottom: '28px' }}>
        {isEdit ? 'Edit Post' : 'Create New Post'}
      </h1>

      <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        <div>
          <label htmlFor="post-title" style={labelStyle}>Post Title</label>
          <input id="post-title" type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter article title..." style={inputStyle} />
          {title && <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>Slug: {slug}</span>}
        </div>

        <div>
          <label htmlFor="post-category" style={labelStyle}>Category</label>
          <select id="post-category" value={category} onChange={(e) => setCategory(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="post-excerpt" style={labelStyle}>Excerpt</label>
          <textarea id="post-excerpt" rows="2" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Brief summary for cards and previews..." style={{ ...inputStyle, resize: 'vertical' }} />
        </div>

        <div>
          <label style={labelStyle}>Thumbnail Image</label>
          <div style={{ border: '2px dashed var(--border)', borderRadius: 'var(--btn-radius)', padding: '30px', textAlign: 'center', cursor: 'pointer', background: '#131622' }}>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>Click or drag to upload thumbnail</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--primary)' }}>Recommended: 1200×675px, WebP, under 100KB</div>
          </div>
        </div>

        <div>
          <label htmlFor="post-content" style={labelStyle}>Full Article Content</label>
          <textarea id="post-content" rows="12" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write full article body here..." style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.7' }} />
        </div>

        <div>
          <label htmlFor="post-tags" style={labelStyle}>Tags (comma separated)</label>
          <input id="post-tags" type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="ai, chatgpt, tutorial" style={inputStyle} />
        </div>

        {/* SEO Fields */}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '22px' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-secondary)', marginBottom: '16px' }}>SEO Settings</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label htmlFor="seo-title" style={labelStyle}>SEO Title</label>
              <input id="seo-title" type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="Custom title for search engines..." style={inputStyle} />
            </div>
            <div>
              <label htmlFor="seo-desc" style={labelStyle}>SEO Description</label>
              <textarea id="seo-desc" rows="2" value={seoDesc} onChange={(e) => setSeoDesc(e.target.value)} placeholder="Meta description for search results..." style={{ ...inputStyle, resize: 'vertical' }} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '14px', marginTop: '8px', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
            <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ ...inputStyle, width: 'auto', padding: '6px 10px', fontSize: '0.8rem' }}>
              <option value="published">Publish</option>
              <option value="draft">Save as Draft</option>
            </select>
          </label>

          <button type="submit" style={{ flex: 1, padding: '12px', borderRadius: 'var(--btn-radius)', fontSize: '0.85rem', fontWeight: '700', background: 'var(--primary)', color: '#FFF', transition: 'var(--transition)' }}
            onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.filter = 'none'}
          >{isEdit ? 'Update Post' : status === 'published' ? 'Publish Post' : 'Save Draft'}</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
