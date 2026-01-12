
import React, { useEffect, useRef } from 'react';
import { Monitor, Smartphone, Palette, Type, Box, Zap, Cpu, Globe, ArrowRight, Layout, MousePointer2, Layers } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Taxi3D from '../components/Taxi3D';

gsap.registerPlugin(ScrollTrigger);

const PortfolioShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".reveal", {
        scrollTrigger: {
          trigger: ".reveal",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: "expo.out"
      });

      gsap.from(".mockup-animate", {
        scrollTrigger: {
          trigger: ".mockup-animate",
          start: "top 70%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 2,
        ease: "power4.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-slate-950 text-white pt-20 selection:bg-brandRed">
      {/* 01. COVER SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(227,30,36,0.1),transparent_70%)]"></div>
        <div className="reveal space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">UI/UX CASE STUDY</span>
          </div>
          <h1 className="text-7xl md:text-[12rem] font-black tracking-tighter leading-none uppercase">
            AREVA<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandRed to-brandRed/40">FLOW.</span>
          </h1>
          <p className="text-xl md:text-3xl font-medium text-slate-500 max-w-3xl mx-auto tracking-tight uppercase">
            Redefining Industrial Automation through high-fidelity visual storytelling.
          </p>
        </div>
        <div className="absolute bottom-10 animate-bounce">
          <ArrowRight className="w-8 h-8 rotate-90 text-slate-700" />
        </div>
      </section>

      {/* 02. THE CHALLENGE */}
      <section className="py-48 px-4 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="reveal space-y-12">
            <h2 className="text-5xl font-black uppercase tracking-tight">The <span className="text-brandRed">Problem.</span></h2>
            <p className="text-2xl text-slate-400 leading-relaxed font-medium">
              Industrial websites are often static and dense. Areva needed a digital experience that mirrored the precision and velocity of their 4-way shuttle technology.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <p className="text-[10px] font-black text-slate-600 uppercase mb-2">Objective</p>
                <p className="text-lg font-bold">Showcase 85% volume gain through interactive UX.</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-600 uppercase mb-2">Tech Stack</p>
                <p className="text-lg font-bold">React, Three.js, GSAP, Gemini AI.</p>
              </div>
            </div>
          </div>
          <div className="mockup-animate relative">
            <div className="absolute -inset-20 bg-brandRed/10 rounded-full blur-[120px]"></div>
            <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-8 shadow-2xl">
              <div className="aspect-video bg-slate-950 rounded-2xl overflow-hidden border border-white/5">
                <div className="w-full h-full flex items-center justify-center text-slate-800">
                  <Monitor className="w-24 h-24" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03. DESIGN SYSTEM */}
      <section className="py-48 bg-white text-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="reveal mb-24 space-y-4 text-center">
            <h2 className="text-6xl font-black uppercase tracking-tighter">DESIGN SYSTEM.</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">The Blueprint of Precision</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-24">
            <div className="reveal space-y-12">
              <div className="flex items-center space-x-6">
                <Palette className="w-12 h-12 text-brandRed" />
                <h3 className="text-3xl font-black uppercase">Color Palette</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {['#E31E24', '#020617', '#0F172A', '#1E293B', '#64748B', '#F8FAFC'].map(c => (
                  <div key={c} className="space-y-2">
                    <div className="h-24 rounded-2xl shadow-inner border" style={{ backgroundColor: c }}></div>
                    <p className="text-[10px] font-bold text-center font-mono">{c}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal space-y-12">
              <div className="flex items-center space-x-6">
                <Type className="w-12 h-12 text-brandRed" />
                <h3 className="text-3xl font-black uppercase">Typography</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Headline Display / Inter Black</p>
                  <p className="text-6xl font-black tracking-tighter leading-none uppercase">THE POWER OF FOUR.</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Body Copy / Inter Medium</p>
                  <p className="text-lg text-slate-600 leading-relaxed">
                    Engineering excellence from Ireland, deployed globally. Precision at scale.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04. 3D VISUALIZATION */}
      <section className="py-48 bg-slate-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-24 items-center">
          <div className="reveal space-y-12">
            <div className="bg-brandRed/10 p-4 rounded-2xl w-fit">
              <Box className="w-10 h-10 text-brandRed" />
            </div>
            <h2 className="text-5xl font-black uppercase tracking-tight">The 3D <br /><span className="text-slate-500">DIGITAL TWIN.</span></h2>
            <p className="text-xl text-slate-400 leading-relaxed font-medium">
              We implemented a full Three.js environment to allow potential clients to "assemble" the Areva Taxi™ in real-time as they scroll. 
            </p>
            <ul className="space-y-4">
              {['Exploded View Logic', 'Physics-based Materials', 'Interactive Hotspots'].map(item => (
                <li key={item} className="flex items-center space-x-4 text-sm font-black uppercase tracking-widest text-slate-200">
                  <div className="w-2 h-2 rounded-full bg-brandRed"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="h-[600px] bg-slate-900 rounded-[60px] border border-slate-800 relative group overflow-hidden">
             <Taxi3D />
             <div className="absolute inset-0 pointer-events-none border-[30px] border-slate-950/20"></div>
          </div>
        </div>
      </section>

      {/* 05. AI CORE */}
      <section className="py-48 px-4 border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center reveal space-y-12">
          <div className="inline-flex p-6 bg-cyan-600/10 rounded-3xl border border-cyan-500/20 text-cyan-500 mb-6">
            <Cpu className="w-16 h-16" />
          </div>
          <h2 className="text-6xl font-black uppercase tracking-tight">GEMINI-DRIVEN <br /><span className="text-cyan-500">INTELLIGENCE.</span></h2>
          <p className="text-2xl text-slate-400 font-medium leading-relaxed">
            Integration of Google's Gemini API allows for real-time ROI simulation and technical consultancy directly within the landing experience.
          </p>
          <div className="pt-12 grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
              <p className="text-3xl font-black text-cyan-500">0.4s</p>
              <p className="text-[10px] font-black uppercase text-slate-500">Inference Speed</p>
            </div>
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
              <p className="text-3xl font-black text-cyan-500">JSON</p>
              <p className="text-[10px] font-black uppercase text-slate-500">Structured ROI Data</p>
            </div>
            <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
              <p className="text-3xl font-black text-cyan-500">24/7</p>
              <p className="text-[10px] font-black uppercase text-slate-500">Sales Availability</p>
            </div>
          </div>
        </div>
      </section>

      {/* 06. RESPONSIVE ARCHITECTURE */}
      <section className="py-48 px-4 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[600px] bg-brandRed/5 blur-[160px]"></div>
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-24">
             <h2 className="text-6xl font-black uppercase tracking-tighter">CROSS-DEVICE.</h2>
             <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Seamless performance across all surfaces.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div className="mockup-animate relative">
              <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-6 shadow-2xl overflow-hidden aspect-video">
                 <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
                    <Monitor className="w-16 h-16 text-slate-800" />
                 </div>
              </div>
              <p className="mt-8 text-center text-[10px] font-black uppercase tracking-widest text-slate-600">Desktop / 1440px</p>
            </div>
            <div className="mockup-animate relative flex justify-center">
              <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-4 shadow-2xl w-64 h-[500px] overflow-hidden">
                 <div className="w-full h-full bg-slate-950 rounded-3xl flex items-center justify-center">
                    <Smartphone className="w-12 h-12 text-slate-800" />
                 </div>
              </div>
              <div className="absolute -bottom-10 text-[10px] font-black uppercase tracking-widest text-slate-600">Mobile / 390px</div>
            </div>
          </div>
        </div>
      </section>

      {/* 07. FINAL CTA */}
      <section className="py-64 bg-brandRed text-white text-center">
        <div className="reveal space-y-12">
          <h2 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter leading-none">THE END.</h2>
          <p className="text-2xl font-bold uppercase tracking-widest text-white/60">Developed by Areva Engineering Labs</p>
          <div className="pt-12">
            <a href="https://behance.net" className="inline-flex items-center space-x-4 bg-white text-brandRed px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl">
              <span>View More Cases</span>
              <ArrowRight className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioShowcase;
