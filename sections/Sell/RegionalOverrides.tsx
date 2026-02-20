
import React, { useState } from 'react';
import { useApp } from '../../AppContext';
import { DataTable } from '../../components/UI/DataTable';

export const RegionalOverrides: React.FC = () => {
  const { products, activeWorld } = useApp();
  const worldProducts = products.filter(p => p.world === activeWorld);
  
  const regions = [
    { id: 'NA', name: 'North America', multiplier: 1.0 },
    { id: 'EU', name: 'European Union', multiplier: 1.15 },
    { id: 'SEA', name: 'Southeast Asia', multiplier: 0.95 },
    { id: 'NZ', name: 'Neutral Zone', multiplier: 1.05 },
  ];

  const columns = [
    { key: 'title', header: 'Product Asset' },
    { key: 'price', header: 'Base Global Value', render: (i: any) => <span className="font-mono">$ {i.price.toLocaleString()}</span> },
    { 
      key: 'overrides', 
      header: 'Node Exceptions', 
      render: (i: any) => (
        <div className="flex gap-2">
           <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[9px] font-black uppercase">EU (+15%)</span>
           <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[9px] font-black uppercase">SEA (-5%)</span>
        </div>
      )
    },
    { 
      key: 'actions', 
      header: 'Manual Override',
      render: (i: any) => (
        <button className="px-3 py-1 bg-zinc-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-black">Configure Nodes</button>
      )
    }
  ];

  return (
    <div className="space-y-10 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700 pb-20">
      <div>
        <h1 className="text-3xl md:text-5xl font-black text-zinc-900 tracking-tight leading-none">Fiscal Vector Overrides</h1>
        <p className="text-zinc-500 mt-2 text-[10px] md:text-sm font-bold uppercase tracking-widest italic">Manual Price Tuning per Logistics Node</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {regions.map(r => (
          <div key={r.id} className="bg-white border border-zinc-100 p-6 rounded-[2.5rem] shadow-sm space-y-4">
             <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-zinc-300 font-bold uppercase">{r.id} SECTOR</span>
                <span className={`px-2 py-0.5 rounded text-[8px] font-black ${r.multiplier >= 1 ? 'bg-rose-50 text-rose-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {r.multiplier >= 1 ? `+${Math.round((r.multiplier - 1) * 100)}%` : `${Math.round((r.multiplier - 1) * 100)}%`}
                </span>
             </div>
             <h3 className="text-lg font-black text-zinc-800">{r.name}</h3>
             <button className="w-full py-2 bg-zinc-50 border border-zinc-100 rounded-xl text-[9px] font-black uppercase tracking-widest text-zinc-400 hover:text-zinc-900 hover:border-zinc-300 transition-all">Adjust Global multiplier</button>
          </div>
        ))}
      </div>

      <div className="flex-1 min-h-0">
        <DataTable data={worldProducts} columns={columns} title="Asset Price Matrix" />
      </div>
    </div>
  );
};
