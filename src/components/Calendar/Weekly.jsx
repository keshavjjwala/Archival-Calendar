import React from 'react';
import { getDaysInWeek, formatDate, DAY_NAMES, isSameDay } from '../../utils/date';

export default function Weekly({ currentDate, notes, handleDateClick }) {
  const weekDays = getDaysInWeek(currentDate);
  const today = new Date();

  return (
    <div className="flex-1 overflow-x-auto custom-scrollbar min-h-0 h-full">
      <div className="flex gap-3 md:gap-4 p-4 h-full min-w-[700px] md:min-w-full">
        {weekDays.map((date) => {
          const dateKey = formatDate(date);
          const note = notes[dateKey];
          const isToday = isSameDay(date, today);
          const isSelected = isSameDay(date, currentDate);
          
          return (
            <div 
              key={dateKey} 
              className={`flex-1 flex flex-col gap-4 p-5 rounded-3xl transition-all border ${isSelected ? 'bg-surface-container-high border-primary/30 ring-2 ring-primary/10' : 'bg-surface-container-lowest border-transparent hover:border-primary/20'} min-h-0`}
              onClick={() => handleDateClick(date)}
            >
              {/* Day Header */}
              <div className="flex flex-col items-center">
                <span className={`text-[10px] font-black uppercase tracking-widest ${isToday ? 'text-primary' : 'text-outline'}`}>
                  {DAY_NAMES[date.getDay()]}
                </span>
                <div className={`mt-1 w-10 h-10 rounded-2xl flex items-center justify-center text-lg font-black ${isToday ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'text-on-surface'}`}>
                  {date.getDate()}
                </div>
              </div>

              {/* Day Events */}
              <div className="flex-1 overflow-y-auto custom-scrollbar-mini space-y-3">
                {note ? (
                  <div className={`p-4 rounded-2xl border-l-4 shadow-sm ${note.isPriority ? 'bg-error-container/10 border-error' : 'bg-primary-container/10 border-primary'}`}>
                    <div className="flex items-center gap-1.5 mb-2">
                       <span className={`material-symbols-outlined text-[14px] ${note.isPriority ? 'text-error' : 'text-primary'}`} data-weight="fill">
                         {note.isPriority ? 'priority_high' : 'sticky_note_2'}
                       </span>
                       <span className={`text-[8px] font-black tracking-widest uppercase ${note.isPriority ? 'text-error' : 'text-primary'}`}>
                         {note.isPriority ? 'PRTY' : 'NOTE'}
                       </span>
                    </div>
                    <p className="text-[11px] font-bold text-on-surface leading-tight line-clamp-4">
                      {note.text}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full opacity-10 py-8">
                    <span className="material-symbols-outlined text-3xl">add_circle</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
