import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AdBanner from './components/AdBanner';
import BackToTop from './components/BackToTop';
import Atmosphere from './components/Atmosphere';
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

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Legacy hash routing redirection
    if (window.location.hash.startsWith('#/')) {
      const newPath = window.location.hash.substring(1);
      navigate(newPath, { replace: true });
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

const pageVariants = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.3, ease: "easeIn" } }
};

const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const onNavigate = useLegacyNavigate();
  const isAdmin = location.pathname.startsWith('/admin-');

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Header onNavigate={onNavigate} />}
      <main className="main-content">
        <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home onNavigate={onNavigate} /></PageWrapper>} />
            <Route path="/article/:slug" element={<PageWrapper><Article onNavigate={onNavigate} /></PageWrapper>} />
            <Route path="/category/:category" element={<PageWrapper><Category onNavigate={onNavigate} /></PageWrapper>} />
            <Route path="/search" element={<PageWrapper><Search onNavigate={onNavigate} /></PageWrapper>} />
            <Route path="/trending" element={<PageWrapper><Trending onNavigate={onNavigate} /></PageWrapper>} />
            <Route path="/ai-tools" element={<PageWrapper><AiTools onNavigate={onNavigate} /></PageWrapper>} />
            <Route path="/tech-tricks" element={<PageWrapper><TechTricks onNavigate={onNavigate} /></PageWrapper>} />
            <Route path="/page/about" element={<PageWrapper><About onNavigate={onNavigate} /></PageWrapper>} />
            <Route path="/page/editorial" element={<PageWrapper><Editorial onNavigate={onNavigate} /></PageWrapper>} />
            <Route path="/page/contact" element={<PageWrapper><Contact onNavigate={onNavigate} /></PageWrapper>} />
            <Route path="/page/privacy" element={<PageWrapper><Privacy onNavigate={onNavigate} /></PageWrapper>} />
            <Route path="/page/terms" element={<PageWrapper><Terms onNavigate={onNavigate} /></PageWrapper>} />
            
            <Route path="/admin-dashboard" element={<ProtectedAdminRoute><PageWrapper><AdminDashboard onNavigate={onNavigate} /></PageWrapper></ProtectedAdminRoute>} />
            <Route path="/admin-create" element={<ProtectedAdminRoute><PageWrapper><CreatePost onNavigate={onNavigate} /></PageWrapper></ProtectedAdminRoute>} />
            <Route path="/admin-manage" element={<ProtectedAdminRoute><PageWrapper><ManagePosts onNavigate={onNavigate} /></PageWrapper></ProtectedAdminRoute>} />
            <Route path="/admin-edit/:id" element={<ProtectedAdminRoute><PageWrapper><EditPost onNavigate={onNavigate} /></PageWrapper></ProtectedAdminRoute>} />
            
            <Route path="*" element={<PageWrapper><NotFound onNavigate={onNavigate} /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
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
