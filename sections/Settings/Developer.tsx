
import React, { useState } from 'react';

export const SetAPI: React.FC = () => {
  const [keys, setKeys] = useState([
    { label: 'Production Nexus v4', key: 'nx_pk_live_8292839283928392', date: 'Linked 2h ago' },
    { label: 'Sandbox Mock Cluster', key: 'nx_sk_test_1029301930193019', date: 'Linked 4d ago' },
  ]);

  const generateKey = () => {
    const label = prompt("Enter Node Label (e.g. Analytics Link):");
    if (!label) return;
    const newKey = {
      label,
      key: `nx_${Math.random().toString(36).substring(2)}_${Math.random().toString(36).substring(2)}`,
      date: 'Just Synchronized'
    };
    setKeys([newKey, ...keys]);
  };

  const rollKey = (index: number) => {
    if (confirm("Rotate this sequence code? Any legacy nodes will lose link.")) {
      const newKeys = [...keys];
      newKeys[index].key = `nx_rolled_${Math.random().toString(36).substring(2)}`;
      newKeys[index].date = 'Updated Now';
      setKeys(newKeys);
    }
  };

  return (
    <div className="space-y-12 text-zinc-900 animate-in fade-in duration-700 pb-20">
      <div>
        <h1 className="text-4xl font-black tracking-tight leading-none text-zinc-900">Developer Kernel Link</h1>
        <p className="text-zinc-500 font-bold mt-2 uppercase text-[10px] tracking-widest italic">Manual generation of secret keys and webhook endpoints.</p>
      </div>

      <div className="space-y-8">
         <div className="bg-zinc-900 text-white p-12 rounded-[3.5rem] shadow-2xl space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full -mr-32 -mt-32"></div>
            <div className="flex justify-between items-center relative z-10">
               <h3 className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] font-black">Active Identity keys</h3>
               <button 
                 onClick={generateKey}
                 className="px-10 py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all"
               >
                 Generate Master Key
               </button>
            </div>
            <div className="space-y-4 relative z-10">
               {keys.map((k, i) => (
                 <div key={k.key} className="p-6 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all shadow-inner">
                    <div className="flex items-center gap-6">
                       <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl group-hover:bg-white/10 transition-colors">🔑</div>
                       <div>
                          <p className="font-black text-sm uppercase tracking-tight text-white/90">{k.label}</p>
                          <p className="font-mono text-[11px] text-white/20 mt-1 select-all break-all">{k.key}</p>
                       </div>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] font-mono text-white/20 font-black uppercase mb-3">{k.date}</p>
                       <button 
                         onClick={() => rollKey(i)}
                         className="text-[9px] font-black uppercase tracking-widest text-indigo-400 hover:text-indigo-300 border-b border-indigo-400/20 pb-1"
                       >
                         Roll Sequence
                       </button>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <div className="bg-white border border-zinc-100 p-12 rounded-[3.5rem] shadow-sm space-y-10">
            <h3 className="font-mono text-[10px] text-zinc-300 uppercase tracking-widest font-black">Webhook Directives</h3>
            <div className="space-y-6">
               <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 gap-6">
                  <div className="flex items-center gap-6 w-full md:w-auto">
                     <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-2xl shadow-sm">🔗</div>
                     <div>
                        <p className="font-black text-zinc-800 text-lg uppercase tracking-tight">Order Lifecycle Webhook</p>
                        <p className="font-mono text-[10px] text-zinc-400 mt-1 uppercase tracking-widest font-bold">https://api.external-logistics.net/v1/sync</p>
                     </div>
                  </div>
                  <div className="flex gap-4 w-full md:w-auto">
                     <button className="flex-1 md:flex-none px-6 py-3 border border-zinc-200 bg-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-zinc-300 transition-all">Test Ping</button>
                     <button className="flex-1 md:flex-none px-6 py-3 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-100 transition-all">Disable</button>
                  </div>
               </div>
               <button className="w-full py-5 border-2 border-dashed border-zinc-100 rounded-[2.5rem] font-mono text-[11px] text-zinc-300 uppercase tracking-[0.3em] font-black hover:border-zinc-200 hover:text-zinc-400 transition-all active:bg-zinc-50">
                  Append Webhook Endpoint
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};
