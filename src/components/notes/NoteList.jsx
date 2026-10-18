import React from 'react';
import NoteCard from './NoteCard';
import { StickyNote, Pin, Search } from 'lucide-react';

/**
 * NoteList Component
 * Demonstrates:
 * - Organizing items by condition (Pinned vs Regular notes)
 * - Array .filter() and .map() methods
 * - Responsive Grid Layout
 * - Empty state fallback
 */
const NoteList = ({ notes, totalNoteCount, onEditNote, onDeleteNote, onTogglePin, onResetFilter }) => {
  // Empty State Handling
  if (notes.length === 0) {
    if (totalNoteCount > 0) {
      return (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Search size={28} />
          </div>
          <h4>No notes found</h4>
          <p>No notes match your active category or search query.</p>
          <button
            type="button"
            className="btn-secondary btn-small"
            style={{ marginTop: '0.5rem' }}
            onClick={onResetFilter}
          >
            Show All Notes
          </button>
        </div>
      );
    }

    return (
      <div className="empty-state">
        <div className="empty-state-icon" style={{ backgroundColor: '#fef3c7', color: '#b45309' }}>
          <StickyNote size={32} />
        </div>
        <h4>No Notes Yet</h4>
        <p>Use the form above to jot down ideas, study summaries, or important reminders!</p>
      </div>
    );
  }

  // Separate pinned and unpinned notes
  const pinnedNotes = notes.filter((n) => n.isPinned);
  const otherNotes = notes.filter((n) => !n.isPinned);

  return (
    <div>
      {/* 1. Pinned Notes Section (Rendered only if pinned notes exist) */}
      {pinnedNotes.length > 0 && (
        <section aria-label="Pinned Notes">
          <div className="notes-section-label">
            <Pin size={14} />
            <span>Pinned Notes ({pinnedNotes.length})</span>
          </div>
          <div className="notes-grid">
            {pinnedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEditNote={onEditNote}
                onDeleteNote={onDeleteNote}
                onTogglePin={onTogglePin}
              />
            ))}
          </div>
        </section>
      )}

      {/* 2. Other Notes Section */}
      {otherNotes.length > 0 && (
        <section aria-label="Other Notes">
          {pinnedNotes.length > 0 && (
            <div className="notes-section-label">
              <StickyNote size={14} />
              <span>Other Notes ({otherNotes.length})</span>
            </div>
          )}
          <div className="notes-grid">
            {otherNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEditNote={onEditNote}
                onDeleteNote={onDeleteNote}
                onTogglePin={onTogglePin}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default NoteList;
