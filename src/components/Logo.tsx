import { Sparkles, Activity, Layers } from 'lucide-react';
import { motion } from 'motion/react';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-7 ${className} group cursor-pointer`}>
      <div className="relative">
        {/* The Core - Neural Intelligence Assembly */}
        <div className="relative w-16 h-16 bg-lumina-text flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.4)] transform transition-all duration-1000 group-hover:scale-110">
          {/* Animated Neural Core */}
          <div className="relative shrink-0 flex items-center justify-center">
            <div className="absolute w-8 h-8 border border-white/40 rounded-full animate-ping opacity-20" />
            <div className="absolute w-6 h-6 border border-white/60 rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,1)]" />
          </div>
          
          {/* Architectural Framing */}
          <div className="absolute inset-[3px] border border-white/10" />
          <div className="absolute inset-[6px] border border-white/5 invisible group-hover:visible transition-all" />
          
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50" />
        </div>
        
        {/* Version / Status Marker */}
        <div className="absolute -bottom-1 -right-1 bg-white border border-lumina-text px-1.5 py-0.5 shadow-lg">
          <p className="text-[7px] font-black uppercase tracking-[0.2em] leading-none">V4.X</p>
        </div>
      </div>
      
      <div className="flex flex-col">
        <div className="flex items-baseline gap-1">
          <h1 className="font-serif text-[42px] font-black tracking-[-0.12em] italic text-lumina-text leading-none select-none">
            OMNISCIENCE
          </h1>
        </div>
        <div className="flex items-center gap-4 mt-2 overflow-hidden">
          <div className="h-[0.5px] w-14 bg-lumina-text origin-left group-hover:scale-x-125 transition-transform duration-1000" />
          <p className="text-[7px] uppercase tracking-[0.8em] text-lumina-muted font-black whitespace-nowrap">Universal Neural Protocol</p>
        </div>
      </div>
    </div>
  );
}
