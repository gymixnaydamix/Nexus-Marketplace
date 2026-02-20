
import React, { useState } from 'react';
import { useApp } from '../../AppContext';

export const AdminConfig: React.FC = () => {
  const { system, toggleIncidentMode } = useApp();
  const [reason, setReason] = useState('');

  const flags = [
    { name: 'multiverse_electronics', status: true, description: 'Enable Electronics World cluster.' },
    { name: 'payout_auth_lock', status: true, description: 'Force manual admin approval on all payouts.' },
    { name: 'global_restock_v4', status: false, description: 'Enable automated restock calculation (Deprecated).' },
    { name: 'kyc_tier_3_verification', status: true, description: 'Require biometric scan for high-value entities.' },
  ];

  const handleIncidentToggle = () => {
    if (system.incidentMode) {
      toggleIncidentMode(false, '');
      setReason('');
    } else {
      const r = prompt("Enter Critical Incident Reason for manual lockdown:");
      if (r) toggleIncidentMode(true, r);
    }
  };

  return (
    <div className="space-y-12 text-zinc-900 animate-in fade-in duration-700 pb-20">
      
      {/* Incident Control HUD */}
      <div className={`p-8 md:p-12 rounded-[3.5rem] border-2 transition-all duration-700 flex flex-col md:flex-row justify-between items-center gap-10 shadow-2xl ${
        system.incidentMode 
        ? 'bg-rose-900 border-rose-700 text-white shadow-rose-900/40' 
        : 'bg-zinc-900 border-zinc-800 text-white'
      }`}>
         <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
               <div className={`w-3 h-3 rounded-full ${system.incidentMode ? 'bg-white animate-ping' : 'bg-emerald-400'}`}></div>
               <span className="text-[10px] font-mono uppercase tracking-[0.4em] font-black opacity-60">System Operational State</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
               {system.incidentMode ? 'Critical Lockdown' : 'Nominal Status'}
            </h2>
            {system.incidentMode && (
              <p className="text-rose-200 font-bold uppercase tracking-widest text-sm">Reason: {system.incidentReason}</p>
            )}
            <p className="opacity-40 text-[9px] font-mono uppercase font-black">Last Kernel Update: {new Date(system.lastUpdate).toLocaleString()}</p>
         </div>
         <button 
           onClick={handleIncidentToggle}
           className={`px-12 py-6 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl transition-all active:scale-95 ${
             system.incidentMode 
             ? 'bg-white text-rose-900 hover:bg-rose-50' 
             : 'bg-rose-600 text-white hover:bg-rose-700'
           }`}
         >
            {system.incidentMode ? 'Lift Lockdown' : 'Trigger Protocol Zero'}
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {flags.map(f => (
          <div key={f.name} className="bg-white border border-zinc-100 p-8 rounded-[3rem] shadow-sm flex items-center justify-between group hover:border-zinc-300 transition-all">
             <div className="flex-1 pr-6">
                <h3 className="font-mono text-[11px] font-black text-zinc-900 uppercase tracking-widest mb-2">{f.name}</h3>
                <p className="text-sm text-zinc-400 font-medium leading-relaxed">{f.description}</p>
             </div>
             <div className={`w-14 h-8 rounded-full relative cursor-pointer transition-all ${f.status ? 'bg-emerald-500' : 'bg-zinc-200'}`}>
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${f.status ? 'right-1 shadow-lg' : 'left-1'}`}></div>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-50 border border-zinc-100 p-12 rounded-[3.5rem] space-y-10 shadow-inner">
         <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Network Integration Stack</h3>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['Payment Layer', 'Logistics Link', 'Bio-ID Vault', 'SMTP Relays'].map(int => (
              <div key={int} className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm flex flex-col items-center text-center space-y-4 group">
                 <div className="w-14 h-14 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-2xl grayscale group-hover:grayscale-0 transition-all shadow-inner">🔌</div>
                 <span className="text-[10px] font-black text-zinc-800 uppercase tracking-widest">{int}</span>
                 <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-500 text-[8px] font-black uppercase tracking-widest border border-emerald-100">Linked</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};
