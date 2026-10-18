import React, { useState } from 'react';
import { X, Save, Pin, Palette, Tag } from 'lucide-react';

/**
 * NoteModal Component
 * Reusable modal for editing an existing note
 * Follows official React recommendation: Keyed by note.id to initialize state directly
 */
const NoteModal = ({ isOpen, note, onSave, onClose }) => {
  // Initialize state directly from note prop unconditionally (following React Rules of Hooks)
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [category, setCategory] = useState(note?.category || 'Personal');
  const [color, setColor] = useState(note?.color || 'yellow');
  const [isPinned, setIsPinned] = useState(Boolean(note?.isPinned));

  if (!isOpen || !note) return null;

  const colors = [
    { id: 'yellow', name: 'Yellow', class: 'color-yellow' },
    { id: 'blue', name: 'Blue', class: 'color-blue' },
    { id: 'green', name: 'Green', class: 'color-green' },
    { id: 'purple', name: 'Purple', class: 'color-purple' },
    { id: 'rose', name: 'Rose', class: 'color-rose' },
    { id: 'amber', name: 'Amber', class: 'color-amber' },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;

    onSave(note.id, {
      title: title.trim() || 'Untitled Note',
      content: content.trim(),
      category,
      color,
      isPinned,
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Note</h3>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close edit modal"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Title */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                Note Title
              </label>
              <input
                type="text"
                className="form-input-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title..."
                required
              />
            </div>

            {/* Content */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '0.25rem' }}>
                Note Content
              </label>
              <textarea
                className="note-textarea"
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Note body..."
              />
            </div>

            {/* Category & Pin */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Tag size={15} color="var(--text-muted)" />
                <select
                  className="form-select"
                  style={{ width: 'auto', padding: '0.35rem 0.65rem' }}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  aria-label="Edit category"
                >
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="Study">Study</option>
                  <option value="Ideas">Ideas</option>
                  <option value="General">General</option>
                </select>
              </div>

              <button
                type="button"
                className={`pin-toggle-btn ${isPinned ? 'pinned' : ''}`}
                onClick={() => setIsPinned(!isPinned)}
              >
                <Pin size={14} />
                <span>{isPinned ? 'Pinned to top' : 'Pin Note'}</span>
              </button>
            </div>

            {/* Color Palette */}
            <div className="color-picker-group">
              <Palette size={15} color="var(--text-muted)" />
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
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              <Save size={15} />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
