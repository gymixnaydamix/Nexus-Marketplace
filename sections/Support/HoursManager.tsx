
import React from 'react';

export const HoursManager: React.FC = () => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 text-zinc-900">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">Operational Windows</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] md:text-sm mt-3 italic">Manual scheduling for network availability nodes.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-6">
          {days.map(day => (
            <div key={day} className="bg-white border border-zinc-100 p-8 rounded-[2.5rem] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-indigo-200 transition-all">
               <span className="font-black text-lg uppercase tracking-tight w-32">{day}</span>
               <div className="flex items-center gap-4 flex-1 justify-center">
                  <input type="text" defaultValue="09:00" className="w-24 bg-zinc-50 border border-zinc-100 rounded-xl p-3 text-center font-mono font-black" />
                  <span className="text-zinc-300 font-bold">to</span>
                  <input type="text" defaultValue="18:00" className="w-24 bg-zinc-50 border border-zinc-100 rounded-xl p-3 text-center font-mono font-black" />
               </div>
               <div className="flex items-center gap-4">
                  <div className="w-14 h-8 bg-emerald-500 rounded-full relative cursor-pointer">
                     <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Active</span>
               </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-5 space-y-8">
           <div className="bg-zinc-900 text-white p-12 rounded-[4rem] shadow-2xl relative overflow-hidden space-y-8">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 blur-3xl -mr-16 -mt-16"></div>
              <h3 className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em] font-black relative z-10">Global Override Protocol</h3>
              <p className="text-sm font-bold uppercase tracking-widest leading-relaxed relative z-10">Trigger manual system-wide support blackout for maintenance epochs.</p>
              <button className="w-full py-6 bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:bg-rose-700 transition-all active:scale-95">Enable Blackout Mode</button>
           </div>

           <div className="bg-white border border-zinc-100 p-10 rounded-[3.5rem] shadow-sm space-y-8">
              <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Timezone Convergence</h3>
              <div className="space-y-4">
                 {[
                   { zone: 'Nexus Core (UTC)', time: '04:42:01' },
                   { zone: 'European Sector', time: '05:42:01' },
                   { zone: 'Western Sector', time: '21:42:01' },
                 ].map(z => (
                   <div key={z.zone} className="flex justify-between items-center p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                      <span className="text-[10px] font-black uppercase text-zinc-500">{z.zone}</span>
                      <span className="font-mono font-black text-zinc-900">{z.time}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
