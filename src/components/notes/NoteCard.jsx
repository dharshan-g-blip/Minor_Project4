import React from 'react';
import { Pin, Trash2, Edit3, Clock, Calendar } from 'lucide-react';

/**
 * NoteCard Component
 * Demonstrates:
 * - Props destructuring
 * - Conditional rendering for pin state and updated timestamps
 * - Template literals for applying pastel color themes
 */
const NoteCard = ({ note, onEditNote, onDeleteNote, onTogglePin }) => {
  const { id, title, content, category, color = 'yellow', isPinned, createdAt, updatedAt } = note;

  return (
    <article className={`note-card ${color}`} aria-label={`Note: ${title}`}>
      {/* Card Header: Title & Pin status */}
      <div className="note-card-header">
        <h4 className="note-card-title">{title}</h4>
        {isPinned && (
          <span className="note-pin-badge" title="Pinned to top">
            <Pin size={13} fill="#b45309" />
          </span>
        )}
      </div>

      {/* Card Body: Note Content */}
      <div className="note-card-body">
        {content}
      </div>

      {/* Card Footer: Metadata & Actions */}
      <div className="note-card-footer">
        <div className="note-timestamps">
          {category && (
            <span className="badge badge-category" style={{ width: 'fit-content', marginBottom: '0.2rem' }}>
              {category}
            </span>
          )}

          <span className="note-time" title={`Created on ${createdAt}`}>
            <Calendar size={11} />
            <span>{createdAt}</span>
          </span>

          {updatedAt && (
            <span className="note-time" title={`Last edited on ${updatedAt}`} style={{ fontStyle: 'italic' }}>
              <Clock size={11} />
              <span>Edited: {updatedAt}</span>
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="note-card-actions">
          <button
            type="button"
            className="action-btn"
            onClick={() => onTogglePin(id)}
            title={isPinned ? 'Unpin note' : 'Pin note to top'}
            aria-label={isPinned ? 'Unpin note' : 'Pin note'}
          >
            <Pin size={15} fill={isPinned ? '#b45309' : 'none'} color={isPinned ? '#b45309' : 'currentColor'} />
          </button>

          <button
            type="button"
            className="action-btn edit"
            onClick={() => onEditNote(note)}
            title="Edit Note"
            aria-label="Edit note"
          >
            <Edit3 size={15} />
          </button>

          <button
            type="button"
            className="action-btn delete"
            onClick={() => onDeleteNote(id)}
            title="Delete Note"
            aria-label="Delete note"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </article>
  );
};

export default NoteCard;
