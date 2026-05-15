import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Users, MapPin, Search, Filter, PieChart, Activity, TrendingUp, ArrowUpRight, Zap } from 'lucide-react';
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip as RechartsTooltip } from 'recharts';
import { cn } from '../lib/utils';

const AGE_DATA = [
  { name: '18-24', value: 35 },
  { name: '25-34', value: 45 },
  { name: '35-44', value: 12 },
  { name: '45+', value: 8 },
];

const COLORS = ['#1A1A1A', '#40403B', '#70706B', '#A1A19A', '#D1D1CB'];

const HOTSPOTS = [
  { id: 'ny', name: 'New York', x: 25, y: 35, density: 850, growth: '+12%', resonance: 0.94 },
  { id: 'ldn', name: 'London', x: 48, y: 32, density: 720, growth: '+8%', resonance: 0.88 },
  { id: 'tky', name: 'Tokyo', x: 85, y: 40, density: 950, growth: '+15%', resonance: 0.98 },
  { id: 'par', name: 'Paris', x: 50, y: 35, density: 580, growth: '-2%', resonance: 0.72 },
  { id: 'ber', name: 'Berlin', x: 53, y: 32, density: 490, growth: '+24%', resonance: 0.82 },
  { id: 'dub', name: 'Dubai', x: 65, y: 45, density: 420, growth: '+42%', resonance: 0.91 },
  { id: 'mum', name: 'Mumbai', x: 72, y: 48, density: 880, growth: '+18%', resonance: 0.85 },
  { id: 'sea', name: 'Seattle', x: 18, y: 30, density: 620, growth: '+5%', resonance: 0.89 },
];

interface AudienceViewProps {
  notify: (message: string) => void;
}

export default function AudienceView({ notify }: AudienceViewProps) {
  const [activeHotspot, setActiveHotspot] = useState<typeof HOTSPOTS[0] | null>(null);
  const [zoom, setZoom] = useState(1);

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-5xl font-serif font-black italic text-lumina-text tracking-tighter">Audience <span className="text-lumina-silver">Archetype</span></h2>
          <p className="text-lumina-muted font-serif italic mt-3 text-xl max-w-2xl leading-relaxed">High-density demographic mapping and neural identity synthesis. Visualizing the global resonance layer.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex bg-white border border-lumina-border p-1">
             <button onClick={() => setZoom(prev => Math.max(1, prev - 0.5))} className="px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-lumina-bg">-</button>
             <div className="w-[1px] bg-lumina-border" />
             <button onClick={() => setZoom(prev => Math.min(3, prev + 0.5))} className="px-4 py-2 text-[10px] font-black uppercase tracking-widest hover:bg-lumina-bg">+</button>
          </div>
          <button 
            onClick={() => notify("Recalibrating demographic depth parameters...")}
            className="px-8 py-3 bg-white border border-lumina-border text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:shadow-xl transition-all group"
          >
            <Filter className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" /> Depth parameters
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Geographic Distribution - Interactive Map */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-lumina-border p-10 min-h-[500px] flex flex-col relative overflow-hidden group">
            <div className="flex items-center justify-between mb-10 relative z-10">
              <div className="space-y-1">
                <h3 className="label-caps !text-lumina-text">Geographic Velocity Hotspots</h3>
                <p className="text-[10px] text-lumina-silver font-bold uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-ping" /> Live Density Feed
                </p>
              </div>
            </div>

            {/* Interactive SVG Map Visualizer */}
            <div className="flex-1 relative bg-[#FBFBF9] border border-lumina-border/30 rounded-sm cursor-crosshair overflow-hidden">
              <motion.div 
                className="w-full h-full relative origin-center"
                animate={{ scale: zoom }}
                transition={{ type: 'spring', stiffness: 50 }}
              >
                {/* Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '30px 30px' }} />
                
                <svg viewBox="0 0 100 60" className="w-full h-full opacity-60">
                  <path d="M15,20 Q20,10 30,15 T40,25 T30,40 T15,35 Z" fill="#E5E5E1" />
                  <path d="M45,15 Q55,10 65,15 T70,30 T60,45 T45,35 Z" fill="#E5E5E1" />
                  <path d="M75,40 Q85,45 90,40 T85,30 Z" fill="#E5E5E1" />
                </svg>

                {/* Hotspot Markers */}
                {HOTSPOTS.map((spot) => (
                  <motion.button
                    key={spot.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.2 }}
                    onMouseEnter={() => setActiveHotspot(spot)}
                    onMouseLeave={() => setActiveHotspot(null)}
                    className="absolute w-4 h-4 -ml-2 -mt-2 focus:outline-none group/spot"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  >
                    <div className="absolute inset-0 bg-lumina-text rounded-full opacity-20 animate-ping" />
                    <div className={cn(
                      "absolute inset-0 bg-lumina-text border-2 border-white rounded-full transition-all duration-300 shadow-lg",
                      activeHotspot?.id === spot.id && "bg-white border-lumina-text scale-150 shadow-2xl"
                    )} />
                  </motion.button>
                ))}
              </motion.div>

              {/* Precise Tooltip */}
              <AnimatePresence>
                {activeHotspot && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute z-20 pointer-events-none p-6 bg-lumina-text text-white shadow-2xl space-y-4 min-w-[240px] border border-white/10"
                    style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                  >
                    <div className="flex justify-between items-center border-b border-white/20 pb-4">
                      <div>
                        <span className="font-serif italic text-lg leading-none">{activeHotspot.name}</span>
                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/40 mt-1">Satellite View Active</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black uppercase tracking-widest block text-green-400">{activeHotspot.growth}</span>
                        <p className="text-[8px] font-black uppercase tracking-widest text-white/40">Velocity</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 pt-2">
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1 font-black">Density</p>
                        <p className="text-2xl font-serif italic">{activeHotspot.density}</p>
                      </div>
                      <div>
                        <p className="text-[9px] uppercase tracking-widest text-white/40 mb-1 font-black">Resonance</p>
                        <p className="text-2xl font-serif italic">{(activeHotspot.resonance * 100).toFixed(0)}%</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                       <span className="text-[8px] font-black uppercase tracking-widest text-white/40">Neural Sync Status</span>
                       <div className="flex gap-1">
                          {[1,2,3,4,5].map(i => (
                            <div key={i} className={cn("w-1 h-3", i <= (activeHotspot.resonance * 5) ? "bg-white" : "bg-white/20")} />
                          ))}
                       </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mt-8 flex justify-between items-baseline">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-lumina-silver block mb-2">Global Aggregate Status</span>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-lumina-text" />
                    <span className="text-3xl font-serif italic">12.2% <span className="text-sm not-italic font-bold tracking-tight">Growth Velocity</span></span>
                  </div>
                  <div className="h-8 w-[1px] bg-lumina-border" />
                  <div className="flex items-center gap-2">
                    <ArrowUpRight className="w-5 h-5 text-green-600" />
                    <span className="text-3xl font-serif italic">0.92 <span className="text-sm not-italic font-bold tracking-tight">Clarity Index</span></span>
                  </div>
                </div>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest border-b-2 border-lumina-text pb-1 hover:text-lumina-silver hover:border-lumina-silver transition-all">
                Export Raw Trajectory Data
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 border border-lumina-border bg-white space-y-6 group hover:border-lumina-text transition-colors">
              <div className="flex justify-between items-start">
                <Activity className="w-8 h-8 text-lumina-text" />
                <span className="text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-2 py-1">Optimal</span>
              </div>
              <h4 className="text-2xl font-serif italic">Peak Resonance Vector</h4>
              <p className="text-sm text-lumina-muted leading-relaxed font-serif italic">Engagement peaks consistently at <span className="font-bold text-lumina-text not-italic">14:00 GMT</span>. Neural metrics suggest 84% probability of maximal viral capture in this window.</p>
              <div className="pt-4 flex gap-1">
                {[40, 20, 60, 45, 90, 30, 70].map((h, i) => (
                  <div key={i} className="flex-1 bg-lumina-bg h-12 relative overflow-hidden">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      className="absolute bottom-0 w-full bg-lumina-text/20 group-hover:bg-lumina-text transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="p-10 border border-lumina-border bg-white space-y-6 group hover:border-lumina-text transition-colors">
              <div className="flex justify-between items-start">
                <MapPin className="w-8 h-8 text-lumina-text" />
                <span className="text-[10px] font-black uppercase tracking-widest text-lumina-silver border border-lumina-border px-2 py-1 italic">Emerging</span>
              </div>
              <h4 className="text-2xl font-serif italic">Regional Divergence</h4>
              <p className="text-sm text-lumina-muted leading-relaxed font-serif italic">Rapid growth detected in <span className="font-bold text-lumina-text not-italic">MENA Cluster</span>. Shift localization priority to 0.85 to capture early-adopter professional intent.</p>
              <div className="w-full h-1 bg-lumina-bg mt-4 overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-lumina-text" />
              </div>
            </div>
          </div>
        </div>

        {/* Demographic Breakdown */}
        <div className="space-y-6">
          <div className="bg-white border border-lumina-border p-10 space-y-10">
            <div className="flex justify-between items-center">
              <h3 className="label-caps">Neural Affinity: Age</h3>
              <Users className="w-4 h-4 text-lumina-silver" />
            </div>
            <div className="h-[280px] relative">
              <div className="absolute inset-0 border border-dashed border-lumina-border rounded-full scale-110 opacity-20" />
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={AGE_DATA}
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1500}
                  >
                    {AGE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </RePieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] font-black uppercase tracking-widest text-lumina-silver">Modality</span>
                <span className="text-3xl font-serif italic">Young Professional</span>
              </div>
            </div>
            <div className="space-y-4">
              {AGE_DATA.map((item, i) => (
                <div key={item.name} className="flex justify-between items-center group">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-none border border-lumina-text" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                    <span className="font-serif italic text-sm text-lumina-muted group-hover:text-lumina-text transition-colors">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-1 bg-lumina-bg rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${item.value}%` }} className="h-full bg-lumina-text opacity-40" />
                    </div>
                    <span className="font-bold text-xs">{item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-lumina-text text-white p-10 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Globe className="w-32 h-32" />
            </div>
            <Users className="w-10 h-10 text-white/50" />
            <div className="space-y-2">
              <h3 className="text-3xl font-serif italic">Archetype Protocol</h3>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Defined: The Efficient Elite</p>
            </div>
            <p className="text-sm text-white/80 leading-relaxed font-serif italic">
              Your primary audience persona is defined by a pursuit of professional optimization and aesthetic minimalism. They value speed, accuracy, and "Quiet Luxury" in digital communication.
            </p>
            <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Alignment Consistency</span>
                <span className="text-2xl font-serif italic">0.96</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Market Saturation</span>
                <span className="text-2xl font-serif italic">0.42</span>
              </div>
            </div>
            <button 
              onClick={() => notify("Targeted Broadcast Protocol INITIATED. Packet distribution: 1.4M nodes.")}
              className="w-full py-4 border border-white/20 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-lumina-text transition-all"
            >
              Initiate Targeted Broadcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
