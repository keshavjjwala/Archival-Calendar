import React from 'react';

export default function Header({ viewMode, setViewMode }) {
  return (
    <header className="sticky top-0 w-full z-50 flex flex-col sm:flex-row justify-between items-center px-4 md:px-8 py-3 md:py-4 bg-[#f9f9f7] dark:bg-[#1a1c1a] backdrop-blur-md opacity-90 flex-shrink-0 gap-3 md:gap-0">
      <div className="text-xl md:text-2xl font-bold tracking-tight text-[#2e3432] dark:text-[#e2e3de] whitespace-nowrap">2026 Archival Calendar</div>
      
      <nav className="flex space-x-4 md:space-x-8 text-sm md:text-base">
        <button 
          onClick={() => setViewMode('yearly')}
          className={`font-medium transition-colors duration-400 pb-1 ${viewMode === 'yearly' ? 'text-primary border-b-2 border-primary' : 'text-outline hover:text-primary-dim border-b-2 border-transparent'}`}
        >
          Yearly
        </button>
        <button 
          onClick={() => setViewMode('monthly')}
          className={`font-medium transition-colors duration-400 pb-1 ${viewMode === 'monthly' ? 'text-primary border-b-2 border-primary' : 'text-outline hover:text-primary-dim border-b-2 border-transparent'}`}
        >
          Monthly
        </button>
        <button 
          onClick={() => setViewMode('weekly')}
          className={`font-medium transition-colors duration-400 pb-1 ${viewMode === 'weekly' ? 'text-primary border-b-2 border-primary' : 'text-outline hover:text-primary-dim border-b-2 border-transparent'}`}
        >
          Weekly
        </button>
      </nav>

      <div className="flex items-center space-x-4 md:space-x-6">
        <span 
          onClick={() => setViewMode('monthly')}
          className={`material-symbols-outlined cursor-pointer transition-colors p-2 ${viewMode === 'monthly' ? 'text-primary' : 'text-outline hover:text-primary-dim'}`}
          style={{ fontVariationSettings: viewMode === 'monthly' ? "'FILL' 1" : "'FILL' 0" }}
        >
          calendar_month
        </span>
        <span 
          onClick={() => setViewMode('agenda')}
          className={`material-symbols-outlined cursor-pointer transition-colors p-2 ${viewMode === 'agenda' ? 'text-primary' : 'text-outline hover:text-primary-dim'}`}
          style={{ fontVariationSettings: viewMode === 'agenda' ? "'FILL' 1" : "'FILL' 0" }}
        >
          event
        </span>
      </div>
    </header>
  );
}
