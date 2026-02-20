
import React from 'react';
import { useApp } from '../../AppContext';

export const SetAccount: React.FC = () => {
  const { currentUser } = useApp();

  return (
    <div className="space-y-12 text-zinc-900 animate-in fade-in duration-700">
      <div>
        <h1 className="text-4xl font-black tracking-tight">Identity Profile</h1>
        <p className="text-zinc-500 font-medium mt-1 italic">Manage your bio-data and platform clearance credentials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         <div className="lg:col-span-1 space-y-8">
            <div className="aspect-square bg-zinc-900 rounded-[3rem] shadow-2xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-transparent"></div>
               <div className="absolute inset-0 flex items-center justify-center text-6xl font-black text-white/10 group-hover:text-white/30 transition-all">
                  {currentUser.name[0]}
               </div>
               <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white font-black text-xl">{currentUser.name}</h3>
                  <p className="text-white/40 font-mono text-[10px] uppercase tracking-widest">{currentUser.role} Level 9</p>
               </div>
            </div>
            <button className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Deploy New Avatar</button>
         </div>

         <div className="lg:col-span-2 space-y-10 bg-white border border-zinc-100 p-12 rounded-[3.5rem] shadow-sm">
            <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Protocol Bio-Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-2">
                  <label className="text-xs font-black text-zinc-800 uppercase tracking-widest">Communications E-Mail</label>
                  <input type="email" defaultValue={currentUser.email} className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-4 text-sm font-bold" />
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-black text-zinc-800 uppercase tracking-widest">Assigned Sector World</label>
                  <input type="text" disabled defaultValue={currentUser.world} className="w-full bg-zinc-100 border border-zinc-200 rounded-2xl p-4 text-sm font-bold text-zinc-400" />
               </div>
            </div>
            <div className="pt-10 border-t border-zinc-100 space-y-8">
               <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold">Security Core (MFA)</h3>
               <div className="flex items-center justify-between p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                  <div className="flex items-center gap-5">
                     <span className="text-2xl">📱</span>
                     <div>
                        <p className="font-bold text-emerald-900">Bio-Metric Secondary Auth</p>
                        <p className="text-xs text-emerald-700/60 font-medium">Currently linked to Nexus ID #8292</p>
                     </div>
                  </div>
                  <button className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Revoke Link</button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
