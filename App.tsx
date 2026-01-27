
import * as React from 'react';
import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Programs from './pages/Programs';
import Resources from './pages/Resources';
import Media from './pages/Media';
import GetInvolved from './pages/GetInvolved';
import Contact from './pages/Contact';
import TermsPrivacy from './pages/TermsPrivacy';
import Admin from './pages/Admin';
import ClimateAssistant from './components/ClimateAssistant';
import ConnectivityStatus from './components/ConnectivityBanner';
import LoadingScreen from './components/LoadingScreen';
import PageTransition from './components/PageTransition';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);
  
  return null;
};

// Fix: Make children optional to resolve JSX property missing error in line 80
const AdminWrapper = ({ children, isOnline }: { children?: React.ReactNode; isOnline: boolean }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return <>{children}</>;

  return (
    <div className={`flex flex-col min-h-screen transition-all duration-1000 ease-in-out ${
      !isOnline ? 'offline-grayscale pointer-events-none select-none overflow-hidden h-screen' : ''
    }`}>
      <ScrollToTop />
      <Header />
      <main id="main-content" className="flex-grow">
        <PageTransition>
          {children}
        </PageTransition>
      </main>
      <Footer />
      <ClimateAssistant />
    </div>
  );
};

const App: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleStatusChange = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  return (
    <Router>
      <LoadingScreen />
      <ConnectivityStatus />
      <AdminWrapper isOnline={isOnline}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/projects" element={<Resources />} /> {/* Legacy redirect */}
          <Route path="/media" element={<Media />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<TermsPrivacy />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </AdminWrapper>
    </Router>
  );
};

export default App;
