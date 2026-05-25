import React from 'react';
import { dummyArticles } from '../dummy-data/news-data';
import CreatePost from './CreatePost';

const EditPost = ({ params = {}, onNavigate }) => {
  const articleId = params.id ? Number(params.id) : null;
  const article = articleId ? dummyArticles.find(a => a.id === articleId) : null;

  if (!article) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#FFF', marginBottom: '10px' }}>Post Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
          The post you're trying to edit could not be found.
        </p>
        {onNavigate && (
          <button onClick={() => onNavigate('admin-manage')} style={{ background: 'var(--primary)', color: '#FFF', padding: '10px 20px', borderRadius: 'var(--btn-radius)', fontSize: '0.85rem', fontWeight: '700' }}>
            Back to Manage Posts
          </button>
        )}
      </div>
    );
  }

  const initialValues = {
    title: article.title,
    category: article.category,
    excerpt: article.excerpt,
    content: article.content,
    seoTitle: article.seoTitle || '',
    seoDescription: article.seoDescription || '',
    tags: article.tags || []
  };

  return <CreatePost initialValues={initialValues} isEdit={true} onNavigate={onNavigate} />;
};

export default EditPost;
