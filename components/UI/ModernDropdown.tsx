
import React, { useState, useRef, useEffect } from 'react';

interface DropdownOption {
  value: string;
  label: string;
  description?: string;
  icon?: string;
}

interface ModernDropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

export const ModernDropdown: React.FC<ModernDropdownProps> = ({ 
  options, 
  value, 
  onChange, 
  label, 
  placeholder = "Select Option",
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find(o => o.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label className="text-[8px] md:text-[9px] font-mono uppercase text-zinc-400 tracking-widest font-black mb-1 md:mb-2 block px-1">
          {label}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-zinc-50 border border-zinc-100 rounded-xl md:rounded-[1.5rem] px-3 py-2.5 md:px-5 md:py-3.5 flex items-center justify-between transition-all hover:border-zinc-300 group shadow-sm ${isOpen ? 'ring-2 md:ring-4 ring-zinc-100 border-zinc-300' : ''}`}
      >
        <div className="flex items-center gap-1.5 md:gap-3 min-w-0">
          {selectedOption?.icon && <span className="text-xs md:text-sm grayscale group-hover:grayscale-0 transition-all shrink-0">{selectedOption.icon}</span>}
          <div className="text-left truncate">
            <span className="block text-[9px] md:text-[11px] font-black uppercase tracking-tight text-zinc-900 leading-none truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </div>
        </div>
        <svg 
          className={`w-3 h-3 md:w-4 md:h-4 text-zinc-400 transition-transform duration-500 shrink-0 ${isOpen ? 'rotate-180 text-zinc-900' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-[100] bg-white/90 backdrop-blur-2xl border border-zinc-100 rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 p-1 md:p-2 origin-top">
          <div className="max-h-64 overflow-y-auto no-scrollbar">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl transition-all flex items-center justify-between group/item mb-0.5 md:mb-1 ${
                  value === option.value ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-50'
                }`}
              >
                <div className="flex items-center gap-2 md:gap-3 min-w-0">
                  {option.icon && <span className={`text-sm md:text-base shrink-0 ${value === option.value ? 'grayscale-0' : 'grayscale group-hover/item:grayscale-0'}`}>{option.icon}</span>}
                  <div className="truncate">
                    <span className={`block text-[8px] md:text-[10px] font-black uppercase tracking-tight truncate ${value === option.value ? 'text-white' : 'text-zinc-700'}`}>
                      {option.label}
                    </span>
                    {option.description && (
                      <span className={`block text-[7px] md:text-[8px] font-mono uppercase font-bold mt-0.5 truncate ${value === option.value ? 'text-white/40' : 'text-zinc-300'}`}>
                        {option.description}
                      </span>
                    )}
                  </div>
                </div>
                {value === option.value && (
                  <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] shrink-0 ml-2"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
