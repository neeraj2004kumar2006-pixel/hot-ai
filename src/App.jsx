import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AdBanner from './components/AdBanner';
import BackToTop from './components/BackToTop';
import Atmosphere from './components/Atmosphere';

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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Legacy hash routing redirection
    if (window.location.hash.startsWith('#/')) {
      const newPath = window.location.hash.substring(1);
      navigate(newPath, { replace: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigate]);
  return null;
};

// Legacy onNavigate mapper to prevent app crashes during refactor
const useLegacyNavigate = () => {
  const navigate = useNavigate();
  return (page, params = {}) => {
    if (page === 'home') navigate('/');
    else if (page === 'article') navigate(`/article/${params.slug || params.id}`);
    else if (page === 'category') navigate(`/category/${encodeURIComponent(params.category || params.name || '')}`);
    else if (page === 'search') navigate(`/search?q=${encodeURIComponent(params.query || '')}`);
    else if (page === 'trending') navigate('/trending');
    else if (page === 'ai-tools') navigate('/ai-tools');
    else if (page === 'tech-tricks') navigate('/tech-tricks');
    else if (page === 'page') navigate(`/page/${params.slug || ''}`);
    else if (page === 'admin-dashboard') navigate('/admin-dashboard');
    else if (page === 'admin-create') navigate('/admin-create');
    else if (page === 'admin-manage') navigate('/admin-manage');
    else if (page === 'admin-edit') navigate(`/admin-edit/${params.id || ''}`);
    else navigate('/notfound');
  };
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const onNavigate = useLegacyNavigate();
  const isAdmin = location.pathname.startsWith('/admin-');

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Header onNavigate={onNavigate} />}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home onNavigate={onNavigate} />} />
          <Route path="/article/:slug" element={<Article onNavigate={onNavigate} />} />
          <Route path="/category/:category" element={<Category onNavigate={onNavigate} />} />
          <Route path="/search" element={<Search onNavigate={onNavigate} />} />
          <Route path="/trending" element={<Trending onNavigate={onNavigate} />} />
          <Route path="/ai-tools" element={<AiTools onNavigate={onNavigate} />} />
          <Route path="/tech-tricks" element={<TechTricks onNavigate={onNavigate} />} />
          <Route path="/page/about" element={<About onNavigate={onNavigate} />} />
          <Route path="/page/editorial" element={<Editorial onNavigate={onNavigate} />} />
          <Route path="/page/contact" element={<Contact onNavigate={onNavigate} />} />
          <Route path="/page/privacy" element={<Privacy onNavigate={onNavigate} />} />
          <Route path="/page/terms" element={<Terms onNavigate={onNavigate} />} />
          
          <Route path="/admin-dashboard" element={<ProtectedAdminRoute><AdminDashboard onNavigate={onNavigate} /></ProtectedAdminRoute>} />
          <Route path="/admin-create" element={<ProtectedAdminRoute><CreatePost onNavigate={onNavigate} /></ProtectedAdminRoute>} />
          <Route path="/admin-manage" element={<ProtectedAdminRoute><ManagePosts onNavigate={onNavigate} /></ProtectedAdminRoute>} />
          <Route path="/admin-edit/:id" element={<ProtectedAdminRoute><EditPost onNavigate={onNavigate} /></ProtectedAdminRoute>} />
          
          <Route path="*" element={<NotFound onNavigate={onNavigate} />} />
        </Routes>
      </main>
      {!isAdmin && <Footer onNavigate={onNavigate} />}
      {!isAdmin && <AdBanner slot="mobileSticky" />}
      {!isAdmin && <BackToTop />}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <div className="app-container">
        <Atmosphere />
        <Router>
          <AnimatedRoutes />
        </Router>
      </div>
    </AuthProvider>
  );
};

export default App;
