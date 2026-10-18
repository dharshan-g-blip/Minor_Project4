import React, { useState } from 'react';
import { PlusCircle, Pin, Tag, Palette } from 'lucide-react';

/**
 * NoteForm Component
 * Demonstrates:
 * - Controlled input & textarea components
 * - Event handling (form submission and state updates)
 * - Color theme palette selection
 * - Pin toggle switch
 */
const NoteForm = ({ onAddNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Personal');
  const [color, setColor] = useState('yellow');
  const [isPinned, setIsPinned] = useState(false);
  const [error, setError] = useState(false);

  const colors = [
    { id: 'yellow', name: 'Yellow', class: 'color-yellow' },
    { id: 'blue', name: 'Blue', class: 'color-blue' },
    { id: 'green', name: 'Green', class: 'color-green' },
    { id: 'purple', name: 'Purple', class: 'color-purple' },
    { id: 'rose', name: 'Rose', class: 'color-rose' },
    { id: 'amber', name: 'Amber', class: 'color-amber' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() && !content.trim()) {
      setError(true);
      return;
    }

    onAddNote({
      title: title.trim() || 'Untitled Note',
      content: content.trim(),
      category,
      color,
      isPinned,
    });

    // Reset form
    setTitle('');
    setContent('');
    setCategory('Personal');
    setColor('yellow');
    setIsPinned(false);
    setError(false);
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      {/* Note Title */}
      <input
        type="text"
        className="note-input-title"
        placeholder="Note Title (e.g., Ideas for Project 4)"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError(false);
        }}
        aria-label="Note title"
      />

      {/* Note Content */}
      <textarea
        className="note-textarea"
        placeholder="Take a note, jot down code snippets, or create reminders..."
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          if (error) setError(false);
        }}
        rows={3}
        aria-label="Note content"
      />

      {error && (
        <p style={{ color: 'var(--accent-rose)', fontSize: '0.8rem', fontWeight: 600 }}>
          * Please enter either a title or some note content.
        </p>
      )}

      {/* Controls row */}
      <div className="note-form-controls">
        <div className="note-form-left">
          {/* Category Dropdown */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <Tag size={15} color="var(--primary)" />
            <select
              className="form-select"
              style={{ width: 'auto', padding: '0.4rem 0.65rem' }}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Note category"
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Study">Study</option>
              <option value="Ideas">Ideas</option>
              <option value="General">General</option>
            </select>
          </div>

          {/* Color Palette Selector */}
          <div className="color-picker-group">
            <Palette size={15} color="var(--primary)" />
            <span className="color-picker-label">Color:</span>
            {colors.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`color-swatch ${c.class} ${color === c.id ? 'selected' : ''}`}
                onClick={() => setColor(c.id)}
                title={c.name}
                aria-label={`Select ${c.name} color`}
              />
            ))}
          </div>

          {/* Pin to Top Toggle */}
          <button
            type="button"
            className={`pin-toggle-btn ${isPinned ? 'pinned' : ''}`}
            onClick={() => setIsPinned(!isPinned)}
            title={isPinned ? 'Note will be pinned to top' : 'Click to pin note'}
          >
            <Pin size={14} />
            <span>{isPinned ? 'Pinned' : 'Pin Note'}</span>
          </button>
        </div>

        {/* Add Note Button */}
        <button type="submit" className="btn-primary" style={{ padding: '0.55rem 1.15rem' }}>
          <PlusCircle size={16} />
          <span>Add Note</span>
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
