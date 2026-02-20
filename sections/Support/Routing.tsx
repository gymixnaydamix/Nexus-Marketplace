
import React from 'react';
import { DataTable } from '../../components/UI/DataTable';

export const SupportRouting: React.FC = () => {
  const rules = [
    { id: 'RR-01', trigger: 'Refund > $500', target: 'Finance Cluster', priority: 'High', status: 'Active' },
    { id: 'RR-02', trigger: 'Seller Dispute', target: 'Moderation Hub', priority: 'Critical', status: 'Active' },
    { id: 'RR-03', trigger: 'General Inquiry', target: 'Level 1 Support', priority: 'Standard', status: 'Active' },
  ];

  const columns = [
    { key: 'trigger', header: 'Trigger Condition' },
    { key: 'target', header: 'Dest. Cluster' },
    { key: 'priority', header: 'Priority Level' },
    { key: 'status', header: 'Link State' },
    {
      key: 'actions',
      header: 'Manual Logic',
      render: (r: any) => (
        <button className="px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">Edit Logic</button>
      )
    }
  ];

  return (
    <div className="space-y-10 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight">SLA Routing Matrix</h1>
          <p className="text-zinc-500 font-medium mt-1 italic">Manual determination of ticket flow and priority escalation.</p>
        </div>
        <button className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl">New Routing Rule</button>
      </div>

      <div className="flex-1 min-h-0">
        <DataTable data={rules} columns={columns} title="Active Routing Topology" />
      </div>
    </div>
  );
};
