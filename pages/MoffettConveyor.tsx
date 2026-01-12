
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Layers, Settings, Activity, RefreshCcw, Cpu } from 'lucide-react';

const ArevaConveyor: React.FC = () => {
  return (
    <div className="bg-slate-950 text-white pt-32">
      <section className="relative py-24 px-4 overflow-hidden border-b border-slate-900">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(148,163,184,0.1),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 bg-slate-500/10 border border-slate-500/20 px-4 py-2 rounded-full">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Horizontal Velocity Matrix</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                AREVA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-100">CONVEYOR™.</span>
              </h1>
              <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                The modular arterial system for your warehouse. Engineered for high-speed pallet distribution with zero-gap handover to our 4-way shuttle fleet.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/contact" className="bg-slate-100 text-slate-950 hover:bg-white px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-lg active:scale-95 flex items-center">
                  Request Layout Design
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="relative rounded-[40px] overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 aspect-video">
                 <img src="https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&q=80&w=1200" alt="Areva Modular Conveyor" className="w-full h-full object-cover grayscale opacity-80" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-8">
            {[
              { label: "Transfer Speed", val: "0.6 m/s", icon: <Zap /> },
              { label: "Max Pallet Wt", val: "2,000kg", icon: <Layers /> },
              { label: "Module Lengths", val: "Modular", icon: <Settings /> },
              { label: "Noise Emission", val: "< 70dB", icon: <Activity /> }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[32px] text-center">
                <div className="text-slate-400 mb-6 flex justify-center">{stat.icon}</div>
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
                <p className="text-4xl font-black text-white">{stat.val}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default ArevaConveyor;