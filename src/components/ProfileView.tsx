import React from 'react';
import { motion } from 'motion/react';
import { User, Settings, Shield, Bell, CreditCard, ChevronRight, LogOut, Key } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/AuthContext';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

interface ProfileViewProps {
  profileData: {
    name: string;
    email: string;
    bio: string;
  };
  setProfileData: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    bio: string;
  }>>;
  notify: (message: string) => void;
}

export default function ProfileView({ profileData, setProfileData, notify }: ProfileViewProps) {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    const { handleFirestoreError, OperationType } = await import('../lib/firestoreUtils');
    try {
      const { doc, setDoc } = await import('firebase/firestore');
      const { db } = await import('../lib/firebase');
      await setDoc(doc(db, 'profiles', user.uid), profileData);
      setIsEditing(false);
      notify("Neural identity synchronized with global ledger.");
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `profiles/${user.uid}`);
      notify("Neural sync failed. Integrity check required.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8 md:space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 text-left w-full">
        <div className="w-full">
          <h2 className="text-3xl md:text-4xl font-serif font-bold italic text-lumina-text leading-tight">Account <span className="text-lumina-silver">Quintessence</span></h2>
          <p className="text-lumina-muted font-serif italic mt-2 text-base md:text-lg">Manage your digital identity and neural access tokens.</p>
        </div>
        <button 
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          disabled={isSaving}
          className={cn(
            "w-full md:w-auto px-8 py-3 bg-lumina-text text-white text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2",
            isSaving && "opacity-50 cursor-not-allowed"
          )}
        >
          {isSaving ? 'Processing...' : (isEditing ? 'Save neural data' : 'Modify resonance profile')}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1 bg-white border border-lumina-border p-8 space-y-6"
        >
          <div className="w-24 h-24 rounded-full bg-lumina-bg border border-lumina-border flex items-center justify-center mx-auto text-3xl font-serif italic text-lumina-text">
            {profileData.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-center space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <input 
                  type="text" 
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full bg-lumina-bg p-3 font-serif italic text-lg text-center focus:outline-none"
                />
                <textarea 
                  value={profileData.bio}
                  onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full bg-lumina-bg p-3 font-serif italic text-sm text-center focus:outline-none h-24"
                />
              </div>
            ) : (
              <>
                <h3 className="text-xl font-serif font-bold italic">{profileData.name}</h3>
                <p className="text-xs text-lumina-silver font-black uppercase tracking-widest">{profileData.email}</p>
                <p className="text-sm text-lumina-muted font-serif italic leading-relaxed px-4">{profileData.bio}</p>
              </>
            )}
          </div>
          <div className="pt-6 border-t border-lumina-bg space-y-4">
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
              <span className="text-lumina-silver">Membership Tier</span>
              <span className="text-lumina-text italic">Omniscience Elite</span>
            </div>
            <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
              <span className="text-lumina-silver">Neural Credits</span>
              <span className="text-lumina-text">14,240 / 50K</span>
            </div>
          </div>
        </motion.div>

        {/* Options Grid */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-lumina-border p-8 mb-6">
            <h3 className="label-caps mb-6">Neural Preference Engine</h3>
            <div className="space-y-6">
              {[
                { label: 'Psychographic Depth', level: 'High Fidelity', progress: 85 },
                { label: 'Semantic Velocity Extraction', level: 'High', progress: 92 },
                { label: 'Real-time Sentiment Processing', level: 'Active', progress: 100 },
              ].map((pref) => (
                <div key={pref.label} className="space-y-2">
                  <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest text-lumina-muted">
                    <span>{pref.label}</span>
                    <span className="text-lumina-text italic">{pref.level}</span>
                  </div>
                  <div className="h-1 bg-lumina-bg rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${pref.progress}%` }}
                      className="h-full bg-lumina-text"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { icon: User, title: 'Identity Synthesis', desc: 'Sync your physical presence with the digital cloud.' },
              { icon: Shield, title: 'Vault Protocols', desc: 'Manage 2FA, biometric bypass, and ledger keys.' },
              { icon: Bell, title: 'Resonance Notifications', desc: 'Configure trigger points for automated brain-bursts.' },
              { icon: CreditCard, title: 'Neural Subscription', desc: 'Elevate your intelligence tier via monthly tokens.' },
              { icon: Key, title: 'Integration Tokens', desc: 'Universal connection strings for external node access.' },
              { icon: Settings, title: 'Visual Frequency', desc: 'Adjust UI density, chromaticity, and font resonance.' },
            ].map((option, i) => (
              <motion.button
                key={option.title}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-6 bg-white border border-lumina-border hover:bg-lumina-bg transition-all group text-left"
              >
                <div className="w-10 h-10 rounded-full border border-lumina-border flex items-center justify-center shrink-0 group-hover:bg-lumina-text group-hover:text-white transition-all">
                  <option.icon className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold uppercase tracking-widest flex items-center justify-between">
                    {option.title} <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h4>
                  <p className="text-xs text-lumina-muted italic font-serif leading-relaxed line-clamp-2">{option.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>

          <button 
            onClick={() => {
              signOut(auth);
              notify("Session terminating. Clearing neural cache...");
            }}
            className="w-full mt-6 py-4 bg-red-50 text-red-600 border border-red-100 text-[11px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-red-600 hover:text-white transition-all"
          >
            <LogOut className="w-4 h-4" /> Terminate Active Session
          </button>
        </div>
      </div>
    </div>
  );
}
