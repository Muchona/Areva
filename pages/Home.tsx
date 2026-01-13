
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, ChevronRight, RefreshCcw, ShieldCheck, Zap } from 'lucide-react';
import Taxi3D from '../components/Taxi3D';
import Simulator from '../components/Simulator';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const FlowVisualizer = () => {
  const [nodes, setNodes] = useState<{id: number, x: number, y: number, color: string}[]>([]);
  
  useEffect(() => {
    const initialNodes = [
      { id: 1, x: 25, y: 37.5, color: '#e31e24' },
      { id: 2, x: 75, y: 62.5, color: '#e31e24' },
      { id: 3, x: 12.5, y: 87.5, color: '#334155' }
    ];
    setNodes(initialNodes);
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => {
        const delta = 12.5;
        let newX = node.x;
        let newY = node.y;
        if (Math.random() > 0.5) newX = Math.max(12.5, Math.min(87.5, node.x + (Math.random() > 0.5 ? delta : -delta)));
        else newY = Math.max(12.5, Math.min(87.5, node.y + (Math.random() > 0.5 ? delta : -delta)));
        return { ...node, x: newX, y: newY };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-slate-900/50 rounded-[60px] overflow-hidden border border-slate-800 shadow-2xl p-12 flex items-center justify-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:12.5%_12.5%] opacity-20"></div>
      <div className="relative z-10 w-full max-w-6xl flex flex-col lg:flex-row items-stretch gap-12">
        <div className="flex-grow aspect-square bg-slate-950/40 rounded-3xl border border-white/5 relative overflow-hidden shadow-inner">
          {nodes.map(node => (
            <div key={node.id} className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000" style={{ left: `${node.x}%`, top: `${node.y}%` }}>
              <div className="w-full h-full rounded-xl shadow-lg flex items-center justify-center" style={{ backgroundColor: node.color + '11', border: `2px solid ${node.color}` }}>
                <div className="w-3 h-3 rounded-full animate-pulse shadow-[0_0_15px_currentColor]" style={{ backgroundColor: node.color }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:w-96 flex flex-col justify-center space-y-8">
          <div className="bg-slate-900/90 backdrop-blur-xl p-8 rounded-[40px] border border-white/10 shadow-2xl">
            <div className="inline-flex items-center space-x-2 text-brandRed font-black uppercase tracking-widest text-[9px] mb-4">
              <RefreshCcw className="w-3 h-3 animate-spin" />
              <span>Areva Logic Mesh Active</span>
            </div>
            <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter italic text-white leading-tight">THE POWER <br />OF FOUR.</h3>
            <p className="text-slate-400 text-sm font-medium leading-relaxed">Autonomous pathfinding eliminates bottlenecks in deep-lane storage, recalculating vectors in real-time.</p>
          </div>
          <Link to="/products/system" className="w-full flex items-center justify-center space-x-3 bg-white text-black px-8 py-5 rounded-[24px] transition-all font-black text-xs uppercase tracking-widest group hover:bg-slate-200">
            <span>Explore System</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [showSimulator, setShowSimulator] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const homeRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.from(".hero-reveal", { y: 60, opacity: 0, duration: 1.4, stagger: 0.15, ease: "power4.out" });

    const trigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "+=450",
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
      scrub: 0.6
    });

    return () => trigger.kill();
  }, []);

  return (
    <div ref={homeRef} className="bg-slate-950 text-white overflow-x-hidden min-h-screen">
      <section ref={heroRef} className="relative min-h-[130vh] flex flex-col">
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          {/* Subtle Watermark */}
          <div className="absolute top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.015] flex flex-col items-center text-center">
             <h2 className="text-[25vw] font-black uppercase italic leading-none">AREVA</h2>
          </div>

          <div className="max-w-[1440px] mx-auto px-12 relative z-10 w-full">
            <div className="grid lg:grid-cols-2 gap-48 items-center">
              <div className="space-y-12 max-w-lg relative z-20" style={{ opacity: 1 - scrollProgress * 1.8 }}>
                <div className="hero-reveal inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-6 py-2.5 rounded-full">
                  <div className="w-2 h-2 bg-brandRed rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Industry 5.0 Precision</span>
                </div>
                <h1 className="hero-reveal text-[clamp(2rem,5.5vw,6rem)] font-black leading-[0.88] tracking-tightest uppercase italic">
                  AUTOMATE <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brandRed to-brandRed/40">VELOCITY.</span>
                </h1>
                <p className="hero-reveal text-lg text-slate-400 font-medium leading-relaxed border-l-4 border-brandRed pl-8">
                  Engineered 4-way pallet shuttle systems built for high-density warehouse efficiency and sub-zero resilience.
                </p>
                <div className="hero-reveal flex flex-col sm:flex-row gap-4 pt-4">
                  <Link to="/products/system" className="group bg-brandRed px-10 py-5 rounded-2xl font-black text-base text-white transition-all hover:bg-brandRed/90 shadow-2xl flex items-center justify-center">
                    Explore Taxi™
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                  <button onClick={() => setShowSimulator(true)} className="px-10 py-5 rounded-2xl font-black text-base border border-slate-800 hover:border-slate-400 text-white flex items-center justify-center transition-all bg-white/5 backdrop-blur-sm">
                    Run Audit
                  </button>
                </div>
              </div>
              
              <div className="relative h-[600px] w-full hidden lg:block overflow-visible z-10">
                 <Taxi3D progress={scrollProgress} />
                 
                 {scrollProgress < 0.1 && (
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce opacity-30">
                      <p className="text-[8px] font-black uppercase tracking-widest text-slate-600 mb-2 rotate-90 origin-right translate-y-16">Assemble System</p>
                      <ChevronRight className="rotate-90 text-slate-500" />
                   </div>
                 )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-y border-white/5 bg-slate-900/20">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl font-black uppercase italic tracking-widest text-slate-700">Digital Twin Deployment Successful.</h2>
         </div>
      </section>

      <section className="py-48 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-12">
              <div className="space-y-6 max-w-2xl">
                <div className="inline-flex items-center space-x-3 text-brandRed font-black uppercase tracking-widest text-xs">
                  <Activity className="w-5 h-5" />
                  <span>The System in Motion</span>
                </div>
                <h2 className="text-6xl font-black tracking-tightest leading-none uppercase italic text-white text-nowrap">WITNESS THE <span className="text-brandRed">FLOW.</span></h2>
              </div>
              <Link to="/videos" className="group flex items-center space-x-4 bg-slate-900 px-10 py-5 rounded-3xl border border-white/5 transition-all font-black text-xs uppercase tracking-widest hover:border-brandRed/30">
                <span>View Library</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
           </div>
           <FlowVisualizer />
        </div>
      </section>

      <section className="py-32 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            { icon: <ShieldCheck className="w-8 h-8 text-brandRed" />, title: "Precision Rails", text: "Areva Racking™ built to millimeter tolerance for high-speed transit." },
            { icon: <Zap className="w-8 h-8 text-brandRed" />, title: "Sub-Zero Specs", text: "Areva Taxi™ hardware rated for continuous operation at -30°C." },
            { icon: <Activity className="w-8 h-8 text-brandRed" />, title: "Throughput Modeling", text: "Simulate peak periods and equipment capacity before installation." }
          ].map((item, i) => (
            <div key={i} className="p-10 bg-slate-900/50 border border-slate-800 rounded-[40px] hover:border-brandRed/30 transition-all">
               <div className="mb-6">{item.icon}</div>
               <h3 className="text-2xl font-black uppercase italic mb-4">{item.title}</h3>
               <p className="text-slate-400 font-medium leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
      
      {showSimulator && <Simulator onClose={() => setShowSimulator(false)} />}
    </div>
  );
};

export default Home;
