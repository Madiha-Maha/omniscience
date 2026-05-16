import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, Trash2, ExternalLink, Calendar, Megaphone, Search, Filter } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, deleteDoc, doc, orderBy } from 'firebase/firestore';
import { useAuth } from '../lib/AuthContext';
import { cn } from '../lib/utils';

interface SavedPost {
  id: string;
  docId: string;
  userId: string;
  platform: string;
  topic: string;
  copy: string;
  visuals: string;
  suggestedTime: string;
  savedAt: any;
}

export default function SavedIntelView({ notify }: { notify: (msg: string) => void }) {
  const { user } = useAuth();
  const [posts, setPosts] = useState<SavedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = async () => {
    if (!user) return;
    setLoading(true);
    const { handleFirestoreError, OperationType } = await import('../lib/firestoreUtils');
    try {
      const q = query(
        collection(db, 'saved_posts'), 
        where('userId', '==', user.uid),
        orderBy('savedAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        docId: doc.id
      })) as SavedPost[];
      setPosts(fetchedPosts);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'saved_posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const handleDelete = async (docId: string) => {
    const { handleFirestoreError, OperationType } = await import('../lib/firestoreUtils');
    try {
      await deleteDoc(doc(db, 'saved_posts', docId));
      setPosts(prev => prev.filter(p => p.docId !== docId));
      notify("Neural node purged from saved ledger.");
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `saved_posts/${docId}`);
    }
  };

  const filteredPosts = posts.filter(p => 
    p.topic.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.copy.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 md:space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 text-left w-full">
        <div className="w-full">
          <h2 className="text-3xl md:text-4xl font-serif font-bold italic text-lumina-text leading-tight">Saved <span className="text-lumina-silver">Intel</span></h2>
          <p className="text-lumina-muted font-serif italic mt-2 text-base md:text-lg">Your curated repository of synthesized social narratives.</p>
        </div>
        <div className="w-full md:w-80 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-lumina-silver" />
          <input 
            type="text" 
            placeholder="Search saved nodes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-lumina-border pl-12 pr-4 py-3 text-[11px] font-black uppercase tracking-widest focus:outline-none focus:border-lumina-text"
          />
        </div>
      </header>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-white border border-lumina-border animate-pulse" />
          ))}
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, i) => (
              <motion.div
                key={post.docId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white border border-lumina-border group hover:border-lumina-text transition-colors flex flex-col"
              >
                <div className="p-5 border-b border-lumina-border bg-lumina-bg flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <Megaphone className="w-4 h-4 text-lumina-text" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-lumina-text">{post.platform} // {post.topic}</span>
                  </div>
                  <button 
                    onClick={() => handleDelete(post.docId)}
                    className="text-lumina-silver hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-6 flex-1 space-y-6">
                  <p className="text-[13px] leading-relaxed italic font-serif text-lumina-muted line-clamp-4">
                    "{post.copy}"
                  </p>
                  
                  <div className="pt-4 border-t border-lumina-bg space-y-3">
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-lumina-silver">
                      <Calendar className="w-3 h-3" />
                      Saved: {post.savedAt?.toDate().toLocaleDateString() || 'N/A'}
                    </div>
                    <div className="text-[10px] italic font-serif text-lumina-text">
                      Ideal Transmission: {post.suggestedTime}
                    </div>
                  </div>
                </div>

                <button className="w-full py-4 border-t border-lumina-border text-[9px] font-black uppercase tracking-[0.2em] hover:bg-lumina-text hover:text-white transition-all flex items-center justify-center gap-2">
                  <ExternalLink className="w-3 h-3" /> View Full Synthesis
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="py-32 flex flex-col items-center justify-center text-center opacity-30">
          <Bookmark className="w-16 h-16 mb-6" />
          <p className="text-xl font-serif italic max-w-sm">No neural intelligence fragments saved to the ledger yet.</p>
        </div>
      )}
    </div>
  );
}
