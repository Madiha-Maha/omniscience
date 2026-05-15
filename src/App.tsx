import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Music2, 
  Search,
  LogOut,
  Sparkle,
  Activity
} from 'lucide-react';
import { cn } from './lib/utils';
import { Platform, AppState } from './types';
import { AuthProvider, useAuth } from './lib/AuthContext';
import { auth } from './lib/firebase';
import { signOut } from 'firebase/auth';

// Components
import LandingPage from './components/LandingPage';
import AuthPage from './components/AuthPage';
import DashboardView from './components/DashboardView';
import AudienceView from './components/AudienceView';
import SentimentView from './components/SentimentView';
import ForecastingView from './components/ForecastingView';
import ProfileView from './components/ProfileView';

const PLATFORMS: { id: Platform; name: string; icon: any; color: string }[] = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
  { id: 'twitter', name: 'Twitter / X', icon: Twitter, color: 'text-blue-400' },
  { id: 'tiktok', name: 'TikTok', icon: Music2, color: 'text-zinc-800' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700' },
];

const MOCK_DATA: any = {
  instagram: {
    metrics: [
      { label: 'Followers', value: '124.5K', change: 12.3 },
      { label: 'Engagement', value: '4.8%', change: -0.5 },
      { label: 'Reach', value: '2.1M', change: 24.1 },
      { label: 'Saves', value: '12.2K', change: 8.4 },
    ],
    engagementData: [
      { name: 'Mon', value: 400 }, { name: 'Tue', value: 300 }, { name: 'Wed', value: 600 },
      { name: 'Thu', value: 800 }, { name: 'Fri', value: 500 }, { name: 'Sat', value: 900 }, { name: 'Sun', value: 700 },
    ],
    sentiment: 'Positive',
  },
  twitter: {
    metrics: [
      { label: 'Followers', value: '45.2K', change: 2.1 },
      { label: 'Impressions', value: '890K', change: 15.4 },
      { label: 'Retweets', value: '5.4K', change: -2.3 },
      { label: 'Likes', value: '42.1K', change: 7.2 },
    ],
    engagementData: [
      { name: 'Mon', value: 200 }, { name: 'Tue', value: 500 }, { name: 'Wed', value: 300 },
      { name: 'Thu', value: 400 }, { name: 'Fri', value: 600 }, { name: 'Sat', value: 400 }, { name: 'Sun', value: 500 },
    ],
    sentiment: 'Neutral',
  },
  tiktok: {
    metrics: [
      { label: 'Followers', value: '312.8K', change: 45.2 },
      { label: 'Views', value: '14.5M', change: 82.1 },
      { label: 'Shares', value: '89K', change: 34.2 },
      { label: 'Comments', value: '12.4K', change: 12.1 },
    ],
    engagementData: [
      { name: 'Mon', value: 1200 }, { name: 'Tue', value: 1500 }, { name: 'Wed', value: 1800 },
      { name: 'Thu', value: 2400 }, { name: 'Fri', value: 2100 }, { name: 'Sat', value: 2800 }, { name: 'Sun', value: 2600 },
    ],
    sentiment: 'Excited',
  },
  linkedin: {
    metrics: [
      { label: 'Connections', value: '12.4K', change: 5.4 },
      { label: 'Post Reach', value: '45K', change: 12.8 },
      { label: 'Search App.', value: '1.2K', change: 2.1 },
      { label: 'Inbound Inq.', value: '42', change: 85.0 },
    ],
    engagementData: [
      { name: 'Mon', value: 100 }, { name: 'Tue', value: 120 }, { name: 'Wed', value: 150 },
      { name: 'Thu', value: 110 }, { name: 'Fri', value: 90 }, { name: 'Sat', value: 40 }, { name: 'Sun', value: 30 },
    ],
    sentiment: 'Professional',
  }
};

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
}

type ViewType = 'dashboard' | 'audience' | 'sentiment' | 'forecasting' | 'profile';

function Dashboard() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState<{ id: string; message: string }[]>([]);

  const notify = (message: string) => {
    const id = Math.random().toString(36).substring(7);
    setNotifications(prev => [...prev, { id, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const [platformSearch, setPlatformSearch] = useState('');
  const [profileData, setProfileData] = useState({
    name: 'Neural Analyst',
    email: user?.email || '',
    bio: 'Elite intelligence operative focused on universal resonance and semantic velocity.'
  });

  useEffect(() => {
    if (!user) return;
    
    // Load profile from Firestore
    const loadProfile = async () => {
      try {
        const { doc, getDoc } = await import('firebase/firestore');
        const { db } = await import('./lib/firebase');
        const docRef = doc(db, 'profiles', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProfileData(docSnap.data() as any);
        } else {
          // Initialize with default
          setProfileData(prev => ({ 
            ...prev, 
            email: user.email || '',
            name: user.displayName || 'Neural Analyst'
          }));
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };
    
    loadProfile();
  }, [user]);

  const [state, setState] = useState<AppState>({
    selectedPlatform: 'instagram',
    isLoading: false,
    aiInsights: null,
    postIdeas: [],
  });

  const data = MOCK_DATA[state.selectedPlatform];

  const filteredPlatforms = PLATFORMS.filter(p => 
    p.name.toLowerCase().includes(platformSearch.toLowerCase())
  );

  const handleSignOut = () => {
    signOut(auth);
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView platform={state.selectedPlatform} data={data} notify={notify} />;
      case 'audience': return <AudienceView notify={notify} />;
      case 'sentiment': return <SentimentView notify={notify} />;
      case 'forecasting': return <ForecastingView notify={notify} />;
      case 'profile': return <ProfileView profileData={profileData} setProfileData={setProfileData} notify={notify} />;
      default: return <DashboardView platform={state.selectedPlatform} data={data} notify={notify} />;
    }
  };

  return (
    <div className="min-h-screen h-screen flex flex-col bg-lumina-bg text-lumina-text font-sans overflow-hidden">
      {/* Top Navigation Bar */}
      <nav className="h-16 border-b border-lumina-border flex items-center justify-between px-8 bg-white shrink-0">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-2xl font-serif font-black tracking-[-0.1em] italic text-lumina-text cursor-pointer group flex items-baseline">
            OMNISCIENCE
            <span className="text-lumina-silver font-light not-italic ml-1 text-sm tracking-normal group-hover:text-lumina-text transition-colors">v4.</span>
          </Link>
          <div className="hidden md:flex gap-8 text-[13px] font-medium text-lumina-muted uppercase tracking-widest">
            {['Dashboard', 'Audience', 'Sentiment', 'Forecasting'].map((item) => (
              <button 
                key={item} 
                onClick={() => setCurrentView(item.toLowerCase() as ViewType)}
                className={cn(
                  "pb-5 mt-5 hover:text-lumina-text transition-all font-bold relative",
                  currentView === item.toLowerCase() ? "text-lumina-text" : "text-lumina-silver/60"
                )}
              >
                {item}
                {currentView === item.toLowerCase() && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-lumina-text"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-3 text-xs font-bold text-lumina-silver">
            <Search className="w-4 h-4" />
            <span className="cursor-pointer hover:text-lumina-text">PLATFORM SEARCH</span>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-lumina-muted hover:text-red-500 transition-colors"
          >
            <LogOut className="w-3 h-3" /> Exit Session
          </button>
          <div 
            onClick={() => setCurrentView('profile')}
            className={cn(
              "h-8 w-8 rounded-full border flex items-center justify-center text-[10px] font-bold cursor-pointer transition-all",
              currentView === 'profile' ? "bg-lumina-text text-white border-lumina-text" : "bg-lumina-border border-transparent hover:border-lumina-text"
            )}
          >
            {user?.email?.charAt(0).toUpperCase()}
          </div>
          <button className="bg-lumina-text text-white px-5 py-2 text-[12px] font-bold uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity">
            Export Intel
          </button>
        </div>
      </nav>

      <main className="flex-1 flex overflow-hidden relative">
        {/* Mobile Sidebar Toggle Button (Hidden on md+) */}
        <div className="md:hidden fixed bottom-6 left-6 z-[60]">
           <button 
             onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
             className="w-12 h-12 bg-lumina-text text-white rounded-full shadow-2xl flex items-center justify-center"
           >
             <div className="space-y-1">
               <div className="w-4 h-0.5 bg-white" />
               <div className="w-4 h-0.5 bg-white" />
             </div>
           </button>
        </div>

        {/* Left Sidebar */}
        <aside className={cn(
          "fixed inset-y-0 left-0 z-50 md:relative md:flex w-64 border-r border-lumina-border p-6 flex flex-col gap-8 bg-white overflow-y-auto shrink-0 transition-transform duration-300",
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}>
          <div>
            <h3 className="label-caps mb-4">Select Source</h3>
            <div className="mb-4 relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-lumina-silver" />
              <input 
                type="text" 
                placeholder="Search resonance nodes..."
                value={platformSearch}
                onChange={(e) => setPlatformSearch(e.target.value)}
                className="w-full bg-lumina-bg border border-lumina-border pl-9 pr-4 py-2 text-[11px] font-medium focus:outline-none focus:border-lumina-text transition-colors uppercase tracking-widest"
              />
            </div>
            <div className="flex flex-col gap-1">
              {filteredPlatforms.length > 0 ? (
                filteredPlatforms.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setState(s => ({ ...s, selectedPlatform: p.id }));
                      if (currentView === 'profile') setCurrentView('dashboard');
                      setMobileSidebarOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-3 w-full p-2.5 rounded-sm text-[13px] transition-all",
                      state.selectedPlatform === p.id 
                        ? "bg-lumina-bg font-bold italic font-serif" 
                        : "hover:bg-lumina-bg/50 text-lumina-muted"
                    )}
                  >
                    <p.icon className={cn("w-4 h-4", p.color)} />
                    <span>{p.name}</span>
                  </button>
                ))
              ) : (
                <p className="text-[10px] text-lumina-silver italic font-serif p-4">No neural nodes found for query.</p>
              )}
            </div>
          </div>

          <div className="mt-auto space-y-6">
            <div className="p-3 bg-lumina-bg rounded border border-lumina-border space-y-4">
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span>INTEL CONNECT</span>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <p className="text-[11px] leading-relaxed text-lumina-muted italic font-serif">
                Neural processing active. Extraction depth: High Fidelity.
              </p>
            </div>
            
            <div className="p-4 border border-dashed border-lumina-border rounded-sm bg-lumina-bg/20">
              <p className="text-[10px] font-black uppercase tracking-widest mb-2">System Tier</p>
              <div className="flex items-center gap-2">
                <Sparkle className="w-3 h-3 text-lumina-text" />
                <span className="text-[11px] font-serif italic text-lumina-text">OMNISCIENCE ELITE</span>
              </div>
            </div>
          </div>
        </aside>

        {/* View Scroll Area */}
        <div className="flex-1 overflow-y-auto bg-lumina-bg/20 custom-scrollbar">
          <div className="max-w-7xl mx-auto p-8 w-full">
            {renderView()}
          </div>
        </div>
      </main>

      {/* Notifications Portal */}
      <div className="fixed bottom-12 right-6 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="px-6 py-3 bg-lumina-text text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl border border-white/10 flex items-center gap-3"
            >
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              {n.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Footer / System Pulse */}
      <footer className="h-10 border-t border-lumina-border bg-white flex items-center justify-between px-8 text-[9px] font-black uppercase tracking-[0.3em] overflow-hidden shrink-0">
        <div className="flex gap-8 items-center">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-lumina-text italic">Neural Core: Optimal</span>
          </div>
          <div className="flex items-center gap-2 text-lumina-silver">
            <Search className="w-2.5 h-2.5" />
            <span>Scanning 4.2M Nodes/Sec</span>
          </div>
          <div className="flex items-center gap-2 text-lumina-silver">
            <Activity className="w-2.5 h-2.5" />
            <span>Resonance: 0.94 Sigma</span>
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <span className="hidden sm:inline text-lumina-silver">OMNISCIENCE ENTERPRISE v4.0.2</span>
          <div className="h-3 w-[1px] bg-lumina-border hidden sm:block" />
          <div className="flex gap-6 items-center italic text-lumina-muted">
            <span>{new Date().toISOString().split('T')[0]}</span>
            <span>Universal Intelligence Protocol v4.0.2</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage mode="login" />} />
          <Route path="/register" element={<AuthPage mode="register" />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
