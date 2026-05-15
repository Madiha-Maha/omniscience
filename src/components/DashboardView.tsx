import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ComposedChart } from 'recharts';
import { Sparkle, Zap, Activity, Globe, TrendingUp, Cpu, Lightbulb } from 'lucide-react';
import { cn } from '../lib/utils';
import { Platform, PlatformData } from '../types';
import PostGenerator from './PostGenerator';
import { getAIInsights } from '../services/ai';

interface DashboardViewProps {
  platform: Platform;
  data: PlatformData;
  notify: (message: string) => void;
}

const LIVE_SIGNALS = [
  "High resonance detected in Tokyo tech sector.",
  "Sentiment shift: +0.12 in APAC professional feeds.",
  "Neural extraction complete for Q3 projections.",
  "Anomaly detected: Unexpected engagement spike in Berlin.",
];

export default function DashboardView({ platform, data, notify }: DashboardViewProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<string | null>(null);
  const [signalIndex, setSignalIndex] = useState(0);

  useEffect(() => {
    handleGenerateInsights();
    
    const interval = setInterval(() => {
      setSignalIndex(prev => (prev + 1) % LIVE_SIGNALS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [platform]);

  const handleGenerateInsights = async () => {
    setIsLoading(true);
    setAiInsights(null);
    const insights = await getAIInsights(platform, data.metrics);
    setAiInsights(insights);
    setIsLoading(false);
  };

  // Enhance data with a "Projection" line
  const projectionData = data.engagementData.map((d, i) => ({
    ...d,
    projection: i > data.engagementData.length - 3 ? d.value * (1 + Math.random() * 0.2) : null
  }));

  return (
    <div className="flex flex-col gap-10">
      {/* Hero Statistics - Neural Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={cn(
              "p-8 bg-white border border-lumina-border flex flex-col gap-2 relative overflow-hidden group",
              i === 3 && "bg-lumina-text text-white shadow-2xl lg:col-span-1"
            )}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={cn("label-caps", i === 3 && "text-lumina-silver/70")}>{m.label}</span>
              {i === 3 ? <Cpu className="w-4 h-4 opacity-30" /> : <Activity className="w-4 h-4 text-lumina-border group-hover:text-lumina-text transition-colors" />}
            </div>
            
            <span className="text-4xl font-serif italic font-medium tracking-tighter">{m.value}</span>
            <div className="flex items-center gap-2">
              <span className={cn(
                "text-[12px] font-black",
                i === 3 ? "text-white/70 italic" : (m.change >= 0 ? "text-green-600" : "text-red-500")
              )}>
                {m.change >= 0 ? '+' : ''}{m.change}%
              </span>
              <span className={cn("text-[9px] uppercase tracking-widest font-black opacity-30", i === 3 && "opacity-20")}>Trajectory</span>
            </div>

            {/* Neural Sparkline Background Decoration */}
            <div className="absolute -bottom-2 left-0 right-0 h-10 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <svg viewBox="0 0 100 20" className="w-full h-full">
                <path d="M0,10 Q25,5 50,15 T100,5" fill="none" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Visualizations & AI Post Generator */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Primary Trajectory Graph */}
        <div className="xl:col-span-3 bg-white border border-lumina-border p-10 flex flex-col min-h-[550px] relative">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-serif italic text-lumina-text">Audience Growth Trajectory</h2>
                <div className="px-2 py-0.5 bg-lumina-bg text-lumina-silver text-[9px] font-black uppercase tracking-widest">Neural Mode</div>
              </div>
              <p className="text-xs text-lumina-muted uppercase tracking-[0.3em] font-bold">Predictive Resonance Analysis</p>
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex gap-4">
                {['24H', '7D', '30D', '90D'].map(t => (
                  <button key={t} className={cn(
                    "text-[10px] uppercase tracking-widest font-black transition-colors pb-1",
                    t === '7D' ? "text-lumina-text border-b-2 border-lumina-text" : "text-lumina-silver hover:text-lumina-text"
                  )}>{t}</button>
                ))}
              </div>
              <div className="h-4 w-[1px] bg-lumina-border" />
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-lumina-text/60 hover:text-lumina-text">
                <Globe className="w-3 h-3" /> Filters
              </button>
            </div>
          </div>
          
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={projectionData}>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E5E5E1" opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#70706B', fontSize: 11, fontWeight: 700 }} 
                  dy={15}
                />
                <YAxis hide />
                <RechartsTooltip 
                  cursor={{ stroke: '#1A1A1A', strokeWidth: 1 }}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #E5E5E1', color: '#1A1A1A', fontSize: '11px', fontWeight: 700, borderRadius: '0' }}
                />
                {/* Historical Area */}
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#1A1A1A" 
                  strokeWidth={3}
                  fill="url(#colorValue)" 
                  animationDuration={2000}
                />
                {/* Projected Momentum Line */}
                <Line
                  type="monotone"
                  dataKey="projection"
                  stroke="#A1A19A"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 4, fill: '#fff', stroke: '#A1A19A', strokeWidth: 2 }}
                  animationDuration={3000}
                />
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1A1A1A" stopOpacity={0.08}/>
                    <stop offset="95%" stopColor="#1A1A1A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Real-time Status Overlay */}
          <div className="mt-8 pt-8 border-t border-lumina-border flex justify-between items-center text-[10px] font-black uppercase tracking-[0.2em]">
            <div className="flex gap-8">
              <div className="flex items-center gap-2 text-green-600">
                <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse" />
                Live Ingestion Active
              </div>
              <div className="text-lumina-silver flex items-center gap-2">
                <Activity className="w-3 h-3" />
                Latency: 0.8ms
              </div>
            </div>
            <div className="text-lumina-muted italic font-serif normal-case tracking-normal">
              Projection confidence: <span className="font-bold text-lumina-text not-italic">94.2%</span>
            </div>
          </div>
        </div>

        {/* Neural Signal Sidebar */}
        <div className="bg-white border border-lumina-border p-10 flex flex-col min-h-[550px] space-y-10">
          <div>
            <h3 className="label-caps mb-6 !text-lumina-text">Live Neural Signal</h3>
            <div className="h-10 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={signalIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="text-[12px] font-serif italic text-lumina-muted leading-relaxed"
                >
                  {LIVE_SIGNALS[signalIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          <div className="flex-1">
            <PostGenerator platform={platform} />
          </div>
          
          <div className="pt-6 border-t border-lumina-border">
            <button 
              onClick={() => notify("High Fidelity Intel Export Synchronized.")}
              className="w-full py-4 bg-lumina-text text-white text-[11px] font-black uppercase tracking-widest hover:bg-black transition-colors flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-3.5 h-3.5" /> High Fidelity Export
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Insights Layer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="p-10 border border-lumina-border bg-white flex flex-col gap-8 group hover:border-lumina-text transition-colors">
          <div className="flex justify-between items-start">
            <h3 className="label-caps !text-lumina-text">Global Sentiment Matrix</h3>
            <span className="text-[10px] font-black uppercase tracking-widest text-green-600">Stable</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-6xl font-serif italic text-lumina-text tracking-tighter">{data.sentiment}</div>
            <div className="flex-1 h-1.5 bg-lumina-bg rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-lumina-text" 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 2, ease: "circOut" }}
              />
            </div>
          </div>
          <p className="text-sm font-serif italic text-lumina-muted leading-relaxed">
            The semantic field is highly positive. Resonance depth is currently at its zenith for the current quarter. Neural patterns suggest <span className="font-bold text-lumina-text not-italic">Universal Alignment</span>.
          </p>
        </div>

        <div className="p-10 border border-lumina-border bg-white flex flex-col gap-8 group hover:border-lumina-text transition-colors relative h-full">
          <div className="flex justify-between items-center">
            <h3 className="label-caps !text-lumina-text">Universal Truths Digest</h3>
            <button 
              onClick={() => {
                handleGenerateInsights();
                notify("Universal Neural Synchronizing in progress...");
              }}
              className="text-[10px] font-bold uppercase tracking-widest text-lumina-silver hover:text-lumina-text flex items-center gap-2 transition-colors"
            >
              <Zap className="w-3.5 h-3.5" /> Synchronize
            </button>
          </div>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div key="loading" className="space-y-6">
                <div className="h-3 bg-lumina-bg w-full animate-pulse" />
                <div className="h-3 bg-lumina-bg w-5/6 animate-pulse" />
                <div className="h-3 bg-lumina-bg w-4/6 animate-pulse" />
              </motion.div>
            ) : (
              <motion.div 
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[14px] font-serif italic leading-loose text-lumina-muted whitespace-pre-wrap"
              >
                {aiInsights?.split('\n').map((line, i) => {
                  const isBullet = line.trim().startsWith('*') || line.trim().startsWith('-');
                  return (
                    <p key={i} className={cn(
                      "mb-2",
                      isBullet ? "pl-4 relative before:content-['•'] before:absolute before:left-0" : "first:font-bold first:text-lumina-text first:mb-4"
                    )}>
                      {line.replace(/^[*-\s]+/, '').trim()}
                    </p>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-auto pt-6 flex items-center gap-3 overflow-hidden opacity-30 group-hover:opacity-100 transition-opacity">
             <div className="h-[1px] w-full bg-lumina-border" />
             <Lightbulb className="w-4 h-4 shrink-0 text-yellow-500" />
          </div>
        </div>

        <div className="bg-lumina-bg/20 border border-lumina-border p-10 flex flex-col gap-8 relative group overflow-hidden">
          <h3 className="label-caps !text-lumina-text">Architectural Status</h3>
          <div className="space-y-6">
            {[
              { label: 'Neural Throughput', value: '0.98' },
              { label: 'Extraction Integrity', value: 'High' },
              { label: 'Sync Consistency', value: '100%' },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-lumina-silver">{item.label}</span>
                <span className="text-xl font-serif italic text-lumina-text">{item.value}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] font-serif italic text-lumina-muted mt-auto leading-relaxed border-t border-lumina-border pt-6">
            Universal Intelligence Core is stable. Global resonance is within normal operational parameters for elite analytics.
          </p>
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
             <Globe className="w-40 h-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
