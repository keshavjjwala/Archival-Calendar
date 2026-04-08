import React, { memo } from 'react';
import { DAY_NAMES, formatDate, isSameDay } from '../../utils/date';

const Grid = memo(({ days, selectionRange, notes, onDateClick, onDateHover, onGridLeave }) => {
  return (
    <div className="bg-surface-container-lowest rounded-2xl p-4 md:p-6 select-none flex-1 flex flex-col min-h-0" onMouseLeave={onGridLeave}>
      {/* Week Headers */}
      <div className="grid grid-cols-7 mb-2 flex-shrink-0">
        {DAY_NAMES.map(day => (
          <div key={day} className="text-center font-bold text-on-surface-variant tracking-widest text-xs uppercase">{day}</div>
        ))}
      </div>
      
      {/* Grid Content */}
      <div className="grid grid-cols-7 gap-y-1 flex-1 auto-rows-[1fr] min-h-0">
        {days.map((dayObj, index) => {
          const { date, isCurrentMonth } = dayObj;
          const dateKey = formatDate(date);
          const hasNote = !!notes[dateKey];
          
          if (!isCurrentMonth) {
            return <div key={`${dateKey}-${index}`} className="min-h-[3rem] md:min-h-[2.5rem]"></div>;
          }

          let isSelectedStart = false;
          let isSelectedEnd = false;
          let isInRange = false;
          let isHoverRange = false;
          
          if (selectionRange?.start) {
            isSelectedStart = isSameDay(date, selectionRange.start);
            if (selectionRange.end) {
              isSelectedEnd = isSameDay(date, selectionRange.end);
              const minDate = Math.min(selectionRange.start.getTime(), selectionRange.end.getTime());
              const maxDate = Math.max(selectionRange.start.getTime(), selectionRange.end.getTime());
              const dTime = date.getTime();
              
              if (dTime > minDate && dTime < maxDate) {
                isInRange = true;
              }
            } else if (selectionRange.hover) {
              const minDate = Math.min(selectionRange.start.getTime(), selectionRange.hover.getTime());
              const maxDate = Math.max(selectionRange.start.getTime(), selectionRange.hover.getTime());
              const dTime = date.getTime();
              
              if ((dTime > minDate && dTime < maxDate) || isSameDay(date, selectionRange.hover)) {
                isHoverRange = true;
              }
            }
          }
          
          const isSelected = isSelectedStart || isSelectedEnd;

          // Compute wrapper classes based on UI specifics
          let wrapperClasses = "min-h-[3rem] md:min-h-[2.5rem] flex items-center justify-center relative cursor-pointer min-w-0 transition-colors rounded-xl ";
          if (isInRange) {
             wrapperClasses += "date-range-bg";
          } else if (isHoverRange) {
             wrapperClasses += "bg-secondary-container/50";
          }
          
          return (
            <div 
              key={`${dateKey}-${index}`} 
              className={wrapperClasses}
              onClick={() => onDateClick(date)}
              onMouseEnter={() => onDateHover(date)}
            >
              {isSelected ? (
                <div className="w-10 h-10 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-primary flex items-center justify-center z-10 shadow-sm transition-transform active:scale-95">
                   <span className="text-base md:text-base lg:text-xl font-bold text-on-primary">{date.getDate()}</span>
                </div>
              ) : (
                <span className="text-base md:text-base lg:text-xl font-medium hover:text-primary transition-colors">
                  {date.getDate()}
                </span>
              )}
              {hasNote && (
                <div className="absolute bottom-1.5 md:bottom-4 w-1.5 h-1.5 rounded-full bg-outline-variant"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Grid;
