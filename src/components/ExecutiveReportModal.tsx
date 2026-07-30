import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, Download, Copy, Check, Sparkles, Building, BarChart3, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface ExecutiveReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  notify: (msg: string) => void;
  selectedPlatform: string;
}

export default function ExecutiveReportModal({ isOpen, onClose, notify, selectedPlatform }: ExecutiveReportModalProps) {
  const [clientName, setClientName] = useState('Vanguard Global Holdings');
  const [agencyName, setAgencyName] = useState('OMNISCIENCE Neural Media');
  const [targetBudget, setTargetBudget] = useState('$150,000');
  const [campaignFocus, setCampaignFocus] = useState('Executive Thought Leadership & Viral Resonance');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyReport = () => {
    const text = `
===================================================================
OMNISCIENCE ENTERPRISE - EXECUTIVE STRATEGIC PROPOSAL & INTEL BRIEF
===================================================================
PREPARED FOR: ${clientName}
PREPARED BY: ${agencyName}
DATE: ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
TARGET PLATFORM: ${selectedPlatform.toUpperCase()}
ALLOCATED BUDGET: ${targetBudget}
CAMPAIGN FOCUS: ${campaignFocus}

-------------------------------------------------------------------
1. EXECUTIVE PERFORMANCE PROJECTIONS
-------------------------------------------------------------------
- Estimated Reach Velocity: 4.8M - 8.2M Impressions
- Algorithmic Resonance Multiplier: +164.5% Lift
- Target Share of Voice: 34.2% (Category Leader)
- Projected Customer Acquisition Cost Reduction: -38.4%

-------------------------------------------------------------------
2. AI NARRATIVE RECOMMENDATIONS
-------------------------------------------------------------------
- Deploy high-density editorial storytelling focusing on tech ethics & architectural elegance.
- Capitalize on peak engagement windows (Tue/Thu 09:00 - 11:30 EST).
- Implement real-time emotional pulse triage to neutralize negative sentiment anomalies.

-------------------------------------------------------------------
CONFIDENTIAL - OMNISCIENCE ENTERPRISE INTELLIGENCE ENGINE v4.2
===================================================================
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    notify("Executive Proposal Brief copied to clipboard.");
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownloadPDF = () => {
    window.print();
    notify("Initiating high-resolution report print sequence.");
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white border border-lumina-border w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl rounded-sm overflow-hidden"
      >
        {/* Modal Top Header */}
        <div className="px-8 py-5 border-b border-lumina-border flex items-center justify-between bg-lumina-bg/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-lumina-text text-white flex items-center justify-center font-serif font-black text-xs italic">
              O
            </div>
            <div>
              <h3 className="text-base font-serif font-bold italic text-lumina-text">Client Pitch & Executive Proposal Studio</h3>
              <p className="text-[10px] text-lumina-silver uppercase tracking-widest font-black">White-Label Report Generator</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-lumina-silver hover:text-lumina-text transition-colors rounded-sm hover:bg-lumina-border/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 overflow-y-auto flex-1 space-y-8 custom-scrollbar">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5 bg-lumina-bg border border-lumina-border rounded-sm">
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-lumina-silver block mb-1">Target Client Name</label>
              <input 
                type="text" 
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-white border border-lumina-border px-3 py-2 text-xs font-serif italic text-lumina-text focus:outline-none focus:border-lumina-text"
              />
            </div>
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-lumina-silver block mb-1">Prepared By (Agency)</label>
              <input 
                type="text" 
                value={agencyName}
                onChange={(e) => setAgencyName(e.target.value)}
                className="w-full bg-white border border-lumina-border px-3 py-2 text-xs font-serif italic text-lumina-text focus:outline-none focus:border-lumina-text"
              />
            </div>
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-lumina-silver block mb-1">Allocated Budget</label>
              <input 
                type="text" 
                value={targetBudget}
                onChange={(e) => setTargetBudget(e.target.value)}
                className="w-full bg-white border border-lumina-border px-3 py-2 text-xs font-serif italic text-lumina-text focus:outline-none focus:border-lumina-text"
              />
            </div>
            <div>
              <label className="text-[9px] font-black uppercase tracking-widest text-lumina-silver block mb-1">Campaign Objective</label>
              <input 
                type="text" 
                value={campaignFocus}
                onChange={(e) => setCampaignFocus(e.target.value)}
                className="w-full bg-white border border-lumina-border px-3 py-2 text-xs font-serif italic text-lumina-text focus:outline-none focus:border-lumina-text"
              />
            </div>
          </div>

          {/* Live Document Preview Box */}
          <div className="border border-lumina-border p-8 bg-white shadow-inner font-sans space-y-8 relative print:border-none print:shadow-none">
            <div className="flex justify-between items-start border-b border-lumina-border pb-6">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-lumina-silver block mb-1">CONFIDENTIAL EXECUTIVE BRIEF</span>
                <h1 className="text-3xl font-serif font-black italic text-lumina-text">{clientName}</h1>
                <p className="text-xs text-lumina-muted font-serif italic mt-1">Social Narrative Intelligence & Viral Strategy Proposal</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-serif font-bold italic text-lumina-text block">{agencyName}</span>
                <span className="text-[9px] text-lumina-silver uppercase tracking-widest block mt-0.5">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-50 text-green-700 text-[9px] font-black uppercase tracking-widest mt-2 border border-green-200">
                  <ShieldCheck className="w-3 h-3" /> Ready for Signature
                </div>
              </div>
            </div>

            {/* Scorecard Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-lumina-bg border border-lumina-border">
                <span className="text-[9px] font-black uppercase tracking-widest text-lumina-silver block mb-1">Est. Impressions</span>
                <span className="text-2xl font-serif font-bold italic text-lumina-text">6.4M</span>
                <span className="text-[9px] text-green-600 font-bold block mt-1">+182% vs Avg</span>
              </div>
              <div className="p-4 bg-lumina-bg border border-lumina-border">
                <span className="text-[9px] font-black uppercase tracking-widest text-lumina-silver block mb-1">Share of Voice</span>
                <span className="text-2xl font-serif font-bold italic text-lumina-text">34.2%</span>
                <span className="text-[9px] text-lumina-silver font-bold block mt-1">#1 Category Rank</span>
              </div>
              <div className="p-4 bg-lumina-bg border border-lumina-border">
                <span className="text-[9px] font-black uppercase tracking-widest text-lumina-silver block mb-1">Target ROI</span>
                <span className="text-2xl font-serif font-bold italic text-lumina-text">4.85x</span>
                <span className="text-[9px] text-green-600 font-bold block mt-1">$4.85 per $1</span>
              </div>
              <div className="p-4 bg-lumina-text text-white">
                <span className="text-[9px] font-black uppercase tracking-widest text-white/60 block mb-1">Neural Resonance</span>
                <span className="text-2xl font-serif font-bold italic text-white">98.4</span>
                <span className="text-[9px] text-white/80 font-bold block mt-1">Peak Fidelity</span>
              </div>
            </div>

            {/* Strategic Pillars */}
            <div className="space-y-4">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-lumina-text flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-lumina-text" /> Core Campaign Blueprint & Execution Milestones
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border border-lumina-border space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-lumina-silver block">Phase 01: Resonance Seeding</span>
                  <p className="text-xs text-lumina-muted font-serif italic leading-relaxed">
                    Deploy AI-synthesized editorial hooks targeting key opinion leaders across {selectedPlatform.toUpperCase()}. Focus on high-retention narrative framing.
                  </p>
                </div>
                <div className="p-4 border border-lumina-border space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-lumina-silver block">Phase 02: Viral Acceleration</span>
                  <p className="text-xs text-lumina-muted font-serif italic leading-relaxed">
                    Amplify high-converting posts using predictive timing matrices to capture peak algorithmic distribution windows.
                  </p>
                </div>
                <div className="p-4 border border-lumina-border space-y-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-lumina-silver block">Phase 03: Conversion Mastery</span>
                  <p className="text-xs text-lumina-muted font-serif italic leading-relaxed">
                    Convert social sentiment velocity into high-intent inbound inquiries and direct brand value lift with automated sentiment triage.
                  </p>
                </div>
              </div>
            </div>

            {/* Confidentiality Footer */}
            <div className="pt-6 border-t border-lumina-border flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-lumina-silver">
              <span>OMNISCIENCE ENTERPRISE INTEL REPORT</span>
              <span>CONFIDENTIAL - PROPRIETARY ALGORITHMIC MODEL</span>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="px-8 py-5 border-t border-lumina-border flex flex-col sm:flex-row justify-between items-center gap-4 bg-lumina-bg/50">
          <div className="text-[10px] text-lumina-silver uppercase font-black tracking-widest">
            Ready to export for boardroom presentation
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <button 
              onClick={handleCopyReport}
              className="flex-1 sm:flex-none border border-lumina-text px-5 py-2.5 text-[10px] font-black uppercase tracking-widest hover:bg-lumina-bg transition-colors flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied Brief' : 'Copy Brief'}
            </button>
            <button 
              onClick={handleDownloadPDF}
              className="flex-1 sm:flex-none bg-lumina-text text-white px-6 py-2.5 text-[10px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Export High-Res PDF
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
