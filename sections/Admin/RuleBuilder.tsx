
import React, { useState } from 'react';
import { useApp } from '../../AppContext';
import { DataTable } from '../../components/UI/DataTable';
import { ModernDropdown } from '../../components/UI/ModernDropdown';
import { kernel } from '../../api/nexus_os_kernel';
import { Rule } from '../../types';

export const SafeRules: React.FC = () => {
  const { rules, currentUser, refreshState, toggleRule } = useApp();
  const [showAdd, setShowAdd] = useState(false);
  const [newRule, setNewRule] = useState({
    name: '',
    description: '',
    condition: 'price > 1000',
    threshold: 1000,
    action: 'ROUTE_MODERATION'
  });

  const triggerOptions = [
    { value: 'price >', label: 'Asset Value Gate', description: 'Threshold > Var', icon: '💰' },
    { value: 'category ===', label: 'Sector Target', description: 'Category Match', icon: '🏷️' },
  ];

  const protocolOptions = [
    { value: 'ROUTE_MODERATION', label: 'Moderator Route', description: 'Review Queue', icon: '👤' },
    { value: 'HOLD_PAYOUT', label: 'Fiscal Lock', description: 'Hold Payouts', icon: '🔒' },
  ];

  const handleDelete = async (id: string) => {
    if (confirm("Decommission this logic node?")) {
      await kernel.deleteRule(currentUser.id, id);
      refreshState();
    }
  };

  const handleAdd = async () => {
    if (!newRule.name) return;
    const rule: Rule = {
      id: `r-${Date.now()}`,
      ...newRule,
      isActive: true
    };
    await kernel.addRule(currentUser.id, rule);
    setShowAdd(false);
    refreshState();
  };

  const columns = [
    { key: 'name', header: 'System Rule' },
    { 
      key: 'condition', 
      header: 'Manual Logic',
      render: (item: any) => (
        <code className="bg-zinc-900 text-zinc-100 px-3 py-1.5 rounded-lg font-mono text-[11px] shadow-sm">{item.condition}</code>
      )
    },
    { key: 'action', header: 'Action' },
    { 
      key: 'isActive', 
      header: 'Status',
      render: (item: any) => (
        <button onClick={() => toggleRule(item.id)} className="flex items-center gap-2 group">
          <div className={`w-2 h-2 rounded-full ${item.isActive ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-rose-500'}`}></div>
          <span className={`text-[10px] font-bold uppercase tracking-widest ${item.isActive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {item.isActive ? 'Operational' : 'Paused'}
          </span>
        </button>
      )
    },
    {
      key: 'del',
      header: '',
      render: (item: any) => (
        <button onClick={() => handleDelete(item.id)} className="text-zinc-300 hover:text-rose-500 transition-colors">×</button>
      )
    }
  ];

  return (
    <div className="space-y-8 h-full flex flex-col text-zinc-900 animate-in fade-in duration-700 pb-20 md:pb-0">
      
      <div className="flex justify-end border-b border-zinc-50 pb-6">
        <button 
          onClick={() => setShowAdd(!showAdd)}
          className="px-8 py-4 bg-zinc-900 text-white rounded-[1.8rem] text-xs font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all flex items-center gap-3 active:scale-95"
        >
           {showAdd ? 'Cancel Architecture' : 'Architect New Directive'}
        </button>
      </div>

      {showAdd && (
        <div className="bg-zinc-50 p-8 md:p-10 rounded-[3rem] border border-zinc-100 shadow-inner animate-in slide-in-from-top-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-3">
              <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black px-1 block">Rule Nomenclature</label>
              <input 
                value={newRule.name}
                onChange={e => setNewRule({...newRule, name: e.target.value})}
                placeholder="Protocol Alpha..." 
                className="w-full bg-white border border-zinc-100 rounded-2xl p-4 text-sm font-black text-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-100 shadow-sm" 
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black px-1 block">Condition Logic</label>
              <input 
                value={newRule.condition}
                onChange={e => setNewRule({...newRule, condition: e.target.value})}
                placeholder="price > 5000" 
                className="w-full bg-white border border-zinc-100 rounded-2xl p-4 text-sm font-mono text-zinc-900 focus:outline-none focus:ring-4 focus:ring-zinc-100 shadow-sm" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ModernDropdown 
              label="Response Protocol"
              options={protocolOptions}
              value={newRule.action}
              onChange={val => setNewRule({...newRule, action: val})}
            />
            <div className="flex items-end">
              <button 
                onClick={handleAdd}
                className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-indigo-700 active:scale-95 transition-all"
              >
                Deploy Directive node
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 min-h-0">
        <DataTable data={rules} columns={columns} title="Primary Directive Matrix" />
      </div>
    </div>
  );
};
