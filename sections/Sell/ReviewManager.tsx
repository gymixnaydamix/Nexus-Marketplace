
import React from 'react';
import { DataTable } from '../../components/UI/DataTable';

export const StoreReviews: React.FC = () => {
  const reviews = [
    { id: 'R-101', user: 'Lia Sky', rating: 5, comment: 'Exceptional neural latency on the Fold Pro.', status: 'Published', date: '2h ago' },
    { id: 'R-102', user: 'Marcus Chen', rating: 2, comment: 'Delivery drone missed the designated landing pad.', status: 'Under Review', date: '5h ago' },
    { id: 'R-103', user: 'Elena Vance', rating: 4, comment: 'Solid property title deed. Clear resolution.', status: 'Published', date: '1d ago' },
  ];

  const columns = [
    { key: 'user', header: 'Verified Actor' },
    { key: 'rating', header: 'Score', render: (r: any) => <span className="text-amber-500 font-black">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</span> },
    { key: 'comment', header: 'Feedback', render: (r: any) => <span className="text-zinc-500 text-xs italic">"{r.comment}"</span> },
    { key: 'status', header: 'Protocol State', render: (r: any) => (
      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${r.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
        {r.status}
      </span>
    )},
    { 
      key: 'actions', 
      header: 'Curation',
      render: (r: any) => (
        <div className="flex gap-2">
           <button className="px-3 py-1.5 bg-zinc-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">Verify</button>
           <button className="px-3 py-1.5 border border-rose-100 text-rose-500 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-rose-50 transition-all">Flag</button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-10 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Trust Integrity Hub</h1>
          <p className="text-zinc-500 font-medium mt-1">Manual vetting of peer-to-peer feedback signals.</p>
        </div>
      </div>
      <div className="flex-1 min-h-0">
        <DataTable data={reviews} columns={columns} title="Identity Feedback Feed" />
      </div>
    </div>
  );
};
