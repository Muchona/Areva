
import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Zap, Target, Box, BarChart, Globe, ArrowRight, ShieldCheck, Clock, Layers } from 'lucide-react';

const LogisticsSector: React.FC = () => {
  return (
    <div className="bg-slate-950 text-white pt-32">
      <section className="relative py-24 px-4 overflow-hidden border-b border-slate-900">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_-20%,rgba(249,115,22,0.1),transparent_70%)]"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 bg-orange-600/10 border border-orange-500/20 px-4 py-2 rounded-full">
                <Truck className="w-4 h-4 text-orange-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Distribution Spec</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                LOGISTICS <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-200">VELOCITY.</span>
              </h1>
              <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                In the era of next-day delivery, your warehouse isn't just storage—it's a high-speed distribution engine. 
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/contact" className="bg-orange-600 hover:bg-orange-500 px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-lg active:scale-95 flex items-center">
                  Scale Your Output
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link to="/cases" className="border border-slate-700 hover:border-slate-500 px-10 py-5 rounded-2xl font-black text-lg transition-all bg-white/5 backdrop-blur-sm">
                  View 3PL Cases
                </Link>
              </div>
            </div>
            <div className="relative bg-slate-900 rounded-[60px] p-8 border border-slate-800 shadow-2xl overflow-hidden aspect-video">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              <div className="relative h-full flex flex-col justify-center space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-500 uppercase">Live Distribution Mesh</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-orange-500 rounded-full animate-ping"></div>
                    <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-4 h-32">
                  {Array.from({length: 8}).map((_, i) => (
                    <div key={i} className="bg-slate-800/50 rounded-xl border border-white/5 flex items-end p-2 overflow-hidden">
                       <div className="w-full bg-orange-500/30 rounded-t-md animate-pulse" style={{ height: `${Math.random() * 80 + 20}%` }}></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between font-mono text-[10px] text-slate-500">
                  <span>ORDERS: 14,201</span>
                  <span>ACCURACY: 99.98%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-32 px-4 bg-slate-900/20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            { icon: <Target />, title: "Precision Fulfillment", desc: "Automated retrieval ensures the correct SKU reaches the loading bay every single time." },
            { icon: <Zap />, title: "Peak Season Ready", desc: "Scale throughput instantly during holidays or promotions without increasing headcount." },
            { icon: <Layers />, title: "Omnichannel Logic", desc: "Manage B2B pallets and B2C individual picks from the same high-density system." }
          ].map((item, i) => (
            <div key={i} className="p-10 bg-slate-900 border border-slate-800 rounded-[40px] hover:border-orange-500/30 transition-all">
              <div className="text-orange-500 mb-6">{item.icon}</div>
              <h3 className="text-2xl font-black mb-4 uppercase">{item.title}</h3>
              <p className="text-slate-400 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LogisticsSector;
