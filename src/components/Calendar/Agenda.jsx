import React from 'react';
import { formatDate, MONTH_NAMES } from '../../utils/date';

export default function Agenda({ notes, setNotes, currentDate }) {
  const handleDelete = (dateKey) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setNotes(prev => {
        const next = { ...prev };
        delete next[dateKey];
        return next;
      });
    }
  };
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Filter and sort notes for the current month
  const monthEntries = Object.entries(notes)
    .filter(([dateKey]) => {
      const date = new Date(dateKey);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    })
    .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB));

  if (monthEntries.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-60">
        <span className="material-symbols-outlined text-6xl mb-4 text-outline-variant">event_busy</span>
        <h3 className="text-xl font-bold text-on-surface mb-2">No events scheduled</h3>
        <p className="text-sm text-on-surface-variant max-w-xs">
          There are no notes or events for {MONTH_NAMES[currentMonth]} {currentYear}. 
          Switch back to the calendar to add some!
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0 h-full">
      <div className="flex flex-col gap-8 py-4">
        {monthEntries.map(([dateKey, note]) => {
          const date = new Date(dateKey);
          const day = date.getDate();
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          
          return (
            <div key={dateKey} className="flex gap-6 items-start group">
              {/* Date Indicator */}
              <div className="flex flex-col items-center w-14 flex-shrink-0">
                <span className="text-[10px] font-black uppercase tracking-widest text-outline mb-1">{dayName}</span>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black ${note.isPriority ? 'bg-error-container text-on-error-container' : 'bg-secondary-container text-on-secondary-container shadow-sm'} transition-transform group-hover:scale-110`}>
                  {day}
                </div>
              </div>

              {/* Event Content */}
              <div className={`flex-1 p-6 rounded-3xl transition-all border border-transparent shadow-sm flex items-center justify-between ${note.isPriority ? 'bg-error-container/10 border-error/10 hover:bg-error-container/20' : 'bg-surface-container-lowest border-outline-variant/10 hover:border-primary/20 hover:shadow-md'}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`material-symbols-outlined text-sm ${note.isPriority ? 'text-error font-bold' : 'text-primary'}`} data-weight="fill">
                      {note.isPriority ? 'priority_high' : 'sticky_note_2'}
                    </span>
                    <span className={`text-[10px] font-black tracking-widest uppercase ${note.isPriority ? 'text-error' : 'text-primary'}`}>
                      {note.isPriority ? 'Priority Task' : 'Monthly Event'}
                    </span>
                  </div>
                  <p className="text-on-surface font-bold text-lg leading-snug">{note.text}</p>
                </div>
                
                {/* Delete Action */}
                <button 
                  onClick={() => handleDelete(dateKey)}
                  className="opacity-0 group-hover:opacity-40 hover:!opacity-100 transition-opacity p-2 text-outline-variant hover:text-error"
                  title="Delete event"
                >
                  <span className="material-symbols-outlined text-xl">delete</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Scroll Fade Overlay */}
      <div className="sticky bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-surface-container-low to-transparent pointer-events-none"></div>
    </div>
  );
}
