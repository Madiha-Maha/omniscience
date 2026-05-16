import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { LogIn, Sparkles, UserPlus, Github } from 'lucide-react';
import Logo from './Logo';
import { cn } from '../lib/utils';

export default function AuthPage() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isIframe = window.self !== window.top;

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
        errorMessage = 'Sign-in popup was blocked. Please allow popups for this site or open in a new tab.';
      } else if (err.code === 'auth/internal-error' || err.code === 'auth/network-request-failed') {
        errorMessage = 'Authentication inhibited by browser security. Use "Direct Access Mode" below to establish link.';
      } else if (err.code === 'auth/unauthorized-domain') {
        errorMessage = 'This domain is not yet authorized in Firebase. Using Neural Guest Mode is recommended for immediate access.';
      } else if (err.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Authentication was cancelled. Pulse synchronization required to proceed.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const openInNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  const handleGuestAccess = () => {
    sessionStorage.setItem('omniscience_bypass', 'true');
    navigate('/dashboard');
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
            <div className="bg-lumina-bg border border-lumina-border p-4 mb-6">
              <p className="text-lumina-text text-[10px] font-bold uppercase italic tracking-wider leading-relaxed">
                Notice: {error.includes('unauthorized-domain') ? 'Primary Node Restricted. Initiating Local Neural Protocol...' : error}
              </p>
            </div>
          )}

          <button 
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={cn(
              "w-full p-5 text-[12px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-4 transition-all shadow-xl active:scale-[0.98]",
              loading ? "bg-lumina-silver text-white cursor-not-allowed" : "bg-lumina-text text-white hover:opacity-90"
            )}
          >
            {loading ? (
              <span className="animate-pulse">Link Established...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" /> 
                Cloud Sync via Google
              </>
            )}
          </button>

          {/* Guest Access - Simplified and Reliable */}
          <div className="pt-4 border-t border-lumina-border mt-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-[1px] flex-1 bg-lumina-border"></div>
              <span className="text-[8px] font-black uppercase text-lumina-silver tracking-widest whitespace-nowrap">Local Link Protocol</span>
              <div className="h-[1px] flex-1 bg-lumina-border"></div>
            </div>

            <button 
              onClick={handleGuestAccess}
              className={cn(
                "w-full p-4 border-2 text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                error 
                  ? "bg-lumina-text text-white border-lumina-text shadow-lg animate-pulse" 
                  : "border-dashed border-lumina-border text-lumina-muted hover:text-lumina-text hover:border-lumina-text"
              )}
            >
              {error ? 'Proceed with Guest Access' : 'Enter as Neural Guest'}
            </button>
            <p className="text-[8px] text-lumina-silver text-center italic mt-2">
              Instant access. Neural data persists in local buffer.
            </p>
          </div>

          {/* Mobile/Iframe specific tools if needed */}
          {isIframe && !error && (
            <div className="pt-4 border-t border-lumina-border mt-4">
              <button 
                onClick={openInNewTab}
                className="w-full text-lumina-silver p-2 text-[9px] font-black uppercase tracking-widest hover:text-lumina-text transition-all"
              >
                Open in Direct View Mode
              </button>
            </div>
          )}
          
          <p className="text-[9px] text-lumina-silver text-center italic mt-8 max-w-[240px] mx-auto leading-relaxed">
            By synchronizing, you agree to the OMNISCIENCE neural data protocols and privacy directives.
          </p>
        </div>

        <div className="mt-12 h-[1px] w-12 bg-lumina-border" />
      </motion.div>
    </div>
  );
}
