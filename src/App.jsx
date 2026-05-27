import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AdBanner from './components/AdBanner';
import BackToTop from './components/BackToTop';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import Home from './pages/Home';
import Article from './pages/Article';
import Category from './pages/Category';
import Search from './pages/Search';
import Trending from './pages/Trending';
import AiTools from './pages/AiTools';
import TechTricks from './pages/TechTricks';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Editorial from './pages/Editorial';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';

// Admin
import AdminDashboard from './admin/AdminDashboard';
import CreatePost from './admin/CreatePost';
import ManagePosts from './admin/ManagePosts';
import EditPost from './admin/EditPost';
import { ProtectedAdminRoute } from './components/ProtectedRoute';

// Styles
import './styles/global.css';
import './styles/responsive.css';

const parseHash = (hash) => {
  if (!hash || hash === '#/') return { page: 'home', params: {} };
  const path = hash.replace(/^#\//, '');
  
  if (path.startsWith('article/')) {
    const slug = path.replace('article/', '');
    return { page: 'article', params: { slug } };
  }
  if (path.startsWith('category/')) {
    const category = decodeURIComponent(path.replace('category/', ''));
    return { page: 'category', params: { category } };
  }
  if (path.startsWith('search')) {
    const queryPart = path.split('?')[1] || '';
    const searchParams = new URLSearchParams(queryPart);
    return { page: 'search', params: { query: searchParams.get('q') || '' } };
  }
  if (path === 'trending') return { page: 'trending', params: {} };
  if (path === 'ai-tools') return { page: 'ai-tools', params: {} };
  if (path === 'tech-tricks') return { page: 'tech-tricks', params: {} };
  
  if (path.startsWith('page/')) {
    const slug = path.replace('page/', '');
    return { page: 'page', params: { slug } };
  }
  if (path === 'admin-dashboard') return { page: 'admin-dashboard', params: {} };
  if (path === 'admin-create') return { page: 'admin-create', params: {} };
  if (path === 'admin-manage') return { page: 'admin-manage', params: {} };
  if (path.startsWith('admin-edit/')) {
    const id = path.replace('admin-edit/', '');
    return { page: 'admin-edit', params: { id } };
  }
  
  return { page: 'notfound', params: {} };
};

const serializeRoute = (page, params) => {
  if (page === 'home') return '#/';
  if (page === 'article') return `#/article/${params.slug || ''}`;
  if (page === 'category') return `#/category/${encodeURIComponent(params.category || '')}`;
  if (page === 'search') return `#/search?q=${encodeURIComponent(params.query || '')}`;
  if (page === 'trending') return '#/trending';
  if (page === 'ai-tools') return '#/ai-tools';
  if (page === 'tech-tricks') return '#/tech-tricks';
  if (page === 'page') return `#/page/${params.slug || ''}`;
  if (page === 'admin-dashboard') return '#/admin-dashboard';
  if (page === 'admin-create') return '#/admin-create';
  if (page === 'admin-manage') return '#/admin-manage';
  if (page === 'admin-edit') return `#/admin-edit/${params.id || ''}`;
  return `#/notfound`;
};

const App = () => {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  const handleNavigate = (page, params = {}) => {
    const newHash = serializeRoute(page, params);
    window.location.hash = newHash;
    setRoute({ page, params });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const parsed = parseHash(window.location.hash);
      setRoute(parsed);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isAdmin = route.page.startsWith('admin-');

  const renderPage = () => {
    switch (route.page) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'article':
        return <Article params={route.params} onNavigate={handleNavigate} />;
      case 'category':
        return <Category params={route.params} onNavigate={handleNavigate} />;
      case 'search':
        return <Search params={route.params} onNavigate={handleNavigate} />;
      case 'trending':
        return <Trending onNavigate={handleNavigate} />;
      case 'ai-tools':
        return <AiTools onNavigate={handleNavigate} />;
      case 'tech-tricks':
        return <TechTricks onNavigate={handleNavigate} />;
      case 'page':
        switch (route.params?.slug) {
          case 'about': return <About onNavigate={handleNavigate} />;
          case 'editorial': return <Editorial onNavigate={handleNavigate} />;
          case 'contact': return <Contact onNavigate={handleNavigate} />;
          case 'privacy': return <Privacy onNavigate={handleNavigate} />;
          case 'terms': return <Terms onNavigate={handleNavigate} />;
          default: return <NotFound onNavigate={handleNavigate} />;
        }
      case 'admin-dashboard':
        return <ProtectedAdminRoute onNavigate={handleNavigate}><AdminDashboard onNavigate={handleNavigate} /></ProtectedAdminRoute>;
      case 'admin-create':
        return <ProtectedAdminRoute onNavigate={handleNavigate}><CreatePost onNavigate={handleNavigate} /></ProtectedAdminRoute>;
      case 'admin-manage':
        return <ProtectedAdminRoute onNavigate={handleNavigate}><ManagePosts onNavigate={handleNavigate} /></ProtectedAdminRoute>;
      case 'admin-edit':
        return <ProtectedAdminRoute onNavigate={handleNavigate}><EditPost params={route.params} onNavigate={handleNavigate} /></ProtectedAdminRoute>;
      default:
        return <NotFound onNavigate={handleNavigate} />;
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <AuthProvider>
      <div className="app-container">
        {!isAdmin && (
          <Header activePage={route.page} activeParams={route.params} onNavigate={handleNavigate} />
        )}
        <main className="main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${route.page}-${route.params?.slug || route.params?.id || ''}`}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
        {!isAdmin && <Footer onNavigate={handleNavigate} />}
        {!isAdmin && <AdBanner slot="mobileSticky" />}
        {!isAdmin && <BackToTop />}
      </div>
    </AuthProvider>
  );
};

export default App;
