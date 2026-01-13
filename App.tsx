
import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

// Core UI Components (Direct Import)
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import CustomCursor from './components/CustomCursor.tsx';
import Spotlight from './components/Spotlight.tsx';
import Home from './pages/Home.tsx';

// Lazy load secondary pages
const About = lazy(() => import('./pages/About.tsx'));
const Contact = lazy(() => import('./pages/Contact.tsx'));
const Solutions = lazy(() => import('./pages/Solutions.tsx'));
const VideoLibrary = lazy(() => import('./pages/VideoLibrary.tsx'));
const CaseStudies = lazy(() => import('./pages/CaseStudies.tsx'));
const ArevaTaxi = lazy(() => import('./pages/ArevaTaxi.tsx'));
const EngineeringStandards = lazy(() => import('./pages/EngineeringStandards.tsx'));

const PageLoader = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-slate-950">
    <Loader2 className="w-10 h-10 text-brandRed animate-spin mb-4" />
    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 text-center">
      SYNCING AREVA SYSTEMS...
    </span>
  </div>
);

const App: React.FC = () => {
  const [isAssistantOpen, setIsAssistantOpen] = React.useState(false);

  console.log("AREVA CORE: App stack initialized.");

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 flex flex-col relative">
        {/* Atmosphere Layers */}
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
              <Route path="/engineering-standards" element={<EngineeringStandards />} />
              
              {/* Fallback */}
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
