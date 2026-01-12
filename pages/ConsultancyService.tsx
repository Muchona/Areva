
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, LineChart, Target, Ruler, Layers, ArrowRight, Info, Database } from 'lucide-react';

const ConsultancyService: React.FC = () => {
  return (
    <div className="bg-slate-950 text-white pt-40 pb-32">
      <section className="relative px-4">
        <div className="max-w-7xl mx-auto">
           <div className="max-w-3xl space-y-8">
              <div className="inline-flex items-center space-x-3 bg-brandRed/10 border border-brandRed/20 px-4 py-2 rounded-full">
                <Search className="w-4 h-4 text-brandRed" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brandRed">Consultancy Core</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">THE BLUEPRINT <br /><span className="text-slate-500">OF DENSITY.</span></h1>
              <p className="text-xl text-slate-400 leading-relaxed font-medium">
                We don't sell equipment. We design solutions. Our consultancy process starts with your data to reveal the hidden capacity within your footprint.
              </p>
           </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-slate-900/40 border-y border-slate-900 mt-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { icon: <Database />, label: "Data Audit", desc: "Analyzing 12 months of SKU velocity and pallet turnover data." },
            { icon: <Ruler />, label: "3D Layout Design", desc: "Custom CAD layouts engineered for your specific building constraints." },
            { icon: <LineChart />, label: "ROI Modeling", desc: "Accurate financial forecasting based on labor and space savings." },
            { icon: <Target />, label: "Flow Simulation", desc: "Virtual testing of system throughput before a single bolt is turned." }
          ].map((step, i) => (
            <div key={i} className="space-y-6 group">
              <div className="text-brandRed bg-brandRed/10 w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-brandRed group-hover:text-white transition-all">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight">{step.label}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-4">
        <div className="max-w-7xl mx-auto bg-slate-900 rounded-[60px] p-12 md:p-24 border border-slate-800 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(227,30,36,0.1),transparent)]"></div>
           <div className="relative z-10 space-y-8">
             <h2 className="text-4xl md:text-6xl font-black">START WITH A <span className="text-brandRed">SITE AUDIT.</span></h2>
             <p className="text-xl text-slate-400 max-w-2xl mx-auto">Let our lead engineers visit your facility to identify automation potential and bottleneck risks.</p>
             <Link to="/contact" className="bg-brandRed hover:bg-brandRed/90 px-12 py-5 rounded-2xl font-black text-lg transition-all shadow-xl inline-block shadow-brandRed/20">
               Request Audit Invitation
             </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default ConsultancyService;
