
import React from 'react';
import { DataTable } from '../../components/UI/DataTable';

export const DelRates: React.FC = () => {
  const rates = [
    { id: 'RT-001', carrier: 'Sky-Drone Logistics', tier: 'Express', base: 45, perKm: 1.2, status: 'Active' },
    { id: 'RT-002', carrier: 'Hyper-Rail North', tier: 'Heavy-Cargo', base: 120, perKm: 0.8, status: 'Active' },
    { id: 'RT-003', carrier: 'Nexus Surface Fleet', tier: 'Standard', base: 25, perKm: 0.5, status: 'Active' },
    { id: 'RT-004', carrier: 'Inter-World Cargo', tier: 'Orbital', base: 4500, perKm: 12.0, status: 'Restricted' },
  ];

  const columns = [
    { key: 'carrier', header: 'Carrier Node' },
    { key: 'tier', header: 'Service Tier' },
    { key: 'base', header: 'Base Fee', render: (r: any) => <span className="font-black text-zinc-900">${r.base.toLocaleString()}</span> },
    { key: 'perKm', header: 'Variable (per Km)', render: (r: any) => <span className="font-mono text-zinc-400">${r.perKm}</span> },
    { key: 'status', header: 'Protocol Status', render: (r: any) => (
      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${r.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
        {r.status}
      </span>
    )},
    { 
      key: 'actions', 
      header: 'Manual Adjustment',
      render: (r: any) => (
        <button className="px-3 py-1 bg-zinc-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-black transition-all">
           Edit Logic
        </button>
      )
    }
  ];

  return (
    <div className="space-y-10 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Logistics Fee Matrix</h1>
          <p className="text-zinc-500 font-medium mt-1">Manual configuration of cost-per-node delivery variables.</p>
        </div>
        <button className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl">Architect Rate</button>
      </div>

      <div className="flex-1 min-h-0">
        <DataTable data={rates} columns={columns} title="Active Pricing Tiers" />
      </div>

      <div className="bg-zinc-50 border border-zinc-100 p-8 rounded-[3rem] shadow-inner flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-xl">💰</div>
            <div>
               <p className="font-bold text-zinc-800">Dynamic Fuel Surcharge</p>
               <p className="text-[10px] text-zinc-400 font-mono uppercase font-black">Current: +4.2% (Manual Override Active)</p>
            </div>
         </div>
         <button className="px-6 py-3 border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white transition-all">Re-Sync Sector Costs</button>
      </div>
    </div>
  );
};
