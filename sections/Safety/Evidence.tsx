
import React from 'react';

export const SafeDocs: React.FC = () => {
  const vaults = [
    { icon: '🛡️', title: 'KYC Binary Vault', count: '1,284 Verified Actors', desc: 'Secure repository for encrypted identity manifestations.' },
    { icon: '📦', title: 'Logistic Proof-Chain', count: '45,002 Asset Events', desc: 'Immutable records of physical handover cycles.' },
    { icon: '⚖️', title: 'Arbitration Archives', count: '14 Legal Bundles', desc: 'Full-context decision logs for network conflicts.' },
  ];

  return (
    <div className="space-y-12 text-zinc-900 animate-in fade-in duration-700 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-zinc-50 pb-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">Evidence Vault</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] md:text-sm mt-3 italic">Immutable Legal-Grade Operational Trace</p>
        </div>
        <button className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-black transition-all">Audit Global Storage</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
         {vaults.map((v, i) => (
           <div key={i} className="bg-white border border-zinc-100 p-10 rounded-[4rem] shadow-sm hover:shadow-2xl transition-all space-y-10 flex flex-col group active:scale-[0.98]">
              <div className="w-20 h-20 rounded-[2.5rem] bg-zinc-50 flex items-center justify-center text-5xl shadow-inner group-hover:scale-110 transition-transform">{v.icon}</div>
              <div className="flex-1 space-y-4">
                 <h3 className="text-3xl font-black text-zinc-900 uppercase tracking-tighter leading-none">{v.title}</h3>
                 <p className="text-[11px] font-black text-indigo-600 uppercase tracking-[0.3em]">{v.count}</p>
                 <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest leading-relaxed opacity-60">{v.desc}</p>
              </div>
              <div className="pt-6 border-t border-zinc-50">
                 <button className="w-full py-5 bg-zinc-900 text-white rounded-3xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl">Decrypt Node Access</button>
              </div>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-10">
         <div className="bg-zinc-50 border-4 border-dashed border-zinc-100 p-12 rounded-[4.5rem] flex flex-col items-center justify-center text-center space-y-8 shadow-inner group">
            <div className="w-20 h-20 rounded-[2rem] bg-white flex items-center justify-center text-4xl shadow-xl group-hover:scale-110 transition-all">📁</div>
            <div className="space-y-2">
               <h4 className="text-2xl font-black uppercase tracking-tight">Generate Case Bundle</h4>
               <p className="text-zinc-400 font-bold uppercase text-[10px] tracking-widest max-w-xs mx-auto">Export immutable multi-asset history for external legal review.</p>
            </div>
            <button className="px-10 py-5 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 shadow-2xl">Compile ZIP Archive</button>
         </div>

         <div className="bg-rose-50 border-4 border-rose-100 p-12 rounded-[4.5rem] flex flex-col justify-center space-y-8 shadow-sm">
            <div className="space-y-4">
               <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-rose-500 rounded-full animate-ping"></div>
                  <h4 className="text-3xl font-black text-rose-900 uppercase tracking-tighter leading-none">Emergency Seal</h4>
               </div>
               <p className="text-rose-700/50 font-bold text-sm uppercase tracking-widest leading-relaxed max-w-sm">Instantly restrict all evidence access across the platform nodes. Requires Super Admin biometric secondary auth (L9 Clearance).</p>
            </div>
            <button className="w-full py-6 bg-rose-600 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl shadow-rose-900/20 hover:bg-rose-700 active:scale-95 transition-all">Enable Global Lockdown</button>
         </div>
      </div>
    </div>
  );
};
