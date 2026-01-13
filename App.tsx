
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Core UI Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import CustomCursor from './components/CustomCursor';
import Spotlight from './components/Spotlight';

// Home is now loaded normally (non-lazy) to ensure immediate rendering
import Home from './pages/Home';

// Other Pages remain lazy to save bandwidth
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Solutions = lazy(() => import('./pages/Solutions'));
const VideoLibrary = lazy(() => import('./pages/VideoLibrary'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const ArevaTaxi = lazy(() => import('./pages/ArevaTaxi'));

const PageLoader = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-slate-950">
    <Loader2 className="w-10 h-10 text-brandRed animate-spin mb-4" />
    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500">Syncing System...</span>
  </div>
);

const App: React.FC = () => {
  const [isAssistantOpen, setIsAssistantOpen] = React.useState(false);

  console.log("Areva App: Initializing Component Stack");

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
        <CustomCursor />
        <Spotlight />
        <Navbar />
        
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Solutions />} />
              <Route path="/products/taxi" element={<ArevaTaxi />} />
              <Route path="/videos" element={<VideoLibrary />} />
              <Route path="/cases" element={<CaseStudies />} />
              
              {/* Fallback routes */}
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
