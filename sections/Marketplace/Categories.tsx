
import React, { useState } from 'react';
import { useApp } from '../../AppContext';
import { DataTable } from '../../components/UI/DataTable';

export const MarketCategories: React.FC = () => {
  const { activeWorld } = useApp();
  const [categories, setCategories] = useState([
    { id: 'CAT-001', name: 'Smartphones', attributes: 12, products: 450, status: 'Active' },
    { id: 'CAT-002', name: 'Laptops', attributes: 8, products: 220, status: 'Active' },
    { id: 'CAT-003', name: 'Wearables', attributes: 15, products: 89, status: 'Active' },
  ]);

  const columns = [
    { key: 'name', header: 'Category Name' },
    { key: 'attributes', header: 'Attribute Set' },
    { key: 'products', header: 'Listing Count' },
    { key: 'status', header: 'State' },
    {
      key: 'actions',
      header: 'Manual Control',
      render: (c: any) => (
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-zinc-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">Edit Taxonomy</button>
          <button className="px-3 py-1 border border-zinc-200 rounded-lg text-[9px] font-black uppercase tracking-widest text-zinc-400">Manage Specs</button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-10 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Taxonomy Engine</h1>
          <p className="text-zinc-500 font-medium mt-1 italic">Manual category hierarchies and attribute mapping for {activeWorld}.</p>
        </div>
        <button className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl">Architect Category</button>
      </div>

      <div className="flex-1 min-h-0">
        <DataTable data={categories} columns={columns} title="Primary Categorization Matrix" />
      </div>
    </div>
  );
};
