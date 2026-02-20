
import React from 'react';

export const SLAConfig: React.FC = () => {
  const matrix = [
    { tier: 'Protocol Zero', threshold: '15m', impact: 'Platform Halt', status: 'Locked' },
    { tier: 'Tier 1 Critical', threshold: '45m', impact: 'Admin Route', status: 'Active' },
    { tier: 'Tier 2 Standard', threshold: '4h', impact: 'Queue Route', status: 'Active' },
    { tier: 'Tier 3 Low', threshold: '24h', impact: 'Inbox Route', status: 'Active' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 text-zinc-900 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-zinc-50 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-zinc-900 uppercase">SLA Architecture</h1>
          <p className="text-zinc-500 font-bold mt-2 uppercase text-[10px] tracking-widest italic">Manual Latency & Response Threshold Matrix</p>
        </div>
        <button className="px-10 py-5 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Architect New Tier</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {matrix.map((m, i) => (
          <div key={i} className="bg-white border border-zinc-100 p-8 rounded-[3.5rem] shadow-sm space-y-8 group hover:shadow-2xl transition-all">
             <div className="flex justify-between items-start">
                <span className="text-[9px] font-mono text-zinc-300 font-black uppercase tracking-widest">{m.tier}</span>
                <div className={`w-2 h-2 rounded-full ${m.status === 'Locked' ? 'bg-rose-500' : 'bg-emerald-500 shadow-[0_0_10px_#10b981]'}`}></div>
             </div>
             <div>
                <h3 className="text-4xl font-black text-zinc-900 tracking-tighter">{m.threshold}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mt-2">Maximum Latency</p>
             </div>
             <div className="pt-6 border-t border-zinc-50">
                <p className="text-[11px] font-black uppercase text-zinc-800">{m.impact}</p>
                <p className="text-[9px] text-zinc-400 font-medium mt-1">Manual Action Trigger</p>
             </div>
             <button className="w-full py-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-[9px] font-black uppercase tracking-widest text-zinc-300 group-hover:text-zinc-900 group-hover:border-zinc-200 transition-all">Recalibrate</button>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 text-white p-12 rounded-[4.5rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12 group">
         <div className="absolute inset-0 bg-white/[0.02] pointer-events-none" style={{ filter: 'url(#atomic-grain)' }}></div>
         <div className="flex-1 space-y-6 relative z-10">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">Automatic Violation Pause</h3>
            <p className="text-white/30 text-sm font-bold uppercase tracking-widest leading-relaxed max-w-xl italic">All timers are currently pegged to the Nexus Central Pulse. Manual override requires Level 9 Administrative bio-signature link.</p>
         </div>
         <button className="relative z-10 px-14 py-6 bg-white text-zinc-900 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.4em] shadow-2xl active:scale-95 transition-all">Enroll L9 Override</button>
      </div>
    </div>
  );
};
