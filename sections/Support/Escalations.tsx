
import React from 'react';
import { DataTable } from '../../components/UI/DataTable';

export const SupportEscalations: React.FC = () => {
  const escalations = [
    { id: 'ESC-901', ticketId: 'tk-1', priority: 'CRITICAL', reason: 'Repeated Dispute Failure', level: 3, age: '12m' },
    { id: 'ESC-902', ticketId: 'tk-8', priority: 'HIGH', reason: 'High-Value Refund Block', level: 2, age: '45m' },
    { id: 'ESC-903', ticketId: 'tk-14', priority: 'HIGH', reason: 'Regulatory Inquiry', level: 2, age: '2h' },
  ];

  const columns = [
    { key: 'id', header: 'Escalation ID' },
    { key: 'ticketId', header: 'Source Ticket' },
    { key: 'reason', header: 'Trigger Vector' },
    { key: 'level', header: 'Clearance Req', render: (i: any) => <span className="font-black">L{i.level} Admin</span> },
    { key: 'priority', header: 'Priority', render: (i: any) => (
      <span className={`px-2 py-1 rounded-lg text-[9px] font-black tracking-widest ${i.priority === 'CRITICAL' ? 'bg-rose-600 text-white shadow-lg shadow-rose-200' : 'bg-amber-100 text-amber-600'}`}>
        {i.priority}
      </span>
    )},
    { 
      key: 'actions', 
      header: 'Intervention',
      render: (i: any) => (
        <button className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Take Ownership</button>
      )
    }
  ];

  return (
    <div className="space-y-10 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Escalation Oversight</h1>
          <p className="text-zinc-500 font-medium mt-1 italic">High-tier manual intervention for complex operational failures.</p>
        </div>
        <div className="bg-rose-50 border border-rose-100 px-6 py-3 rounded-2xl flex items-center gap-4">
           <div className="text-right">
             <p className="text-[9px] font-mono uppercase tracking-widest text-rose-400">Critical Load</p>
             <p className="text-lg font-black text-rose-700">Level 3 Protocol Active</p>
           </div>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <DataTable data={escalations} columns={columns} title="Active Escalation Queue" />
      </div>
    </div>
  );
};
