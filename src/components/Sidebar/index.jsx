import React from 'react';
import { formatDate } from '../../utils/date';

export default function Sidebar({ notes, setNotes, selectionRange }) {
  const handleAddNote = () => {
    if (!selectionRange?.start) {
      alert("Please select a date or range first.");
      return;
    }
    const text = window.prompt("Enter note for this selection:");
    if (!text) return;

    const newNotes = { ...notes };
    
    let minDate = selectionRange.start;
    let maxDate = selectionRange.end || selectionRange.start;
    
    if (selectionRange.end) {
       minDate = new Date(Math.min(selectionRange.start.getTime(), selectionRange.end.getTime()));
       maxDate = new Date(Math.max(selectionRange.start.getTime(), selectionRange.end.getTime()));
    }

    const current = new Date(minDate);
    current.setHours(0,0,0,0);
    const max = new Date(maxDate);
    max.setHours(0,0,0,0);
    
    const notePayload = { 
      text, 
      isPriority: text.toLowerCase().includes('urgent') || text.toLowerCase().includes('priority') 
    };

    while (current <= max) {
      const key = formatDate(current);
      newNotes[key] = notePayload;
      current.setDate(current.getDate() + 1);
    }
    
    setNotes(newNotes);
  };

  const targetDateKey = selectionRange?.start ? formatDate(selectionRange.start) : null;
  const currentNote = targetDateKey ? notes[targetDateKey] : null;

  return (
    <aside className="w-full md:w-80 lg:w-96 bg-surface-container p-6 pt-10 md:pt-14 flex flex-col gap-4 flex-shrink-0 md:overflow-hidden h-auto md:h-full">
      <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-6">
        <div>
          <h3 className="text-xs font-black tracking-widest uppercase text-outline mb-4">Notes & Priorities</h3>
        {currentNote ? (
          <div className={`bg-surface-container-lowest p-6 rounded-2xl shadow-sm border-l-4 ${currentNote.isPriority ? 'border-error' : 'border-primary'}`}>
            <div className="flex items-center gap-2 mb-2">
               <span className={`material-symbols-outlined text-sm ${currentNote.isPriority ? 'text-error' : 'text-primary'}`} data-weight="fill">
                 {currentNote.isPriority ? 'priority_high' : 'sticky_note_2'}
               </span>
               <span className={`text-xs font-bold tracking-wide ${currentNote.isPriority ? 'text-error' : 'text-primary'}`}>
                 {currentNote.isPriority ? 'PRIORITY' : 'NOTE'}
               </span>
            </div>
            <p className="text-on-surface font-bold text-lg leading-tight mb-2">{targetDateKey}</p>
            <p className="text-on-surface-variant text-sm">{currentNote.text}</p>
          </div>
        ) : (
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border-l-4 border-outline-variant opacity-70">
            <p className="text-sm text-on-surface-variant italic">No notes found for this selection.</p>
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <h4 className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Upcoming</h4>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="text-sm font-bold text-outline w-12 pt-1">May 15</div>
            <div className="flex-1">
              <p className="text-sm font-bold">Studio Session</p>
              <p className="text-xs text-on-surface-variant">2:00 PM - Central Studio</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-sm font-bold text-outline w-12 pt-1">May 21</div>
            <div className="flex-1">
              <p className="text-sm font-bold">Archive Migration</p>
              <p className="text-xs text-on-surface-variant">All Day</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      <button onClick={handleAddNote} className="mt-auto flex-shrink-0 w-full py-3 md:py-4 bg-primary text-on-primary rounded-full font-bold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-primary-dim transition-all">
        <span className="material-symbols-outlined">add</span>
        Add Entry
      </button>
    </aside>
  );
}
