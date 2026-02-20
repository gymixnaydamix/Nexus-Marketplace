
import React from 'react';
import { useApp } from '../../AppContext';
import { DataTable } from '../../components/UI/DataTable';

export const SafeDisputes: React.FC = () => {
  const { orders } = useApp();
  
  const disputes = [
    { id: 'DSP-829', orderId: 'ord-101', type: 'Quality Issue', status: 'In Mediation', priority: 'High', age: '4h' },
    { id: 'DSP-830', orderId: 'ord-102', type: 'Delivery Breach', status: 'Evidence Required', priority: 'Critical', age: '12m' },
    { id: 'DSP-831', orderId: 'ord-103', type: 'Payment Dispute', status: 'Escalated', priority: 'Medium', age: '2d' },
  ];

  const handleOpenCase = (id: string) => {
    alert(`Initializing Case Access: ${id}\nDecrypting Evidence Chain...`);
  };

  const columns = [
    { key: 'id', header: 'Case ID' },
    { key: 'type', header: 'Conflict Vector' },
    { key: 'status', header: 'Mediation State', render: (d: any) => (
      <span className="px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full text-[10px] font-black uppercase tracking-widest">{d.status}</span>
    )},
    { key: 'priority', header: 'Priority', render: (d: any) => (
      <span className={`font-black uppercase text-[10px] ${d.priority === 'Critical' ? 'text-rose-600' : 'text-zinc-400'}`}>{d.priority}</span>
    )},
    { key: 'age', header: 'Total Duration' },
    { 
      key: 'actions', 
      header: 'Decision Tool',
      render: (d: any) => (
        <button 
          onClick={() => handleOpenCase(d.id)}
          className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all"
        >
          Open Evidence Vault
        </button>
      )
    }
  ];

  return (
    <div className="space-y-10 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700 pb-20 md:pb-0">
      
      <div className="flex justify-end border-b border-zinc-50 pb-6">
        <div className="bg-rose-50 border border-rose-100 px-6 py-3 rounded-2xl flex items-center gap-4">
           <div className="w-8 h-8 rounded-xl bg-rose-500 flex items-center justify-center text-white font-black shadow-lg">!</div>
           <p className="text-[10px] font-black uppercase tracking-widest text-rose-700">2 Critical Conflicts Pending Resolution</p>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <DataTable data={disputes} columns={columns} title="Active Mediation Matrix" />
      </div>

      <div className="bg-zinc-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
         <div className="relative z-10 flex-1">
            <h3 className="text-2xl font-black uppercase tracking-tighter">Generate Case Bundle</h3>
            <p className="text-white/40 font-bold mt-1 text-[10px] uppercase tracking-widest">Export full immutable evidence history for legal-grade external arbitration.</p>
         </div>
         <button className="relative z-10 px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all">Compile Evidence ZIP</button>
      </div>
    </div>
  );
};
