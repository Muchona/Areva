import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Factory, Zap, ShieldCheck, Settings, Workflow, Layers, ArrowRight, Gauge, Cpu, Target } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ManufacturingSector: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(".hero-reveal", {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.15
      });

      // Side Image Slide-in
      gsap.from(".image-reveal", {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        delay: 0.4
      });

      // Staggered Stats
      gsap.fromTo(".stat-card", 
        { y: 40, scale: 0.9, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".stats-grid",
            start: "top 85%",
          },
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "back.out(1.4)"
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-slate-950 text-white pt-32 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden border-b border-slate-900">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(249,115,22,0.1),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="hero-reveal inline-flex items-center space-x-3 bg-orange-600/10 border border-orange-500/20 px-4 py-2 rounded-full">
                <Factory className="w-4 h-4 text-orange-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Industrial Production Spec</span>
              </div>
              <h1 className="hero-reveal text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                MANUFACTURING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-200">BUFFERS.</span>
              </h1>
              <p className="hero-reveal text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                Seamlessly bridge the gap between production lines and outbound logistics with high-speed automated buffering.
              </p>
              <div className="hero-reveal flex flex-wrap gap-4 pt-4">
                <Link to="/contact" className="bg-orange-600 hover:bg-orange-500 px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-lg shadow-orange-600/20 active:scale-95 flex items-center">
                  Request Factory Audit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/products/system" className="border border-slate-700 hover:border-slate-500 px-10 py-5 rounded-2xl font-black text-lg transition-all bg-white/5 backdrop-blur-sm">
                  Explore ASRS Tech
                </Link>
              </div>
            </div>

            <div className="image-reveal relative group">
              <div className="absolute -inset-10 bg-orange-600/10 rounded-full blur-[120px]"></div>
              <div className="relative rounded-[60px] overflow-hidden border border-slate-800 shadow-2xl">
                 <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" 
                  alt="Automated Manufacturing Storage" 
                  className="w-full h-[600px] object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-12 left-12">
                   <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                      <Settings className="w-6 h-6 text-orange-500 animate-spin-slow" />
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400">Sync Status</p>
                        <p className="text-lg font-bold">24/7 Production Link Active</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial ROI Metrics */}
      <section className="py-32 px-4 bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="stats-grid grid lg:grid-cols-3 gap-12">
            {[
              { label: "Cycle Time Reduction", val: "-45%", desc: "Eliminate bottlenecking with high-speed pallet staging." },
              { label: "Labor Efficiency", val: "3x", desc: "Reallocate forklift operators to high-value production tasks." },
              { label: "Footprint Optimization", val: "-60%", desc: "Compress storage into 1/3 of the space required by traditional racks." }
            ].map((stat, i) => (
              <div key={i} className="stat-card bg-slate-950 p-10 rounded-[40px] border border-slate-800 space-y-4 hover:border-orange-500/30 transition-all">
                <p className="text-orange-500 font-black text-4xl">{stat.val}</p>
                <h3 className="text-xl font-bold">{stat.label}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Tech Integration */}
      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <h2 className="text-5xl font-black tracking-tight leading-none text-white">THE FACTORY <br /><span className="text-orange-500">PULSE.</span></h2>
            
            <div className="grid gap-8">
              {[
                { 
                  title: "Just-In-Time Sequencing", 
                  desc: "Automatically feed assembly lines with the exact SKU sequence required, removing production delays.",
                  icon: <Workflow className="w-6 h-6 text-orange-500" />
                },
                { 
                  title: "Zero-Latency Staging", 
                  desc: "Buffers that keep up with high-output production, staging finished goods for immediate loading.",
                  icon: <Gauge className="w-6 h-6 text-orange-500" />
                },
                { 
                  title: "WCS-MES Bridge", 
                  desc: "Direct integration with Manufacturing Execution Systems for real-time traceability and stock management.",
                  icon: <Cpu className="w-6 h-6 text-orange-500" />
                }
              ].map((item, i) => (
                <div key={i} className="flex space-x-6 p-6 rounded-3xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all">
                  <div className="bg-orange-600/10 p-4 rounded-2xl text-orange-500 h-fit">
                    {item.icon}
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
             <div className="absolute inset-0 bg-orange-600/5 blur-[100px] rounded-full"></div>
             <div className="relative bg-slate-900 border border-slate-800 rounded-[60px] p-6 shadow-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&q=80&w=1200" 
                  alt="Production Integration" 
                  className="w-full h-[600px] object-cover rounded-[45px] grayscale opacity-70 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12">
                   <div className="flex items-center space-x-3 mb-4">
                      <Target className="text-orange-500 w-6 h-6" />
                      <span className="text-xs font-black uppercase tracking-widest text-white">Precision Staging</span>
                   </div>
                   <h3 className="text-3xl font-black uppercase text-white">SYSTEM HARMONY.</h3>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 px-4 bg-orange-600 text-white">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-4">
               <h2 className="text-4xl font-black tracking-tight">OPTIMIZE YOUR LINE.</h2>
               <p className="text-orange-100 font-bold max-w-xl">
                 Consult with our industrial engineers to design a buffering solution that keeps your production moving at peak velocity.
               </p>
            </div>
            <div className="flex space-x-4">
              <Link to="/contact" className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-100 transition-all shadow-xl">
                Get Layout Audit
              </Link>
              <Link to="/products/system" className="bg-orange-700 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-orange-800 transition-all border border-orange-500">
                View System Specs
              </Link>
            </div>
         </div>
      </section>
    </div>
  );
};

export default ManufacturingSector;