
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// UI Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';
import Spotlight from './components/Spotlight';
import CustomCursor from './components/CustomCursor';

// Lazy Pages
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const CaseStudies = lazy(() => import('./pages/CaseStudies'));
const EngineeringStandards = lazy(() => import('./pages/EngineeringStandards'));
const VideoLibrary = lazy(() => import('./pages/VideoLibrary'));
const News = lazy(() => import('./pages/News'));
const WhyWorkWithUs = lazy(() => import('./pages/WhyWorkWithUs'));
const Careers = lazy(() => import('./pages/Careers'));
const Solutions = lazy(() => import('./pages/Solutions'));
const AutomationSystem = lazy(() => import('./pages/AutomationSystem'));
const ArevaTaxi = lazy(() => import('./pages/ArevaTaxi'));
const ArevaVTU = lazy(() => import('./pages/ArevaVTU'));
const ArevaWCS = lazy(() => import('./pages/ArevaWCS'));
const ArevaConveyor = lazy(() => import('./pages/ArevaConveyor'));
const ArevaRacking = lazy(() => import('./pages/ArevaRacking'));
const ColdStorage = lazy(() => import('./pages/ColdStorage'));
const ManufacturingSector = lazy(() => import('./pages/ManufacturingSector'));
const LogisticsSector = lazy(() => import('./pages/LogisticsSector'));
const PharmaSector = lazy(() => import('./pages/PharmaSector'));
const ConsultancyService = lazy(() => import('./pages/ConsultancyService'));
const MaintenanceService = lazy(() => import('./pages/MaintenanceService'));
const InstallationService = lazy(() => import('./pages/InstallationService'));

gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);
  return null;
};

const PageLoader = () => (
  <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
    <div className="relative">
      <div className="absolute -inset-10 bg-brandRed/20 rounded-full blur-3xl animate-pulse"></div>
      <Loader2 className="w-12 h-12 text-brandRed animate-spin relative z-10" />
    </div>
    <p className="mt-10 text-[10px] font-black uppercase tracking-[0.6em] text-slate-500 animate-pulse">Initializing Areva Hub</p>
  </div>
);

const App: React.FC = () => {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-950 selection:bg-brandRed selection:text-white relative font-sans antialiased">
        <CustomCursor />
        <Spotlight />
        <Navbar />
        
        <main className="flex-grow relative z-10">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cases" element={<CaseStudies />} />
              <Route path="/news" element={<News />} />
              <Route path="/videos" element={<VideoLibrary />} />
              <Route path="/why-us" element={<WhyWorkWithUs />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/engineering-standards" element={<EngineeringStandards />} />
              <Route path="/products/system" element={<AutomationSystem />} />
              <Route path="/products/solutions" element={<Solutions />} />
              <Route path="/products/taxi" element={<ArevaTaxi />} />
              <Route path="/products/vtu" element={<ArevaVTU />} />
              <Route path="/products/wcs" element={<ArevaWCS />} />
              <Route path="/products/conveyor" element={<ArevaConveyor />} />
              <Route path="/products/racking" element={<ArevaRacking />} />
              <Route path="/sectors/cold-storage" element={<ColdStorage />} />
              <Route path="/sectors/manufacturing" element={<ManufacturingSector />} />
              <Route path="/sectors/logistics" element={<LogisticsSector />} />
              <Route path="/sectors/pharmaceuticals" element={<PharmaSector />} />
              <Route path="/services/consultancy" element={<ConsultancyService />} />
              <Route path="/services/installation" element={<InstallationService />} />
              <Route path="/services/support" element={<MaintenanceService />} />
              <Route path="/services/maintenance" element={<MaintenanceService />} />
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
