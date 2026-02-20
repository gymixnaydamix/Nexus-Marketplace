
import React from 'react';

export const SetSecurity: React.FC = () => {
  return (
    <div className="space-y-12 text-zinc-900 animate-in fade-in duration-700">
      <div>
        <h1 className="text-4xl font-black tracking-tight">Security Hardening</h1>
        <p className="text-zinc-500 font-medium mt-1 italic">Enforce deterministic manual authentication and session protocols.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white border border-zinc-100 p-12 rounded-[3.5rem] shadow-sm space-y-10">
           <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Active Shield Layer</h3>
           <div className="space-y-6">
              {[
                { label: 'Multi-Factor Auth', status: 'Operational', icon: '📱' },
                { label: 'Biometric Gateway', status: 'Enforced', icon: '🧬' },
                { label: 'Hardware Key (Yubi)', status: 'Not Linked', icon: '🔑' },
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100">
                   <div className="flex items-center gap-5">
                      <span className="text-2xl">{s.icon}</span>
                      <div>
                        <p className="font-bold text-sm text-zinc-800">{s.label}</p>
                        <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${s.status === 'Operational' || s.status === 'Enforced' ? 'text-emerald-500' : 'text-rose-500'}`}>{s.status}</p>
                      </div>
                   </div>
                   <button className="px-4 py-2 border border-zinc-200 rounded-xl text-[9px] font-black uppercase tracking-widest">Config</button>
                </div>
              ))}
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-rose-50 border border-rose-100 p-10 rounded-[3rem] shadow-sm">
              <h3 className="text-2xl font-black text-rose-900">Immediate Lockdown</h3>
              <p className="text-rose-700/60 text-sm mt-2 leading-relaxed">Instantly terminate all active sessions and rotate access keys across all world sectors.</p>
              <button className="mt-8 px-10 py-5 bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-rose-100 hover:bg-rose-700">Trigger Protocol Zero</button>
           </div>
           <div className="bg-zinc-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent"></div>
              <p className="text-[10px] font-mono uppercase tracking-[0.3em] opacity-40 mb-3">Threat Vector Audit</p>
              <h4 className="text-3xl font-black">No Active Breaches</h4>
              <p className="text-white/40 text-xs mt-4 leading-relaxed font-mono">Last full system scan completed: 2035.05.12 04:00 UTC</p>
           </div>
        </div>
      </div>
    </div>
  );
};
