import React, { memo } from 'react';
import { isSameDay } from '../../utils/date';

function DayCell({
  dayObj,
  selectionRange,
  hasNote,
  onPointerDown,
  onPointerEnter,
  onClick
}) {
  const { date, isCurrentMonth, isToday } = dayObj;
  
  let isSelectedStart = false;
  let isSelectedEnd = false;
  let isInRange = false;
  
  if (selectionRange?.start) {
    if (isSameDay(date, selectionRange.start)) isSelectedStart = true;
    
    if (selectionRange.end) {
      if (isSameDay(date, selectionRange.end)) isSelectedEnd = true;
      const minDate = Math.min(selectionRange.start, selectionRange.end);
      const maxDate = Math.max(selectionRange.start, selectionRange.end);
      if (date > minDate && date < maxDate) {
        isInRange = true;
      }
    } else if (selectionRange.hover) {
      const minDate = Math.min(selectionRange.start, selectionRange.hover);
      const maxDate = Math.max(selectionRange.start, selectionRange.hover);
      if (date > minDate && date < maxDate) {
        isInRange = true;
      }
    }
  }

  let classNames = ['day-cell'];
  if (!isCurrentMonth) classNames.push('diff-month');
  if (isToday) classNames.push('today');
  
  if (isSelectedStart && isSelectedEnd && isSameDay(selectionRange.start, selectionRange.end)) {
    classNames.push('selected-single');
  } else {
    if (isSelectedStart) classNames.push('selected-start');
    if (isSelectedEnd) classNames.push('selected-end');
  }
  
  if (isInRange) classNames.push('in-range');

  return (
    <div
      className={classNames.join(' ')}
      onPointerDown={(e) => {
        if(e.button !== 0) return; // Only trigger on primary click
        e.preventDefault();
        onPointerDown();
      }}
      onPointerEnter={onPointerEnter}
      onClick={onClick}
    >
      <div className="day-number">{date.getDate()}</div>
      {hasNote && <div className="note-indicator"></div>}
    </div>
  );
}

export default memo(DayCell, (prevProps, nextProps) => {
  // Memoize to avoid unnecessary re-renders when dragging
  if (prevProps.hasNote !== nextProps.hasNote) return false;
  
  // Custom comparison for selection state
  // This could be optimized further if needed, but given the 42 cells, JSON.stringify works reasonably fast.
  if (JSON.stringify(prevProps.selectionRange) !== JSON.stringify(nextProps.selectionRange)) return false;
  
  return true;
});
