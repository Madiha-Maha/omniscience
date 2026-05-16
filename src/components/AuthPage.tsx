import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { LogIn, Sparkles, UserPlus, Github } from 'lucide-react';
import Logo from './Logo';

export default function AuthPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      // Ensure we use popup as suggested by integration guidelines
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err: any) {
      console.error('Google Auth Error:', err);
      
      let errorMessage = err.message;
      
      if (err.code === 'auth/operation-not-allowed') {
        errorMessage = 'Authentication issue detected. Please check back in a few minutes while we calibrate the system.';
      } else if (err.code === 'auth/popup-blocked') {
        errorMessage = 'Sign-in popup was blocked. Please allow popups for this site in your browser settings.';
      } else if (err.code === 'auth/internal-error' || err.code === 'auth/network-request-failed') {
        errorMessage = 'Authentication failed. On mobile, please tap the "Open in new tab" icon (square with arrow) at the top right of the screen to complete synchronization.';
      } else if (err.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Authentication was cancelled. Pulse synchronization required to proceed.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white border border-lumina-border p-12 shadow-[80px_80px_160px_rgba(0,0,0,0.08)] flex flex-col items-center"
      >
        <div className="space-y-4 mb-12 text-center">
          <div className="mx-auto w-16 h-16 bg-lumina-text flex items-center justify-center mb-6">
            <LogIn className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-serif italic text-lumina-text">
            Access The Protocol.
          </h2>
          <p className="text-lumina-muted italic text-[11px] uppercase tracking-[0.3em]">Neural Identity Required</p>
        </div>

        <div className="w-full space-y-6">
          {error && (
            <div className="bg-red-50 border-l-2 border-red-500 p-4 mb-6">
              <p className="text-red-500 text-[10px] font-bold uppercase italic tracking-wider">
                System Error: {error}
              </p>
            </div>
          )}

          <button 
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-lumina-text text-white p-5 text-[12px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-4 hover:opacity-90 transition-all shadow-xl active:scale-[0.98]"
          >
            {loading ? (
              <span className="animate-pulse">Calibrating...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> 
                Synchronize via Google
              </>
            )}
          </button>
          
          <p className="text-[9px] text-lumina-silver text-center italic mt-8 max-w-[240px] mx-auto leading-relaxed">
            By synchronizing, you agree to the OMNISCIENCE neural data protocols and privacy directives.
          </p>
        </div>

        <div className="mt-12 h-[1px] w-12 bg-lumina-border" />
      </motion.div>
    </div>
  );
}
