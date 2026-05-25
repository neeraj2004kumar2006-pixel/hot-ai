import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AdBanner from './components/AdBanner';

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

const App = () => {
  const [route, setRoute] = useState({ page: 'home', params: {} });

  const handleNavigate = (page, params = {}) => {
    setRoute({ page, params });
    window.scrollTo(0, 0);
  };

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
        return <AiTools />;
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
        return <ProtectedAdminRoute><AdminDashboard onNavigate={handleNavigate} /></ProtectedAdminRoute>;
      case 'admin-create':
        return <ProtectedAdminRoute><CreatePost onNavigate={handleNavigate} /></ProtectedAdminRoute>;
      case 'admin-manage':
        return <ProtectedAdminRoute><ManagePosts onNavigate={handleNavigate} /></ProtectedAdminRoute>;
      case 'admin-edit':
        return <ProtectedAdminRoute><EditPost params={route.params} onNavigate={handleNavigate} /></ProtectedAdminRoute>;
      default:
        return <NotFound onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider>
      <div className="app-container">
        {!isAdmin && (
          <Header activePage={route.page} activeParams={route.params} onNavigate={handleNavigate} />
        )}
        <main className="main-content">
          {renderPage()}
        </main>
        {!isAdmin && <Footer onNavigate={handleNavigate} />}
        {!isAdmin && <AdBanner slot="mobileSticky" />}
      </div>
    </AuthProvider>
  );
};

export default App;

