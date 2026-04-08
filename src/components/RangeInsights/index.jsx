import React from 'react';
import { getRangeStats } from '../../utils/date';

export default function RangeInsights({ range }) {
  const { start, end } = range;
  
  if (!start || !end) return <div className="range-insights-placeholder"></div>;

  const stats = getRangeStats(start, end);
  
  if (stats.total <= 1) return <div className="range-insights-placeholder"></div>;

  return (
    <div className="range-insights">
      <h3>Range Insights</h3>
      <div className="insight-stats">
        <div className="stat">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Days</span>
        </div>
        <div className="stat">
          <span className="stat-value">{stats.workDays}</span>
          <span className="stat-label">Work</span>
        </div>
        <div className="stat">
          <span className="stat-value">{stats.weekends}</span>
          <span className="stat-label">Weekends</span>
        </div>
      </div>
    </div>
  );
}
