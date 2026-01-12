
import React, { useState, useEffect, useRef } from 'react';
import { Zap, Box, Cpu, Move, Play, MousePointer2, Maximize2 } from 'lucide-react';
import Taxi3D from '../components/Taxi3D';
import gsap from 'gsap';

const BehanceEmbed: React.FC = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = [
    { title: "Precision Hardware", desc: "4-Way Omni-directional Taxi™", icon: <Zap /> },
    { title: "Software Logic", desc: "WCS Pathfinding Algorithms", icon: <Cpu /> },
    { title: "Maximum Density", desc: "85% Volume Optimization", icon: <Box /> }
  ];

  useEffect(() => {
    if (hasStarted) {
      const timer = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [hasStarted]);

  useEffect(() => {
    if (hasStarted) {
      gsap.from(".step-content", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        overwrite: true
      });
    }
  }, [activeStep, hasStarted]);

  return (
    <div className="w-full h-screen bg-slate-950 text-white overflow-hidden flex items-center justify-center relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-10"></div>
      
      {!hasStarted ? (
        <div className="relative z-50 text-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="bg-brandRed/20 p-8 rounded-[40px] border border-brandRed/30 backdrop-blur-xl">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Areva Interactive Showcase</h2>
            <p className="text-slate-400 font-medium mb-8">Experience the live 3D assembly and GSAP logic</p>
            <button 
              onClick={() => setHasStarted(true)}
              className="group flex items-center space-x-4 bg-brandRed px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-brandRed/40 mx-auto"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>LAUNCH EXPERIENCE</span>
            </button>
          </div>
          <div className="flex items-center justify-center space-x-3 text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">
            <MousePointer2 className="w-3 h-3" />
            <span>Interactive Module for Behance</span>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col md:flex-row items-center relative">
          <div className="w-full md:w-2/3 h-full relative">
            <Taxi3D />
          </div>

          <div className="absolute top-8 left-8 z-10">
             <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 p-6 rounded-3xl shadow-2xl space-y-1">
               <p className="text-[10px] font-black text-brandRed uppercase tracking-widest">Project: ArevaFlow</p>
               <h3 className="text-2xl font-black uppercase italic">LIVE_RENDER_v1.0</h3>
             </div>
          </div>

          <div className="w-full md:w-1/3 p-12 bg-slate-900/40 backdrop-blur-xl border-l border-white/5 h-full flex flex-col justify-center space-y-12">
            <div className="space-y-4 step-content">
              <div className="w-16 h-16 bg-brandRed rounded-2xl flex items-center justify-center text-white shadow-lg shadow-brandRed/20">
                {steps[activeStep].icon}
              </div>
              <h4 className="text-4xl font-black tracking-tighter uppercase leading-none">
                {steps[activeStep].title}
              </h4>
              <p className="text-xl text-slate-400 font-medium leading-relaxed">
                {steps[activeStep].desc}
              </p>
            </div>

            <div className="space-y-4">
              {steps.map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className={`h-1 transition-all duration-500 rounded-full ${activeStep === i ? 'w-12 bg-brandRed' : 'w-4 bg-slate-800'}`}></div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${activeStep === i ? 'text-white' : 'text-slate-600'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-12">
               <div className="flex items-center space-x-3 text-slate-500">
                  <Maximize2 className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Mouse scroll to assemble Taxi™</span>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BehanceEmbed;
