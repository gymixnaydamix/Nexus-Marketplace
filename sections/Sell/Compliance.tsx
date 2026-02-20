
import React, { useState } from 'react';
import { useApp } from '../../AppContext';
import { DataTable } from '../../components/UI/DataTable';

export const SellCompliance: React.FC = () => {
  const { activeWorld } = useApp();
  const docs = [
    { id: 'DOC-992', title: 'Trading Authorization', status: 'Verified', type: 'Legal', world: activeWorld },
    { id: 'DOC-102', title: 'Product Safety Cert', status: 'Pending', type: 'Technical', world: activeWorld },
    { id: 'DOC-441', title: 'Brand Ownership', status: 'Verified', type: 'Identity', world: activeWorld },
  ];

  const columns = [
    { key: 'title', header: 'Requirement Name' },
    { key: 'type', header: 'Document Vector' },
    { key: 'status', header: 'Integrity State', render: (i: any) => (
      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
        i.status === 'Verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
      }`}>
        {i.status}
      </span>
    )},
    { 
      key: 'actions', 
      header: 'Manual Control',
      render: (i: any) => (
        <button className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
          Inspect Vault
        </button>
      )
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 text-zinc-900 pb-32">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter uppercase leading-none">Compliance Hub</h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] md:text-sm">Sector Safeguard: {activeWorld}</p>
        </div>
        <div className="flex gap-4 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Enroll Brand Registry</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-10">
          <DataTable data={docs} columns={columns} title="Entity Document Matrix" />
          
          <div className="bg-zinc-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 blur-3xl -mr-16 -mt-16 group-hover:bg-white/10 transition-colors"></div>
            <h3 className="text-2xl font-black mb-4">Manual Restriction Override</h3>
            <p className="text-white/40 text-sm leading-relaxed mb-10 max-w-lg">Apply manual exemptions for specific listing nodes or actors within this world sector. Authorization L7 required.</p>
            <button className="px-10 py-5 bg-white text-zinc-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">Request Authorization</button>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white border border-zinc-100 p-8 rounded-[3.5rem] shadow-sm space-y-8">
              <h3 className="font-mono text-[10px] text-zinc-300 uppercase tracking-widest font-black">Category Restrictions</h3>
              <div className="space-y-3">
                 {[
                   { cat: 'Restricted Chemicals', state: 'BLOCKED' },
                   { cat: 'High-Value Assets', state: 'L9_REQUIRED' },
                   { cat: 'Cross-Border Nodes', state: 'SCRUTINY' },
                 ].map(c => (
                   <div key={c.cat} className="p-5 bg-zinc-50 border border-zinc-100 rounded-2xl flex justify-between items-center group hover:border-indigo-200 transition-all">
                      <span className="text-xs font-black text-zinc-700 uppercase tracking-tight">{c.cat}</span>
                      <span className="text-[9px] font-mono font-black text-zinc-400 group-hover:text-zinc-900">{c.state}</span>
                   </div>
                 ))}
              </div>
              <button className="w-full py-4 border-2 border-dashed border-zinc-100 rounded-2xl font-mono text-[10px] text-zinc-300 font-black uppercase hover:border-zinc-300 hover:text-zinc-400 transition-all">Update Restrictions</button>
           </div>
        </div>
      </div>
    </div>
  );
};
