
import React from 'react';
import { Link } from 'react-router-dom';
import { Microscope, ShieldCheck, Snowflake, Droplets, Thermometer, Database, ArrowRight, Activity, CheckCircle2 } from 'lucide-react';

const PharmaSector: React.FC = () => {
  return (
    <div className="bg-slate-950 text-white pt-32">
      <section className="relative py-24 px-4 overflow-hidden border-b border-slate-900">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(59,130,246,0.1),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center space-x-3 bg-blue-600/10 border border-blue-500/20 px-4 py-2 rounded-full mx-auto lg:mx-0">
                <Microscope className="w-4 h-4 text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Sterile Automation Spec</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                PHARMA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-white">COMPLIANT.</span>
              </h1>
              <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                Total traceability and precision climate control for high-value life science inventory. 
              </p>
              <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
                <Link to="/contact" className="bg-white text-slate-950 hover:bg-slate-200 px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl active:scale-95 flex items-center">
                  Book Validation Audit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/engineering-standards" className="border border-slate-700 hover:border-slate-500 px-10 py-5 rounded-2xl font-black text-lg transition-all bg-white/5 backdrop-blur-sm">
                  System Hygiene
                </Link>
              </div>
            </div>
            <div className="relative group">
               <div className="absolute -inset-10 bg-blue-600/10 rounded-full blur-[100px]"></div>
               <img 
                src="https://images.unsplash.com/photo-1579154235602-3c37ef456073?auto=format&fit=crop&q=80&w=1200" 
                alt="Pharmaceutical Lab Automation" 
                className="relative rounded-[60px] border border-white/10 grayscale-[0.8] group-hover:grayscale-0 transition-all duration-1000 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <h2 className="text-5xl font-black">CRITICAL <span className="text-blue-400">TRACEABILITY.</span></h2>
            <div className="space-y-6">
              {[
                { title: "FEFO/FIFO Logic", desc: "Our WCS ensures first-expiry, first-out picking to eliminate medical waste." },
                { title: "Cold Chain Continuity", desc: "Maintain sub-zero or 2-8°C conditions with zero manual door openings." },
                { title: "Batch ID Integrity", desc: "Every pallet movement is logged and timestamped for regulatory compliance." }
              ].map((item, i) => (
                <div key={i} className="flex space-x-6 p-6 rounded-3xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-12 bg-slate-900 border border-slate-800 rounded-[50px] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 blur-3xl"></div>
             <Activity className="text-blue-400 w-12 h-12 mb-8" />
             <h3 className="text-3xl font-black mb-4">GAMP 5 STANDARDS.</h3>
             <p className="text-slate-400 leading-relaxed mb-8">We engineer our systems to align with the strictest pharmaceutical validation requirements, ensuring that your automation upgrade doesn't compromise your license to operate.</p>
             <Link to="/contact" className="text-blue-400 font-black flex items-center group">
               Discuss Compliance <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PharmaSector;
