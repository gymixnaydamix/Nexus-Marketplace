
import React, { useState } from 'react';
import { useApp } from '../../AppContext';
import { DataTable } from '../../components/UI/DataTable';
import { ModernDropdown } from '../../components/UI/ModernDropdown';
import { WORLD_CONFIG } from '../../constants';
import { ListingTemplate } from '../../types';

export const SellTemplates: React.FC = () => {
  const { activeWorld, templates, createTemplate, deleteTemplate } = useApp();
  const theme = WORLD_CONFIG[activeWorld];
  
  // Filter templates based on active world for a focused seller experience
  const worldTemplates = templates.filter(t => t.world === activeWorld);

  const [form, setForm] = useState<{
    name: string;
    category: string;
    complexity: 'Basic' | 'High';
  }>({ 
    name: '', 
    category: theme.categories[0], 
    complexity: 'Basic' 
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = async () => {
    if (!form.name.trim()) {
      alert("Nodal Error: Template nomenclature required.");
      return;
    }
    
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 600)); // Network simulation
    await createTemplate(form);
    
    setForm({ 
      name: '', 
      category: theme.categories[0], 
      complexity: 'Basic' 
    });
    setIsSubmitting(false);
  };

  const handleClone = (template: ListingTemplate) => {
    createTemplate({
        ...template,
        name: `${template.name} (Cloned Vector)`
    });
  };

  const columns = [
    { 
      key: 'name', 
      header: 'Template Name',
      render: (t: ListingTemplate) => (
        <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-zinc-900 shadow-sm"></div>
            <span className="font-bold text-zinc-900 uppercase tracking-tight">{t.name}</span>
        </div>
      )
    },
    { 
      key: 'category', 
      header: 'Sector',
      render: (t: ListingTemplate) => (
        <span className="px-2 py-1 bg-zinc-50 border border-zinc-100 rounded-lg text-[9px] font-black uppercase text-zinc-400">
            {t.category}
        </span>
      )
    },
    { 
      key: 'complexity', 
      header: 'Complexity',
      render: (t: ListingTemplate) => (
        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
            t.complexity === 'High' ? 'text-indigo-600 bg-indigo-50' : 'text-zinc-500 bg-zinc-50'
        }`}>
            {t.complexity}
        </span>
      )
    },
    { 
      key: 'usageCount', 
      header: 'Sync Frequency', 
      render: (t: ListingTemplate) => (
        <span className="font-mono text-[10px] font-bold text-zinc-400">{t.usageCount} Deployments</span>
      )
    },
    {
      key: 'actions',
      header: 'Manual Actions',
      render: (t: ListingTemplate) => (
        <div className="flex gap-2">
           <button 
             onClick={() => handleClone(t)}
             className="px-3 py-1 bg-white border border-zinc-200 text-zinc-600 rounded-lg text-[9px] font-black uppercase tracking-widest hover:border-zinc-400 transition-all"
           >
             Clone
           </button>
           <button 
             onClick={() => deleteTemplate(t.id)}
             className="px-3 py-1 text-rose-400 hover:text-rose-600 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all"
           >
             Decommission
           </button>
        </div>
      )
    }
  ];

  const complexityOptions = [
    { value: 'Basic', label: 'Basic Protocol', description: 'Standard attribute matrix' },
    { value: 'High', label: 'High Fidelity', description: 'Enhanced spec-mapping' },
  ];

  return (
    <div className="space-y-10 md:space-y-14 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700 pb-20">
      <div className="flex justify-between items-end border-b border-zinc-100 pb-8">
        <div>
          <h1 className="text-4xl font-black text-zinc-900 tracking-tight leading-none uppercase">Templates</h1>
          <p className="text-zinc-500 font-bold mt-2 text-[10px] md:text-sm uppercase tracking-widest italic">Reuse product settings for faster listing</p>
        </div>
        <div className="hidden md:flex bg-zinc-900 text-white px-6 py-3 rounded-2xl items-center gap-4 shadow-xl">
            <span className="text-[10px] font-mono opacity-40 uppercase font-black">Active Node</span>
            <span className="text-sm font-black uppercase tracking-tighter">{activeWorld} Registry</span>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <DataTable 
          data={worldTemplates} 
          columns={columns} 
          title="Saved Templates" 
        />
      </div>

      <div className="bg-zinc-50 border border-zinc-100 p-8 md:p-12 rounded-[3.5rem] shadow-inner relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-200/20 blur-3xl -mr-32 -mt-32 rounded-full pointer-events-none transition-all group-hover:bg-indigo-500/5"></div>
        
        <div className="relative z-10">
            <h3 className="font-black text-xl text-zinc-900 uppercase tracking-tight mb-10 flex items-center gap-4">
                <span className="w-2 h-10 bg-zinc-900 rounded-full"></span>
                Create New Template
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
               <div className="md:col-span-4 space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest px-1">Template Name</label>
                  <input 
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                    placeholder="e.g. Standard Mobile Manifest" 
                    className="w-full bg-white border border-zinc-200 rounded-[1.5rem] p-4 text-sm font-black text-zinc-900 shadow-sm focus:outline-none focus:ring-4 focus:ring-zinc-200/50 transition-all" 
                  />
               </div>
               
               <div className="md:col-span-3">
                <ModernDropdown 
                  label="Category Sector"
                  options={theme.categories.map(c => ({ value: c, label: c }))}
                  value={form.category}
                  onChange={val => setForm({...form, category: val})}
                />
               </div>

               <div className="md:col-span-3">
                <ModernDropdown 
                  label="Logic Complexity"
                  options={complexityOptions}
                  value={form.complexity}
                  onChange={val => setForm({...form, complexity: val as 'Basic' | 'High'})}
                />
               </div>

               <div className="md:col-span-2">
                  <button 
                    onClick={handleSave}
                    disabled={isSubmitting}
                    className="w-full py-4 bg-zinc-900 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-black active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                        <span>Save Template</span>
                    )}
                  </button>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};
