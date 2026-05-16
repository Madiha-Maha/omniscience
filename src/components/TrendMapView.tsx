import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, MapPin, Activity, Zap, Info, ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

// Stylized geometric "World Map" nodes
const NODES = [
  { id: '1', name: 'NYC Hub', x: '25%', y: '35%', influence: 85, trend: 'Cyber-Brutalism', impact: '+12%' },
  { id: '2', name: 'London Node', x: '48%', y: '30%', influence: 72, trend: 'Neo-Gothic AI', impact: '+8%' },
  { id: '3', name: 'Tokyo Core', x: '85%', y: '40%', influence: 94, trend: 'Hyper-Minimal', impact: '+24%' },
  { id: '4', name: 'Berlin Grid', x: '51%', y: '28%', influence: 64, trend: 'Techno-Ethics', impact: '+4%' },
  { id: '5', name: 'Sidney Relay', x: '88%', y: '80%', influence: 41, trend: 'Eco-Luxury', impact: '+15%' },
  { id: '6', name: 'São Paulo Auth', x: '35%', y: '75%', influence: 58, trend: 'Solar-Punk', impact: '+10%' },
];

export default function TrendMapView({ notify }: { notify: (msg: string) => void }) {
  const [selectedNode, setSelectedNode] = useState(NODES[0]);

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-4xl font-serif font-bold italic text-lumina-text">Geographic <span className="text-lumina-silver">Resonance</span></h2>
          <p className="text-lumina-muted font-serif italic mt-2 text-lg">Real-time visualization of global narrative propagation.</p>
        </div>
        <div className="flex bg-white border border-lumina-border p-1">
          <button className="px-6 py-2 bg-lumina-text text-white text-[10px] font-black uppercase tracking-widest">Global Grid</button>
          <button className="px-6 py-2 text-lumina-silver text-[10px] font-black uppercase tracking-widest hover:text-lumina-text transition-colors">Resonance Heat</button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Interactive Map Component */}
        <div className="lg:col-span-2 bg-white border border-lumina-border p-8 min-h-[500px] relative overflow-hidden flex items-center justify-center">
          {/* Grid Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ 
            backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', 
            backgroundSize: '24px 24px' 
          }} />
          
          {/* Stylized Map Container */}
          <div className="relative w-full aspect-video max-w-3xl">
            {/* Connection Lines (Stylized) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
              <path d="M 25 35 L 48 30 L 85 40 M 48 30 L 51 28 M 35 75 L 25 35 M 88 80 L 85 40" 
                stroke="currentColor" fill="none" strokeWidth="0.5" 
                style={{ strokeDasharray: '4 4' }} className="text-lumina-text" 
              />
            </svg>

            {/* Nodes */}
            {NODES.map((node) => (
              <motion.button
                key={node.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => {
                  setSelectedNode(node);
                  notify(`Geographic focus shifted to ${node.name}.`);
                }}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500",
                  "flex items-center justify-center"
                )}
                style={{ left: node.x, top: node.y }}
              >
                <div className={cn(
                  "relative rounded-full transition-all duration-500",
                  selectedNode.id === node.id ? "w-12 h-12 border-4 border-lumina-text" : "w-6 h-6 border-2 border-lumina-silver/30 hover:border-lumina-text"
                )}>
                  <div className={cn(
                    "absolute inset-0 m-auto rounded-full transition-all",
                    selectedNode.id === node.id ? "w-2 h-2 bg-lumina-text" : "w-1.5 h-1.5 bg-lumina-silver"
                  )} />
                  {selectedNode.id === node.id && (
                    <motion.div 
                      layoutId="pulse"
                      className="absolute -inset-4 border border-lumina-text/20 rounded-full animate-ping"
                    />
                  )}
                </div>
                {selectedNode.id === node.id && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-14 bg-lumina-text text-white px-2 py-1 text-[8px] font-black uppercase tracking-wider whitespace-nowrap shadow-xl"
                  >
                    {node.name}
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>

          <div className="absolute bottom-8 left-8 flex items-center gap-4">
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-lumina-text rounded-full" />
               <span className="text-[9px] font-black uppercase tracking-widest text-lumina-text">Active Nodes</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-1.5 h-1.5 bg-lumina-silver/30 rounded-full" />
               <span className="text-[9px] font-black uppercase tracking-widest text-lumina-silver">Relay Points</span>
             </div>
          </div>
        </div>

        {/* Node Intelligence Data */}
        <aside className="space-y-8">
          <motion.div 
            key={selectedNode.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white border border-lumina-border p-10 flex flex-col gap-10 shadow-2xl"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <MapPin className="w-5 h-5 text-lumina-text" />
                <span className="text-[9px] font-black uppercase tracking-widest text-lumina-silver">Neural Origin</span>
              </div>
              <h3 className="text-4xl font-serif font-black italic text-lumina-text">{selectedNode.name}</h3>
            </div>

            <div className="grid grid-cols-2 gap-8 py-8 border-y border-lumina-bg">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-lumina-silver">Resonance Influence</label>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-serif italic text-lumina-text">{selectedNode.influence}</span>
                  <span className="text-xs font-mono text-lumina-muted">SIGMA</span>
                </div>
              </div>
              <div className="space-y-1 text-right">
                <label className="text-[9px] font-black uppercase tracking-widest text-lumina-silver">Growth Vector</label>
                <div className="flex items-baseline gap-1 justify-end font-mono text-green-600 font-bold">
                  <span className="text-2xl">{selectedNode.impact}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-widest text-lumina-silver">Dominant Local Narrative</label>
                <div className="bg-lumina-bg p-4 border-l-2 border-lumina-text">
                   <p className="text-xl font-serif italic text-lumina-text leading-tight">"{selectedNode.trend}"</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-lumina-text flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5" /> Propagation Log
                </h4>
                <div className="space-y-3">
                  {[
                    "Entity 'Lumina' resonance peaking in primary channels.",
                    "Market discourse shifting towards architectural scarcity.",
                    "Direct correlation found between Berlin and Tokyo nodes."
                  ].map((log, i) => (
                    <div key={i} className="flex gap-3 text-[11px] leading-relaxed text-lumina-muted italic font-serif">
                      <span className="text-lumina-silver font-mono shrink-0">[{i+1}]</span>
                      <p>{log}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button className="mt-4 w-full bg-lumina-text text-white py-4 text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl">
               Decrypt Full Node Intel <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>

          <div className="bg-lumina-bg border border-lumina-border p-6 flex items-start gap-4">
            <Info className="w-5 h-5 text-lumina-text shrink-0 mt-1" />
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-lumina-text">Global Synchronization</p>
              <p className="text-[11px] text-lumina-muted italic font-serif leading-relaxed">
                Nodes are updated every 420 seconds through the OMNISCIENCE universal ledger.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
