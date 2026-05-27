import React from 'react';
import { getArticles, getTechTricks, getAiTools } from '../utils/dataStore';
import CreatePost from './CreatePost';

const EditPost = ({ params = {}, onNavigate }) => {
  const articleId = params.id ? Number(params.id) : null;
  const contentType = params.type || 'article'; // 'article' | 'tech' | 'tool'

  let article = null;
  if (articleId) {
    if (contentType === 'article') {
      article = getArticles().find(a => a.id === articleId);
    } else if (contentType === 'tech') {
      article = getTechTricks().find(t => t.id === articleId);
    } else if (contentType === 'tool') {
      article = getAiTools().find(t => t.id === articleId);
    }
  }

  if (!article) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text)', marginBottom: '10px' }}>Post Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
          The post you're trying to edit could not be found.
        </p>
        {onNavigate && (
          <button onClick={() => onNavigate('admin-manage')} style={{ background: 'var(--primary)', color: 'var(--text)', padding: '10px 20px', borderRadius: 'var(--btn-radius)', fontSize: '0.85rem', fontWeight: '700', border: 'none', cursor: 'pointer' }}>
            Back to Manage Posts
          </button>
        )}
      </div>
    );
  }

  const initialValues = {
    title: article.title || article.name,
    category: article.category,
    excerpt: article.excerpt || article.description || '',
    content: article.content || '',
    seoTitle: article.seoTitle || '',
    seoDescription: article.seoDescription || '',
    tags: article.tags || [],
    featuredImage: article.featuredImage || null,
    logo: article.logo || '',
    pricing: article.pricing || 'freemium',
    website: article.website || '',
    features: article.features || [],
    useCases: article.useCases || [],
    pros: article.pros || [],
    cons: article.cons || [],
    alternatives: article.alternatives || [],
    status: article.status || 'published'
  };

  return (
    <CreatePost
      initialValues={initialValues}
      isEdit={true}
      onNavigate={onNavigate}
      editId={articleId}
      editType={contentType}
    />
  );
};

export default EditPost;
