
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Core UI
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import CustomCursor from './components/CustomCursor';
import Spotlight from './components/Spotlight';

// Lazy Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Products = lazy(() => import('./pages/Solutions'));
const VideoLibrary = lazy(() => import('./pages/VideoLibrary'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));

const PageLoader = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-slate-950">
    <Loader2 className="w-10 h-10 text-brandRed animate-spin mb-4" />
    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Syncing System...</span>
  </div>
);

const App: React.FC = () => {
  const [isAssistantOpen, setIsAssistantOpen] = React.useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 flex flex-col">
        <CustomCursor />
        <Spotlight />
        <Navbar />
        
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route path="/videos" element={<VideoLibrary />} />
              <Route path="/cases" element={<CaseStudies />} />
              
              {/* Fallback routes for specific products */}
              <Route path="/products/:id" element={<Home />} />
              <Route path="/sectors/:id" element={<Home />} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
        <AIAssistant isOpen={isAssistantOpen} setIsOpen={setIsAssistantOpen} />
      </div>
    </Router>
  );
};

export default App;
