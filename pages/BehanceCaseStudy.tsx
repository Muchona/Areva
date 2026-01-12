
import React, { useEffect, useRef } from 'react';
import { Palette, Type, Box, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Taxi3D from '../components/Taxi3D';

gsap.registerPlugin(ScrollTrigger);

const BehanceCaseStudy: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = document.querySelectorAll(".case-section");
      sections.forEach((section) => {
        gsap.from(section.querySelectorAll(".reveal-item"), {
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none"
          },
          y: 60,
          opacity: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power4.out"
        });
      });

      gsap.from(".three-reveal", {
        scrollTrigger: {
          trigger: ".three-reveal",
          start: "top 60%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 2,
        ease: "expo.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white selection:bg-brandRed selection:text-white overflow-hidden">
      <section className="case-section min-h-screen flex flex-col items-center justify-center text-center px-4 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(227,30,36,0.1),transparent_70%)]"></div>
        
        <div className="relative z-10 space-y-6">
          <div className="reveal-item inline-flex items-center space-x-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-6 py-2 rounded-full mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brandRed">UI/UX CASE STUDY 2025</span>
          </div>
          <h1 className="reveal-item text-[clamp(4rem,15vw,14rem)] font-black tracking-tighter leading-[0.8] uppercase italic text-slate-900 dark:text-white">
            AREVA<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandRed to-brandRed/60 dark:to-brandRed/30">FLOW.</span>
          </h1>
          <p className="reveal-item text-xl md:text-3xl font-medium text-slate-400 dark:text-slate-500 max-w-4xl mx-auto tracking-tight uppercase mt-12">
            Engineered Efficiency. Visualized for the Next Generation of ASRS.
          </p>
        </div>

        <div className="absolute bottom-20 reveal-item opacity-20">
          <div className="w-px h-24 bg-gradient-to-b from-brandRed to-transparent"></div>
        </div>
      </section>

      <section className="case-section py-64 bg-slate-50 dark:bg-white text-black relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="reveal-item mb-32 space-y-4">
            <h2 className="text-[clamp(3rem,8vw,6rem)] font-black uppercase tracking-tighter leading-none italic">DESIGN DNA.</h2>
            <div className="w-32 h-3 bg-brandRed rounded-full"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-32">
            <div className="reveal-item space-y-16">
              <div className="flex items-center space-x-6 border-b-4 border-black pb-6 w-fit">
                <Palette className="w-12 h-12 text-brandRed" />
                <h3 className="text-4xl font-black uppercase italic">Chromatic Scale</h3>
              </div>
              <div className="grid grid-cols-3 gap-6">
                {[
                  { hex: '#E31E24', name: 'Brand Red' },
                  { hex: '#020617', name: 'Slate 950' },
                  { hex: '#0F172A', name: 'Slate 900' },
                  { hex: '#1E293B', name: 'Slate 800' },
                  { hex: '#64748B', name: 'Slate 500' },
                  { hex: '#F8FAFC', name: 'Slate 50' }
                ].map(c => (
                  <div key={c.hex} className="space-y-3">
                    <div className="h-40 rounded-[32px] shadow-2xl border-4 border-slate-200 bg-white" style={{ backgroundColor: c.hex }}></div>
                    <p className="text-center text-[10px] font-black uppercase tracking-widest">{c.name}</p>
                    <p className="text-center font-mono text-[10px] text-slate-500">{c.hex}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal-item space-y-16">
              <div className="flex items-center space-x-6 border-b-4 border-black pb-6 w-fit">
                <Type className="w-12 h-12 text-brandRed" />
                <h3 className="text-4xl font-black uppercase italic">Industrial Type</h3>
              </div>
              <div className="space-y-12">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Display / Inter Black Italic</p>
                  <p className="text-7xl font-black tracking-tighter leading-none uppercase italic">THE POWER OF FOUR.</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Body / Inter Medium</p>
                  <p className="text-2xl text-slate-600 leading-relaxed font-medium">
                    A typographic system built for clarity in extreme industrial environments, from chilled labs to deep-lane racks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="case-section py-64 bg-white dark:bg-slate-950 border-y border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-32 items-center">
          <div className="reveal-item space-y-12 text-slate-900 dark:text-white">
            <div className="bg-brandRed/10 p-6 rounded-[32px] w-fit">
              <Box className="w-12 h-12 text-brandRed" />
            </div>
            <h2 className="text-7xl font-black uppercase tracking-tight leading-none italic">THE DIGITAL<br /><span className="text-slate-400 dark:text-slate-500">TWIN.</span></h2>
            <p className="text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium max-w-xl">
              Real-time hardware inspection using Three.js and custom GLTF shaders. We allow potential clients to interact with the Areva Taxi™ hardware before it's even shipped.
            </p>
            <div className="space-y-6 pt-8">
              {['Exploded View Logic', 'Micro-millimeter Accuracy', 'Dynamic Lighting Mesh'].map(item => (
                <div key={item} className="flex items-center space-x-4 group">
                  <div className="w-10 h-1 bg-brandRed rounded-full transition-all group-hover:w-16"></div>
                  <span className="text-sm font-black uppercase tracking-widest text-slate-500 dark:text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="three-reveal h-[800px] bg-slate-50 dark:bg-slate-900 rounded-[80px] border border-slate-200 dark:border-slate-800 relative group overflow-hidden shadow-inner">
             <Taxi3D />
             <div className="absolute inset-0 pointer-events-none border-[40px] border-white/20 dark:border-slate-950/20"></div>
          </div>
        </div>
      </section>

      <section className="case-section h-screen bg-brandRed flex flex-col items-center justify-center text-center px-4">
        <div className="reveal-item space-y-12">
          <h2 className="text-[15vw] font-black text-white tracking-tighter uppercase leading-none italic">FIN.</h2>
          <div className="space-y-4">
            <p className="text-3xl font-black uppercase tracking-[0.4em] text-white/50">Areva Engineering Labs</p>
            <p className="text-lg font-bold text-white/30">© 2025 ALL RIGHTS RESERVED</p>
          </div>
          <div className="pt-24">
             <div className="w-16 h-1 bg-white/20 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BehanceCaseStudy;