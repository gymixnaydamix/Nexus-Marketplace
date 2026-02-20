
import React from 'react';
import { useApp } from '../../AppContext';
import { DataTable } from '../../components/UI/DataTable';
import { WORLD_CONFIG } from '../../constants';
import { PrintService } from '../../services/print_service';

export const OrdersList: React.FC = () => {
  const { orders, products, processOrder, activeWorld } = useApp();
  const theme = WORLD_CONFIG[activeWorld];

  const getProduct = (id: string) => products.find(p => p.id === id);

  const handlePrint = (order: any) => {
    const product = getProduct(order.productId);
    PrintService.generateOrderManifest(order, product);
  };

  const columns = [
    { key: 'id', header: 'Sequence ID', render: (o: any) => <span className="font-mono text-zinc-400">#{o.id.slice(-6)}</span> },
    { 
      key: 'productId', 
      header: 'Deployment Target',
      render: (o: any) => {
        const p = getProduct(o.productId);
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-zinc-100 bg-zinc-50">
              <img src={p?.thumbnail} alt="" className="w-full h-full object-cover" />
            </div>
            <span className="font-bold text-zinc-900 line-clamp-1">{p?.title || 'Unknown Item'}</span>
          </div>
        );
      }
    },
    { key: 'total', header: 'Value', render: (o: any) => <span className="font-mono font-black text-zinc-900">${o.total.toLocaleString()}</span> },
    { 
      key: 'status', 
      header: 'Operational State',
      render: (o: any) => (
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
            o.status === 'pending' ? 'bg-amber-100 text-amber-700' :
            o.status === 'processing' ? 'bg-blue-100 text-blue-700' :
            o.status === 'shipped' ? 'bg-indigo-100 text-indigo-700' :
            'bg-emerald-100 text-emerald-700'
          }`}>
            {o.status}
          </span>
          {o.status === 'pending' && (
            <button 
              onClick={() => processOrder(o.id, 'processing')}
              className="px-3 py-1 bg-zinc-900 text-white rounded-lg text-[9px] hover:bg-black transition-all uppercase font-black tracking-widest shadow-md"
            >
              Verify
            </button>
          )}
          {o.status === 'processing' && (
            <button 
              onClick={() => processOrder(o.id, 'shipped')}
              className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-[9px] hover:bg-indigo-700 transition-all uppercase font-black tracking-widest shadow-md"
            >
              Ship
            </button>
          )}
        </div>
      )
    },
    {
      key: 'print',
      header: '',
      render: (o: any) => (
        <button 
          onClick={() => handlePrint(o)}
          className="p-2 hover:bg-zinc-100 rounded-lg transition-colors text-zinc-400 hover:text-zinc-900"
          title="Print Manifest"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
        </button>
      )
    }
  ];

  return (
    <div className="h-full flex flex-col gap-6 text-zinc-900 animate-in fade-in duration-700 pb-20 md:pb-0">
      <div className="flex justify-end border-b border-zinc-50 pb-6">
        <div className="flex gap-2">
           <button className="px-6 py-3 bg-white border border-zinc-200 rounded-2xl text-[10px] font-bold text-zinc-600 hover:bg-zinc-50 transition-all shadow-sm">Global Manifest</button>
           <button 
             onClick={() => orders.length > 0 && handlePrint(orders[0])}
             className="px-6 py-3 bg-purple-600 text-white rounded-2xl text-[10px] font-bold shadow-xl shadow-purple-500/20 hover:bg-purple-700 transition-all active:scale-95"
           >
             Print Batch Slips
           </button>
        </div>
      </div>

      <div className="hidden md:block flex-1 min-h-0">
        <DataTable data={orders.filter(o => o.world === activeWorld)} columns={columns} />
      </div>

      <div className="md:hidden space-y-4">
        {orders.filter(o => o.world === activeWorld).map(order => {
          const product = getProduct(order.productId);
          return (
            <div key={order.id} className="bg-white border border-zinc-100 rounded-[2rem] p-5 shadow-sm space-y-4 active:scale-[0.98] transition-all">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] font-black text-zinc-300 uppercase tracking-widest">SEQ #{order.id.slice(-6)}</span>
                <span className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                  order.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                  order.status === 'processing' ? 'bg-blue-50 text-blue-600' :
                  'bg-emerald-50 text-emerald-600'
                }`}>
                  {order.status}
                </span>
              </div>

              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-zinc-50 bg-zinc-50 shrink-0">
                  <img src={product?.thumbnail} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-black text-zinc-900 truncate leading-tight mb-1">{product?.title}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[10px] font-mono text-zinc-400 font-bold">$</span>
                    <span className="text-lg font-black text-zinc-900 tabular-nums">{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-50 flex gap-2">
                <button 
                  onClick={() => handlePrint(order)}
                  className="flex-1 py-3 bg-zinc-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl"
                >
                  Print Slip
                </button>
                <button className="px-4 py-3 bg-zinc-50 text-zinc-400 rounded-xl text-[9px] font-black uppercase tracking-widest border border-zinc-100">
                  Audit
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
