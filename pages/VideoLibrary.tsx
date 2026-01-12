
import React, { useState, useEffect } from 'react';
import { Play, Share2, ArrowRight, Video, ExternalLink, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface VideoItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  url: string;
  youtubeId: string;
}

const VIDEO_DATA: VideoItem[] = [
  {
    id: 'v1',
    title: "Areva 4-Way Taxi: Operational Showcase",
    category: "System Overview",
    thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    url: "https://www.youtube.com/watch?v=gjrBIVchBNI",
    youtubeId: "gjrBIVchBNI"
  },
  {
    id: 'v2',
    title: "Automated Cold Storage Solution (-30°C)",
    category: "Case Study",
    thumbnail: "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&q=80&w=800",
    url: "https://www.youtube.com/watch?v=L2vY8XvR9pI",
    youtubeId: "L2vY8XvR9pI"
  },
  {
    id: 'v3',
    title: "Areva VTU: High-Speed Vertical Integration",
    category: "Technical Showcase",
    thumbnail: "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&q=80&w=800",
    url: "https://www.youtube.com/watch?v=8mB9e0z_R50",
    youtubeId: "8mB9e0z_R50"
  }
];

const VideoLibrary: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<VideoItem>(VIDEO_DATA[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeVideo]);

  return (
    <div className="bg-slate-950 min-h-screen text-white pt-24 sm:pt-32 pb-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 text-brandRed font-black uppercase tracking-[0.3em] text-[10px]">
            <Video className="w-4 h-4" />
            <span>Operational Excellence</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] uppercase break-words italic">
            AREVA <br />
            <span className="text-slate-500">IN MOTION.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <div className="relative bg-slate-900 rounded-[30px] md:rounded-[40px] overflow-hidden border border-slate-800 shadow-2xl group w-full" style={{ paddingTop: '56.25%' }}>
              {loading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md">
                   <Loader2 className="w-10 h-10 text-brandRed animate-spin mb-4" />
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Initializing Areva Player...</p>
                </div>
              )}
              <iframe className="absolute inset-0 w-full h-full" src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?si=G-frByu0yz_usQ8P&rel=0&enablejsapi=1`} title="Areva Automation Video" frameBorder="0" allowFullScreen style={{ border: 0 }}></iframe>
            </div>
            
            <div className="flex flex-col p-6 md:p-8 bg-slate-900/50 rounded-[28px] md:rounded-[32px] border border-slate-800 gap-6">
              <div className="space-y-2">
                <p className="text-brandRed font-bold uppercase tracking-widest text-[10px]">{activeVideo.category}</p>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-black uppercase italic leading-tight">{activeVideo.title}</h2>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-4 items-center">
                <a href={activeVideo.url} target="_blank" rel="noopener noreferrer" className="flex-grow sm:flex-grow-0 p-4 bg-slate-800 rounded-2xl hover:bg-slate-700 transition-all text-slate-300 flex items-center justify-center space-x-2">
                  <ExternalLink className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest">YouTube Source</span>
                </a>
                <Link to="/contact" className="flex-grow sm:flex-grow-0 flex items-center justify-center space-x-2 bg-brandRed px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-brandRed/90 transition-all shadow-lg shadow-brandRed/20">
                  <span>Contact Sales</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg md:text-xl font-black px-2 flex items-center justify-between">
              <span className="uppercase tracking-tight italic">Technical Logs</span>
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{VIDEO_DATA.length} Assets</span>
            </h3>
            <div className="space-y-3 lg:space-y-4 lg:max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {VIDEO_DATA.map((video) => (
                <button key={video.id} onClick={() => setActiveVideo(video)} className={`w-full text-left group p-4 rounded-3xl border transition-all duration-300 flex space-x-4 items-center ${activeVideo.id === video.id ? 'bg-brandRed/10 border-brandRed/30' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}>
                  <div className="relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-800">
                    <img src={video.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={video.title} />
                  </div>
                  <div className="space-y-1 overflow-hidden">
                    <p className={`text-[8px] font-black uppercase tracking-widest ${activeVideo.id === video.id ? 'text-brandRed' : 'text-slate-500'}`}>{video.category}</p>
                    <h4 className="text-xs font-bold truncate text-slate-200">{video.title}</h4>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoLibrary;
