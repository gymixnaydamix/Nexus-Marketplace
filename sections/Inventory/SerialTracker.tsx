
import React, { useState } from 'react';
import { useApp } from '../../AppContext';
import { DataTable } from '../../components/UI/DataTable';

export const SerialTracker: React.FC = () => {
  const { products, activeWorld } = useApp();
  const worldProducts = products.filter(p => p.world === activeWorld);

  const [units, setUnits] = useState([
    { id: 'SN-882-01', asset: worldProducts[0]?.title || 'Nexus Pro', batch: 'BATCH-A', status: 'In Warehouse', warehouse: 'WH-NE-01' },
    { id: 'SN-882-02', asset: worldProducts[0]?.title || 'Nexus Pro', batch: 'BATCH-A', status: 'Shipped', warehouse: 'WH-NE-01' },
    { id: 'SN-441-09', asset: worldProducts[1]?.title || 'Aether X', batch: 'BATCH-C', status: 'In Warehouse', warehouse: 'WH-EU-05' },
  ]);

  const columns = [
    { key: 'id', header: 'Serial ID (Manual)', render: (u: any) => <code className="text-[11px] font-black">{u.id}</code> },
    { key: 'asset', header: 'Parent Asset' },
    { key: 'batch', header: 'Batch Node' },
    { key: 'warehouse', header: 'Local Node' },
    { key: 'status', header: 'State', render: (u: any) => (
      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${u.status === 'Shipped' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
        {u.status}
      </span>
    )},
    {
      key: 'actions',
      header: 'Manual Control',
      render: (u: any) => (
        <button className="px-3 py-1 bg-zinc-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">Update State</button>
      )
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-700 text-zinc-900 pb-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-zinc-50 pb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none text-zinc-900 uppercase">Serial Ledger</h1>
          <p className="text-zinc-500 font-bold mt-2 uppercase text-[10px] tracking-widest italic">Manual Granular Asset Lifecycle Tracking</p>
        </div>
        <button className="px-10 py-5 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Enroll Unit Range</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
         <div className="bg-zinc-900 text-white p-8 rounded-[3rem] shadow-2xl flex flex-col justify-center">
            <p className="text-[10px] font-mono uppercase tracking-[0.4em] opacity-40 mb-3">Total Tracked Units</p>
            <h2 className="text-4xl font-black tabular-nums">{units.length * 142}</h2>
         </div>
         <div className="md:col-span-3 bg-zinc-50 border border-zinc-100 p-8 rounded-[3rem] shadow-inner flex items-center gap-10">
            <div className="w-16 h-16 rounded-[1.8rem] bg-white border border-zinc-200 flex items-center justify-center text-3xl">🔍</div>
            <div>
               <h4 className="font-black text-zinc-800 uppercase tracking-tight">Manual Checksum verification</h4>
               <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest leading-relaxed max-w-md mt-1">Due to Protocol 2035 security standards, all unit serials must be manually cross-referenced against the physical manifest before dispatch.</p>
            </div>
         </div>
      </div>

      <div className="flex-1 min-h-0">
        <DataTable data={units} columns={columns} title="Primary Unit Matrix" />
      </div>
    </div>
  );
};
