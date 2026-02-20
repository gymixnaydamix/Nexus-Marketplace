
import React from 'react';
import { DataTable } from '../../components/UI/DataTable';

export const DelHandover: React.FC = () => {
  const points = [
    { id: 'HP-102', location: 'Metropolitan Pad 04', type: 'Drone-to-Surface', queue: 12, capacity: 'High' },
    { id: 'HP-108', location: 'Hyper-Rail Terminal B', type: 'Rail-to-Drone', queue: 45, capacity: 'Saturated' },
    { id: 'HP-201', location: 'Deep Water Port 9', type: 'Sea-to-Rail', queue: 3, capacity: 'Optimal' },
  ];

  const columns = [
    { key: 'location', header: 'Physical Node' },
    { key: 'type', header: 'Transfer Vector' },
    { key: 'queue', header: 'Active Payload', render: (p: any) => <span className="font-black">{p.queue} Assets</span> },
    { key: 'capacity', header: 'Node Load', render: (p: any) => (
      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
        p.capacity === 'Optimal' ? 'bg-emerald-50 text-emerald-600' : 
        p.capacity === 'Saturated' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
      }`}>
        {p.capacity}
      </span>
    )},
    { 
      key: 'actions', 
      header: 'Manual Signal',
      render: (p: any) => (
        <button className="px-3 py-1 bg-zinc-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">
           Ping Node
        </button>
      )
    }
  ];

  return (
    <div className="space-y-10 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Handover Matrix</h1>
          <p className="text-zinc-500 font-medium mt-1">Manual coordination of transfer points across transport modalities.</p>
        </div>
        <button className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl">Initialize Node</button>
      </div>

      <div className="flex-1 min-h-0">
        <DataTable data={points} columns={columns} title="Active Transfer Hubs" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-white border border-zinc-100 p-8 rounded-[3rem] shadow-sm flex flex-col justify-center text-center space-y-4">
            <h4 className="text-3xl font-black">14.2s</h4>
            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black">Avg Handover Latency</p>
         </div>
         <div className="md:col-span-2 bg-zinc-900 text-white p-8 rounded-[3rem] shadow-2xl flex items-center gap-10">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl">📡</div>
            <div>
               <h4 className="text-xl font-black">Real-Time Telemetry Link</h4>
               <p className="text-white/40 text-xs mt-1 leading-relaxed">Direct manual uplink to Handover Hubs requires L7 Logistics Clearance. Ensure bio-metrics are synchronized before attempting link.</p>
            </div>
         </div>
      </div>
    </div>
  );
};
