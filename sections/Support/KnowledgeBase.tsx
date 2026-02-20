
import React from 'react';
import { DataTable } from '../../components/UI/DataTable';

export const SupportArticles: React.FC = () => {
  const articles = [
    { id: 'KB-01', title: 'Managing Electronics Escrow', category: 'Finance', status: 'published', lastUpdated: '2035-05-01' },
    { id: 'KB-02', title: 'Car Sector Shipping Protocol', category: 'Logistics', status: 'published', lastUpdated: '2035-05-10' },
    { id: 'KB-03', title: 'Real Estate Title Verification', category: 'Safety', status: 'draft', lastUpdated: '2035-05-12' },
  ];

  const columns = [
    { key: 'title', header: 'Article Title' },
    { key: 'category', header: 'Knowledge Sector' },
    { key: 'status', header: 'State', render: (i: any) => (
      <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${i.status === 'published' ? 'bg-emerald-50 text-emerald-600' : 'bg-zinc-100 text-zinc-400'}`}>
        {i.status}
      </span>
    )},
    { key: 'lastUpdated', header: 'Sync Date' },
    { 
      key: 'actions', 
      header: 'Manual Edit',
      render: (i: any) => (
        <button className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-zinc-900 transition-colors">✎</button>
      )
    }
  ];

  return (
    <div className="space-y-10 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Manual Knowledge Core</h1>
          <p className="text-zinc-500 font-medium mt-1">Curate deterministic help articles for network actors.</p>
        </div>
        <button className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl">Architect Article</button>
      </div>
      <div className="flex-1 min-h-0">
        <DataTable data={articles} columns={columns} title="Knowledge Inventory" />
      </div>
    </div>
  );
};
