
import React, { useState } from 'react';
import { useApp } from '../../AppContext';
import { NAVIGATION, WORLD_CONFIG } from '../../constants';
import { World, Role } from '../../types';

interface ThreeDIconProps {
  path: string;
  isActive: boolean;
  hex: string;
}

const ThreeDIcon: React.FC<ThreeDIconProps> = ({ path, isActive, hex }) => {
  const inactivePrimary = '#71717a'; // Zinc 500
  const inactiveDepth = '#18181b';    
  
  return (
    <div className={`relative w-6 h-6 lg:w-7 lg:h-7 preserve-3d icon-obj transition-all duration-500 ${isActive ? 'scale-110 translate-z-10' : 'opacity-60 group-hover:opacity-100 group-hover:scale-105'}`}>
      <svg viewBox="0 0 24 24" className="w-full h-full overflow-visible">
        <path
          d={path}
          fill="none"
          stroke={isActive ? hex : inactiveDepth}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(1, 1)"
          style={{ opacity: isActive ? 0.3 : 0.8 }}
        />
        <path
          d={path}
          fill="none"
          stroke={isActive ? hex : inactivePrimary}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={isActive ? 'url(#nexus-glow-vibrant)' : 'none'}
          className="transition-all duration-300"
          style={{ color: hex }}
        />
      </svg>
    </div>
  );
};

export const Shell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    activeSection, activeTab, activeSubItem, 
    setActiveSectionById, setActiveTabById, setActiveSubItemById,
    activeWorld, setActiveWorld, currentUser, users, switchUser, resetKernel
  } = useApp();
  
  const [isSubnavOpen, setIsSubnavOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);
  
  const worldTheme = WORLD_CONFIG[activeWorld];
  const isMarketplace = activeSection.id === 'marketplace';

  const handleSubnavItemClick = (id: string) => {
    setActiveSubItemById(id);
    setIsSubnavOpen(false);
  };

  const handleSectionClick = (id: string) => {
    setActiveSectionById(id);
    setIsSidebarOpen(false);
  };

  const filteredNav = NAVIGATION.filter(s => {
    if (!s.requiredRole) return true;
    return s.requiredRole.includes(currentUser.role);
  });

  const SubnavContent = () => (
    <div className="flex flex-col h-full bg-[#0c0c14] relative overflow-hidden subnav-glow">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ filter: 'url(#atomic-grain)' }}></div>
      
      <div className="p-5 lg:p-7 border-b border-white/10 relative z-10 shrink-0">
        <div className="flex justify-between items-center lg:hidden mb-4">
          <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.4em] font-black">Cluster Nodes</span>
          <button onClick={() => setIsSubnavOpen(false)} className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center text-white/60">×</button>
        </div>
        <div className="flex items-center gap-3">
           <div className="w-1 h-6 rounded-full shadow-[0_0_12px_currentColor]" style={{ backgroundColor: worldTheme.hex, color: worldTheme.hex }}></div>
           <h2 className="text-base lg:text-lg font-black text-white/90 tracking-tighter truncate uppercase">{activeSection.label}</h2>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 lg:p-4 space-y-1 no-scrollbar min-h-0 relative z-10">
        {activeTab.subnav.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSubnavItemClick(item.id)}
            className={`w-full text-left px-4 py-2.5 rounded-xl transition-all duration-300 group flex items-center gap-4 relative overflow-hidden ${
              activeSubItem.id === item.id 
                ? 'bg-white/10 text-white shadow-xl' 
                : 'text-white/20 hover:text-white/70 hover:bg-white/[0.03]'
            }`}
          >
            <ThreeDIcon path={item.icon || 'M4 6h16M4 12h16m-7 6h7'} isActive={activeSubItem.id === item.id} hex={worldTheme.hex} />
            <span className="tracking-widest font-black uppercase text-[8px] lg:text-[9px] truncate">{item.label}</span>
            {activeSubItem.id === item.id && (
              <div className="absolute right-3 w-1 h-1 rounded-full animate-pulse" style={{ backgroundColor: worldTheme.hex }}></div>
            )}
          </button>
        ))}
      </nav>
      
      <div className="p-5 bg-black/40 border-t border-white/5 shrink-0 relative z-10">
        <p className="text-[7px] font-mono text-white/10 uppercase tracking-[0.3em] mb-4 font-black text-center">World Link</p>
        <div className="grid grid-cols-3 gap-2">
          {Object.entries(World).map(([key, value]) => (
            <button
              key={value}
              onClick={() => setActiveWorld(value as World)}
              className={`aspect-square rounded-xl flex items-center justify-center transition-all ${
                activeWorld === value ? 'bg-white/10 ring-1 ring-white/10 shadow-lg' : 'opacity-10 grayscale hover:opacity-100 hover:grayscale-0'
              }`}
            >
              <span className="text-base">{WORLD_CONFIG[value as World].icon}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-full w-full bg-[#050508] overflow-hidden p-2 md:p-3 lg:p-4 gap-3 lg:gap-4 box-border">
      
      {/* Zone 3: Left Subnav (Desktop) - Completely hidden for Marketplace */}
      {!isMarketplace && (
        <aside className="hidden lg:flex w-60 h-full flex-col shrink-0 os-container border border-white/10 shadow-2xl bg-[#0c0c14]">
          <SubnavContent />
        </aside>
      )}

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full gap-3 lg:gap-4 relative overflow-hidden">
        
        {/* Zone 2: Top Header */}
        <header className="h-14 md:h-16 glass-panel os-container flex items-center justify-between px-5 lg:px-6 shrink-0 z-40">
          <div className="flex items-center gap-4 overflow-hidden h-full">
            <button 
              onClick={() => isMarketplace ? setActiveSectionById('home') : setIsSubnavOpen(true)}
              className="lg:hidden w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white/60 active:scale-90 transition-all shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h7" /></svg>
            </button>

            <div className="flex items-center gap-1.5 md:gap-2 overflow-x-auto no-scrollbar py-2 h-full">
              {isMarketplace ? (
                // Marketplace: Render subnav items as header buttons directly
                activeTab.subnav.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSubnavItemClick(item.id)}
                    className={`px-5 py-2 rounded-xl text-[8px] lg:text-[10px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap border flex items-center gap-2 ${
                      activeSubItem.id === item.id 
                        ? 'bg-white text-black border-white shadow-xl scale-105' 
                        : 'text-white/30 border-white/5 hover:text-white/60 hover:bg-white/5'
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3">
                      <path d={item.icon || 'M4 6h16M4 12h16m-7 6h7'} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item.label}
                  </button>
                ))
              ) : (
                // Other sections: Render tabs as header buttons
                activeSection.tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabById(tab.id)}
                    className={`px-4 py-1.5 rounded-lg text-[8px] lg:text-[9px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap border ${
                      activeTab.id === tab.id 
                        ? 'bg-white text-black border-white shadow-xl' 
                        : 'text-white/30 border-white/5 hover:text-white/60 hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3 lg:gap-4 shrink-0 ml-3">
             <div className="hidden sm:block text-right cursor-pointer" onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}>
                <p className="text-[7px] font-mono font-black text-white/20 uppercase tracking-[0.1em] leading-none mb-1">AUTH: {currentUser.role}</p>
                <p className="text-[9px] font-black text-white/90 uppercase tracking-widest leading-none">{currentUser.name}</p>
             </div>
             <button 
               onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
               className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-indigo-500/80 backdrop-blur-md flex items-center justify-center text-[10px] font-black shadow-xl border border-white/20 shrink-0 text-white hover:scale-110 transition-transform"
             >
                {currentUser.name.split(' ').map(n => n[0]).join('')}
             </button>
          </div>

          {showRoleSwitcher && (
            <div className="absolute top-full right-6 mt-4 w-64 bg-zinc-900 border border-white/10 rounded-[2rem] shadow-2xl p-6 z-[200] animate-in fade-in slide-in-from-top-2">
               <h3 className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-black mb-4">Switch Terminal Identity</h3>
               <div className="space-y-2 max-h-64 overflow-y-auto no-scrollbar">
                  {users.map(u => (
                    <button 
                      key={u.id}
                      onClick={() => { switchUser(u.id); setShowRoleSwitcher(false); }}
                      className={`w-full text-left p-3 rounded-xl flex items-center gap-3 border transition-all ${
                        currentUser.id === u.id ? 'bg-indigo-600 border-indigo-500' : 'bg-white/5 border-white/5 hover:bg-white/10'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-[10px] font-black">{u.name[0]}</div>
                      <div>
                        <p className="text-[10px] font-black text-white uppercase">{u.name}</p>
                        <p className="text-[8px] font-mono text-white/40 uppercase">{u.role}</p>
                      </div>
                    </button>
                  ))}
               </div>
               <button 
                 onClick={() => { resetKernel(); setShowRoleSwitcher(false); }}
                 className="w-full mt-6 py-3 bg-rose-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg hover:bg-rose-700"
               >
                 Factory Reset Kernel
               </button>
            </div>
          )}
        </header>

        {/* Zone 4: Center Content Workspace */}
        <main className="flex-1 bg-white os-container text-zinc-900 shadow-2xl relative flex flex-col min-h-0 border border-zinc-100/50">
          <div className="flex-1 overflow-y-auto no-scrollbar p-5 md:p-7 lg:p-8 relative z-10 h-full">
            <div className="max-w-6xl mx-auto">
               {children}
            </div>
          </div>
          <div className="absolute inset-0 pointer-events-none opacity-[0.015] z-0" style={{ filter: 'url(#atomic-grain)' }}></div>
        </main>
      </div>

      {/* Zone 1: Right Sidebar */}
      <aside className="hidden md:flex w-16 lg:w-20 h-full bg-white flex-col items-center py-6 shrink-0 os-container shadow-2xl border border-zinc-100">
        <div className="mb-6 w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-zinc-900 flex items-center justify-center shadow-lg group cursor-pointer hover:rotate-6 transition-transform duration-500 shrink-0">
           <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
             <path d="M12 2L2 7L12 12L22 7L12 2Z" fill={`${worldTheme.hex}44`} stroke={worldTheme.hex} strokeWidth="2.5" />
           </svg>
        </div>
        
        <nav className="flex-1 w-full flex flex-col gap-3 lg:gap-4 items-center overflow-y-auto no-scrollbar pb-6 min-h-0">
          {filteredNav.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 group shrink-0 ${
                activeSection.id === section.id 
                  ? 'bg-zinc-50 shadow-inner scale-105' 
                  : 'hover:bg-zinc-50/50'
              }`}
            >
              <ThreeDIcon path={section.icon} isActive={activeSection.id === section.id} hex={worldTheme.hex} />
              <span className={`text-[7px] font-black uppercase tracking-tighter mt-1 text-center transition-opacity duration-300 w-full truncate px-1 ${activeSection.id === section.id ? 'text-black opacity-100' : 'text-zinc-300 opacity-0 group-hover:opacity-100'}`}>
                {section.label.split(' ')[0]}
              </span>
              {activeSection.id === section.id && (
                <div className="absolute left-[-6px] w-1 h-6 rounded-full" style={{ backgroundColor: worldTheme.hex }}></div>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Control Layer */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 rounded-2xl bg-zinc-900 text-white shadow-2xl z-[150] flex items-center justify-center active:scale-90 transition-transform"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16m-7 6h7" /></svg>
      </button>

      {isSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-[300] flex justify-end">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
          <aside className="relative w-24 h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col items-center py-8 gap-5 overflow-y-auto no-scrollbar">
            {filteredNav.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`flex flex-col items-center gap-1 group p-3.5 rounded-2xl transition-all shrink-0 ${activeSection.id === section.id ? 'bg-zinc-50' : ''}`}
              >
                <ThreeDIcon path={section.icon} isActive={activeSection.id === section.id} hex={worldTheme.hex} />
              </button>
            ))}
            <button onClick={() => setIsSidebarOpen(false)} className="mt-auto w-10 h-10 rounded-full bg-zinc-900 text-white flex items-center justify-center font-black active:scale-90 shrink-0">×</button>
          </aside>
        </div>
      )}

      {isSubnavOpen && !isMarketplace && (
        <div className="lg:hidden fixed inset-0 z-[200] flex">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsSubnavOpen(false)}></div>
          <aside className="relative w-60 h-full bg-[#0c0c14] border-r border-white/10 animate-in slide-in-from-left duration-300 overflow-hidden">
            <SubnavContent />
          </aside>
        </div>
      )}
    </div>
  );
};
