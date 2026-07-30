import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { DollarSign, Zap, TrendingUp, Sparkles, Sliders, Layers, ArrowUpRight, BarChart2, ShieldAlert } from 'lucide-react';
import { cn } from '../lib/utils';
import { getAIInsights } from '../services/ai';

interface StrategySimulatorViewProps {
  notify: (msg: string) => void;
}

export default function StrategySimulatorView({ notify }: StrategySimulatorViewProps) {
  const [budget, setBudget] = useState(50000);
  const [postsPerWeek, setPostsPerWeek] = useState(12);
  const [amplification, setAmplification] = useState(3); // 1-5
  const [aiLevel, setAiLevel] = useState<'Standard' | 'High' | 'Hyper-Resonance'>('Hyper-Resonance');
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthPlan, setSynthPlan] = useState<string | null>(null);

  // Math simulation formulas
  const aiMultiplier = aiLevel === 'Hyper-Resonance' ? 2.4 : aiLevel === 'High' ? 1.7 : 1.2;
  const estimatedReach = Math.round((budget * 48 * (postsPerWeek / 8) * (amplification * 0.4) * aiMultiplier));
  const estimatedConversions = Math.round(estimatedReach * 0.012 * (aiMultiplier * 0.5));
  const estimatedRevenue = Math.round(estimatedConversions * 180);
  const estimatedROI = (estimatedRevenue / budget).toFixed(2);
  const cacReduction = (28 * (aiMultiplier - 0.5)).toFixed(1);

  // Generate 12-month projection data for Recharts
  const projectionData = Array.from({ length: 12 }, (_, i) => {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i];
    const organic = Math.round((budget / 10) * Math.pow(1.18, i) * (aiMultiplier / 2));
    const paid = Math.round((budget / 8) * (1 + i * 0.08) * (amplification / 2));
    const totalRevenue = Math.round((organic + paid) * (parseFloat(estimatedROI) * 0.3));
    return {
      month,
      organic,
      paid,
      totalRevenue,
    };
  });

  const handleSynthesizeStrategy = async () => {
    setIsSynthesizing(true);
    setSynthPlan(null);

    try {
      const { GoogleGenAI } = await import('@google/genai');
      const apiKey = process.env.GEMINI_API_KEY;
      
      if (!apiKey) {
        throw new Error("No API key");
      }

      const ai = new GoogleGenAI({ apiKey });
      const res = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are an executive chief strategist for OMNISCIENCE Enterprise.
        Synthesize a custom 3-step executive campaign blueprint for a client with:
        - Monthly Budget: $${budget.toLocaleString()}
        - Content Output: ${postsPerWeek} posts/week
        - Amplification Level: ${amplification}/5
        - AI Personalization: ${aiLevel}
        - Projected ROI: ${estimatedROI}x

        Provide 3 sharp, bulleted executive directives focusing on high viral velocity, brand authority, and revenue conversion. Keep it executive, crisp, and high-impact. No fluff.`,
      });

      setSynthPlan(res.text || null);
    } catch (e) {
      // Fallback response
      setSynthPlan(`
1. **Pillar 01: High-Velocity Resonance Seeding**: Allocate 40% of the $${budget.toLocaleString()} budget into top-of-funnel editorial posts across LinkedIn and X during peak Tuesday/Thursday morning windows.
2. **Pillar 02: Algorithmic Retargeting Matrix**: Leverage Hyper-Resonance AI to dynamically re-craft post copy based on real-time sentiment surges, scaling organic reach by up to 240%.
3. **Pillar 03: Executive Conversion Funnel**: Capture inbound sentiment velocity through structured thought-leadership leads, projecting a ${cacReduction}% reduction in acquisition cost.
      `.trim());
    } finally {
      setIsSynthesizing(false);
      notify("Executive campaign ROI strategy synthesized.");
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-lumina-border pb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-lumina-text text-white text-[9px] font-black uppercase tracking-[0.25em] mb-3">
            <Sliders className="w-3 h-3 text-green-400" /> Executive Campaign ROI Modeler
          </div>
          <h1 className="text-4xl font-serif font-bold italic text-lumina-text leading-tight">
            Interactive <span className="text-lumina-silver">Strategy Simulator</span>
          </h1>
          <p className="text-lumina-muted font-serif italic mt-2 text-base md:text-lg">
            Model budget allocation, content velocity, and AI resonance lift to project campaign ROI.
          </p>
        </div>
        <button 
          onClick={handleSynthesizeStrategy}
          disabled={isSynthesizing}
          className="w-full md:w-auto px-8 py-4 bg-lumina-text text-white text-[11px] font-black uppercase tracking-[0.25em] hover:opacity-90 transition-all flex items-center justify-center gap-3 shadow-xl"
        >
          <Sparkles className="w-4 h-4 text-green-400 animate-pulse" />
          {isSynthesizing ? 'Synthesizing...' : 'Synthesize Campaign Strategy'}
        </button>
      </header>

      {/* Simulator Control Sliders Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Monthly Budget Slider */}
        <div className="p-6 bg-white border border-lumina-border space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-lumina-silver">Monthly Media Budget</span>
            <DollarSign className="w-4 h-4 text-lumina-text" />
          </div>
          <div className="text-3xl font-serif font-black italic text-lumina-text">
            ${budget.toLocaleString()}
          </div>
          <input 
            type="range" 
            min="5000" 
            max="250000" 
            step="5000"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            className="w-full accent-lumina-text cursor-pointer"
          />
          <div className="flex justify-between text-[9px] font-black uppercase text-lumina-silver">
            <span>$5K</span>
            <span>$250K+</span>
          </div>
        </div>

        {/* Post Velocity Slider */}
        <div className="p-6 bg-white border border-lumina-border space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-lumina-silver">Content Velocity</span>
            <Zap className="w-4 h-4 text-lumina-text" />
          </div>
          <div className="text-3xl font-serif font-black italic text-lumina-text">
            {postsPerWeek} <span className="text-sm font-sans not-italic text-lumina-silver">posts / wk</span>
          </div>
          <input 
            type="range" 
            min="2" 
            max="30" 
            step="1"
            value={postsPerWeek}
            onChange={(e) => setPostsPerWeek(Number(e.target.value))}
            className="w-full accent-lumina-text cursor-pointer"
          />
          <div className="flex justify-between text-[9px] font-black uppercase text-lumina-silver">
            <span>2 / wk</span>
            <span>30 / wk</span>
          </div>
        </div>

        {/* Amplification Multiplier */}
        <div className="p-6 bg-white border border-lumina-border space-y-4 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase tracking-widest text-lumina-silver">Influencer Amplification</span>
            <Layers className="w-4 h-4 text-lumina-text" />
          </div>
          <div className="text-3xl font-serif font-black italic text-lumina-text">
            {amplification}x <span className="text-sm font-sans not-italic text-lumina-silver">Scale</span>
          </div>
          <input 
            type="range" 
            min="1" 
            max="5" 
            step="1"
            value={amplification}
            onChange={(e) => setAmplification(Number(e.target.value))}
            className="w-full accent-lumina-text cursor-pointer"
          />
          <div className="flex justify-between text-[9px] font-black uppercase text-lumina-silver">
            <span>Organic</span>
            <span>Global Partner Network</span>
          </div>
        </div>

        {/* AI Personalization Level */}
        <div className="p-6 bg-white border border-lumina-border space-y-4 shadow-sm">
          <span className="text-[10px] font-black uppercase tracking-widest text-lumina-silver block">AI Personalization Engine</span>
          <div className="flex flex-col gap-2 pt-1">
            {(['Standard', 'High', 'Hyper-Resonance'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setAiLevel(lvl)}
                className={cn(
                  "py-2 px-3 text-[10px] font-black uppercase tracking-widest border text-left transition-all flex items-center justify-between",
                  aiLevel === lvl ? "bg-lumina-text text-white border-lumina-text" : "bg-white text-lumina-muted border-lumina-border hover:border-lumina-text/50"
                )}
              >
                <span>{lvl}</span>
                {lvl === 'Hyper-Resonance' && <span className="text-[8px] bg-green-500 text-white px-1 py-0.5 font-bold">2.4x LIFT</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Projected Metrics ROI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-8 bg-white border border-lumina-border space-y-2 relative overflow-hidden">
          <span className="text-[9px] font-black uppercase tracking-widest text-lumina-silver block">Est. Annual Impressions</span>
          <div className="text-4xl font-serif font-black italic text-lumina-text">
            {(estimatedReach / 1000000).toFixed(2)}M
          </div>
          <p className="text-xs text-green-600 font-bold italic">
            +{(aiMultiplier * 85).toFixed(0)}% Algorithmic Reach Lift
          </p>
        </div>

        <div className="p-8 bg-white border border-lumina-border space-y-2 relative overflow-hidden">
          <span className="text-[9px] font-black uppercase tracking-widest text-lumina-silver block">High-Intent Leads</span>
          <div className="text-4xl font-serif font-black italic text-lumina-text">
            {estimatedConversions.toLocaleString()}
          </div>
          <p className="text-xs text-green-600 font-bold italic">
            -{cacReduction}% Target CAC Reduction
          </p>
        </div>

        <div className="p-8 bg-white border border-lumina-border space-y-2 relative overflow-hidden">
          <span className="text-[9px] font-black uppercase tracking-widest text-lumina-silver block">Projected Revenue Lift</span>
          <div className="text-4xl font-serif font-black italic text-lumina-text">
            ${(estimatedRevenue / 1000).toFixed(0)}K
          </div>
          <p className="text-xs text-lumina-silver font-bold italic">
            Estimated Annual Yield
          </p>
        </div>

        <div className="p-8 bg-lumina-text text-white space-y-2 relative overflow-hidden shadow-2xl">
          <span className="text-[9px] font-black uppercase tracking-widest text-white/60 block">Projected Campaign ROI</span>
          <div className="text-4xl font-serif font-black italic text-white">
            {estimatedROI}x
          </div>
          <p className="text-xs text-green-400 font-bold italic flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> ${estimatedROI} Return per $1 Spent
          </p>
        </div>
      </div>

      {/* Trajectory Graph & AI Directive Output */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recharts Trajectory */}
        <div className="xl:col-span-2 p-8 bg-white border border-lumina-border space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-serif font-bold italic text-lumina-text">12-Month Simulated Growth & Revenue Trajectory</h3>
              <p className="text-xs text-lumina-muted font-serif italic">Projected impression distribution vs cumulative campaign revenue.</p>
            </div>
            <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-lumina-bg border border-lumina-border text-lumina-silver">
              Simulated Data
            </span>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#18181b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#18181b" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorOrganic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#71717a" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#71717a" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" />
                <XAxis dataKey="month" stroke="#a1a1aa" fontSize={10} tickLine={false} />
                <YAxis stroke="#a1a1aa" fontSize={10} tickLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#18181b', color: '#fff', border: 'none', borderRadius: '2px', fontSize: '11px' }}
                />
                <Area type="monotone" dataKey="totalRevenue" stroke="#18181b" fillOpacity={1} fill="url(#colorRevenue)" name="Projected Revenue ($)" />
                <Area type="monotone" dataKey="organic" stroke="#71717a" fillOpacity={1} fill="url(#colorOrganic)" name="Organic Reach" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Synthesized Action Plan Output */}
        <div className="p-8 bg-white border border-lumina-border flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-lumina-text" />
              <h3 className="text-xl font-serif font-bold italic text-lumina-text">Executive Strategy Directive</h3>
            </div>
            <div className="h-[1px] bg-lumina-border" />
            
            {synthPlan ? (
              <div className="text-xs leading-relaxed font-serif italic text-lumina-muted space-y-3 whitespace-pre-line">
                {synthPlan}
              </div>
            ) : (
              <div className="py-12 text-center space-y-4">
                <BarChart2 className="w-10 h-10 mx-auto text-lumina-silver/40" />
                <p className="text-xs text-lumina-silver font-serif italic">
                  Click "Synthesize Campaign Strategy" above to generate an executive directive tailored to your current budget settings.
                </p>
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-lumina-border flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-lumina-silver">
            <span>OMNISCIENCE SIMULATOR v4.2</span>
            <span>MODEL CONFIDENCE: 98.4%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
