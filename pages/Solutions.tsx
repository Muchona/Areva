
import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const Solutions: React.FC = () => {
  const products = [
    {
      title: "Areva 4-Way Pallet Shuttle",
      subtitle: "The Core Technology",
      description: "Our proprietary shuttle moves across the warehouse floor and through racking in four directions for direct pallet access.",
      features: ["Ambient & Freezer (-30°C)", "Lithium power", "WiFi-6 protocol"],
      image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Areva VRC (Lifts)",
      subtitle: "Vertical Integration",
      description: "High-speed horizontal and vertical conveyors transport pallets between storage levels seamlessly.",
      features: ["2,000kg capacity", "Precision alignment", "Energy recovery"],
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="bg-slate-950 pt-32 text-white min-h-screen">
      <section className="py-24 px-4 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-6xl font-black tracking-tighter uppercase italic mb-6">Warehouse <span className="text-brandRed">Automation.</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl font-medium leading-relaxed">We engineer throughput. From 1,000 to 100,000+ pallet positions, Areva systems grow with your SKU velocity.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 space-y-32">
          {products.map((product, i) => (
            <div key={i} className={`grid md:grid-cols-2 gap-16 items-center ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
              <div className="space-y-8">
                <p className="text-brandRed font-black uppercase tracking-[0.3em] text-xs">{product.subtitle}</p>
                <h2 className="text-5xl font-black uppercase italic tracking-tighter">{product.title}</h2>
                <p className="text-lg text-slate-400 leading-relaxed font-medium">{product.description}</p>
                <ul className="space-y-4">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <CheckCircle2 className="w-5 h-5 text-brandRed shrink-0" />
                      <span className="text-slate-300 font-bold">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative h-[500px] bg-slate-900 rounded-[60px] overflow-hidden border border-white/5 shadow-2xl">
                <img src={product.image} className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700" alt={product.title} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Solutions;
