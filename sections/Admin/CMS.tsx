
import React from 'react';
import { useApp } from '../../AppContext';
import { NAVIGATION } from '../../constants';

export const AdminCMS: React.FC = () => {
  const { refreshState } = useApp();

  return (
    <div className="space-y-12 text-zinc-900 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Nexus CMS Engine</h1>
          <p className="text-zinc-500 font-medium mt-1 italic">Structural mapping and semantic layout controller.</p>
        </div>
        <button 
          onClick={() => { alert('Global Manifest Updated'); refreshState(); }}
          className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-black transition-all"
        >
          Save Global Schema
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-bold">Navigational Hierarchy</h3>
          <div className="space-y-4">
            {NAVIGATION.map((section, idx) => (
              <div key={section.id} className="bg-white border border-zinc-100 p-6 rounded-[2rem] shadow-sm flex items-center justify-between group hover:border-zinc-300 transition-all">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center border border-zinc-100 shadow-inner">
                    <span className="font-black text-zinc-400">0{idx + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-800">{section.label}</h4>
                    <p className="text-xs text-zinc-400">{section.tabs.length} Contextual Tabs Defined</p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center shadow-lg">✎</button>
                   <button className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-100 text-zinc-400 flex items-center justify-center">×</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-50 rounded-[3rem] border border-zinc-100 p-10 space-y-8">
           <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-bold">Node Metadata Editor</h3>
           <div className="space-y-6">
              <div className="space-y-3">
                 <label className="text-xs font-black text-zinc-800 uppercase tracking-widest">Global Meta Title</label>
                 <input type="text" defaultValue="Nexus Marketplace OS | 2035 Edition" className="w-full bg-white border border-zinc-200 rounded-2xl p-4 text-sm font-bold text-zinc-700 shadow-sm" />
              </div>
              <div className="pt-6 border-t border-zinc-200 space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-zinc-800">Dynamic Sector Injection</span>
                    <div className="w-12 h-6 bg-zinc-900 rounded-full relative">
                       <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
