
import React from 'react';
import { DataTable } from '../../components/UI/DataTable';

export const SupportCanned: React.FC = () => {
  const macros = [
    { id: 'M-01', title: 'Greeting Protocol', text: 'Protocol initialized. How may the Nexus assist your current deployment?', category: 'General' },
    { id: 'M-02', title: 'Refund Scrutiny', text: 'Your request has been routed to the manual mediation vault. Please wait for epoch sync.', category: 'Finance' },
    { id: 'M-03', title: 'Delivery Latency', text: 'Operational delay detected in the local carrier node. Tracking sequence updated.', category: 'Logistics' },
    { id: 'M-04', title: 'KYC Block', text: 'Bio-data verification failed. Please re-deploy your primary identity manifest.', category: 'Safety' },
  ];

  const columns = [
    { key: 'title', header: 'Macro Name' },
    { key: 'category', header: 'Support Sector' },
    { key: 'text', header: 'Response Content', render: (m: any) => <span className="text-zinc-500 italic truncate max-w-[300px] block">"{m.text}"</span> },
    { 
      key: 'actions', 
      header: 'Manual Actions',
      render: (m: any) => (
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-zinc-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-md">Copy</button>
          <button className="px-3 py-1 border border-zinc-200 rounded-lg text-[9px] font-black uppercase tracking-widest text-zinc-400">Edit</button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-10 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Canned Response Matrix</h1>
          <p className="text-zinc-500 font-medium mt-1 italic">Manual macros for high-velocity support operations.</p>
        </div>
        <button className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl">Architect Macro</button>
      </div>

      <div className="flex-1 min-h-0">
        <DataTable data={macros} columns={columns} title="Active Support Snippets" />
      </div>
    </div>
  );
};
