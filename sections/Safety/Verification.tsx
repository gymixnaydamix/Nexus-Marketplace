
import React from 'react';
import { DataTable } from '../../components/UI/DataTable';

export const SafeVerification: React.FC = () => {
  const kycData = [
    { id: 'KYC-101', name: 'Jordan Vane', type: 'Individual', docs: 'Passport, Utility Bill', status: 'Pending Review' },
    { id: 'KYC-102', name: 'Vane Cars Corp', type: 'Business', docs: 'Tax ID, Incorporation', status: 'In Progress' },
    { id: 'KYC-103', name: 'Sarah Wilson', type: 'Individual', docs: 'ID Card', status: 'Awaiting Documents' },
  ];

  const columns = [
    { key: 'id', header: 'Reference ID' },
    { key: 'name', header: 'Entity Name' },
    { key: 'type', header: 'Identity Type' },
    { key: 'status', header: 'Status', render: (i: any) => (
      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
        i.status === 'Pending Review' ? 'bg-amber-100 text-amber-700' : 'bg-zinc-100 text-zinc-500'
      }`}>
        {i.status}
      </span>
    )},
    { 
      key: 'actions', 
      header: 'Review Actions',
      render: (i: any) => (
        <button className="px-4 py-2 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-black transition-all">
          Inspect Vault
        </button>
      )
    }
  ];

  return (
    <div className="space-y-10 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700 pb-20 md:pb-0">
      
      <div className="flex justify-end border-b border-zinc-50 pb-6">
        <button className="px-8 py-3.5 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">Batch Validate Nodes</button>
      </div>

      <div className="flex-1 min-h-0">
        <DataTable data={kycData} columns={columns} title="Identity Review Matrix" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-zinc-50 border border-zinc-100 p-8 rounded-[3rem] shadow-inner flex items-center gap-6">
            <div className="w-16 h-16 rounded-[1.8rem] bg-white border border-zinc-200 flex items-center justify-center text-3xl">🧬</div>
            <div>
               <h4 className="font-black text-zinc-800 uppercase tracking-tight">Biometric Gateway</h4>
               <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mt-1">L9 Clearance Required for overrides</p>
            </div>
         </div>
         <div className="bg-zinc-900 text-white p-8 rounded-[3rem] shadow-2xl flex items-center justify-between group cursor-pointer hover:bg-black transition-all">
            <div>
               <h4 className="font-black uppercase tracking-tighter text-xl leading-none">Manual ID Request</h4>
               <p className="text-white/30 text-[9px] uppercase tracking-widest mt-2 font-black">Force Entity Re-Verification</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">→</div>
         </div>
      </div>
    </div>
  );
};
