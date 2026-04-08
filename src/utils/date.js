export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function getDaysInMonth(year, month) {
  const date = new Date(year, month, 1);
  const days = [];
  
  // Padding for start of month
  const firstDay = date.getDay();
  for (let i = firstDay - 1; i >= 0; i--) {
    const prevDate = new Date(year, month, -i);
    days.push({
      date: prevDate,
      isCurrentMonth: false,
      isToday: isSameDay(prevDate, new Date())
    });
  }

  // Days of current month
  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 1; i <= daysInCurrentMonth; i++) {
    const currentDate = new Date(year, month, i);
    days.push({
      date: currentDate,
      isCurrentMonth: true,
      isToday: isSameDay(currentDate, new Date())
    });
  }

  // Padding for end of month to make 42 grid cells (6 rows)
  const remainingCells = 42 - days.length;
  for (let i = 1; i <= remainingCells; i++) {
    const nextDate = new Date(year, month + 1, i);
    days.push({
      date: nextDate,
      isCurrentMonth: false,
      isToday: isSameDay(nextDate, new Date())
    });
  }

  return days;
}

export function getDaysInWeek(date) {
  const day = date.getDay();
  const start = new Date(date);
  start.setDate(date.getDate() - day);
  
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    days.push(d);
  }
  return days;
}

export function isSameDay(d1, d2) {
  if (!d1 || !d2) return false;
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function formatDate(date) {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function parseDate(dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split('-');
  return new Date(parseInt(y), parseInt(m) - 1, parseInt(d));
}

export function getRangeStats(start, end) {
  if (!start || !end) return { total: 0, weekends: 0, workDays: 0 };
  
  const minDate = new Date(Math.min(start.getTime(), end.getTime()));
  const maxDate = new Date(Math.max(start.getTime(), end.getTime()));
  
  let total = 0;
  let weekends = 0;
  
  let current = new Date(minDate);
  // Setting hours to avoid daylight save time infinite loops
  current.setHours(0,0,0,0);
  maxDate.setHours(0,0,0,0);
  
  while (current <= maxDate) {
    total++;
    if (isWeekend(current)) {
      weekends++;
    }
    current.setDate(current.getDate() + 1);
  }
  
  return {
    total,
    weekends,
    workDays: total - weekends
  };
}
