import React from 'react';
import { MONTH_NAMES, getDaysInMonth } from '../../utils/date';

export default function Yearly({ currentDate, setViewMode, setCurrentDate }) {
  const years = [currentDate.getFullYear()];
  const today = new Date();

  return (
    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0 h-full">
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
        {MONTH_NAMES.map((monthName, monthIndex) => {
          // Get only the days for this specific month, ignoring the 42-day padding from getDaysInMonth
          const allDays = getDaysInMonth(currentDate.getFullYear(), monthIndex);
          const monthDays = allDays.filter(d => d.isCurrentMonth);
          const firstDayOfMonth = monthDays[0].date.getDay();
          
          const isCurrentMonth = today.getMonth() === monthIndex && today.getFullYear() === currentDate.getFullYear();
          
          return (
            <div 
              key={monthName} 
              className={`p-4 rounded-2xl transition-all cursor-pointer border ${isCurrentMonth ? 'bg-primary-container border-primary/20' : 'bg-surface-container-lowest border-transparent hover:border-primary/20 hover:shadow-md'}`}
              onClick={() => {
                setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
                setViewMode('monthly');
              }}
            >
              <h3 className={`text-xs font-black uppercase tracking-widest mb-3 ${isCurrentMonth ? 'text-primary' : 'text-outline'}`}>
                {monthName}
              </h3>
              
              <div className="grid grid-cols-7 gap-1">
                {/* Simplified Grid Header */}
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                  <span key={d} className="text-[8px] font-bold text-outline-variant text-center">{d}</span>
                ))}
                
                {/* Empty slots for start of month */}
                {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                
                {/* Day numbers */}
                {monthDays.map(dayObj => {
                  const day = dayObj.date.getDate();
                  const isToday = today.toDateString() === dayObj.date.toDateString();
                  
                  return (
                    <div 
                      key={day} 
                      className={`text-[8px] flex items-center justify-center w-4 h-4 rounded-full ${isToday ? 'bg-primary text-on-primary font-bold' : 'text-on-surface-variant'}`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Scroll Fade Overlay */}
      <div className="sticky bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-surface-container-low to-transparent pointer-events-none"></div>
    </div>
  );
}
