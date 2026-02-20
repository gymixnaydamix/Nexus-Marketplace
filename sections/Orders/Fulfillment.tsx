
import React from 'react';
import { useApp } from '../../AppContext';
import { DataTable } from '../../components/UI/DataTable';

export const FulfillPick: React.FC = () => {
  const { orders, products } = useApp();
  
  const pickQueue = orders.filter(o => o.status === 'processing').map(o => ({
    id: o.id,
    target: products.find(p => p.id === o.productId)?.title || 'Unknown',
    location: `Aisle ${Math.floor(Math.random() * 20) + 1} - Rack ${Math.floor(Math.random() * 10) + 1}`,
    quantity: 1,
    priority: o.total > 5000 ? 'Critical' : 'Standard'
  }));

  const columns = [
    { key: 'id', header: 'Task ID', render: (i: any) => <span className="font-mono text-zinc-400">#{i.id.slice(-6)}</span> },
    { key: 'target', header: 'Asset Title' },
    { key: 'location', header: 'Physical Vector' },
    { key: 'priority', header: 'SLA Priority', render: (i: any) => (
      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
        i.priority === 'Critical' ? 'bg-rose-50 text-rose-600' : 'bg-zinc-100 text-zinc-400'
      }`}>
        {i.priority}
      </span>
    )},
    { 
      key: 'actions', 
      header: 'Manual Confirmation',
      render: (i: any) => (
        <button className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">
           Confirm Pick
        </button>
      )
    }
  ];

  return (
    <div className="space-y-10 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700 pb-20 md:pb-0">
      
      <div className="flex justify-end border-b border-zinc-50 pb-6">
        <button className="px-8 py-3.5 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Generate Batch Slips</button>
      </div>

      <div className="flex-1 min-h-0">
        <DataTable data={pickQueue} columns={columns} title="Active Retrieval Matrix" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {[
          { label: 'Pending Retrieval', value: pickQueue.length },
          { label: 'Awaiting Packing', value: '42' },
          { label: 'Carrier Handover', value: '18' },
          { label: 'Shift Velocity', value: '15.4 / hr' },
        ].map((s, i) => (
          <div key={i} className="bg-zinc-50 p-6 md:p-8 rounded-[2.5rem] border border-zinc-100 text-center shadow-inner">
            <p className="text-[9px] font-mono text-zinc-400 uppercase tracking-[0.2em] font-black">{s.label}</p>
            <p className="text-xl md:text-3xl font-black text-zinc-900 mt-2 tabular-nums">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
