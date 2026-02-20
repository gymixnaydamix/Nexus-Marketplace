
import React, { useState } from 'react';
import { DataTable } from '../../components/UI/DataTable';

export const ExchangeRates: React.FC = () => {
  const [rates, setRates] = useState([
    { id: 'XR-1', pair: 'USD / EUR', rate: '0.92', updated: '2m ago', status: 'Stable' },
    { id: 'XR-2', pair: 'USD / NEXUS-CREDIT', rate: '450.42', updated: '12m ago', status: 'Volatile' },
    { id: 'XR-3', pair: 'USD / GOLD-TROY', rate: '0.00042', updated: '45m ago', status: 'Stable' },
    { id: 'XR-4', pair: 'USD / JPY', rate: '154.20', updated: '1h ago', status: 'Synced' },
  ]);

  const columns = [
    { key: 'pair', header: 'Currency Node Pair' },
    { key: 'rate', header: 'Conversion Magnitude', render: (r: any) => <span className="font-mono font-black text-zinc-900">{r.rate}</span> },
    { key: 'updated', header: 'Final Pulse' },
    { 
      key: 'status', 
      header: 'Integrity', 
      render: (r: any) => (
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${r.status === 'Stable' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
          {r.status}
        </span>
      )
    },
    {
      key: 'actions',
      header: 'Manual Override',
      render: (r: any) => (
        <button className="px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-black transition-all">Force Sync</button>
      )
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 text-zinc-900 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-zinc-50 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-zinc-900 uppercase">Exchange Ledger</h1>
          <p className="text-zinc-500 font-bold mt-2 uppercase text-[10px] tracking-widest italic">Manual Fiscal Bridge & Multi-Currency Synthesis</p>
        </div>
        <button className="px-10 py-5 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Update Reserve Peg</button>
      </div>

      <div className="flex-1 min-h-0">
        <DataTable data={rates} columns={columns} title="Global Currency Interconnect" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         <div className="bg-zinc-50 border border-zinc-100 p-10 rounded-[3.5rem] shadow-inner space-y-8">
            <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-black">Inter-World Settlement Fee</h3>
            <div className="flex items-end justify-between border-b border-zinc-200 pb-8">
               <div className="space-y-1">
                  <p className="text-xs font-black text-zinc-400 uppercase tracking-widest leading-none">Net Synthesis Levy</p>
                  <p className="text-5xl font-black tracking-tighter text-zinc-900">2.5%</p>
               </div>
               <button className="px-6 py-3 bg-zinc-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest active:scale-95">Adjust Protocol</button>
            </div>
         </div>
         <div className="bg-white border-2 border-zinc-900 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden flex flex-col justify-center">
            <h4 className="text-2xl font-black uppercase tracking-tighter text-zinc-900 mb-2">Automated Forex Paused</h4>
            <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest leading-relaxed">Due to Protocol 2035 security hardening, all currency magnitudes must be manually pegged to the Nexus Central Ledger every 6 epoch hours.</p>
         </div>
      </div>
    </div>
  );
};
