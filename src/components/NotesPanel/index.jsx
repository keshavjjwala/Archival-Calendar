import React, { useState, useEffect } from 'react';
import { formatDate } from '../../utils/date';

export default function NotesPanel({ focusedDate, notes, setNotes }) {
  const [text, setText] = useState('');
  
  const dateKey = focusedDate ? formatDate(focusedDate) : null;
  const displayDate = focusedDate ? focusedDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric'}) : '';

  useEffect(() => {
    if (dateKey) {
      setText(notes[dateKey] || '');
    } else {
      setText('');
    }
  }, [dateKey, notes]);

  const handleChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    
    if (dateKey) {
      if (newText.trim() === '') {
        const nextNotes = { ...notes };
        delete nextNotes[dateKey];
        setNotes(nextNotes);
      } else {
        setNotes({
          ...notes,
          [dateKey]: newText
        });
      }
    }
  };

  if (!focusedDate) {
    return (
      <div className="notes-panel empty">
        <p>No date selected.</p>
        <span className="empty-subtext">Click a date to view or add notes.</span>
      </div>
    );
  }

  return (
    <div className="notes-panel">
      <div className="notes-header">
        <h3>{displayDate}</h3>
      </div>
      <textarea
        className="notes-textarea"
        placeholder="Add your notes here... (Auto-saves)"
        value={text}
        onChange={handleChange}
      />
    </div>
  );
}
