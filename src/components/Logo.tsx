import { Sparkles, Activity, Layers } from 'lucide-react';
import { motion } from 'motion/react';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-6 ${className} group cursor-pointer`}>
      <div className="relative">
        {/* The Monolith - Multi-layered architectural icon */}
        <div className="relative w-14 h-14 bg-lumina-text flex items-center justify-center shadow-[20px_20px_60px_-15px_rgba(0,0,0,0.3)] transform transition-all duration-1000 group-hover:skew-y-3 group-hover:scale-105">
          <Layers className="text-white w-7 h-7" />
          
          {/* Internal data pulse */}
          <motion.div 
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-2 border border-white/30" 
          />
          
          {/* Orbital element */}
          <div className="absolute -inset-2 border-[0.5px] border-lumina-text/10 group-hover:rotate-180 transition-transform duration-[2000ms]" />
        </div>
        
        {/* Floating Intelligence marker */}
        <div className="absolute -top-2 -right-2 w-7 h-7 bg-white border border-lumina-text flex items-center justify-center shadow-xl">
          <Activity className="w-3.5 h-3.5 text-lumina-text" />
        </div>
      </div>
      
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <h1 className="font-serif text-4xl font-black tracking-[-0.1em] italic text-lumina-text leading-none">
            OMNISCIENCE
          </h1>
        </div>
        <div className="flex items-center gap-3 mt-2 overflow-hidden">
          <div className="h-[1px] w-12 bg-lumina-text origin-left group-hover:scale-x-150 transition-transform duration-700" />
          <p className="text-[8px] uppercase tracking-[0.6em] text-lumina-muted font-black whitespace-nowrap">Universal Neural Protocol</p>
        </div>
      </div>
    </div>
  );
}
