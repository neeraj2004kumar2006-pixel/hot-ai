// Dummy data removed for production hardening

const STORAGE_KEYS = {
  ARTICLES: 'hotai_articles',
  TECH: 'hotai_tech',
  TOOLS: 'hotai_tools'
};

// Helper to check if database is initialized in localStorage
const initializeDB = () => {
  if (typeof window === 'undefined') return;

  if (!localStorage.getItem(STORAGE_KEYS.ARTICLES)) {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify([]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.TECH)) {
    localStorage.setItem(STORAGE_KEYS.TECH, JSON.stringify([]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.TOOLS)) {
    localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify([]));
  }
};

// Always run initialization on import
initializeDB();

export const getArticles = () => {
  try {
    initializeDB();
    const data = localStorage.getItem(STORAGE_KEYS.ARTICLES);
    if (!data) return [];
    return JSON.parse(data).map(art => ({
      ...art,
      publishDate: art.publishDate ? new Date(art.publishDate) : new Date()
    }));
  } catch (e) {
    console.error('Error fetching articles', e);
    return [];
  }
};

export const saveArticles = (articles) => {
  try {
    const formatted = articles.map(art => ({
      ...art,
      publishDate: art.publishDate instanceof Date ? art.publishDate.toISOString() : art.publishDate
    }));
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(formatted));
    return true;
  } catch (e) {
    console.error('Error saving articles', e);
    return false;
  }
};

export const getTechTricks = () => {
  try {
    initializeDB();
    const data = localStorage.getItem(STORAGE_KEYS.TECH);
    if (!data) return [];
    return JSON.parse(data).map(trick => ({
      ...trick,
      publishDate: trick.publishDate ? new Date(trick.publishDate) : new Date()
    }));
  } catch (e) {
    console.error('Error fetching tech tricks', e);
    return [];
  }
};

export const saveTechTricks = (tech) => {
  try {
    const formatted = tech.map(trick => ({
      ...trick,
      publishDate: trick.publishDate instanceof Date ? trick.publishDate.toISOString() : trick.publishDate
    }));
    localStorage.setItem(STORAGE_KEYS.TECH, JSON.stringify(formatted));
    return true;
  } catch (e) {
    console.error('Error saving tech tricks', e);
    return false;
  }
};

export const getAiTools = () => {
  try {
    initializeDB();
    const data = localStorage.getItem(STORAGE_KEYS.TOOLS);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error fetching AI tools', e);
    return [];
  }
};

export const saveAiTools = (tools) => {
  try {
    localStorage.setItem(STORAGE_KEYS.TOOLS, JSON.stringify(tools));
    return true;
  } catch (e) {
    console.error('Error saving AI tools', e);
    return false;
  }
};

// Generic CMS Operations
export const addPost = (type, postData) => {
  if (type === 'article') {
    const articles = getArticles();
    const newId = articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1;
    const newArticle = {
      id: newId,
      ...postData,
      publishDate: new Date(),
      status: postData.status || 'published'
    };
    articles.unshift(newArticle); // Prepend to show on top
    saveArticles(articles);
    return newArticle;
  } else if (type === 'tech') {
    const tech = getTechTricks();
    const newId = tech.length > 0 ? Math.max(...tech.map(t => t.id)) + 1 : 101;
    const newTrick = {
      id: newId,
      ...postData,
      publishDate: new Date(),
      status: postData.status || 'published'
    };
    tech.unshift(newTrick);
    saveTechTricks(tech);
    return newTrick;
  } else if (type === 'tool') {
    const tools = getAiTools();
    const newId = tools.length > 0 ? Math.max(...tools.map(t => t.id)) + 1 : 201;
    const newTool = {
      id: newId,
      ...postData
    };
    tools.unshift(newTool);
    saveAiTools(tools);
    return newTool;
  }
  return null;
};

export const updatePost = (type, id, updatedData) => {
  const targetId = Number(id);
  if (type === 'article') {
    const articles = getArticles();
    const index = articles.findIndex(a => a.id === targetId);
    if (index !== -1) {
      articles[index] = { ...articles[index], ...updatedData };
      saveArticles(articles);
      return articles[index];
    }
  } else if (type === 'tech') {
    const tech = getTechTricks();
    const index = tech.findIndex(t => t.id === targetId);
    if (index !== -1) {
      tech[index] = { ...tech[index], ...updatedData };
      saveTechTricks(tech);
      return tech[index];
    }
  } else if (type === 'tool') {
    const tools = getAiTools();
    const index = tools.findIndex(t => t.id === targetId);
    if (index !== -1) {
      tools[index] = { ...tools[index], ...updatedData };
      saveAiTools(tools);
      return tools[index];
    }
  }
  return null;
};

export const deletePost = (type, id) => {
  const targetId = Number(id);
  if (type === 'article') {
    const articles = getArticles();
    const filtered = articles.filter(a => a.id !== targetId);
    saveArticles(filtered);
    return true;
  } else if (type === 'tech') {
    const tech = getTechTricks();
    const filtered = tech.filter(t => t.id !== targetId);
    saveTechTricks(filtered);
    return true;
  } else if (type === 'tool') {
    const tools = getAiTools();
    const filtered = tools.filter(t => t.id !== targetId);
    saveAiTools(filtered);
    return true;
  }
  return false;
};
