
import React, { useState } from 'react';

interface DataTableProps<T> {
  data: T[];
  columns: {
    key: keyof T | string;
    header: string;
    render?: (item: T) => React.ReactNode;
  }[];
  title?: string;
}

export function DataTable<T extends { id: string }>({ data, columns, title }: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter(item => 
    Object.values(item).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleExport = () => {
    if (data.length === 0) return;
    
    // Manual CSV construction
    const headers = columns.filter(c => c.key !== 'actions' && c.key !== 'del' && c.key !== 'print').map(c => String(c.header));
    const keys = columns.filter(c => c.key !== 'actions' && c.key !== 'del' && c.key !== 'print').map(c => c.key);
    
    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => 
        keys.map(k => {
          const val = row[k as keyof T];
          return `"${String(val).replace(/"/g, '""')}"`;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `nexus_export_${title?.toLowerCase().replace(/\s+/g, '_') || 'data'}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-3xl border border-zinc-200 overflow-hidden flex flex-col h-full shadow-sm">
      <div className="px-6 py-5 border-b border-zinc-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-zinc-50/50">
        {title && <h3 className="font-bold text-zinc-900 tracking-tight uppercase text-xs">{title}</h3>}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <input 
              type="text"
              placeholder="Filter database..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-100 transition-all text-zinc-900 placeholder:text-zinc-400"
            />
            <svg className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button 
            onClick={handleExport}
            className="p-2.5 bg-white border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-all shadow-sm group"
            title="Export to CSV"
          >
            <svg className="w-5 h-5 text-zinc-500 group-hover:text-zinc-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto flex-1 no-scrollbar">
        <table className="w-full border-collapse text-left text-sm">
          <thead>
            <tr className="bg-zinc-50/30">
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-4 border-b border-zinc-100 font-mono text-[10px] text-zinc-400 uppercase tracking-[0.2em] font-bold">
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-zinc-50/80 transition-all group">
                {columns.map((col, idx) => (
                  <td key={idx} className="px-6 py-5 whitespace-nowrap text-zinc-700 font-medium">
                    {col.render ? col.render(item) : String(item[col.key as keyof T])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div className="p-20 text-center">
            <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-100">
               <svg className="w-8 h-8 text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0a2 2 0 01-2 2H6a2 2 0 01-2-2m16 0V9a2 2 0 00-2-2M5 13V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest">No sector data retrieved</p>
          </div>
        )}
      </div>
    </div>
  );
}
