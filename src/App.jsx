import React, { useState } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';

export default function App() {
  const [viewMode, setViewMode] = useState('monthly');

  return (
    <div className="flex flex-col min-h-[100dvh] md:h-screen md:overflow-hidden bg-surface">
      <Header viewMode={viewMode} setViewMode={setViewMode} />
      <main className="flex-1 min-h-0 p-3 md:p-6 flex items-center justify-center">
        <Calendar viewMode={viewMode} setViewMode={setViewMode} />
      </main>
      <footer className="flex-shrink-0 text-center py-2 text-outline text-xs tracking-widest font-medium uppercase font-body opacity-50">
        © {new Date().getFullYear()} Archival Calendar — Digital Stationery Collection
      </footer>
    </div>
  );
}
