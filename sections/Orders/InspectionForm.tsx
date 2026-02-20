
import React, { useState } from 'react';

export const InspectionHUD: React.FC = () => {
  const [checklist, setChecklist] = useState({
    seal: false,
    aesthetic: false,
    functional: false,
    packaging: false
  });

  const toggle = (key: keyof typeof checklist) => setChecklist(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700 text-zinc-900 pb-32">
      <div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-zinc-900 uppercase">Inspection HUD</h1>
        <p className="text-zinc-500 font-bold mt-2 uppercase text-[10px] tracking-widest italic">Manual Reverse Logistics Quality Gate</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         <div className="lg:col-span-8 bg-white border border-zinc-100 p-10 md:p-14 rounded-[4rem] shadow-sm space-y-12">
            <div className="flex justify-between items-start border-b border-zinc-50 pb-10">
               <div className="space-y-2">
                  <span className="px-3 py-1 bg-zinc-900 text-white rounded-lg text-[10px] font-mono font-black uppercase">RET-882-AX</span>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Nexus Fold Pro 2035</h3>
               </div>
               <div className="text-right">
                  <p className="text-[10px] font-mono text-zinc-300 font-black uppercase">Origin Order</p>
                  <p className="font-bold text-zinc-800">#ord-105</p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               <div className="space-y-6">
                  <h4 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-black">Visual Scrutiny Checklist</h4>
                  <div className="space-y-3">
                     {[
                       { id: 'seal', label: 'Security Seal Integrity' },
                       { id: 'aesthetic', label: 'Exterior Aesthetic Scan' },
                       { id: 'functional', label: 'Core Functional Diagnostic' },
                       { id: 'packaging', label: 'Original Packaging Matrix' },
                     ].map(item => (
                       <button 
                        key={item.id}
                        onClick={() => toggle(item.id as any)}
                        className={`w-full p-6 rounded-2xl border transition-all flex items-center justify-between group ${
                          checklist[item.id as keyof typeof checklist] ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-zinc-50 border-transparent text-zinc-400 hover:border-zinc-200'
                        }`}
                       >
                          <span className="text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${checklist[item.id as keyof typeof checklist] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-zinc-200 group-hover:border-zinc-300'}`}>
                             {checklist[item.id as keyof typeof checklist] && '✓'}
                          </div>
                       </button>
                     ))}
                  </div>
               </div>
               <div className="space-y-6">
                  <h4 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-black">Inspector Manifest</h4>
                  <textarea 
                    rows={8}
                    placeholder="Enter manual findings for the arbitration vault..."
                    className="w-full bg-zinc-50 border border-zinc-100 rounded-3xl p-6 text-sm font-medium focus:ring-[12px] focus:ring-zinc-100 outline-none transition-all shadow-inner"
                  />
               </div>
            </div>
         </div>

         <div className="lg:col-span-4 space-y-8">
            <div className="bg-zinc-900 text-white p-10 rounded-[3.5rem] shadow-2xl space-y-10 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl -mr-16 -mt-16"></div>
               <h3 className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em] font-black">Protocol Decision</h3>
               <div className="space-y-4">
                  <button className="w-full py-6 bg-emerald-500 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:bg-emerald-400 transition-all active:scale-95">Authorize Restock</button>
                  <button className="w-full py-6 bg-rose-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:bg-rose-500 transition-all active:scale-95">Quarantine Asset</button>
                  <button className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] hover:bg-white/10 transition-all">Escalate Conflict</button>
               </div>
            </div>

            <div className="bg-white border border-zinc-100 p-8 rounded-[3.5rem] shadow-sm flex items-center gap-6">
               <div className="w-16 h-16 rounded-[1.8rem] bg-zinc-50 border border-zinc-200 flex items-center justify-center text-3xl">⚖️</div>
               <div>
                  <h4 className="font-black text-zinc-800 uppercase tracking-tight">Manual Vetting Policy</h4>
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">Inspector: #L7-ALEX-R</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
