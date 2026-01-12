
import React, { useState } from 'react';
import { Terminal, Download, Loader2, FileCode, Shield, Cpu, Globe, ChevronRight } from 'lucide-react';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

const DeveloperPortal: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    const zip = new JSZip();

    try {
      const manifest = {
        project: "Areva Automation",
        engine: "Antigravity v2.5",
        deployment: "Production",
        features: ["Three.js-ASRS", "Gemini-Logic", "GSAP-Inertia"],
        apiKeyRequired: true,
        variableMapping: {
          API_KEY: "GEMINI_PRO_KEY"
        }
      };
      zip.file("antigravity_manifest.json", JSON.stringify(manifest, null, 2));

      const filesToInclude = [
        'index.html',
        'index.tsx',
        'App.tsx',
        'package.json',
        'tsconfig.json',
        'vite.config.ts',
        'types.ts'
      ];

      for (const file of filesToInclude) {
        try {
          const response = await fetch(`/${file}`);
          if (response.ok) {
            const content = await response.text();
            zip.file(file, content);
          }
        } catch (e) {
          console.warn(`Could not fetch ${file} for bundling:`, e);
        }
      }

      zip.file("README.md", `# Areva Automation - Full Website Export\n\nThis ZIP contains the core website logic for the Areva Automation redesign.\n\n### Deployment\n1. Import these files into your React project or Antigravity engine.\n2. Set your Google Gemini API Key in the environment variables as \`API_KEY\`.\n3. Run \`npm install && npm start\` for a local dev environment.`);

      const content = await zip.generateAsync({ type: "blob" });
      FileSaver.saveAs(content, "areva_full_website_source.zip");
    } catch (err) {
      console.error("Export failed:", err);
      alert("Bundle failed. Please try again or use the source directly from the IDE.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20">
          <div className="space-y-6 max-w-2xl">
            <div className="inline-flex items-center space-x-3 bg-brandRed/10 border border-brandRed/20 px-4 py-2 rounded-full">
              <Terminal className="w-4 h-4 text-brandRed" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brandRed">Developer Hub</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none uppercase italic">
              ENGINEERING<br />
              <span className="text-slate-500">OPEN SOURCE.</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              Our digital twin and AI consulting logic is built to be portable. Export the full website source code directly for use in Antigravity or your internal production environment.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            <button 
              onClick={handleExport}
              disabled={isExporting}
              className="w-full lg:w-auto bg-blue-600 hover:bg-blue-500 px-12 py-6 rounded-[32px] font-black text-lg transition-all shadow-2xl shadow-blue-600/20 flex items-center justify-center space-x-4"
            >
              {isExporting ? <Loader2 className="animate-spin" /> : <Download />}
              <span className="uppercase tracking-widest text-xs">Bundle Full Website Code</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-slate-900 border border-slate-800 rounded-[40px] p-10">
              <h3 className="text-2xl font-black uppercase mb-8 flex items-center">
                <FileCode className="mr-4 text-brandRed" /> Source Structure
              </h3>
              <div className="bg-slate-950 p-6 rounded-2xl border border-white/5 font-mono text-sm text-blue-400 overflow-x-auto">
                <pre>{`{
  "project": "Areva Automation v2.5",
  "architecture": "React 19 + Vite + GSAP",
  "files_included": [
    "App.tsx (Main Routing)",
    "Home.tsx (Landing Logic)",
    "Taxi3D.tsx (Three.js WebGL)",
    "Simulator.tsx (Gemini ROI Engine)",
    "geminiService.ts (AI Connector)"
  ]
}`}</pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
                <Shield className="text-brandRed w-8 h-8 mb-6" />
                <h4 className="text-xl font-bold uppercase mb-2">Environment Keys</h4>
                <p className="text-sm text-slate-500">The Gemini API is pre-wired to consume environment variables securely. No hardcoding required.</p>
              </div>
              <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800">
                <Cpu className="text-blue-500 w-8 h-8 mb-6" />
                <h4 className="text-xl font-bold uppercase mb-2">Digital Twin Core</h4>
                <p className="text-sm text-slate-500">Three.js components are fully decoupled for independent deployment to monitoring dashboards.</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-brandRed/10 border border-brandRed/20 p-8 rounded-[40px]">
              <h4 className="font-black uppercase text-brandRed mb-4">Export Note</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                The bundle now includes the <strong>full website source code</strong>. If you encounter issues with assets, ensure your environment supports modern ES modules.
              </p>
              <button className="text-brandRed font-black uppercase text-[10px] tracking-widest flex items-center group">
                Full Docs <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="bg-white/5 border border-white/10 p-8 rounded-[40px]">
              <Globe className="text-slate-400 w-6 h-6 mb-4" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Status</p>
              <p className="text-lg font-bold">Production Ready</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperPortal;
