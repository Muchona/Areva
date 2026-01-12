
import React from 'react';
import { Link } from 'react-router-dom';
import { Maximize, ArrowRight, Zap, Shield, Activity, Layers, Cpu, RefreshCcw, Gauge } from 'lucide-react';

const ArevaVTU: React.FC = () => {
  return (
    <div className="bg-slate-950 text-white pt-32">
      <section className="relative py-24 px-4 overflow-hidden border-b border-slate-900">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.15),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 bg-blue-600/10 border border-blue-500/20 px-4 py-2 rounded-full">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">The Vertical Backbone</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                AREVA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-200">VTU™.</span>
              </h1>
              <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                The Vertical Transport Unit is the Z-axis engine of our ASRS systems, bridging storage levels with unmatched speed and millimetre precision.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/contact" className="bg-blue-600 hover:bg-blue-500 px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center">
                  Request Site Audit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/products/system" className="border border-slate-700 hover:border-slate-500 px-10 py-5 rounded-2xl font-black text-lg transition-all bg-white/5 backdrop-blur-sm">
                  System Design
                </Link>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-10 bg-blue-600/10 rounded-full blur-[120px]"></div>
              <div className="relative rounded-[40px] overflow-hidden border border-slate-800 shadow-2xl bg-slate-900 aspect-[4/5]">
                 <img src="https://images.unsplash.com/photo-1565891741441-64926e441838?auto=format&fit=crop&q=80&w=1200" alt="Areva VTU Hardware" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-slate-950/80 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                    <p className="text-xl font-black text-white">PRECISION: +/- 0.5MM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-4 gap-8">
          {[
            { label: "Lift Speed", val: "2.0 m/s", icon: <Zap className="w-8 h-8" /> },
            { label: "Max Payload", val: "2,000kg", icon: <Layers className="w-8 h-8" /> },
            { label: "Acceleration", val: "0.8 m/s²", icon: <Activity className="w-8 h-8" /> },
            { label: "Energy Efficiency", val: "+24%", icon: <Gauge className="w-8 h-8" /> }
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-[32px] text-center">
              <div className="text-blue-500 mb-6 flex justify-center">{stat.icon}</div>
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">{stat.label}</p>
              <p className="text-4xl font-black text-white">{stat.val}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArevaVTU;
