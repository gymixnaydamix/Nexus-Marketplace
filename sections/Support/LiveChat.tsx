
import React from 'react';

export const SupportChat: React.FC = () => {
  return (
    <div className="h-full flex flex-col text-zinc-900 animate-in fade-in duration-700">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Support Operations Feed</h1>
          <p className="text-zinc-500 font-medium mt-1 italic">Direct manual peer-to-peer communication terminal.</p>
        </div>
        <div className="flex gap-4">
           <div className="px-5 py-3 bg-emerald-50 text-emerald-600 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-3">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Ops Link Active
           </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8 min-h-0">
         <div className="lg:col-span-1 bg-zinc-50 border border-zinc-100 rounded-[3rem] p-6 flex flex-col space-y-4 overflow-y-auto no-scrollbar">
            <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-4">Active Channels</h3>
            {[
              { name: 'Sarah Wilson', status: 'Priority', time: '2m ago' },
              { name: 'Jordan Vane', status: 'Standard', time: '12m ago' },
              { name: 'Lia Sky', status: 'Escalated', time: '45m ago' },
            ].map(c => (
              <div key={c.name} className="p-4 bg-white border border-zinc-200 rounded-2xl hover:border-zinc-400 transition-all cursor-pointer group shadow-sm">
                 <div className="flex justify-between items-start">
                    <span className="font-bold text-sm text-zinc-800">{c.name}</span>
                    <span className="text-[9px] font-mono text-zinc-300 font-bold uppercase">{c.time}</span>
                 </div>
                 <p className={`text-[9px] font-black uppercase tracking-widest mt-2 ${c.status === 'Escalated' ? 'text-rose-500' : 'text-zinc-400'}`}>{c.status}</p>
              </div>
            ))}
         </div>

         <div className="lg:col-span-3 bg-white border border-zinc-100 rounded-[3rem] p-8 flex flex-col shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 space-y-6">
               <div className="w-20 h-20 bg-zinc-50 rounded-full border border-zinc-100 flex items-center justify-center text-3xl shadow-inner">💬</div>
               <div>
                  <h3 className="text-2xl font-black text-zinc-900">Communication Node Idle</h3>
                  <p className="text-zinc-400 font-medium mt-2 leading-relaxed">Select a terminal channel from the left matrix to initialize manual duplex link.</p>
               </div>
            </div>
            <div className="mt-auto pt-8 border-t border-zinc-100 relative z-10 flex gap-4">
               <input disabled placeholder="Terminal Locked: Select Session..." className="flex-1 bg-zinc-50 border border-zinc-200 rounded-2xl px-6 py-4 text-sm font-medium outline-none" />
               <button disabled className="px-8 py-4 bg-zinc-200 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all">Deploy</button>
            </div>
         </div>
      </div>
    </div>
  );
};
