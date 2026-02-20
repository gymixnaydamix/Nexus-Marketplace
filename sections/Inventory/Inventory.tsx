
import React, { useState } from 'react';
import { useApp } from '../../AppContext';
import { DataTable } from '../../components/UI/DataTable';
import { Product } from '../../types';

export const InvStock: React.FC = () => {
  const { products, activeWorld } = useApp();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const worldProducts = products.filter(p => p.world === activeWorld);
  const selectedProduct = worldProducts.find(p => p.id === selectedProductId);
  const lowStockItems = worldProducts.filter(p => p.stock <= p.threshold);

  const columns = [
    { 
      key: 'title', 
      header: 'Product Asset',
      render: (p: Product) => (
        <button 
          onClick={() => setSelectedProductId(p.id)}
          className="text-left group flex items-center gap-3"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-zinc-100">
            <img src={p.thumbnail} alt="" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-zinc-900 group-hover:text-indigo-600 transition-colors underline decoration-zinc-200 decoration-dashed underline-offset-4">{p.title}</span>
        </button>
      )
    },
    { key: 'category', header: 'Sector' },
    { 
      key: 'stock', 
      header: 'Total Stock', 
      render: (p: Product) => (
        <div className="flex items-center gap-4">
          <span className={`font-black tabular-nums ${p.stock <= p.threshold ? 'text-rose-600' : 'text-zinc-900'}`}>{p.stock}</span>
          <div className="flex-1 h-1.5 w-24 bg-zinc-100 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-700 ${p.stock <= p.threshold ? 'bg-rose-500' : 'bg-zinc-900'}`} 
              style={{ width: `${Math.min((p.stock / (p.threshold * 4 || 100)) * 100, 100)}%` }}
            ></div>
          </div>
        </div>
      )
    },
    { 
      key: 'status', 
      header: 'System Alert',
      render: (p: Product) => (
        p.stock <= p.threshold ? (
          <span className="text-[9px] font-black uppercase tracking-widest text-rose-500">Low Stock Cluster</span>
        ) : (
          <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Nominal</span>
        )
      )
    }
  ];

  return (
    <div className="space-y-8 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700 pb-20">
      
      {/* Redundant page title removed, keeping action bar */}
      <div className="flex justify-end gap-4 border-b border-zinc-50 pb-6">
           <div className={`bg-white border p-3 rounded-2xl shadow-sm flex items-center gap-4 transition-all ${lowStockItems.length > 0 ? 'border-rose-200 bg-rose-50/30' : 'border-zinc-200'}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black ${lowStockItems.length > 0 ? 'bg-rose-500 text-white' : 'bg-zinc-100 text-zinc-400'}`}>
                {lowStockItems.length > 0 ? '!' : '✓'}
              </div>
              <p className={`text-xs font-black ${lowStockItems.length > 0 ? 'text-rose-700' : 'text-zinc-900'}`}>{lowStockItems.length} Alerts</p>
           </div>
           <button className="px-6 py-3 bg-zinc-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Export Manifest</button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-10 min-h-0 overflow-hidden">
        <div className="lg:col-span-2 flex flex-col min-h-0">
          <DataTable data={worldProducts} columns={columns} title="Inventory Master Matrix" />
        </div>

        <div className="lg:col-span-1 flex flex-col h-full space-y-6">
          <div className="flex-1 bg-white border border-zinc-100 rounded-[3rem] p-8 shadow-sm flex flex-col overflow-hidden">
            <h3 className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest font-bold mb-6">Warehouse Nodes</h3>
            
            {selectedProduct ? (
              <div className="flex-1 flex flex-col space-y-8 overflow-y-auto no-scrollbar">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-zinc-100 shrink-0">
                    <img src={selectedProduct.thumbnail} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-black text-zinc-900 text-lg leading-tight truncate">{selectedProduct.title}</h4>
                    <p className="text-[10px] font-mono text-zinc-400 uppercase font-bold mt-1">ID: {selectedProduct.id}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(selectedProduct.warehouseStock).map(([wh, qty]) => (
                    <div key={wh} className="p-4 bg-zinc-50 border border-zinc-100 rounded-2xl flex justify-between items-center">
                       <span className="text-xs font-black text-zinc-800 uppercase">{wh}</span>
                       <span className="font-mono text-xs font-bold">{qty} Units</span>
                    </div>
                  ))}
                  <button className="w-full py-3 border-2 border-dashed border-zinc-100 rounded-2xl text-[9px] font-mono text-zinc-300 uppercase font-bold">Link Storage node</button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4 opacity-30">
                <div className="text-4xl">📦</div>
                <p className="text-[10px] font-black uppercase tracking-widest">Select Asset to inspect nodes</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
