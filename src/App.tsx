import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  Music2, 
  Youtube,
  AtSign,
  MessageSquare,
  Pin,
  Facebook,
  Globe,
  Search,
  Sparkles,
  Activity,
  Sliders,
  FileText,
  RefreshCw,
  Eye,
  SlidersHorizontal,
  Compass,
  LayoutDashboard
} from 'lucide-react';
import { cn } from './lib/utils';
import { Platform, AppState, PlatformData } from './types';
import { AuthProvider, useAuth } from './lib/AuthContext';

// Components
import LandingPage from './components/LandingPage';
import DashboardView from './components/DashboardView';
import AudienceView from './components/AudienceView';
import SentimentView from './components/SentimentView';
import ForecastingView from './components/ForecastingView';
import ProfileView from './components/ProfileView';
import SavedIntelView from './components/SavedIntelView';
import CompetitorAnalysisView from './components/CompetitorAnalysisView';
import TrendMapView from './components/TrendMapView';
import StrategySimulatorView from './components/StrategySimulatorView';
import ExecutiveReportModal from './components/ExecutiveReportModal';

const PLATFORMS: { id: Platform; name: string; icon: any; color: string }[] = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
  { id: 'twitter', name: 'Twitter / X', icon: Twitter, color: 'text-blue-400' },
  { id: 'tiktok', name: 'TikTok', icon: Music2, color: 'text-zinc-800' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700' },
  { id: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-600' },
  { id: 'threads', name: 'Threads', icon: AtSign, color: 'text-zinc-900' },
  { id: 'reddit', name: 'Reddit', icon: MessageSquare, color: 'text-orange-600' },
  { id: 'pinterest', name: 'Pinterest', icon: Pin, color: 'text-red-500' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
  { id: 'bluesky', name: 'Bluesky', icon: Globe, color: 'text-sky-500' },
];

const MOCK_DATA: Record<Platform, PlatformData> = {
  instagram: {
    metrics: [
      { label: 'Followers', value: '124.5K', change: 12.3, description: 'Organic growth velocity' },
      { label: 'Engagement Rate', value: '4.8%', change: 1.2, description: 'Saves & comments ratio' },
      { label: 'Reels Reach', value: '2.1M', change: 24.1, description: 'Viral discovery reach' },
      { label: 'Saves Velocity', value: '12.2K', change: 8.4, description: 'High-intent bookmarks' },
    ],
    engagementData: [
      { name: 'Mon', value: 420 }, { name: 'Tue', value: 380 }, { name: 'Wed', value: 650 },
      { name: 'Thu', value: 890 }, { name: 'Fri', value: 540 }, { name: 'Sat', value: 920 }, { name: 'Sun', value: 780 },
    ],
    sentiment: 'Positive (88.4%)',
    topPosts: [
      { id: '1', content: 'Architectural Resonance in Modern Branding: Less noise, more structural clarity.', engagement: '18.4K likes' },
      { id: '2', content: 'The Minimalist Manifesto for 2026: Stripping away the ephemeral.', engagement: '14.2K likes' }
    ]
  },
  twitter: {
    metrics: [
      { label: 'Followers', value: '88.2K', change: 14.1, description: 'Executive opinion leaders' },
      { label: 'Impressions', value: '1.89M', change: 32.4, description: 'Algorithmic thread reach' },
      { label: 'Retweet Ratio', value: '8.4K', change: 12.3, description: 'Viral quote distribution' },
      { label: 'Bookmark Index', value: '42.1K', change: 17.2, description: 'Knowledge saves' },
    ],
    engagementData: [
      { name: 'Mon', value: 620 }, { name: 'Tue', value: 950 }, { name: 'Wed', value: 830 },
      { name: 'Thu', value: 1140 }, { name: 'Fri', value: 760 }, { name: 'Sat', value: 540 }, { name: 'Sun', value: 680 },
    ],
    sentiment: 'Positive (82.1%)',
    topPosts: [
      { id: '1', content: '1/10: Why AI-native agencies will outperform traditional holding companies by 10x.', engagement: '4.2K retweets' },
      { id: '2', content: 'Retention is the ultimate moat. 3 steps to build high-friction brand loyalty.', engagement: '2.8K retweets' }
    ]
  },
  tiktok: {
    metrics: [
      { label: 'Followers', value: '412.8K', change: 45.2, description: 'Gen-Z & Millennial cohort' },
      { label: 'Video Views', value: '18.5M', change: 82.1, description: '30-day view velocity' },
      { label: 'Sound Re-uses', value: '89K', change: 34.2, description: 'Brand audio adoption' },
      { label: 'Shares / DMs', value: '34.4K', change: 28.1, description: 'Dark social virality' },
    ],
    engagementData: [
      { name: 'Mon', value: 1200 }, { name: 'Tue', value: 1500 }, { name: 'Wed', value: 1800 },
      { name: 'Thu', value: 2400 }, { name: 'Fri', value: 2100 }, { name: 'Sat', value: 2800 }, { name: 'Sun', value: 2600 },
    ],
    sentiment: 'Hyped / Viral (94.2%)',
    topPosts: [
      { id: '1', content: 'Behind the scenes of our 7-figure AI strategy launch.', engagement: '1.2M views' },
      { id: '2', content: 'How we synthesized a viral campaign in under 12 minutes.', engagement: '890K views' }
    ]
  },
  linkedin: {
    metrics: [
      { label: 'Executive Base', value: '34.4K', change: 18.4, description: 'C-Suite & Founder network' },
      { label: 'Organic Reach', value: '450K', change: 22.8, description: 'B2B thought leadership' },
      { label: 'Search App.', value: '8.2K', change: 12.1, description: 'Inbound brand discovery' },
      { label: 'Inbound Leads', value: '142', change: 85.0, description: 'High-ticket agency leads' },
    ],
    engagementData: [
      { name: 'Mon', value: 300 }, { name: 'Tue', value: 620 }, { name: 'Wed', value: 750 },
      { name: 'Thu', value: 810 }, { name: 'Fri', value: 490 }, { name: 'Sat', value: 140 }, { name: 'Sun', value: 130 },
    ],
    sentiment: 'Professional & Elite (91.0%)',
    topPosts: [
      { id: '1', content: 'The shift from vanity metrics to neural resonance in corporate strategy.', engagement: '1.4K reactions' },
      { id: '2', content: 'Why we turned down $2M in venture capital to build an independent engine.', engagement: '2.1K reactions' }
    ]
  },
  youtube: {
    metrics: [
      { label: 'Subscribers', value: '94.2K', change: 8.4, description: 'Long-form dedicated audience' },
      { label: 'Watch Time (Hrs)', value: '124K', change: 19.2, description: 'High retention depth' },
      { label: 'Average CTR', value: '8.4%', change: 2.1, description: 'Thumbnail & title velocity' },
      { label: 'Shorts Views', value: '4.8M', change: 54.1, description: 'Algorithmic shelf discovery' },
    ],
    engagementData: [
      { name: 'Mon', value: 800 }, { name: 'Tue', value: 920 }, { name: 'Wed', value: 1100 },
      { name: 'Thu', value: 1450 }, { name: 'Fri', value: 1300 }, { name: 'Sat', value: 2100 }, { name: 'Sun', value: 1950 },
    ],
    sentiment: 'Highly Engaged (89.5%)',
    topPosts: [
      { id: '1', content: 'Full Masterclass: Building an AI Social Media Empire from scratch.', engagement: '240K views' },
      { id: '2', content: 'Deep Dive into Neural Brand Architecture [4K Case Study]', engagement: '180K views' }
    ]
  },
  threads: {
    metrics: [
      { label: 'Followers', value: '62.8K', change: 28.4, description: 'Cross-Instagram sync base' },
      { label: 'Repost Ratio', value: '14.2K', change: 42.1, description: 'Conversational virality' },
      { label: 'Engagement Rate', value: '6.4%', change: 5.2, description: 'Text-first replies' },
      { label: 'Virality Score', value: '92.4', change: 14.0, description: 'Neural cluster reach' },
    ],
    engagementData: [
      { name: 'Mon', value: 500 }, { name: 'Tue', value: 720 }, { name: 'Wed', value: 890 },
      { name: 'Thu', value: 1050 }, { name: 'Fri', value: 840 }, { name: 'Sat', value: 980 }, { name: 'Sun', value: 820 },
    ],
    sentiment: 'Conversational (86.2%)',
    topPosts: [
      { id: '1', content: 'Hot take: The best marketing looks like high-level journalism, not ads.', engagement: '3.4K replies' },
      { id: '2', content: 'What is one design detail that instantly elevates a software product?', engagement: '1.8K replies' }
    ]
  },
  reddit: {
    metrics: [
      { label: 'Community Karma', value: '148.2K', change: 15.4, description: 'Thought authority status' },
      { label: 'Upvote Ratio', value: '96.2%', change: 1.8, description: 'Subreddit sentiment approval' },
      { label: 'Crossposts', value: '3.4K', change: 24.0, description: 'Organic community shares' },
      { label: 'Active Threads', value: '42', change: 32.1, description: 'Ongoing AMA & discussions' },
    ],
    engagementData: [
      { name: 'Mon', value: 700 }, { name: 'Tue', value: 850 }, { name: 'Wed', value: 1200 },
      { name: 'Thu', value: 1350 }, { name: 'Fri', value: 1100 }, { name: 'Sat', value: 1600 }, { name: 'Sun', value: 1400 },
    ],
    sentiment: 'Authentic & Respected (92.8%)',
    topPosts: [
      { id: '1', content: 'AMA: How we engineered a predictive social intelligence platform in 2026.', engagement: '2.4K upvotes' },
      { id: '2', content: 'Comprehensive breakdown of modern AI marketing frameworks [OC]', engagement: '1.9K upvotes' }
    ]
  },
  pinterest: {
    metrics: [
      { label: 'Monthly Viewers', value: '1.2M', change: 38.4, description: 'Aesthetic moodboard reach' },
      { label: 'Pin Saves', value: '84.2K', change: 19.1, description: 'Visual intent bookmarks' },
      { label: 'Outbound Clicks', value: '28.4K', change: 22.4, description: 'Direct site traffic' },
      { label: 'Board Feature Rate', value: '4.8K', change: 14.2, description: 'Curator collection adds' },
    ],
    engagementData: [
      { name: 'Mon', value: 900 }, { name: 'Tue', value: 1100 }, { name: 'Wed', value: 1300 },
      { name: 'Thu', value: 1250 }, { name: 'Fri', value: 1400 }, { name: 'Sat', value: 2200 }, { name: 'Sun', value: 2400 },
    ],
    sentiment: 'Aesthetic & Inspiring (96.0%)',
    topPosts: [
      { id: '1', content: 'Minimalist Editorial Layout Inspiration 2026 Board', engagement: '12.4K saves' },
      { id: '2', content: 'Luxury Brand Identity Palette & Architecture Guidelines', engagement: '8.9K saves' }
    ]
  },
  facebook: {
    metrics: [
      { label: 'Page Followers', value: '210.4K', change: 4.2, description: 'Established brand audience' },
      { label: 'Organic Reach', value: '1.4M', change: 11.2, description: 'Group & page post reach' },
      { label: 'Share Velocity', value: '18.4K', change: 8.1, description: 'Community re-shares' },
      { label: 'Ad Conversion CTR', value: '3.8%', change: 14.5, description: 'Paid funnel efficiency' },
    ],
    engagementData: [
      { name: 'Mon', value: 450 }, { name: 'Tue', value: 520 }, { name: 'Wed', value: 680 },
      { name: 'Thu', value: 740 }, { name: 'Fri', value: 610 }, { name: 'Sat', value: 820 }, { name: 'Sun', value: 790 },
    ],
    sentiment: 'Steady & Positive (84.0%)',
    topPosts: [
      { id: '1', content: 'Announcing our 2026 Global AI Summit partnership.', engagement: '8.4K shares' },
      { id: '2', content: 'Exclusive case study: Scaling brand velocity through automated intelligence.', engagement: '5.2K shares' }
    ]
  },
  bluesky: {
    metrics: [
      { label: 'Followers', value: '38.4K', change: 48.2, description: 'Decentralized tech audience' },
      { label: 'Skeet Reposts', value: '8.2K', change: 34.1, description: 'Protocol feed reach' },
      { label: 'Custom Feed Inclusion', value: '142', change: 65.0, description: 'Curated algorithm picks' },
      { label: 'Domain Verification', value: 'Verified', change: 0, description: 'AtProto trusted authority' },
    ],
    engagementData: [
      { name: 'Mon', value: 380 }, { name: 'Tue', value: 540 }, { name: 'Wed', value: 690 },
      { name: 'Thu', value: 820 }, { name: 'Fri', value: 710 }, { name: 'Sat', value: 640 }, { name: 'Sun', value: 590 },
    ],
    sentiment: 'Innovator Cohort (90.5%)',
    topPosts: [
      { id: '1', content: 'Building open algorithmic feeds for high-fidelity social intelligence.', engagement: '1.8K skeets' },
      { id: '2', content: 'The AT Protocol shift: Why decentralized social data empowers creators.', engagement: '1.2K skeets' }
    ]
  }
};

type ViewType = 'dashboard' | 'audience' | 'sentiment' | 'forecasting' | 'simulator' | 'intel' | 'market' | 'trends' | 'profile';

function Dashboard() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
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
    name: 'Executive Director',
    email: 'director@omniscience.ai',
    bio: 'Elite intelligence operative focused on universal resonance and semantic velocity.'
  });

  const [state, setState] = useState<AppState>({
    selectedPlatform: 'instagram',
    isLoading: false,
    aiInsights: null,
    postIdeas: [],
  });

  const data = MOCK_DATA[state.selectedPlatform] || MOCK_DATA.instagram;

  const filteredPlatforms = PLATFORMS.filter(p => 
    p.name.toLowerCase().includes(platformSearch.toLowerCase())
  );

  const handleResetSession = () => {
    notify("Executive neural buffer refreshed.");
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView platform={state.selectedPlatform} data={data} notify={notify} />;
      case 'audience': return <AudienceView notify={notify} />;
      case 'sentiment': return <SentimentView notify={notify} />;
      case 'forecasting': return <ForecastingView notify={notify} />;
      case 'simulator': return <StrategySimulatorView notify={notify} />;
      case 'intel': return <SavedIntelView notify={notify} />;
      case 'market': return <CompetitorAnalysisView notify={notify} />;
      case 'trends': return <TrendMapView notify={notify} />;
      case 'profile': return <ProfileView profileData={profileData} setProfileData={setProfileData} notify={notify} />;
      default: return <DashboardView platform={state.selectedPlatform} data={data} notify={notify} />;
    }
  };

  const navItems: { id: ViewType; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'audience', label: 'Audience' },
    { id: 'sentiment', label: 'Sentiment' },
    { id: 'forecasting', label: 'Forecast' },
    { id: 'simulator', label: 'Simulator' },
    { id: 'market', label: 'Market Radar' },
    { id: 'trends', label: 'Trends' },
    { id: 'intel', label: 'Saved Intel' },
  ];

  return (
    <div className="min-h-screen h-screen flex flex-col bg-lumina-bg text-lumina-text font-sans overflow-hidden">
      {/* Top Navigation Bar */}
      <nav className="h-16 border-b border-lumina-border flex items-center justify-between px-6 md:px-8 bg-white shrink-0">
        <div className="flex items-center gap-8 xl:gap-12">
          <Link to="/" className="text-xl md:text-2xl font-serif font-black tracking-[-0.1em] italic text-lumina-text cursor-pointer group flex items-baseline">
            OMNISCIENCE
            <span className="text-lumina-silver font-light not-italic ml-1 text-xs md:text-sm tracking-normal group-hover:text-lumina-text transition-colors">v4.2</span>
          </Link>

          <Link to="/" className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-lumina-bg border border-lumina-border text-[10px] font-black uppercase tracking-widest hover:bg-lumina-text hover:text-white transition-all">
            <Compass className="w-3 h-3 text-green-500" /> Landing Intro
          </Link>

          <div className="hidden lg:flex gap-6 xl:gap-8 text-[12px] xl:text-[13px] font-medium text-lumina-muted uppercase tracking-widest">
            {navItems.map((item) => (
              <button 
                key={item.id} 
                onClick={() => setCurrentView(item.id)}
                className={cn(
                  "pb-5 mt-5 hover:text-lumina-text transition-all font-bold relative whitespace-nowrap",
                  currentView === item.id ? "text-lumina-text" : "text-lumina-silver/70"
                )}
              >
                {item.label}
                {currentView === item.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-lumina-text"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-5">
          <button 
            onClick={handleResetSession}
            title="Refresh System Buffer"
            className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-lumina-muted hover:text-lumina-text transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Demo Reset
          </button>
          
          <div 
            onClick={() => setCurrentView('profile')}
            title="White-Label Agency Settings"
            className={cn(
              "h-8 w-8 rounded bg-lumina-text text-white border border-lumina-text flex items-center justify-center text-[10px] font-black cursor-pointer transition-all shadow-sm hover:opacity-90"
            )}
          >
            ED
          </div>

          <button 
            onClick={() => setIsReportModalOpen(true)}
            className="bg-lumina-text text-white px-4 md:px-5 py-2 text-[10px] md:text-[11px] font-black uppercase tracking-widest rounded-sm hover:opacity-90 transition-all flex items-center gap-2 shadow-md"
          >
            <FileText className="w-3.5 h-3.5 text-green-400" /> Export Proposal
          </button>
        </div>
      </nav>

      <main className="flex-1 flex overflow-hidden relative">
        {/* Mobile Sidebar Toggle Button */}
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
          {/* Mobile Main Nav Section */}
          <div className="lg:hidden space-y-4 mb-4 border-b border-lumina-border pb-8">
            <h3 className="label-caps mb-4">Navigation Protocol</h3>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <button 
                  key={item.id} 
                  onClick={() => {
                    setCurrentView(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={cn(
                    "flex items-center justify-center text-center p-3 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all border",
                    currentView === item.id 
                      ? "bg-lumina-text text-white border-lumina-text" 
                      : "bg-white text-lumina-muted border-lumina-border hover:border-lumina-text/50"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="label-caps mb-4">Select Channel ({PLATFORMS.length})</h3>
            <div className="mb-4 relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-lumina-silver" />
              <input 
                type="text" 
                placeholder="Search platforms..."
                value={platformSearch}
                onChange={(e) => setPlatformSearch(e.target.value)}
                className="w-full bg-lumina-bg border border-lumina-border pl-9 pr-4 py-2 text-[11px] font-medium focus:outline-none focus:border-lumina-text transition-colors uppercase tracking-widest"
              />
            </div>
            <div className="flex flex-col gap-1 max-h-[380px] overflow-y-auto custom-scrollbar pr-1">
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
                        ? "bg-lumina-bg font-bold italic font-serif border-l-2 border-lumina-text" 
                        : "hover:bg-lumina-bg/50 text-lumina-muted"
                    )}
                  >
                    <p.icon className={cn("w-4 h-4", p.color)} />
                    <span className="truncate">{p.name}</span>
                  </button>
                ))
              ) : (
                <p className="text-[10px] text-lumina-silver italic font-serif p-4">No channels found for query.</p>
              )}
            </div>
          </div>

          <div className="mt-auto space-y-6">
            <div className="p-3 bg-lumina-bg rounded border border-lumina-border space-y-4">
              <div className="flex items-center justify-between text-[10px] font-bold">
                <span>SYSTEM STATUS</span>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <p className="text-[11px] leading-relaxed text-lumina-muted italic font-serif">
                Neural processing active. Extraction depth: High Fidelity.
              </p>
            </div>
            
            <div className="p-4 border border-dashed border-lumina-border rounded-sm bg-lumina-bg/20">
              <p className="text-[10px] font-black uppercase tracking-widest mb-2">System Tier</p>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-lumina-text" />
                <span className="text-[11px] font-serif italic text-lumina-text">OMNISCIENCE ENTERPRISE</span>
              </div>
            </div>
          </div>
        </aside>

        {/* View Scroll Area */}
        <div className="flex-1 overflow-y-auto bg-lumina-bg/20 custom-scrollbar">
          <div className="max-w-7xl mx-auto p-6 md:p-8 w-full">
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
            <span className="text-lumina-text italic">Neural Core: Active</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-lumina-silver">
            <Search className="w-2.5 h-2.5" />
            <span>Scanning 4.2M Nodes/Sec</span>
          </div>
        </div>
        <div className="flex gap-10 items-center">
          <span className="hidden sm:inline text-lumina-silver">OMNISCIENCE ENTERPRISE v4.2</span>
          <div className="h-3 w-[1px] bg-lumina-border hidden sm:block" />
          <div className="flex gap-6 items-center italic text-lumina-muted">
            <span>{new Date().toISOString().split('T')[0]}</span>
          </div>
        </div>
      </footer>

      {/* Executive Report Proposal Modal */}
      <ExecutiveReportModal 
        isOpen={isReportModalOpen} 
        onClose={() => setIsReportModalOpen(false)}
        notify={notify}
        selectedPlatform={state.selectedPlatform}
      />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
