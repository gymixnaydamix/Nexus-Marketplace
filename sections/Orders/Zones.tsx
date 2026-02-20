
import React from 'react';
import { DataTable } from '../../components/UI/DataTable';

export const DelZones: React.FC = () => {
  const zones = [
    { id: 'ZN-01', name: 'Core Metropolis', risk: 'Low', status: 'Optimal', reach: 'Drone-Only' },
    { id: 'ZN-02', name: 'Industrial Belt', risk: 'Medium', status: 'Restricted', reach: 'Surface/Rail' },
    { id: 'ZN-03', name: 'Outer Colonies', risk: 'High', status: 'Maintenance', reach: 'Orbital-Only' },
    { id: 'ZN-04', name: 'Neutral Zone 4', risk: 'Critical', status: 'Locked', reach: 'N/A' },
  ];

  const columns = [
    { key: 'name', header: 'Sector Name' },
    { key: 'reach', header: 'Transit Vector' },
    { key: 'risk', header: 'Risk Profile', render: (z: any) => (
      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
        z.risk === 'Low' ? 'bg-emerald-50 text-emerald-600' : 
        z.risk === 'Medium' ? 'bg-amber-50 text-amber-600' : 
        'bg-rose-50 text-rose-600'
      }`}>
        {z.risk}
      </span>
    )},
    { key: 'status', header: 'Link State' },
    { 
      key: 'actions', 
      header: 'Manual Control',
      render: (z: any) => (
        <button className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black shadow-xl">
           Isolate Sector
        </button>
      )
    }
  ];

  return (
    <div className="space-y-10 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Geospatial Sector Grid</h1>
          <p className="text-zinc-500 font-medium mt-1">Manual definition of valid logistics delivery boundaries.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 min-h-0">
         <div className="lg:col-span-3">
            <DataTable data={zones} columns={columns} title="Authorized Delivery Sectors" />
         </div>
         <div className="lg:col-span-1 bg-zinc-900 text-white p-8 rounded-[3rem] shadow-2xl flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-3xl -mr-16 -mt-16"></div>
            <h3 className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] font-bold mb-8">Node Security Protocols</h3>
            <div className="space-y-6 flex-1">
               {[
                 { label: 'Airspace Auth', status: 'ACTIVE' },
                 { label: 'Ground Access', status: 'ACTIVE' },
                 { label: 'Bio-Fencing', status: 'DISABLED' },
               ].map(s => (
                 <div key={s.label} className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-tight">{s.label}</span>
                    <span className={`text-[10px] font-black ${s.status === 'ACTIVE' ? 'text-emerald-400' : 'text-rose-400'}`}>{s.status}</span>
                 </div>
               ))}
            </div>
            <button className="w-full py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-[1.02] transition-transform">Emergency Perimeter Seal</button>
         </div>
      </div>
    </div>
  );
};
