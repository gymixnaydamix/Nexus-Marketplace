
import React from 'react';
import { DataTable } from '../../components/UI/DataTable';

export const DelCarriers: React.FC = () => {
  const carriers = [
    { id: 'C-01', name: 'Sky-Drone Logistics', type: 'Aerial', status: 'Optimal', coverage: 'Global' },
    { id: 'C-02', name: 'Hyper-Rail North', type: 'Maglev', status: 'Optimal', coverage: 'Regional' },
    { id: 'C-03', name: 'Nexus Surface Fleet', type: 'Autonomous Trucking', status: 'Degraded', coverage: 'Urban' },
    { id: 'C-04', name: 'Inter-World Cargo', type: 'Heavy Lift', status: 'Maintenance', coverage: 'Orbital' },
  ];

  const columns = [
    { key: 'name', header: 'Logistics Partner' },
    { key: 'type', header: 'Transport Vector' },
    { key: 'coverage', header: 'Sector Reach' },
    { key: 'status', header: 'Link State', render: (c: any) => (
      <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
        c.status === 'Optimal' ? 'bg-emerald-50 text-emerald-600' : 
        c.status === 'Degraded' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
      }`}>
        {c.status}
      </span>
    )},
    { 
      key: 'actions', 
      header: 'Manual Control',
      render: (c: any) => (
        <button className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-zinc-200">
          Sync Terminal
        </button>
      )
    }
  ];

  return (
    <div className="space-y-10 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Carrier Terminal Matrix</h1>
          <p className="text-zinc-500 font-medium mt-1 italic">Manual orchestration of global logistic nodes.</p>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <DataTable data={carriers} columns={columns} title="Authorized Logistic Clusters" />
      </div>
    </div>
  );
};
