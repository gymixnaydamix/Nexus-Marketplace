
import React from 'react';
import { useApp } from '../../AppContext';
import { DataTable } from '../../components/UI/DataTable';

export const SellDrafts: React.FC = () => {
  const { products, activeWorld } = useApp();
  
  const drafts = products.filter(p => p.status === 'draft' && p.world === activeWorld);

  const displayData = drafts.length > 0 ? drafts : [
    { id: 'D-1', title: 'Sample Draft 1', category: 'General', price: 100, status: 'draft' },
  ].map(d => ({ ...d, world: activeWorld } as any));

  const columns = [
    { key: 'title', header: 'Draft Name' },
    { key: 'category', header: 'Category' },
    { key: 'price', header: 'Price', render: (p: any) => `$${p.price.toLocaleString()}` },
    { 
      key: 'actions', 
      header: 'Actions',
      render: (p: any) => (
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-zinc-900 text-white rounded-lg text-[9px] font-black uppercase">Resume</button>
          <button className="px-3 py-1 border border-rose-100 text-rose-500 rounded-lg text-[9px] font-black uppercase">Delete</button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-10 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700 pb-20">
      <div className="flex justify-between items-end border-b border-zinc-50 pb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tight leading-none uppercase">Drafts</h1>
          <p className="text-zinc-500 font-bold mt-2 text-[10px] md:text-sm uppercase tracking-widest italic">Continue where you left off</p>
        </div>
        <div className="bg-zinc-50 border border-zinc-100 px-6 py-3 rounded-2xl flex items-center gap-4">
           <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Total Drafts:</span>
           <span className="text-lg font-black text-zinc-900">{displayData.length}</span>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <DataTable data={displayData} columns={columns} title="Your Unfinished Listings" />
      </div>

      <div className="bg-zinc-900 text-white p-10 rounded-[3rem] shadow-2xl flex flex-col md:flex-row justify-between items-center gap-8">
         <div className="flex-1">
            <h3 className="text-2xl font-black uppercase tracking-tighter leading-none">Autosave Active</h3>
            <p className="text-white/40 font-bold mt-2 text-[10px] uppercase tracking-widest">All changes are saved locally as you work.</p>
         </div>
         <button className="px-10 py-5 bg-white text-zinc-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl">Sync to Cloud</button>
      </div>
    </div>
  );
};
