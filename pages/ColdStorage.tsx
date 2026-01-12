
import React from 'react';
import { Link } from 'react-router-dom';
import { Snowflake, ThermometerSnowflake, Droplets, Zap, ShieldCheck, ArrowRight, Gauge, Activity } from 'lucide-react';

const ColdStorage: React.FC = () => {
  return (
    <div className="bg-slate-950 text-white pt-32 overflow-hidden">
      <section className="relative py-24 px-4 overflow-hidden border-b border-slate-900">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(255,255,255,0.05),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                <Snowflake className="w-4 h-4 text-blue-300" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300">Extreme Environment Spec</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                COLD <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">CHAIN.</span>
              </h1>
              <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                Automation isn't just a luxury in cold storage—it's a critical strategy for energy recovery and labor safety in -30°C environments.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/contact" className="bg-white text-slate-950 px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 flex items-center">
                  Book Thermal Audit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/products/taxi" className="border border-slate-700 hover:border-slate-500 px-10 py-5 rounded-2xl font-black text-lg transition-all bg-white/5 backdrop-blur-sm">
                  Freezer Spec Taxi™
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-[60px] overflow-hidden border border-white/10 shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=1200" alt="Freezer ASRS" className="w-full h-[600px] object-cover grayscale-[0.5] contrast-125" />
                 <div className="absolute top-12 right-12 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/10">
                   <ThermometerSnowflake className="text-blue-300 w-10 h-10 mb-2" />
                   <p className="text-3xl font-black">-30°C</p>
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Operational Limit</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { label: "Volume Optimization", val: "+85%", desc: "Maximize storage in expensive chilled footprints." },
              { label: "Energy Efficiency", val: "-30%", desc: "Reduce air loss with lower door frequency." },
              { label: "Labor Reliability", val: "100%", desc: "Reliable movement where human labor faces stress." }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-950 p-10 rounded-[40px] border border-slate-800 space-y-4 hover:border-blue-400/30 transition-all">
                <p className="text-blue-400 font-black text-4xl">{stat.val}</p>
                <h3 className="text-xl font-bold">{stat.label}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ColdStorage;
