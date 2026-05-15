import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, Copy, Check, Megaphone, Zap, Image as ImageIcon, Bookmark, BookmarkCheck, TrendingUp, RefreshCw } from 'lucide-react';
import { generatePostIdeas, getTrendingKeywords } from '../services/ai';
import { PostIdea, Platform } from '../types';
import { cn } from '../lib/utils';
import { useAuth } from '../lib/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function PostGenerator({ platform }: { platform: Platform }) {
  const { user } = useAuth();
  const [interests, setInterests] = useState('');
  const [trends, setTrends] = useState<string[]>([]);
  const [ideas, setIdeas] = useState<PostIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingTrends, setLoadingTrends] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchTrends();
  }, [platform]);

  const fetchTrends = async () => {
    setLoadingTrends(true);
    const keywords = await getTrendingKeywords(platform);
    setTrends(keywords);
    setLoadingTrends(false);
  };

  const handleGenerate = async (query?: string) => {
    const finalInterests = query || interests;
    if (!finalInterests.trim()) return;
    setLoading(true);
    const result = await generatePostIdeas(platform, finalInterests);
    setIdeas(result);
    setLoading(false);
    if (query) setInterests(query);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const savePost = async (idea: PostIdea) => {
    if (!user) return;
    const { handleFirestoreError, OperationType } = await import('../lib/firestoreUtils');
    try {
      await addDoc(collection(db, 'saved_posts'), {
        userId: user.uid,
        platform,
        ...idea,
        savedAt: serverTimestamp()
      });
      setSavedIds(prev => new Set(prev).add(idea.id));
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, 'saved_posts');
    }
  };

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="label-caps !text-lumina-text flex items-center gap-2">
            <Zap className="w-3.5 h-3.5" /> Neural Copy Engine
          </h3>
          <button 
            onClick={fetchTrends}
            disabled={loadingTrends}
            className="text-[9px] font-black uppercase tracking-widest text-lumina-silver hover:text-lumina-text flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={cn("w-2.5 h-2.5", loadingTrends && "animate-spin")} /> Refresh Trends
          </button>
        </div>

        {/* Trending Keywords */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-lumina-muted">
            <TrendingUp className="w-3 h-3" /> Real-time Resonance
          </div>
          <div className="flex flex-wrap gap-2">
            {trends.map((trend, i) => (
              <motion.button
                key={trend + i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleGenerate(trend)}
                className="px-3 py-1.5 bg-lumina-bg border border-lumina-border text-[10px] font-serif italic text-lumina-muted hover:border-lumina-text hover:text-lumina-text transition-all rounded-sm"
              >
                #{trend.replace(/\s+/g, '')}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Input interests or select a trend..." 
            className="flex-1 bg-lumina-bg border border-lumina-border p-4 text-sm italic font-serif focus:outline-none focus:border-lumina-text"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button 
            onClick={() => handleGenerate()}
            disabled={loading}
            className="bg-lumina-text text-white px-6 font-bold text-[11px] uppercase tracking-widest disabled:opacity-50 hover:opacity-90 flex items-center gap-2"
          >
            {loading ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Generate
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {ideas.length > 0 ? (
            ideas.map((idea, index) => (
              <motion.div 
                key={idea.id || index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="minimal-card !p-0 overflow-hidden group border-lumina-border hover:border-lumina-text transition-colors"
              >
                <div className="p-5 border-b border-lumina-border bg-lumina-bg flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Megaphone className="w-4 h-4 text-lumina-silver" />
                    <span className="text-[11px] font-black uppercase tracking-widest">{idea.topic}</span>
                  </div>
                  <span className="text-[10px] italic font-serif text-lumina-muted">Best time: {idea.suggestedTime}</span>
                </div>
                
                <div className="p-6 space-y-6">
                  <p className="text-[14px] leading-loose italic font-serif text-lumina-dark decoration-lumina-silver/20 underline-offset-4 whitespace-pre-wrap">
                    {idea.copy}
                  </p>
                  
                  <div className="flex items-start gap-3 p-4 bg-lumina-bg/50 rounded-sm italic text-[11px] text-lumina-muted leading-relaxed">
                    <ImageIcon className="w-4 h-4 shrink-0 mt-0.5" />
                    <span><span className="font-black uppercase tracking-tighter not-italic text-[9px] mr-2">Vision:</span>{idea.visuals}</span>
                  </div>
                </div>

                <div className="p-4 bg-white border-t border-lumina-border flex justify-between items-center">
                   <button 
                    onClick={() => savePost(idea)}
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 px-3 py-1.5 transition-all rounded-sm",
                      savedIds.has(idea.id) ? "text-green-600" : "hover:bg-lumina-bg"
                    )}
                  >
                    {savedIds.has(idea.id) ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                    {savedIds.has(idea.id) ? 'Saved to Intel' : 'Save Intel'}
                  </button>

                  <button 
                    onClick={() => copyToClipboard(idea.copy, idea.id)}
                    className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 px-3 py-1.5 hover:bg-lumina-bg transition-colors rounded-sm"
                  >
                    {copiedId === idea.id ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === idea.id ? 'Copied' : 'Copy Content'}
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 opacity-30 mt-10">
              <Sparkles className="w-12 h-12 mb-4 animate-pulse" />
              <p className="text-sm font-serif italic max-w-xs">Await the spark of universal intelligence to synthesize your narrative.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
