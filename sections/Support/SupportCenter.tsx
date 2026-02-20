
import React from 'react';
import { useApp } from '../../AppContext';
import { DataTable } from '../../components/UI/DataTable';

export const SupportInbox: React.FC = () => {
  const tickets = [
    { id: 'tk-1', subject: 'Refund Request for Neural Phone', priority: 'High', status: 'Open', user: 'Mark S.', age: '2h' },
    { id: 'tk-2', subject: 'Delivery Delay - Neo Tokyo', priority: 'Medium', status: 'Pending', user: 'Luna R.', age: '5h' },
    { id: 'tk-3', subject: 'Verification Documents Help', priority: 'Low', status: 'Resolved', user: 'Dave K.', age: '1d' },
    { id: 'tk-4', subject: 'Payment Method Not Working', priority: 'High', status: 'Open', user: 'Sarah W.', age: '30m' },
  ];

  const columns = [
    { key: 'id', header: 'Ticket ID' },
    { key: 'subject', header: 'Subject' },
    { key: 'user', header: 'Requester' },
    { 
      key: 'priority', 
      header: 'Priority',
      render: (item: any) => (
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
          item.priority === 'High' ? 'bg-rose-100 text-rose-600' : 
          item.priority === 'Medium' ? 'bg-amber-100 text-amber-600' : 
          'bg-emerald-100 text-emerald-600'
        }`}>
          {item.priority}
        </span>
      )
    },
    { key: 'age', header: 'SLA Age' },
    { key: 'status', header: 'Status' },
  ];

  return (
    <div className="h-full flex flex-col gap-6 text-zinc-900 pb-20">
      
      {/* Redundant headers removed */}
      <div className="flex justify-end border-b border-zinc-50 pb-6">
           {/* Support status indicator removed per request */}
      </div>

      <div className="flex-1 min-h-0">
        <DataTable data={tickets} columns={columns} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Response', value: '14m' },
          { label: 'SLA Breach', value: '0.4%' },
          { label: 'Resolved', value: '142' },
          { label: 'Critical', value: '4' },
        ].map((s, i) => (
          <div key={i} className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 shadow-inner text-center">
            <p className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest font-bold">{s.label}</p>
            <p className="text-xl font-black mt-1 text-zinc-800">{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
