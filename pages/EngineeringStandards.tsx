
import React from 'react';
import { ShieldCheck, Zap, Activity, Snowflake, UserCheck, BarChart3, Ruler, Workflow, Cpu, Scale, Droplets, BatteryCharging } from 'lucide-react';

const EngineeringStandards: React.FC = () => {
  const points = [
    { icon: <Workflow />, title: "Pallet Integrity Audit", desc: "Analyzing pallet quality, weight distribution, and dimensions to ensure zero-jam automation." },
    { icon: <Ruler />, title: "Vertical Tolerance", desc: "Precision scanning of building heights to maximize cube utilization with VRC lifts." },
    { icon: <Snowflake />, title: "Cold Chain Thermal Gap", desc: "Energy efficiency audit for sub-zero environments, reducing thermal loss by 20%." },
    { icon: <Activity />, title: "SKU Velocity Mapping", desc: "Strategic placement of high-turnover items to optimize shuttle travel time." },
    { icon: <Cpu />, title: "WCS Latency Benchmark", desc: "Ensuring millisecond response times between warehouse control and ERP layers." },
    { icon: <BatteryCharging />, title: "Energy Cycle Analysis", desc: "Optimizing shuttle charging cycles to ensure 24/7 operation without peak load stress." },
    { icon: <UserCheck />, title: "Human-Machine Interface", desc: "Safety protocols for mixed zones where automation and staff coexist." },
    { icon: <Scale />, title: "Load Balancing", desc: "Dynamic storage algorithms to prevent localized racking stress." },
    { icon: <Zap />, title: "Throughput Modeling", desc: "Mathematical simulation of peak periods vs. equipment capacity." },
    { icon: <Droplets />, title: "Ambient Control", desc: "Humidity and condensation management in transitioning temp zones." },
    { icon: <ShieldCheck />, title: "Redundancy Mapping", desc: "Designing fail-safes so single equipment downtime doesn't stop the flow." },
    { icon: <BarChart3 />, title: "TCO Projection", desc: "Full lifecycle cost analysis over a 15-year operational horizon." }
  ];

  return (
    <div className="bg-slate-950 pt-40 pb-32 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-24 space-y-6 max-w-3xl">
          <p className="text-orange-500 font-black uppercase tracking-[0.4em] text-xs">Engineering Excellence</p>
          <h1 className="text-6xl font-black tracking-tighter leading-none">THE 12-POINT <br />BENCHMARK.</h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            Our audit isn't just a survey—it's a deep-tissue engineering diagnostic of your supply chain capabilities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((point, i) => (
            <div key={i} className="group p-8 bg-slate-900 border border-slate-800 rounded-[40px] hover:border-orange-500/50 transition-all duration-500">
              <div className="bg-slate-800 w-16 h-16 rounded-2xl flex items-center justify-center text-orange-500 group-hover:bg-orange-600 group-hover:text-white transition-all mb-8">
                {/* Fix: cast icon to ReactElement<any> to allow className prop in cloneElement */}
                {React.cloneElement(point.icon as React.ReactElement<any>, { className: "w-8 h-8" })}
              </div>
              <h3 className="text-xl font-bold mb-4">{point.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{point.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EngineeringStandards;
