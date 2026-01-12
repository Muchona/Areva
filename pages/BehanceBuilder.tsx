
import React, { useState, useEffect, useRef } from 'react';
import { Camera, Zap, Layout, Shield, Monitor, Smartphone, Palette, Type, ArrowRight, Layers, Box, Eye, EyeOff, Cpu, Download, Loader2, X, Check } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import html2canvas from 'html2canvas';
import Taxi3D from '../components/Taxi3D';

// Ensure ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

const BehanceBuilder: React.FC = () => {
  const [isFrozen, setIsFrozen] = useState(false);
  const [hideControls, setHideControls] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureComplete, setCaptureComplete] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  const toggleFreeze = () => {
    // Force refresh to lock positions
    ScrollTrigger.refresh();
    const allTriggers = ScrollTrigger.getAll();

    if (!isFrozen) {
      // Cast to any to avoid type errors with complex GSAP instance methods
      allTriggers.forEach((st: any) => {
        if (st && typeof st.progress === 'function') {
          st.progress(1);
          st.disable();
        }
      });
      gsap.globalTimeline.pause();
      gsap.ticker.sleep();
      document.body.classList.add('animations-frozen');
      setIsFrozen(true);
    } else {
      allTriggers.forEach((st: any) => {
        if (st && typeof st.enable === 'function') {
          st.enable();
        }
      });
      gsap.globalTimeline.play();
      gsap.ticker.wake();
      document.body.classList.remove('animations-frozen');
      setIsFrozen(false);
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  };

  const handleDownloadScreenshot = async () => {
    if (!pageRef.current || isCapturing) return;
    
    setIsCapturing(true);
    setCaptureComplete(false);
    
    const originallyFrozen = isFrozen;
    if (!originallyFrozen) {
      toggleFreeze();
    }
    
    await new Promise(resolve => setTimeout(resolve, 800));

    try {
      const canvas = await html2canvas(pageRef.current, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#020617', 
        scale: 2, 
        logging: false,
        width: pageRef.current.scrollWidth,
        height: pageRef.current.scrollHeight,
        windowWidth: pageRef.current.scrollWidth,
        windowHeight: pageRef.current.scrollHeight,
        onclone: (clonedDoc) => {
          const uiElements = clonedDoc.querySelectorAll('.hide-for-screenshot');
          uiElements.forEach(el => (el as HTMLElement).style.display = 'none');
          const root = clonedDoc.getElementById('root');
          if (root) root.style.height = 'auto';
        }
      });

      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `areva-automation-portfolio-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      
      setCaptureComplete(true);
      setTimeout(() => setCaptureComplete(false), 3000);

    } catch (err) {
      console.error('High-res capture failed:', err);
      alert('The page is too large for the browser memory to capture as a single PNG. Try capturing sections.');
    } finally {
      setIsCapturing(false);
      if (!originallyFrozen) {
        toggleFreeze();
      }
    }
  };

  return (
    <div ref={pageRef} className={`min-h-screen ${isFrozen ? 'bg-slate-950' : 'bg-slate-900'} transition-colors duration-500`}>
      {/* BUILDER TOOLBAR */}
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-3xl hide-for-screenshot transition-all duration-500 ${hideControls ? 'opacity-0 pointer-events-none -translate-y-10' : 'opacity-100'}`}>
        <div className="bg-slate-900/90 backdrop-blur-2xl border border-white/10 p-4 md:p-5 rounded-[32px] shadow-2xl flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-brandRed p-2.5 rounded-2xl shadow-lg shadow-brandRed/20">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h2 className="text-xs font-black uppercase tracking-widest text-white">Portfolio Export</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase">Ready for High-Res Capture</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button 
              onClick={toggleFreeze}
              className={`flex items-center space-x-2 px-5 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                isFrozen ? 'bg-brandRed text-white shadow-lg shadow-brandRed/40' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {isFrozen ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              <span>{isFrozen ? 'Unfreeze' : 'Freeze'}</span>
            </button>
            
            <button 
              onClick={handleDownloadScreenshot}
              disabled={isCapturing}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl ${
                captureComplete ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-slate-200'
              } disabled:opacity-50`}
            >
              {isCapturing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : captureComplete ? (
                <Check className="w-4 h-4" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{isCapturing ? 'Processing...' : captureComplete ? 'Saved!' : 'Download Image'}</span>
            </button>

            <button 
              onClick={() => setHideControls(true)}
              className="bg-slate-800 text-slate-500 p-2.5 rounded-2xl hover:text-white transition-colors"
              title="Hide UI"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        {isCapturing && (
          <div className="mt-4 text-center">
            <div className="inline-block bg-slate-900 px-4 py-2 rounded-full border border-brandRed/30 animate-pulse">
               <span className="text-[10px] font-black uppercase tracking-widest text-brandRed">Stitching layout sectors... please wait</span>
            </div>
          </div>
        )}
      </div>

      {hideControls && (
        <button 
          onClick={() => setHideControls(false)}
          className="fixed bottom-8 right-8 z-[100] bg-white text-black px-6 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform hide-for-screenshot"
        >
          Show Builder Controls
        </button>
      )}

      {/* ACTUAL PORTFOLIO SECTIONS */}
      <div className="w-full">
        <section className="h-screen flex flex-col items-center justify-center text-center px-4 border-b border-white/5 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(227,30,36,0.15),transparent_70%)]"></div>
          <div className="space-y-8 relative z-10">
            <h1 className="text-[12vw] font-black tracking-tighter leading-none uppercase">
              AREVA<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandRed to-brandRed/40">FLOW.</span>
            </h1>
            <p className="text-2xl md:text-4xl font-medium text-slate-500 uppercase tracking-tighter">
              The Future of Industrial ASRS.
            </p>
          </div>
        </section>

        <section className="py-64 bg-white text-black px-4">
          <div className="max-w-7xl mx-auto space-y-24">
            <div className="text-center space-y-4">
              <h2 className="text-7xl font-black uppercase tracking-tighter">DESIGN SYSTEM.</h2>
              <div className="w-24 h-2 bg-brandRed mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-32">
              <div className="space-y-12">
                <div className="flex items-center space-x-6 border-b-4 border-black pb-4 w-fit">
                   <Palette className="w-12 h-12 text-brandRed" />
                   <h3 className="text-4xl font-black uppercase italic">Colors</h3>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {['#E31E24', '#020617', '#0F172A', '#1E293B', '#64748B', '#F8FAFC'].map(c => (
                    <div key={c} className="space-y-3">
                      <div className="h-32 rounded-[32px] border-4 border-slate-100 shadow-xl" style={{ backgroundColor: c }}></div>
                      <p className="text-center font-black text-xs uppercase">{c}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-12">
                <div className="flex items-center space-x-6 border-b-4 border-black pb-4 w-fit">
                   <Type className="w-12 h-12 text-brandRed" />
                   <h3 className="text-4xl font-black uppercase italic">Typography</h3>
                </div>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inter Black / Heading 01</p>
                    <p className="text-7xl font-black leading-none uppercase">THE POWER OF FOUR.</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Inter Medium / Body Text</p>
                    <p className="text-2xl text-slate-600 leading-relaxed font-medium">Engineering excellence from Monaghan, Ireland. Deploying high-density 4-way systems across 5 continents.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-64 bg-slate-950 px-4">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-12">
               <div className="bg-brandRed/10 p-6 rounded-3xl w-fit">
                 <Box className="w-16 h-16 text-brandRed" />
               </div>
               <h2 className="text-7xl font-black uppercase tracking-tighter leading-none">THE DIGITAL<br /><span className="text-slate-500">TWIN.</span></h2>
               <p className="text-2xl text-slate-400 font-medium leading-relaxed">
                 A live interactive WebGL environment allows users to inspect the Areva Taxi™ hardware with micron-level detail.
               </p>
            </div>
            <div className="h-[700px] bg-slate-900 rounded-[80px] border border-slate-800 shadow-inner relative overflow-hidden">
               <Taxi3D />
               <div className="absolute inset-0 pointer-events-none border-[40px] border-slate-950/20"></div>
            </div>
          </div>
        </section>

        <section className="py-64 bg-white text-black px-4 border-y border-slate-100">
           <div className="max-w-4xl mx-auto text-center space-y-12">
              <div className="bg-slate-100 p-8 rounded-[40px] w-fit mx-auto">
                 <Cpu className="w-20 h-20 text-brandRed" />
              </div>
              <h2 className="text-7xl font-black uppercase tracking-tighter leading-none">GEMINI AI <br /><span className="text-slate-400">INTEGRATION.</span></h2>
              <p className="text-3xl text-slate-500 font-medium leading-relaxed italic">
                "Real-time ROI calculation and warehouse optimization powered by Google's Gemini-3 Flash model."
              </p>
              <div className="grid grid-cols-3 gap-8 pt-12">
                 <div className="p-8 bg-slate-50 rounded-3xl">
                    <p className="text-4xl font-black">0.4s</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">LATENCY</p>
                 </div>
                 <div className="p-8 bg-slate-50 rounded-3xl">
                    <p className="text-4xl font-black">JSON</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">STRUCTURED</p>
                 </div>
                 <div className="p-8 bg-slate-50 rounded-3xl">
                    <p className="text-4xl font-black">24/7</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">UPTIME</p>
                 </div>
              </div>
           </div>
        </section>

        <section className="py-96 bg-brandRed flex flex-col items-center justify-center text-center px-4">
           <h2 className="text-[15vw] font-black text-white tracking-tighter uppercase leading-none">THANK YOU.</h2>
           <p className="text-3xl font-black uppercase tracking-[0.5em] text-white/40 mt-12">Areva Engineering Labs</p>
        </section>
      </div>
    </div>
  );
};

export default BehanceBuilder;
