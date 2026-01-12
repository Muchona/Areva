
import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, ShieldCheck, LifeBuoy, Activity, Settings, Clock, Phone, Globe, ArrowRight } from 'lucide-react';

const MaintenanceService: React.FC = () => {
  return (
    <div className="bg-slate-950 text-white pt-32">
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 bg-slate-800 border border-slate-700 px-4 py-2 rounded-full">
                <LifeBuoy className="w-4 h-4 text-orange-500" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">Zero-Downtime Support</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                MAINTENANCE <br />
                <span className="text-orange-500">& SUPPORT.</span>
              </h1>
              <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">
                Our commitment to your facility doesn't end at commissioning. We provide the technical backbone that keeps your warehouse moving 24/7.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Clock />, label: "24/7 Global Desk", val: "Online" },
                { icon: <Settings />, label: "Parts Inventory", val: "Available" },
                { icon: <Activity />, label: "Remote Monitoring", val: "Active" },
                { icon: <Globe />, label: "Local Field Support", val: "Global" }
              ].map((stat, i) => (
                <div key={i} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-3">
                   <div className="text-orange-500">{stat.icon}</div>
                   <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
                   <p className="text-xl font-bold">{stat.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {[
              { 
                title: "Predictive Monitoring", 
                desc: "Every Areva Taxi™ sends health telemetry to our HQ. We often detect and fix component wear before it causes a stoppage.",
                icon: <Activity />
              },
              { 
                title: "Preventive Care", 
                desc: "Scheduled on-site maintenance packages that ensure your mechanical and electrical components last for decades.",
                icon: <Wrench />
              },
              { 
                title: "Software Updates", 
                desc: "Continuous WCS optimization ensures your pathfinding logic always benefits from our latest R&D breakthroughs.",
                icon: <Settings />
              }
            ].map((pillar, i) => (
              <div key={i} className="p-10 bg-slate-950 border border-slate-800 rounded-[40px] hover:border-orange-500/20 transition-all group">
                <div className="bg-orange-600/10 w-16 h-16 rounded-2xl flex items-center justify-center text-orange-500 mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 uppercase">{pillar.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MaintenanceService;
