import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, UserPlus, LogIn, TrendingUp, Cpu, Globe } from 'lucide-react';
import Logo from './Logo';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-lumina-bg overflow-x-hidden">
      {/* Navigation */}
      <nav className="h-20 flex items-center justify-between px-8 md:px-16 bg-white/50 backdrop-blur-md border-b border-lumina-border sticky top-0 z-50">
        <Logo />
        <div className="flex gap-4">
          <Link to="/login" className="px-6 py-2 text-[12px] font-bold uppercase tracking-widest text-lumina-muted hover:text-lumina-text transition-colors flex items-center gap-2">
            <LogIn className="w-4 h-4" /> Login
          </Link>
          <Link to="/register" className="bg-lumina-text text-white px-6 py-2 text-[12px] font-bold uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity flex items-center gap-2">
            <UserPlus className="w-4 h-4" /> Join Nexus
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block px-4 py-1.5 rounded-full border border-lumina-border bg-white text-[10px] font-black uppercase tracking-[0.3em] text-lumina-silver"
          >
            The Future of Social Intelligence
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-serif font-bold italic leading-tight text-lumina-text"
          >
            Decoding <br/> <span className="text-zinc-400">Digital</span> Resonance.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-lumina-muted font-serif italic max-w-xl leading-relaxed"
          >
            OMNISCIENCE is the world's most sophisticated social analytics suite. 
            We use high-fidelity neural patterns to transform raw data into <b>universal truths</b>.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Link to="/register" className="bg-lumina-text text-white px-10 py-5 text-[14px] font-bold uppercase tracking-widest rounded-sm hover:translate-y-[-2px] transition-all shadow-2xl flex items-center justify-center gap-3">
              Commence Experience <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="border border-lumina-text px-10 py-5 text-[14px] font-bold uppercase tracking-widest hover:bg-lumina-bg transition-all flex items-center justify-center gap-2">
              View Lexicon
            </button>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="flex-1 relative"
        >
          <div className="relative z-10 bg-white border border-lumina-border p-8 shadow-[60px_60px_100px_rgba(0,0,0,0.05)] rounded-sm">
            <div className="space-y-6">
              <div className="h-2 w-12 bg-lumina-text rounded-full" />
              <div className="text-4xl font-serif italic">98.2% Accuracy</div>
              <div className="space-y-2">
                <div className="h-4 bg-lumina-bg rounded w-full" />
                <div className="h-4 bg-lumina-bg rounded w-5/6" />
                <div className="h-4 bg-lumina-bg rounded w-4/6" />
              </div>
              <div className="pt-4 flex justify-between items-end">
                <span className="text-[10px] font-black uppercase tracking-widest">Neural Pulse</span>
                <Sparkles className="w-8 h-8 text-lumina-text animate-pulse" />
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-zinc-200 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-zinc-400 rounded-full blur-3xl opacity-20" />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white border-y border-lumina-border px-8 md:px-16 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="label-caps mb-16 text-center">Unparalleled Capabilities</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Cpu, title: "Neural Synthesis", desc: "Our proprietary AI doesn't just read data; it understands the emotional subtext of every interaction." },
              { icon: Globe, title: "Universal Access", desc: "Seamlessly integrate with Instagram, X, TikTok, and LinkedIn via a single high-density encryption portal." },
              { icon: TrendingUp, title: "Viral Forecasting", desc: "Predict content trajectory with 94.2% precision before you even hit publish." }
            ].map((f, i) => (
              <motion.div 
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="space-y-6 p-8 hover:bg-lumina-bg transition-colors rounded-sm group"
              >
                <div className="w-16 h-16 border border-lumina-border flex items-center justify-center rounded-full group-hover:bg-white transition-all">
                  <f.icon className="w-8 h-8 text-lumina-text" />
                </div>
                <h3 className="text-2xl font-serif italic">{f.title}</h3>
                <p className="text-lumina-muted leading-relaxed font-serif italic text-lg">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Description */}
      <section className="py-32 px-8 md:px-16 max-w-5xl mx-auto text-center space-y-12">
        <h3 className="text-4xl md:text-6xl font-serif font-bold italic leading-tight opacity-90">
          "The best analytic tool ever built. A masterpiece of design and intelligence."
        </h3>
        <p className="text-lumina-muted text-xl max-w-2xl mx-auto font-serif italic">
          Every pixel and neuron in OMNISCIENCE's architecture is meticulously crafted for the elite analyst. 
          Experience a level of clarity that was previously thought impossible.
        </p>
        <div className="flex justify-center gap-1">
          {[1,2,3,4,5].map(i => <Sparkles key={i} className="w-5 h-5 text-lumina-text" />)}
        </div>
      </section>

      <footer className="py-12 border-t border-lumina-border bg-white px-8 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8">
        <Logo className="opacity-50 grayscale" />
        <div className="flex gap-12 label-caps text-[10px]">
          <a href="#" className="hover:text-lumina-text transition-colors">Lexicon</a>
          <a href="#" className="hover:text-lumina-text transition-colors">Protocols</a>
          <a href="#" className="hover:text-lumina-text transition-colors">Privacy</a>
        </div>
      </footer>
    </div>
  );
}
