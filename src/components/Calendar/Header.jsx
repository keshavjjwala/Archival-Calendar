import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MONTH_NAMES } from '../../utils/date';

export default function Header({ currentMonth, currentYear, onPrev, onNext }) {
  return (
    <div className="calendar-header">
      <div className="month-display">
        <h2>{MONTH_NAMES[currentMonth]} {currentYear}</h2>
      </div>
      <div className="nav-buttons">
        <button onClick={onPrev} aria-label="Previous Month" className="nav-btn">
          <ChevronLeft size={24} />
        </button>
        <button onClick={onNext} aria-label="Next Month" className="nav-btn">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
