import React, { useState } from 'react';
import { generateSlug } from '../utils/helpers';
import { addPost, updatePost } from '../utils/dataStore';
import { AdminNav } from './AdminDashboard';
import Toast from '../components/Toast';

const CATEGORIES_ARTICLE = ['AI News', 'ChatGPT', 'AI Tools', 'Tech Tricks', 'Apps'];
const CATEGORIES_TECH = ['Android Tips', 'Tech Tricks', 'Mobile Tips', 'iOS Tips'];
const CATEGORIES_TOOL = ['Developer Tools', 'Video Generators', 'Writing Tools', 'Image Generators', 'Productivity', 'Code Assistants'];

const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1684369175764-a17d18f613a8?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&auto=format&fit=crop&q=60',
  'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=60'
];

const inputStyle = {
  width: '100%', padding: '10px 14px', background: '#131622',
  border: '1px solid var(--border)', borderRadius: 'var(--btn-radius)',
  fontSize: '0.88rem', color: '#FFF'
};

const labelStyle = {
  fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: '600',
  display: 'block', marginBottom: '6px'
};

const CreatePost = ({ initialValues, isEdit, onNavigate, editId, editType }) => {
  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => setToast({ message, type });

  // If we are editing, lock the type. Else, allow toggling.
  const [contentType, setContentType] = useState(editType || 'article'); // 'article' | 'tech' | 'tool'

  const defaults = initialValues || {
    title: '',
    name: '',
    category: '',
    excerpt: '',
    description: '',
    content: '',
    seoTitle: '',
    seoDescription: '',
    tags: '',
    featuredImage: '',
    logo: '',
    pricing: 'freemium',
    website: '',
    features: '',
    useCases: '',
    pros: '',
    cons: '',
    alternatives: ''
  };

  const [title, setTitle] = useState(defaults.title || defaults.name || '');
  const [category, setCategory] = useState(defaults.category || '');
  const [excerpt, setExcerpt] = useState(defaults.excerpt || defaults.description || '');
  const [content, setContent] = useState(defaults.content || '');
  const [seoTitle, setSeoTitle] = useState(defaults.seoTitle || '');
  const [seoDesc, setSeoDesc] = useState(defaults.seoDescription || '');
  const [tags, setTags] = useState(Array.isArray(defaults.tags) ? defaults.tags.join(', ') : (defaults.tags || ''));
  const [status, setStatus] = useState(defaults.status || 'published');

  // Image states
  const [imageInput, setImageInput] = useState(defaults.featuredImage?.url || defaults.logo || '');

  // Tool specific fields
  const [pricing, setPricing] = useState(defaults.pricing || 'freemium');
  const [website, setWebsite] = useState(defaults.website || '');
  const [features, setFeatures] = useState(Array.isArray(defaults.features) ? defaults.features.join(', ') : '');
  const [useCases, setUseCases] = useState(Array.isArray(defaults.useCases) ? defaults.useCases.join(', ') : '');
  const [pros, setPros] = useState(Array.isArray(defaults.pros) ? defaults.pros.join(', ') : '');
  const [cons, setCons] = useState(Array.isArray(defaults.cons) ? defaults.cons.join(', ') : '');
  const [alternatives, setAlternatives] = useState(Array.isArray(defaults.alternatives) ? defaults.alternatives.join(', ') : '');

  // Set correct categories list based on content type
  const getCategories = () => {
    if (contentType === 'article') return CATEGORIES_ARTICLE;
    if (contentType === 'tech') return CATEGORIES_TECH;
    return CATEGORIES_TOOL;
  };

  // Get default category if none set
  const categoriesList = getCategories();
  const currentCategory = category && categoriesList.includes(category) ? category : categoriesList[0];

  const slug = generateSlug(title);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    try {
      showToast('Uploading image...', 'loading');
      const res = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        setImageInput(data.url);
        showToast('Image uploaded successfully!');
      } else {
        showToast('Image upload failed.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error uploading image.', 'error');
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload({ target: { files: e.dataTransfer.files } });
    }
  };

  const handlePublish = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      showToast('Please enter a title / name.', 'error');
      return;
    }

    const finalImage = imageInput.trim() || UNSPLASH_IMAGES[0];
    const tagsArray = tags.split(',').map(t => t.trim()).filter(Boolean);

    let postData = {};

    if (contentType === 'article') {
      postData = {
        title: title.trim(),
        slug,
        category: currentCategory,
        excerpt: excerpt.trim() || title.trim(),
        featuredImage: {
          url: finalImage,
          alt: title.trim(),
          width: 1200, height: 675, format: 'webp'
        },
        author: {
          name: 'Admin',
          role: 'Editor-in-Chief',
          bio: 'Hot AI managing editor and tech enthusiast.',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60'
        },
        tags: tagsArray,
        readingTime: `${Math.max(2, Math.ceil(content.split(/\s+/).length / 200))} min read`,
        content: content.trim() || 'No content written yet.',
        seoTitle: seoTitle.trim() || title.trim(),
        seoDescription: seoDesc.trim() || excerpt.trim() || title.trim(),
        status
      };
    } else if (contentType === 'tech') {
      postData = {
        name: title.trim(),
        slug,
        category: currentCategory,
        excerpt: excerpt.trim() || title.trim(),
        featuredImage: {
          url: finalImage,
          alt: title.trim(),
          width: 800, height: 450, format: 'webp'
        },
        author: {
          name: 'Admin',
          role: 'Tech Editor',
          bio: 'Android power user and guide writer.',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60'
        },
        tags: tagsArray,
        readingTime: `${Math.max(2, Math.ceil(content.split(/\s+/).length / 200))} min read`,
        content: content.trim() || 'No guide written yet.',
        seoTitle: seoTitle.trim() || title.trim(),
        seoDescription: seoDesc.trim() || excerpt.trim() || title.trim(),
        status
      };
    } else if (contentType === 'tool') {
      postData = {
        name: title.trim(),
        slug,
        category: currentCategory,
        logo: finalImage,
        verified: true,
        pricing,
        website: website.trim() || 'https://google.com',
        description: excerpt.trim() || title.trim(),
        features: features.split(',').map(f => f.trim()).filter(Boolean),
        useCases: useCases.split(',').map(u => u.trim()).filter(Boolean),
        pros: pros.split(',').map(p => p.trim()).filter(Boolean),
        cons: cons.split(',').map(c => c.trim()).filter(Boolean),
        alternatives: alternatives.split(',').map(a => a.trim()).filter(Boolean),
        tags: tagsArray,
        seoTitle: seoTitle.trim() || title.trim(),
        seoDescription: seoDesc.trim() || excerpt.trim() || title.trim()
      };
    }

    if (isEdit) {
      updatePost(contentType, editId, postData);
      showToast('Post updated successfully!');
    } else {
      addPost(contentType, postData);
      showToast('Post created successfully!');
    }

    setTimeout(() => {
      if (onNavigate) {
        onNavigate('admin-manage');
      }
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
      {onNavigate && (
        <button onClick={() => onNavigate('admin-manage')} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '20px', transition: 'var(--transition)', background: 'none', border: 'none', cursor: 'pointer' }}
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--primary)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
        >← Back to Manage Posts</button>
      )}

      <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#FFF', marginBottom: '28px' }}>
        {isEdit ? 'Edit Post' : 'Create New Post'}
      </h1>

      {!isEdit && (
        <AdminNav active="admin-create" onNavigate={onNavigate} />
      )}

      {/* Content Type Selector (only for new posts) */}
      {!isEdit && (
        <div style={{ marginBottom: '24px' }}>
          <label style={labelStyle}>Content Type</label>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { id: 'article', label: 'News Article' },
              { id: 'tech', label: 'Tech Trick' },
              { id: 'tool', label: 'AI Tool' }
            ].map(t => (
              <button
                key={t.id}
                type="button"
                onClick={() => { setContentType(t.id); setCategory(''); }}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: contentType === t.id ? 'rgba(0,168,255,0.15)' : '#131622',
                  border: contentType === t.id ? '1px solid var(--primary)' : '1px solid var(--border)',
                  color: contentType === t.id ? '#FFF' : 'var(--text-secondary)',
                  borderRadius: 'var(--btn-radius)',
                  fontWeight: '700',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        <div>
          <label htmlFor="post-title" style={labelStyle}>{contentType === 'tool' ? 'Tool Name' : 'Post Title'}</label>
          <input id="post-title" type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder={`Enter ${contentType === 'tool' ? 'tool name' : 'article title'}...`} style={inputStyle} />
          {title && <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '4px', display: 'block' }}>Slug: {slug}</span>}
        </div>

        <div>
          <label htmlFor="post-category" style={labelStyle}>Category</label>
          <select id="post-category" value={currentCategory} onChange={(e) => setCategory(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
            {categoriesList.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="post-excerpt" style={labelStyle}>{contentType === 'tool' ? 'Tool Description' : 'Excerpt'}</label>
          <textarea id="post-excerpt" rows="2" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Brief summary for cards and previews..." style={{ ...inputStyle, resize: 'vertical' }} />
        </div>

        {/* Drag and Drop Image Upload */}
        <div>
          <label style={labelStyle}>{contentType === 'tool' ? 'Logo Upload' : 'Thumbnail Upload'}</label>
          <div 
            onDragOver={(e) => e.preventDefault()} 
            onDrop={handleDrop}
            style={{
              border: '2px dashed var(--border)',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              background: '#131622',
              position: 'relative',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
            />
            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '8px' }}>☁️</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Drag & drop an image here or click to browse</span>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
            <input id="post-image" type="text" value={imageInput} onChange={(e) => setImageInput(e.target.value)} placeholder="Or paste image URL..." style={inputStyle} />
            <button type="button" onClick={() => setImageInput('')} style={{ background: '#FF6B6B', border: 'none', color: '#FFF', padding: '0 14px', borderRadius: 'var(--btn-radius)', fontSize: '0.75rem', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              Clear
            </button>
          </div>
          
          {imageInput && (
            <div style={{ position: 'relative', width: contentType === 'tool' ? '80px' : '160px', aspectRatio: contentType === 'tool' ? '1/1' : '16/9', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border)' }}>
              <img src={imageInput} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <button type="button" onClick={() => setImageInput('')} style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', border: 'none', color: '#FFF', width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '0.7rem' }}>×</button>
            </div>
          )}
        </div>

        {contentType !== 'tool' ? (
          <div>
            <label htmlFor="post-content" style={labelStyle}>Full Article Content</label>
            <textarea id="post-content" rows="12" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write full article body here..." style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.7' }} />
          </div>
        ) : (
          /* Tool Specific Fields */
          <>
            <div>
              <label htmlFor="tool-pricing" style={labelStyle}>Pricing Model</label>
              <select id="tool-pricing" value={pricing} onChange={(e) => setPricing(e.target.value)} style={{ ...inputStyle, cursor: 'pointer' }}>
                <option value="free">Free</option>
                <option value="freemium">Freemium</option>
                <option value="free-trial">Free Trial</option>
                <option value="paid">Paid</option>
                <option value="open-source">Open Source</option>
              </select>
            </div>
            <div>
              <label htmlFor="tool-website" style={labelStyle}>Website URL</label>
              <input id="tool-website" type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://example.com" style={inputStyle} />
            </div>
            <div>
              <label htmlFor="tool-features" style={labelStyle}>Features (comma separated)</label>
              <input id="tool-features" type="text" value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="In-browser execution, Cloud sync, Team collaboration" style={inputStyle} />
            </div>
            <div>
              <label htmlFor="tool-usecases" style={labelStyle}>Use Cases (comma separated)</label>
              <input id="tool-usecases" type="text" value={useCases} onChange={(e) => setUseCases(e.target.value)} placeholder="Rapid prototyping, Educational learning" style={inputStyle} />
            </div>
            <div>
              <label htmlFor="tool-pros" style={labelStyle}>Pros (comma separated)</label>
              <input id="tool-pros" type="text" value={pros} onChange={(e) => setPros(e.target.value)} placeholder="Fast setup, Free tier, intuitive UI" style={inputStyle} />
            </div>
            <div>
              <label htmlFor="tool-cons" style={labelStyle}>Cons (comma separated)</label>
              <input id="tool-cons" type="text" value={cons} onChange={(e) => setCons(e.target.value)} placeholder="Limited backend, Credit limits" style={inputStyle} />
            </div>
            <div>
              <label htmlFor="tool-alternatives" style={labelStyle}>Alternatives (comma separated)</label>
              <input id="tool-alternatives" type="text" value={alternatives} onChange={(e) => setAlternatives(e.target.value)} placeholder="Replit, Lovable" style={inputStyle} />
            </div>
          </>
        )}

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
          {contentType !== 'tool' && (
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: '600' }}>
              <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ ...inputStyle, width: 'auto', padding: '6px 10px', fontSize: '0.8rem' }}>
                <option value="published">Publish</option>
                <option value="draft">Save as Draft</option>
              </select>
            </label>
          )}

          <button type="submit" style={{ flex: 1, padding: '12px', borderRadius: 'var(--btn-radius)', fontSize: '0.85rem', fontWeight: '700', background: 'var(--primary)', color: '#FFF', transition: 'var(--transition)', cursor: 'pointer', border: 'none' }}
            onMouseOver={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
            onMouseOut={(e) => e.currentTarget.style.filter = 'none'}
          >{isEdit ? 'Update Post' : status === 'published' ? 'Publish Post' : 'Save Draft'}</button>
        </div>
      </form>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default CreatePost;
