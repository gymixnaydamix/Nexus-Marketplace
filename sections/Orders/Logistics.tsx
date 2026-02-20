
import React from 'react';

export const DelTracking: React.FC = () => {
  return (
    <div className="space-y-12 text-zinc-900 animate-in fade-in duration-700 pb-20 md:pb-0">
      
      <div className="flex justify-end border-b border-zinc-50 pb-6">
        <button className="px-10 py-3.5 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all">Manual Route Sync</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
         <div className="lg:col-span-4 space-y-10">
            <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-black px-2">Authorized Carrier Node Pool</h3>
            <div className="space-y-4">
               {[
                 { name: 'Sky-Drone Logistics', status: 'Optimal', load: 12 },
                 { name: 'Hyper-Rail North', status: 'Saturated', load: 95 },
                 { name: 'Nexus Surface Fleet', status: 'Maintenance', load: 45 },
               ].map(c => (
                 <div key={c.name} className="bg-white border border-zinc-100 p-8 rounded-[3rem] shadow-sm space-y-6 group hover:shadow-xl transition-all">
                    <div className="flex justify-between items-start">
                       <span className="font-black text-zinc-800 uppercase text-xs md:text-sm tracking-tight">{c.name}</span>
                       <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg ${c.status === 'Optimal' ? 'bg-emerald-50 text-emerald-600' : c.status === 'Saturated' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'}`}>{c.status}</span>
                    </div>
                    <div className="space-y-2">
                       <div className="flex justify-between text-[8px] font-mono font-black text-zinc-300 uppercase">
                          <span>Payload Load</span>
                          <span>{c.load}%</span>
                       </div>
                       <div className="h-1.5 w-full bg-zinc-50 rounded-full overflow-hidden border border-zinc-100">
                          <div className="h-full bg-zinc-900 rounded-full transition-all duration-1000" style={{ width: `${c.load}%` }}></div>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="lg:col-span-8 space-y-8">
            <div className="min-h-[600px] bg-zinc-900 rounded-[4rem] p-12 shadow-2xl flex flex-col items-center justify-center text-center space-y-8 relative overflow-hidden border border-white/5">
               <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" style={{ filter: 'url(#atomic-grain)' }}></div>
               <div className="w-32 h-32 rounded-full border-8 border-white/5 border-t-white animate-spin flex items-center justify-center text-4xl shadow-[0_0_50px_rgba(255,255,255,0.05)]">🌍</div>
               <div className="space-y-4">
                  <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter leading-none">Visual Overlay Offline</h3>
                  <p className="text-white/20 font-bold max-w-sm mx-auto uppercase tracking-widest text-[10px] leading-relaxed">Manual satellite telemetry link required for real-time node rendering. Ensure L7 Logistics clearance.</p>
               </div>
               <button className="px-14 py-6 bg-white text-zinc-900 rounded-[2.5rem] font-black text-[11px] uppercase tracking-[0.4em] shadow-2xl hover:scale-105 active:scale-95 transition-all">Initialize Satellite Feed</button>
            </div>
         </div>
      </div>
    </div>
  );
};
