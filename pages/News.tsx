
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Newspaper, Calendar, ArrowRight, ArrowUpRight } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  category: 'Innovation' | 'Company' | 'Global' | 'Case Study';
  date: string;
  image: string;
  featured?: boolean;
}

const NEWS_DATA: NewsItem[] = [
  {
    id: 'n1',
    title: "Areva Automation Expands Global HQ in Monaghan",
    excerpt: "New 50,000 sq ft manufacturing extension to double production capacity for the Areva Taxi™ Rev 4 series.",
    category: 'Company',
    date: "Oct 24, 2024",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    featured: true
  },
  {
    id: 'n2',
    title: "Revolutionizing Cold Storage in the Middle East",
    excerpt: "How a leading logistics firm in Dubai achieved 85% more density using our sub-zero rated 4-way shuttles.",
    category: 'Case Study',
    date: "Sep 12, 2024",
    image: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 'n3',
    title: "The Future of AI in Warehouse Orchestration",
    excerpt: "Exploring the integration of Gemini-powered predictive pathfinding in the latest Areva WCS™ updates.",
    category: 'Innovation',
    date: "Aug 28, 2024",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800"
  }
];

const News: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', 'Innovation', 'Company', 'Global', 'Case Study'];

  const filteredNews = filter === 'All' 
    ? NEWS_DATA 
    : NEWS_DATA.filter(n => n.category === filter);

  const featured = NEWS_DATA.find(n => n.featured);
  const remainingNews = filteredNews.filter(n => !n.featured || filter !== 'All');

  return (
    <div className="bg-slate-950 min-h-screen text-white pt-32 pb-24 selection:bg-brandRed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 text-brandRed font-black uppercase tracking-[0.4em] text-[10px]">
              <Newspaper className="w-4 h-4" />
              <span>Industry Insights</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase italic">NEWS <br /><span className="text-slate-500">& LOGS.</span></h1>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === cat 
                  ? 'bg-brandRed text-white shadow-lg' 
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filter === 'All' && featured && (
          <section className="mb-24 group">
            <Link to={`/news`} className="block relative bg-slate-900 rounded-[60px] overflow-hidden border border-white/5 shadow-2xl hover:border-brandRed/30 transition-all duration-700">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="h-[400px] lg:h-[600px] relative overflow-hidden">
                  <img src={featured.image} alt={featured.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent hidden lg:block"></div>
                </div>
                <div className="p-12 lg:p-20 flex flex-col justify-center space-y-8 relative">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <span className="px-4 py-1.5 bg-brandRed rounded-full text-[9px] font-black uppercase tracking-widest text-white text-nowrap">Featured Release</span>
                      <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{featured.date}</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight group-hover:text-brandRed transition-colors uppercase italic">{featured.title}</h2>
                    <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-xl">{featured.excerpt}</p>
                  </div>
                  <div className="flex items-center space-x-4 text-brandRed font-black uppercase tracking-widest text-xs">
                    <span>Read Full Briefing</span>
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingNews.map((item) => (
            <Link key={item.id} to={`/news`} className="group bg-slate-900 border border-slate-800 rounded-[45px] overflow-hidden hover:border-brandRed/50 transition-all duration-500 flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={item.title} />
                <div className="absolute top-6 left-6 px-4 py-1.5 bg-slate-950/80 backdrop-blur-md border border-white/10 rounded-full text-[8px] font-black uppercase tracking-widest text-brandRed">{item.category}</div>
              </div>
              <div className="p-10 flex-grow flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center">
                    <Calendar className="w-3 h-3 mr-2" /> {item.date}
                  </p>
                  <h3 className="text-2xl font-black tracking-tight leading-snug group-hover:text-brandRed transition-colors uppercase italic">{item.title}</h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed line-clamp-3">{item.excerpt}</p>
                </div>
                <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-brandRed transition-colors">Read More</span>
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-brandRed transition-all">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
