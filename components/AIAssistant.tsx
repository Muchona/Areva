import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Loader2, Sparkles, Mic, Waves } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { ChatMessage, MessageRole } from '../types.ts';
import { getWarehouseAdvice, SYSTEM_INSTRUCTION } from '../services/geminiService.ts';

interface AIAssistantProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: MessageRole.MODEL, text: "Welcome to Areva. I'm your warehouse consultant. How can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [transcription, setTranscription] = useState('');
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<any>(null);
  const audioSources = useRef<Set<AudioBufferSourceNode>>(new Set());

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, transcription]);

  useEffect(() => {
    return () => {
      if (sessionRef.current) {
        sessionRef.current.close();
      }
      audioSources.current.forEach(s => {
        try { s.stop(); } catch(e) {}
      });
    };
  }, []);

  const encode = (bytes: Uint8Array) => {
    let b = '';
    for (let i = 0; i < bytes.byteLength; i++) b += String.fromCharCode(bytes[i]);
    return btoa(b);
  };

  const decode = (base64: string) => {
    const s = atob(base64);
    const b = new Uint8Array(s.length);
    for (let i = 0; i < s.length; i++) b[i] = s.charCodeAt(i);
    return b;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) => {
    const d = new Int16Array(data.buffer);
    const count = d.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, count, sampleRate);
    for (let c = 0; c < numChannels; c++) {
      const channel = buffer.getChannelData(c);
      for (let i = 0; i < count; i++) channel[i] = d[i * numChannels + c] / 32768.0;
    }
    return buffer;
  };

  const startVoiceSession = async () => {
    try {
      setIsVoiceMode(true);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      let nextStartTime = 0;

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            const source = inputCtx.createMediaStreamSource(stream);
            const script = inputCtx.createScriptProcessor(4096, 1, 1);
            script.onaudioprocess = (e) => {
              const data = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(data.length);
              for (let i = 0; i < data.length; i++) int16[i] = data[i] * 32768;
              sessionPromise.then(s => {
                if (s) s.sendRealtimeInput({ media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } });
              });
            };
            source.connect(script);
            script.connect(inputCtx.destination);
          },
          onmessage: async (msg: LiveServerMessage) => {
            const audio = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (audio) {
              nextStartTime = Math.max(nextStartTime, outputCtx.currentTime);
              const buffer = await decodeAudioData(decode(audio), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outputCtx.destination);
              source.onended = () => audioSources.current.delete(source);
              audioSources.current.add(source);
              source.start(nextStartTime);
              nextStartTime += buffer.duration;
            }
            if (msg.serverContent?.interrupted) {
              audioSources.current.forEach(s => { try { s.stop(); } catch(e) {} });
              audioSources.current.clear();
              nextStartTime = 0;
            }
            const partText = msg.serverContent?.modelTurn?.parts?.[0]?.text;
            if (partText) {
              setTranscription(prev => prev + partText);
            }
          },
          onclose: () => setIsVoiceMode(false),
          onerror: (e) => console.error("Live API Error:", e)
        },
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTION,
          outputAudioTranscription: {}
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (e) {
      console.error("Voice Hardware Fault:", e);
      setIsVoiceMode(false);
    }
  };

  const stopVoiceSession = () => {
    if (sessionRef.current) sessionRef.current.close();
    setIsVoiceMode(false);
    setTranscription('');
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const msg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: MessageRole.USER, text: msg }]);
    setIsLoading(true);
    const res = await getWarehouseAdvice(messages, msg);
    setMessages(prev => [...prev, { role: MessageRole.MODEL, text: res }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100]">
      {!isOpen ? (
        <button 
          onClick={() => setIsOpen(true)} 
          className="bg-brandRed text-black p-4 sm:p-5 rounded-full shadow-2xl hover:scale-110 transition-all active:scale-95 flex items-center justify-center"
          aria-label="Open Areva Assistant"
        >
          <Sparkles className="w-5 h-5 sm:w-6 h-6 animate-pulse" />
        </button>
      ) : (
        <div className="bg-slate-900 rounded-[28px] shadow-3xl w-[300px] sm:w-[340px] flex flex-col border border-slate-800 animate-in fade-in zoom-in slide-in-from-bottom-5">
          <div className="bg-slate-950 p-4 flex justify-between items-center border-b border-white/5 rounded-t-[28px]">
            <div className="flex items-center space-x-2">
              <div className="bg-brandRed p-1.5 rounded-lg"><Bot className="w-4 h-4 text-black" /></div>
              <div>
                <p className="font-black text-[9px] uppercase tracking-widest text-white">Areva AI</p>
                <div className="flex items-center space-x-1">
                  <div className={`w-1 h-1 rounded-full ${isVoiceMode ? 'bg-red-500 animate-ping' : 'bg-green-500'}`}></div>
                  <p className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">{isVoiceMode ? 'Live' : 'Ready'}</p>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-500 hover:text-white transition-colors p-1"><X className="w-4 h-4" /></button>
          </div>

          <div ref={scrollRef} className="h-[320px] overflow-y-auto p-4 space-y-4 bg-slate-950/50">
            {isVoiceMode ? (
              <div className="h-full flex flex-col items-center justify-center space-y-6">
                <div className="relative">
                   <div className="absolute -inset-8 bg-brandRed/20 rounded-full blur-2xl animate-pulse"></div>
                   <Waves className="w-12 h-12 text-brandRed relative animate-pulse" />
                </div>
                <div className="text-center space-y-1">
                   <p className="text-white font-black uppercase text-[10px] tracking-widest">Listening...</p>
                   {transcription && <p className="text-slate-400 text-[10px] italic leading-relaxed px-4 line-clamp-3">"{transcription}"</p>}
                </div>
                <button onClick={stopVoiceSession} className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">End Call</button>
              </div>
            ) : (
              messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[90%] p-3 rounded-xl text-xs leading-relaxed ${m.role === MessageRole.USER ? 'bg-brandRed text-black rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-tl-none border border-white/5'}`}>
                    {m.text}
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 p-3 rounded-xl flex items-center space-x-2">
                  <Loader2 className="w-3 h-3 animate-spin text-brandRed" />
                  <span className="text-[9px] font-black uppercase text-slate-500">Processing</span>
                </div>
              </div>
            )}
          </div>

          {!isVoiceMode && (
            <div className="p-4 bg-slate-900 border-t border-white/5 flex space-x-2 rounded-b-[28px]">
              <button 
                onClick={startVoiceSession} 
                className="bg-slate-800 p-3 rounded-xl text-slate-400 hover:text-brandRed transition-all"
                aria-label="Voice Consultation"
              >
                <Mic className="w-4 h-4" />
              </button>
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                placeholder="Ask Areva..." 
                className="flex-grow bg-slate-950 rounded-xl px-4 py-3 text-xs font-medium outline-none text-white border-none placeholder:text-slate-600" 
              />
              <button 
                onClick={handleSend} 
                disabled={isLoading} 
                className="bg-brandRed text-black p-3 rounded-xl hover:bg-brandRed/90 disabled:opacity-50 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIAssistant;