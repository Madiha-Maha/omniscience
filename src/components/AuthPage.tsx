import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { LogIn, Sparkles, UserPlus, Github } from 'lucide-react';
import Logo from './Logo';

export default function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-lumina-bg flex items-center justify-center p-8">
      <div className="absolute top-8 left-8">
        <Link to="/">
          <Logo />
        </Link>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-lumina-border p-10 shadow-[60px_60px_120px_rgba(0,0,0,0.05)]"
      >
        <div className="space-y-2 mb-10">
          <h2 className="text-3xl font-serif italic text-lumina-text flex items-center gap-2">
            {mode === 'login' ? <LogIn className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
            {mode === 'login' ? 'Welcome Back.' : 'Create Account.'}
          </h2>
          <p className="text-lumina-muted italic text-sm">Experience the quintessence of digital analysis.</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-1">
            <label className="label-caps !text-[10px]">Credential Identity</label>
            <input 
              type="email" 
              placeholder="Email address"
              className="w-full bg-lumina-bg border border-lumina-border p-4 text-[13px] italic font-serif focus:outline-none focus:border-lumina-text transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <label className="label-caps !text-[10px]">Secure Key</label>
            <input 
              type="password" 
              placeholder="Password"
              className="w-full bg-lumina-bg border border-lumina-border p-4 text-[13px] italic font-serif focus:outline-none focus:border-lumina-text transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-[11px] font-bold uppercase italic tracking-wider bg-red-50 p-3 border-l-2 border-red-500">
              Protocol Error: {error}
            </p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-lumina-text text-white p-4 text-[12px] font-bold uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Processing...' : (mode === 'login' ? 'Initiate Session' : 'Establish Profile')}
          </button>
        </form>

        <div className="my-10 flex items-center gap-4">
          <div className="h-[1px] bg-lumina-border flex-1" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-lumina-silver">OR</span>
          <div className="h-[1px] bg-lumina-border flex-1" />
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleGoogleSignIn}
            className="w-full border border-lumina-border p-4 text-[12px] font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-lumina-bg transition-all"
          >
            <Sparkles className="w-4 h-4" /> Authenticate with Google
          </button>
        </div>

        <div className="mt-10 text-center">
          <p className="text-[11px] text-lumina-muted font-bold tracking-widest uppercase">
            {mode === 'login' ? 'First time in OMNISCIENCE?' : 'Already established?'}
            <Link 
              to={mode === 'login' ? '/register' : '/login'} 
              className="ml-2 text-lumina-text border-b border-lumina-text pb-0.5"
            >
              {mode === 'login' ? 'Create Profile' : 'Initiate Session'}
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
