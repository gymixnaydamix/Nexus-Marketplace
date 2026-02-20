
import React from 'react';

interface QuantityStepperProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export const QuantityStepper: React.FC<QuantityStepperProps> = ({ 
  value, 
  max, 
  onChange, 
  className = "",
  size = 'md' 
}) => {
  const increment = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value < max) onChange(value + 1);
  };

  const decrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (value > 1) onChange(value - 1);
  };

  const isSm = size === 'sm';

  return (
    <div className={`inline-flex items-center bg-zinc-900/5 backdrop-blur-md border border-zinc-200/50 rounded-2xl p-1 shadow-inner group/stepper transition-all duration-300 hover:border-zinc-300 ${className}`}>
      <button
        onClick={decrement}
        disabled={value <= 1}
        className={`${isSm ? 'w-7 h-7' : 'w-10 h-10'} rounded-xl flex items-center justify-center text-zinc-400 hover:bg-white hover:text-zinc-900 hover:shadow-lg disabled:opacity-20 transition-all active:scale-90 group/minus`}
        aria-label="Decrease quantity"
      >
        <svg className={`${isSm ? 'w-2.5 h-2.5' : 'w-4 h-4'} transition-transform group-hover/minus:scale-110`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M20 12H4" />
        </svg>
      </button>
      
      <div className={`${isSm ? 'px-2 min-w-[1.8rem]' : 'px-4 min-w-[3rem]'} text-center flex flex-col items-center justify-center`}>
        <span className={`block font-mono font-black text-zinc-900 leading-none ${isSm ? 'text-[10px]' : 'text-sm'}`}>
          {value.toString().padStart(2, '0')}
        </span>
        <div className="w-1 h-1 rounded-full bg-indigo-500/30 mt-0.5 group-hover/stepper:bg-indigo-500 transition-colors"></div>
      </div>

      <button
        onClick={increment}
        disabled={value >= max}
        className={`${isSm ? 'w-7 h-7' : 'w-10 h-10'} rounded-xl flex items-center justify-center text-zinc-400 hover:bg-white hover:text-zinc-900 hover:shadow-lg disabled:opacity-20 transition-all active:scale-90 group/plus`}
        aria-label="Increase quantity"
      >
        <svg className={`${isSm ? 'w-2.5 h-2.5' : 'w-4 h-4'} transition-transform group-hover/plus:scale-110`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  );
};
