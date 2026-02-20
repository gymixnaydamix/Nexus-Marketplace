
import React, { useState } from 'react';
import { useApp } from '../../AppContext';

interface VariantOption {
  type: string;
  values: string[];
}

export const VariantManager: React.FC = () => {
  const { products, activeWorld } = useApp();
  const worldProducts = products.filter(p => p.world === activeWorld);
  
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [variantTypes, setVariantTypes] = useState<VariantOption[]>([
    { type: 'Color', values: ['Black', 'White'] },
    { type: 'Size', values: ['Small', 'Large'] }
  ]);
  const [newTypeName, setNewTypeName] = useState('');

  const product = worldProducts.find(p => p.id === selectedProductId);

  const addVariantType = () => {
    if (!newTypeName.trim()) return;
    setVariantTypes([...variantTypes, { type: newTypeName, values: [] }]);
    setNewTypeName('');
  };

  const generateMatrix = () => {
    let result: string[][] = [[]];
    variantTypes.forEach(type => {
      let temp: string[][] = [];
      result.forEach(r => {
        type.values.forEach(v => {
          temp.push([...r, v]);
        });
      });
      if (type.values.length > 0) result = temp;
    });
    return result.filter(r => r.length === variantTypes.length);
  };

  const matrix = generateMatrix();

  return (
    <div className="space-y-10 text-zinc-900 animate-in fade-in duration-1000 pb-40">
      <div className="flex justify-between items-end border-b border-zinc-100 pb-8">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tight leading-none uppercase">Product Variants</h1>
          <p className="text-zinc-500 font-bold mt-2 text-[10px] md:text-sm uppercase tracking-widest italic">Manage colors, sizes, and options</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white border border-zinc-100 rounded-[3rem] p-8 shadow-sm space-y-6">
            <h3 className="font-black text-[10px] text-zinc-300 uppercase tracking-widest">1. Select Product</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar">
              {worldProducts.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProductId(p.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                    selectedProductId === p.id ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-zinc-50 border-transparent'
                  }`}
                >
                  <img src={p.thumbnail} alt="" className="w-8 h-8 rounded-lg object-cover" />
                  <span className="text-[11px] font-black truncate">{p.title}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white border border-zinc-100 rounded-[3rem] p-8 shadow-sm space-y-6">
            <h3 className="font-black text-[10px] text-zinc-300 uppercase tracking-widest">2. Variant Types</h3>
            <div className="space-y-4">
              {variantTypes.map((vt, i) => (
                <div key={i} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <p className="text-[10px] font-black uppercase text-zinc-900 mb-2">{vt.type}</p>
                  <div className="flex flex-wrap gap-2">
                    {vt.values.map((v, vi) => (
                      <span key={vi} className="px-2 py-1 bg-white border rounded text-[9px] font-bold text-zinc-500 uppercase">{v}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8">
          {product ? (
            <div className="bg-white border border-zinc-100 rounded-[3.5rem] shadow-sm overflow-hidden flex flex-col h-full animate-in zoom-in-95 duration-700">
              <div className="p-8 border-b border-zinc-50 bg-zinc-50/30">
                <h3 className="font-black text-lg text-zinc-900 uppercase tracking-tight">Variant Table</h3>
                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">{matrix.length} combinations</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-zinc-50/50">
                      <th className="p-6 font-black text-[9px] text-zinc-400 uppercase tracking-widest">Options</th>
                      <th className="p-6 font-black text-[9px] text-zinc-400 uppercase tracking-widest text-center">Price ($)</th>
                      <th className="p-6 font-black text-[9px] text-zinc-400 uppercase tracking-widest text-center">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50">
                    {matrix.map((row, ri) => (
                      <tr key={ri}>
                        <td className="p-6">
                          <div className="flex gap-2">
                            {row.map((val, vi) => (
                              <span key={vi} className="px-2 py-1 bg-zinc-100 text-zinc-800 rounded text-[10px] font-black uppercase">{val}</span>
                            ))}
                          </div>
                        </td>
                        <td className="p-6">
                           <input type="number" defaultValue={product.price} className="w-32 bg-white border border-zinc-100 rounded-xl px-4 py-2 text-sm font-black text-zinc-900 text-center mx-auto block" />
                        </td>
                        <td className="p-6">
                           <input type="number" defaultValue={10} className="w-24 bg-white border border-zinc-100 rounded-xl px-4 py-2 text-sm font-black text-zinc-900 text-center mx-auto block" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-8 border-t border-zinc-50 flex justify-end">
                  <button className="px-10 py-4 bg-zinc-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Apply Options</button>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[500px] border-4 border-dashed border-zinc-100 rounded-[3.5rem] p-12 flex flex-col items-center justify-center text-center space-y-6 bg-zinc-50">
               <div className="text-6xl">⛓️</div>
               <h3 className="text-xl font-black text-zinc-400 uppercase tracking-widest">Select a product to add variants</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
