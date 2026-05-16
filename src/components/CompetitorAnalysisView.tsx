import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Users, BarChart3, TrendingUp, Target, Plus, ShieldCheck, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

interface Competitor {
  id: string;
  name: string;
  reach: string;
  engagement: string;
  sentiment: number; // 0-100
  momentum: 'up' | 'stable' | 'down';
}

const INITIAL_COMPETITORS: Competitor[] = [
  { id: '1', name: 'Aether Group', reach: '2.4M', engagement: '5.2%', sentiment: 82, momentum: 'up' },
  { id: '2', name: 'Vertex Systems', reach: '890K', engagement: '3.1%', sentiment: 45, momentum: 'down' },
  { id: '3', name: 'Nova Protocol', reach: '5.1M', engagement: '4.8%', sentiment: 68, momentum: 'stable' },
];

export default function CompetitorAnalysisView({ notify }: { notify: (msg: string) => void }) {
  const [competitors, setCompetitors] = useState<Competitor[]>(INITIAL_COMPETITORS);

  const addCompetitor = () => {
    notify("Neural search initiated for new market entity.");
  };

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-4xl font-serif font-bold italic text-lumina-text">Market <span className="text-lumina-silver">Intelligence</span></h2>
          <p className="text-lumina-muted font-serif italic mt-2 text-lg">Detailed adversarial mapping and resonance comparison.</p>
        </div>
        <button 
          onClick={addCompetitor}
          className="bg-lumina-text text-white px-8 py-3 text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:opacity-90 transition-all shadow-xl"
        >
          <Plus className="w-4 h-4" /> Add Entity
        </button>
      </header>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3 space-y-8">
          <div className="bg-white border border-lumina-border overflow-hidden">
            <div className="p-6 border-b border-lumina-border flex items-center justify-between">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-lumina-text">Comparative Ledger</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[9px] font-bold text-lumina-muted">
                  <div className="w-2 h-2 bg-lumina-text rounded-full" /> User Entity
                </div>
                <div className="flex items-center gap-2 text-[9px] font-bold text-lumina-muted">
                  <div className="w-2 h-2 bg-lumina-silver rounded-full" /> Market Average
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-lumina-bg border-b border-lumina-border">
                    <th className="p-6 text-[9px] font-black uppercase tracking-widest text-lumina-silver">Adversarial Entity</th>
                    <th className="p-6 text-[9px] font-black uppercase tracking-widest text-lumina-silver">Reach Velocity</th>
                    <th className="p-6 text-[9px] font-black uppercase tracking-widest text-lumina-silver">Resonance Ratio</th>
                    <th className="p-6 text-[9px] font-black uppercase tracking-widest text-lumina-silver">Sentiment Score</th>
                    <th className="p-6 text-[9px] font-black uppercase tracking-widest text-lumina-silver flex justify-end">Market Delta</th>
                  </tr>
                </thead>
                <tbody>
                  {competitors.map((comp) => (
                    <tr key={comp.id} className="border-b border-lumina-border/50 hover:bg-lumina-bg/20 transition-colors">
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-1.5 h-1.5 bg-lumina-text rounded-full" />
                          <span className="text-[13px] font-serif font-bold italic tracking-wide">{comp.name}</span>
                        </div>
                      </td>
                      <td className="p-6 text-[12px] font-mono font-medium text-lumina-muted">{comp.reach}</td>
                      <td className="p-6 text-[12px] font-mono font-medium text-lumina-muted">{comp.engagement}</td>
                      <td className="p-6">
                        <div className="w-32 h-1.5 bg-lumina-bg rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${comp.sentiment}%` }}
                            className={cn(
                              "h-full rounded-full",
                              comp.sentiment > 70 ? "bg-green-500" : comp.sentiment > 40 ? "bg-lumina-text" : "bg-red-500"
                            )}
                          />
                        </div>
                      </td>
                      <td className="p-6 text-right">
                        <span className={cn(
                          "inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest",
                          comp.momentum === 'up' ? "text-green-600" : comp.momentum === 'down' ? "text-red-600" : "text-lumina-silver"
                        )}>
                          {comp.momentum === 'up' ? '▲ Gain' : comp.momentum === 'down' ? '▼ Loss' : '• Steady'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-lumina-border p-8 space-y-6">
              <div className="flex items-center justify-between">
                <Target className="w-5 h-5 text-lumina-text" />
                <span className="text-[9px] font-black uppercase tracking-widest text-lumina-silver">Market Authority</span>
              </div>
              <div>
                <h4 className="text-2xl font-serif font-bold italic text-lumina-text">Dominance Matrix</h4>
                <p className="text-[11px] text-lumina-muted mt-2 uppercase tracking-[0.2em] font-medium leading-relaxed">
                  Analyzing semantic overlap and audience migration patterns across competitive tiers.
                </p>
              </div>
              <div className="pt-6 border-t border-lumina-border">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-[10px] font-bold uppercase text-lumina-muted">Market Saturation</span>
                  <span className="font-mono text-xl text-lumina-text">74.2%</span>
                </div>
                <div className="w-full h-1 bg-lumina-bg rounded-full overflow-hidden">
                  <div className="w-[74%] h-full bg-lumina-text" />
                </div>
              </div>
            </div>

            <div className="bg-white border border-lumina-border p-8 space-y-6">
              <div className="flex items-center justify-between">
                <Zap className="w-5 h-5 text-lumina-text" />
                <span className="text-[9px] font-black uppercase tracking-widest text-lumina-silver">Tactical Edge</span>
              </div>
              <div>
                <h4 className="text-2xl font-serif font-bold italic text-lumina-text">Resonance Gap</h4>
                <p className="text-[11px] text-lumina-muted mt-2 uppercase tracking-[0.2em] font-medium leading-relaxed">
                  Identifying unexplored narratives where your entity holds a logical advantage.
                </p>
              </div>
              <div className="pt-6 border-t border-lumina-border flex gap-4">
                <div className="px-3 py-1.5 bg-lumina-bg border border-lumina-border text-[9px] font-black uppercase tracking-widest">Minimalist Luxury</div>
                <div className="px-3 py-1.5 bg-lumina-bg border border-lumina-border text-[9px] font-black uppercase tracking-widest">Neural Tech</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Recommendation Sidebar */}
        <aside className="space-y-8">
          <div className="bg-lumina-text text-white p-8 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck className="w-24 h-24 rotate-12" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-sm font-black uppercase tracking-[0.4em] mb-8 border-b border-white/20 pb-4">Strategy AI</h3>
              <div className="space-y-10">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-white/50 block mb-3">Primary Counter</label>
                  <p className="text-lg font-serif italic text-white leading-tight">Implement High-Frequency Semantic Shifts to disrupt Aether Group migration.</p>
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-white/50 block mb-3">Vulnerability Detected</label>
                  <p className="text-lg font-serif italic text-white leading-tight">Nova Protocol is scaling too rapidly; pivot to elite scarcity narratives.</p>
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest text-white/50 block mb-3">Market Recommendation</label>
                  <p className="text-lg font-serif italic text-white leading-tight">Consolidate reach within the 'Tech-Ethereal' audience segment.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-lumina-border p-8 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-lumina-text" />
              <h4 className="text-[11px] font-black uppercase tracking-widest">Yield Forecast</h4>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Market Conquest', val: '12%', status: '+' },
                { label: 'Adversarial Churn', val: '5.2%', status: '-' },
                { label: 'Resonance Synergy', val: '24%', status: '+' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center pb-3 border-b border-lumina-bg last:border-0 last:pb-0">
                  <span className="text-[10px] font-bold text-lumina-silver uppercase tracking-wider">{item.label}</span>
                  <span className={cn(
                    "font-mono text-sm font-bold",
                    item.status === '+' ? "text-green-600" : "text-red-500"
                  )}>{item.status}{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
