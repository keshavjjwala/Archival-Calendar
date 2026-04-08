import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../Sidebar';
import Grid from './Grid';
import Agenda from './Agenda';
import Yearly from './Yearly';
import Weekly from './Weekly';
import { getDaysInMonth, MONTH_NAMES } from '../../utils/date';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export default function Calendar({ viewMode, setViewMode }) {
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [[page, direction], setPage] = useState([0, 0]);
  const [notes, setNotes] = useLocalStorage('calendar_notes', {});
  
  const paginate = useCallback((newDirection) => {
    setPage([page + newDirection, newDirection]);
    const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + newDirection, 1);
    setCurrentDate(nextDate);
  }, [page, currentDate]);
  
  const [selectionRange, setSelectionRange] = useState({
    start: new Date(),
    end: null,
    hover: null,
  });
  
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const days = useMemo(() => getDaysInMonth(currentYear, currentMonth), [currentYear, currentMonth]);

  const handleDateClick = useCallback((date) => {
    setSelectionRange(prev => {
      if (prev.start && !prev.end && prev.start.getTime() === date.getTime()) {
        return { start: null, end: null, hover: null };
      }
      if (!prev.start || (prev.start && prev.end)) {
        return { start: date, end: null, hover: null };
      }
      const minTime = Math.min(prev.start.getTime(), date.getTime());
      const maxTime = Math.max(prev.start.getTime(), date.getTime());
      return { start: new Date(minTime), end: new Date(maxTime), hover: null };
    });
  }, [setSelectionRange]);

  const handleDateHover = useCallback((date) => {
    setSelectionRange(prev => {
      if (prev.start && !prev.end) {
        if (prev.hover && prev.hover.getTime() === date.getTime()) return prev;
        return { ...prev, hover: date };
      }
      return prev;
    });
  }, [setSelectionRange]);

  const handleGridLeave = useCallback(() => {
    setSelectionRange(prev => {
      if (prev.hover) return { ...prev, hover: null };
      return prev;
    });
  }, [setSelectionRange]);

  return (
    <div className="relative w-full max-w-6xl h-auto md:h-full bg-surface-container-low md:rounded-2xl md:paper-shadow flex flex-col md:flex-row shadow-lg sm:shadow-none" style={{ perspective: '1200px' }}>
      <div className="flex-[2] relative">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            style={{ shadow: "0 0px 0px rgba(0,0,0,0)" }}
            className="relative md:absolute md:inset-0 p-4 md:p-6 pt-12 md:pt-14 flex flex-col min-h-0 h-full origin-top backface-hidden"
            initial={{ 
              rotateX: direction > 0 ? -75 : 75,
              scale: 0.98,
              opacity: 0,
            }}
            animate={{ 
              rotateX: 0,
              scale: 1,
              opacity: 1,
              boxShadow: "0 0px 0px rgba(0,0,0,0)"
            }}
            exit={{ 
              rotateX: direction > 0 ? 75 : -75,
              scale: 0.98,
              opacity: 0,
              boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
            {/* Spiral Binding Overlay - Inside the flipping unit */}
            <div className="absolute top-0 left-0 right-0 h-10 flex justify-around items-start px-4 md:px-12 z-20 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div key={`spiral-mob-${i}`} className="md:hidden w-2 h-8 spiral-gradient rounded-full"></div>
              ))}
              {[...Array(12)].map((_, i) => (
                <div key={`spiral-dt-${i}`} className="hidden md:block w-3 h-10 spiral-gradient rounded-full"></div>
              ))}
            </div>

            {/* Content Section */}
            <div className="flex flex-col h-full min-h-0">
              {/* Hero Section */}
              <div className="mb-4 md:mb-6 flex flex-col md:flex-row gap-4 items-end flex-shrink-0">
                <div className="w-full md:w-1/2 h-24 md:h-28 lg:h-36 rounded-2xl overflow-hidden shadow-sm">
                  <img 
                    alt={`${MONTH_NAMES[currentMonth]} ${currentYear} Aesthetic`} 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6gQ-TpIJRJZAGzzcRb459BO5SfGDNnC5tjeCWRGFgsnWqz5Z-2pr26gFPG9G6zasLM4Y36rwta1jJ78gCZyUhDjaefh73dCTfAovW98Jztb2GA0MotqdKNlKCl5Jz2MZJRpEtpVl8XeIR6sYPcgVH6wLfuRUboH1LWpt2IVo5dwDAGqd7OhClRmPuoa-DqMNIxEzfFnfoQBm7aT8_ZydJB48FnsuPs9O_CLTiGiMSG3d3fRsaVssVC5XELFTCpv6h2VTUcJmh-_Vg" 
                  />
                </div>
                <div className="flex-1 pb-2 flex justify-between items-end">
                  <div className="flex flex-col">
                    <div className="relative group">
                      <select 
                        value={currentMonth}
                        onChange={(e) => setCurrentDate(new Date(currentYear, parseInt(e.target.value), 1))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      >
                        {MONTH_NAMES.map((month, i) => (
                          <option key={month} value={i} className="text-base text-on-surface bg-surface">{month}</option>
                        ))}
                      </select>
                      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-on-surface leading-none mb-1 group-hover:text-primary transition-colors">
                        {MONTH_NAMES[currentMonth]}
                      </h1>
                    </div>
                    
                    <div className="relative group">
                      <select
                        value={currentYear}
                        onChange={(e) => setCurrentDate(new Date(parseInt(e.target.value), currentMonth, 1))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      >
                        {Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i).map(y => (
                          <option key={y} value={y} className="text-base text-on-surface bg-surface">{y}</option>
                        ))}
                      </select>
                      <p className="text-xl md:text-2xl font-light text-on-surface-variant tracking-[0.2em] uppercase group-hover:text-primary transition-colors">
                        {currentYear}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => paginate(-1)} className="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant hover:bg-surface-variant transition-colors text-on-surface">
                      <span className="material-symbols-outlined">arrow_upward</span>
                    </button>
                    <button onClick={() => paginate(1)} className="w-10 h-10 rounded-full flex items-center justify-center border border-outline-variant hover:bg-surface-variant transition-colors text-on-surface">
                      <span className="material-symbols-outlined">arrow_downward</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Calendar Content Container (Multi-View) */}
              <div className="relative flex-1 flex flex-col min-h-0">
                {viewMode === 'monthly' ? (
                  <Grid 
                    days={days}
                    selectionRange={selectionRange}
                    onDateClick={handleDateClick}
                    onDateHover={handleDateHover}
                    onGridLeave={handleGridLeave}
                    notes={notes}
                  />
                ) : viewMode === 'yearly' ? (
                  <Yearly 
                    currentDate={currentDate} 
                    setCurrentDate={setCurrentDate} 
                    setViewMode={setViewMode} 
                  />
                ) : viewMode === 'weekly' ? (
                  <Weekly 
                    currentDate={currentDate} 
                    notes={notes} 
                    handleDateClick={handleDateClick} 
                  />
                ) : (
                  <Agenda 
                    notes={notes}
                    setNotes={setNotes}
                    currentDate={currentDate}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right Panel: Notes */}
      <Sidebar notes={notes} setNotes={setNotes} selectionRange={selectionRange} />
    </div>
  );
}
