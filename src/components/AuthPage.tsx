import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import Logo from './Logo';

export default function AuthPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard', { replace: true });
    }, 300);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-lumina-bg flex flex-col items-center justify-center p-8 text-center">
      <div className="absolute top-8 left-8">
        <Logo />
      </div>

      <div className="max-w-md bg-white border border-lumina-border p-12 shadow-2xl flex flex-col items-center space-y-6">
        <div className="w-16 h-16 bg-lumina-text text-white flex items-center justify-center rounded-sm">
          <Sparkles className="w-8 h-8 text-green-400 animate-pulse" />
        </div>
        <h2 className="text-3xl font-serif italic text-lumina-text">OMNISCIENCE Enterprise</h2>
        <p className="text-xs text-lumina-silver font-black uppercase tracking-widest">Initialising Executive Console...</p>
        
        <button 
          onClick={() => navigate('/dashboard')}
          className="w-full bg-lumina-text text-white py-4 px-6 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-xl"
        >
          Launch Console <ArrowRight className="w-4 h-4 text-green-400" />
        </button>
      </div>
    </div>
  );
}
