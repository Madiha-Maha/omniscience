import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Target, Zap, Clock, AlertCircle, Share2, Download } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ReferenceLine } from 'recharts';
import { cn } from '../lib/utils';

const BASE_FORECAST = [
  { day: 'Day 1', actual: 4000, forecast: 4000 },
  { day: 'Day 5', actual: 4500, forecast: 4600 },
  { day: 'Day 10', actual: 5120, forecast: 5000 },
  { day: 'Day 15', actual: 4800, forecast: 5400 },
  { day: 'Day 20', forecast: 6200 },
  { day: 'Day 25', forecast: 6800 },
  { day: 'Day 30', forecast: 7500 },
];

interface ForecastingViewProps {
  notify: (message: string) => void;
}

export default function ForecastingView({ notify }: ForecastingViewProps) {
  const [filter, setFilter] = React.useState('Standard');
  const [isAdopting, setIsAdopting] = React.useState(false);
  
  const getSimulatedData = () => {
    return BASE_FORECAST.map(d => {
      if (d.actual !== undefined && d.actual !== null) return d;
      const multiplier = filter === 'Bullish' ? 1.4 : filter === 'Bearish' ? 0.7 : 1;
      return { ...d, forecast: Math.round(d.forecast * multiplier) };
    });
  };

  const data = getSimulatedData();

  const handleAdopt = () => {
    setIsAdopting(true);
    notify("Neural Strategy ADOPTED. Adjusting content matrix...");
    setTimeout(() => {
      setIsAdopting(false);
      notify("Resonance matrix synchronized successfully.");
    }, 2000);
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-4xl font-serif font-bold italic text-lumina-text">Trajectorial <span className="text-lumina-silver">Forecasting</span></h2>
          <p className="text-lumina-muted font-serif italic mt-2 text-lg">AI-simulated outcomes and viral probability models for the next 30 days.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex bg-white border border-lumina-border p-1">
            {['Standard', 'Bullish', 'Bearish'].map(f => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all",
                  filter === f ? "bg-lumina-text text-white shadow-lg" : "text-lumina-silver hover:text-lumina-text"
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <button 
            onClick={() => notify("Trajectorial simulation model SHARED to nexus.")}
            className="px-6 py-2 border border-lumina-border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-lumina-bg transition-all"
          >
            <Share2 className="w-3 h-3" /> Share Model
          </button>
          <button 
            onClick={() => notify("Competitive intelligence EXPORTED. 1.2MB secure data.")}
            className="px-6 py-2 bg-lumina-text text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
          >
            <Download className="w-3 h-3" /> Export Intel
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-lumina-border p-8 min-h-[450px] flex flex-col">
            <div className="flex items-center justify-between mb-8">
              <h3 className="label-caps">Predictive Momentum: <span className="text-lumina-text">{filter}</span></h3>
              <div className="flex items-center gap-4 text-[10px] font-bold">
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-lumina-text" /> ACTUAL</span>
                <span className="flex items-center gap-1.5 text-lumina-silver"><div className="w-2 h-2 rounded-full bg-lumina-silver" /> SIMULATED</span>
              </div>
            </div>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E1" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#70706B', fontSize: 10, fontWeight: 700 }}
                  />
                  <YAxis hide />
                  <RechartsTooltip />
                  <ReferenceLine x="Day 15" stroke="#E5E5E1" label={{ position: 'top', value: 'Today', fill: '#A1A19A', fontSize: 10 }} />
                  <Line type="monotone" dataKey="actual" stroke="#1A1A1A" strokeWidth={3} dot={{ fill: '#1A1A1A', r: 4 }} activeDot={{ r: 6 }} connectNulls />
                  <Line type="monotone" dataKey="forecast" stroke="#A1A19A" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="p-8 bg-lumina-bg border border-lumina-border border-dashed space-y-3">
            <div className="flex items-center gap-2 text-lumina-text">
              <AlertCircle className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Model Confidence: 94.2%</span>
            </div>
            <p className="text-sm font-serif italic text-lumina-muted leading-relaxed">
              Forecasting suggests a significant variance starting Day 22 due to shifting market sentiment in the EMEA region. Recommend aggressive engagement on Day 18 to solidify the actual trajectory.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-lumina-border p-8 space-y-8">
            <h3 className="label-caps">Neural Probability</h3>
            <div className="space-y-6">
              {[
                { label: 'Viral Breakthrough', prob: 0.82, icon: Zap },
                { label: 'Audience Saturation', prob: 0.14, icon: Target },
                { label: 'Semantic Fatigue', prob: 0.04, icon: Clock },
              ].map((p, i) => (
                <div key={p.label} className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-lumina-muted">
                    <span className="flex items-center gap-2"><p.icon className="w-3.5 h-3.5" /> {p.label}</span>
                    <span className="text-lumina-text">{Math.round(p.prob * 100)}%</span>
                  </div>
                  <div className="h-1 bg-lumina-bg rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${p.prob * 100}%` }}
                      transition={{ delay: 0.5 + i * 0.2, duration: 1 }}
                      className="h-full bg-lumina-text"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-lumina-border p-8 space-y-4">
            <h3 className="label-caps">Suggested Strategy</h3>
            <div className="p-4 bg-lumina-bg border-l-2 border-lumina-text italic text-xs space-y-2">
              <p>"The current resonance window is narrow but deep. Shift your copy towards 'Ethereal Minimalism' to capture the Day 20-25 surge."</p>
            </div>
            <button 
              onClick={handleAdopt}
              disabled={isAdopting}
              className={cn(
                "w-full py-3 text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2",
                isAdopting 
                  ? "bg-lumina-silver text-white cursor-not-allowed" 
                  : "bg-lumina-text text-white hover:opacity-90"
              )}
            >
              <TrendingUp className={cn("w-4 h-4", isAdopting && "animate-pulse")} /> 
              {isAdopting ? 'Synchronizing...' : 'Adopt Simulation'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
