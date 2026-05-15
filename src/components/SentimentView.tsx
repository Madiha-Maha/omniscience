import React from 'react';
import { motion } from 'motion/react';
import { Heart, MessageSquare, TrendingUp, TrendingDown, RefreshCw, Zap, Sliders } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';

const SENTIMENT_TRAJECTORY = [
  { time: '00:00', positive: 65, negative: 12 },
  { time: '04:00', positive: 58, negative: 15 },
  { time: '08:00', positive: 72, negative: 10 },
  { time: '12:00', positive: 85, negative: 8 },
  { time: '16:00', positive: 78, negative: 14 },
  { time: '20:00', positive: 82, negative: 11 },
  { time: '23:59', positive: 75, negative: 9 },
];

interface SentimentViewProps {
  notify: (message: string) => void;
}

export default function SentimentView({ notify }: SentimentViewProps) {
  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h2 className="text-4xl font-serif font-bold italic text-lumina-text">Sentiment <span className="text-lumina-silver">Entropy</span></h2>
          <p className="text-lumina-muted font-serif italic mt-2 text-lg">Decoding the emotional resonance and semantic velocity of your narrative.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => notify("Sentiment Entropy Re-Synchronized with global feeds.")}
            className="px-6 py-2 border border-lumina-border text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-lumina-bg transition-all"
          >
            <RefreshCw className="w-3 h-3" /> Re-Sync
          </button>
          <button 
            onClick={() => notify("Neural Semantic Extraction complete. Matrix updated.")}
            className="px-6 py-2 bg-lumina-text text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
          >
            <Zap className="w-3 h-3" /> Neural Extract
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {[
          { label: 'Positive Resonance', value: '88.4%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Semantic Friction', value: '11.6%', icon: TrendingDown, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Interaction Depth', value: '4.2x', icon: MessageSquare, color: 'text-lumina-text', bg: 'bg-lumina-bg' },
          { label: 'Brand Affinity', value: '0.94', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-50' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 bg-white border border-lumina-border space-y-4"
          >
            <div className={stat.bg + " w-10 h-10 rounded-full flex items-center justify-center " + stat.color}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="label-caps !text-[10px] opacity-60">{stat.label}</p>
              <h3 className="text-3xl font-serif italic font-bold">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-lumina-border p-8 flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="label-caps">24H Semantic Trajectory</h3>
            <Sliders className="w-4 h-4 text-lumina-silver" />
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SENTIMENT_TRAJECTORY}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5E1" />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#70706B', fontSize: 10, fontWeight: 700 }}
                />
                <YAxis hide />
                <RechartsTooltip />
                <Area type="monotone" dataKey="positive" stroke="#1A1A1A" fill="#F5F5F0" strokeWidth={2} />
                <Area type="monotone" dataKey="negative" stroke="#E5E5E1" fill="transparent" strokeWidth={1} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-lumina-border overflow-hidden flex flex-col">
          <div className="p-8 bg-lumina-bg border-b border-lumina-border">
            <h3 className="label-caps">Top Response Archetypes</h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {[
              { text: "Ethereal Minimalism", count: "1,240 mentions", drift: "+12%" },
              { text: "Universal Truths", count: "890 mentions", drift: "+4%" },
              { text: "Neural Precision", count: "450 mentions", drift: "-2%" },
              { text: "Aesthetic Luxury", count: "320 mentions", drift: "+22%" },
              { text: "Digital Stoicism", count: "210 mentions", drift: "+1%" },
            ].map((topic, i) => (
              <div key={topic.text} className="p-6 border-b border-lumina-bg last:border-0 hover:bg-lumina-bg/50 transition-all flex justify-between items-center group cursor-default">
                <div>
                  <h4 className="text-sm font-serif italic text-lumina-text font-bold">{topic.text}</h4>
                  <p className="text-[10px] uppercase font-black tracking-widest text-lumina-silver mt-1">{topic.count}</p>
                </div>
                <span className={topic.drift.startsWith('+') ? 'text-green-600 text-[10px] font-bold' : 'text-red-500 text-[10px] font-bold'}>
                  {topic.drift}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
