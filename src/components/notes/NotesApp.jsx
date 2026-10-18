import React, { useState, useEffect } from 'react';
import NoteForm from './NoteForm';
import NoteList from './NoteList';
import NoteModal from './NoteModal';
import ConfirmModal from '../common/ConfirmModal';
import { initialNotes } from '../../data/initialData';
import { StickyNote, Search } from 'lucide-react';
import '../../styles/Notes.css';

/**
 * NotesApp Component (Project 2)
 * Demonstrates:
 * - State Management with useState (notes, active filter, search query, modal states)
 * - LocalStorage persistence with useEffect
 * - Array methods: .filter(), .map(), .find()
 * - ES6 Spread Operator & Destructuring
 * - Modal interactions and responsive card grid
 */
const NotesApp = ({ showToast }) => {
  // -------------------------------------------------------------------------
  // 1. State: Notes loaded from LocalStorage or initial data
  // -------------------------------------------------------------------------
  const [notes, setNotes] = useState(() => {
    try {
      const savedNotes = localStorage.getItem('taskcraft_notes_v2');
      return savedNotes ? JSON.parse(savedNotes) : initialNotes;
    } catch (err) {
      console.error('Error loading notes from LocalStorage:', err);
      return initialNotes;
    }
  });

  // Search & Category Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Edit Note Modal State
  const [editingNote, setEditingNote] = useState(null);

  // Delete Confirmation Modal State
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    noteId: null,
  });

  // -------------------------------------------------------------------------
  // 2. Side Effect: Sync notes to LocalStorage
  // -------------------------------------------------------------------------
  useEffect(() => {
    try {
      localStorage.setItem('taskcraft_notes_v2', JSON.stringify(notes));
    } catch (err) {
      console.error('Error saving notes to LocalStorage:', err);
    }
  }, [notes]);

  // Categories list for filtering
  const categories = ['All', 'Work', 'Personal', 'Study', 'Ideas', 'General'];

  // -------------------------------------------------------------------------
  // 3. Handlers for Note Operations
  // -------------------------------------------------------------------------

  /**
   * Add a new note with a formatted timestamp
   */
  const handleAddNote = (newNoteData) => {
    const now = new Date();
    const formattedTimestamp = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newNote = {
      id: `note-${Date.now()}`,
      ...newNoteData,
      createdAt: formattedTimestamp,
      updatedAt: null,
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    showToast?.('Note created successfully!', 'success');
  };

  /**
   * Update an existing note and record the `updatedAt` timestamp
   */
  const handleUpdateNote = (id, updatedFields) => {
    const now = new Date();
    const formattedTimestamp = now.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              ...updatedFields,
              updatedAt: formattedTimestamp,
            }
          : note
      )
    );

    showToast?.('Note updated successfully!', 'success');
  };

  /**
   * Toggle Pin state of a note
   */
  const handleTogglePin = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => {
        if (note.id === id) {
          const nextPinned = !note.isPinned;
          showToast?.(
            nextPinned ? 'Note pinned to top!' : 'Note unpinned.',
            'info'
          );
          return { ...note, isPinned: nextPinned };
        }
        return note;
      })
    );
  };

  /**
   * Prompt delete note
   */
  const promptDeleteNote = (id) => {
    setDeleteModal({
      isOpen: true,
      noteId: id,
    });
  };

  /**
   * Confirm deletion
   */
  const handleConfirmDelete = () => {
    if (deleteModal.noteId) {
      setNotes((prevNotes) => prevNotes.filter((n) => n.id !== deleteModal.noteId));
      showToast?.('Note deleted.', 'danger');
    }
    setDeleteModal({ isOpen: false, noteId: null });
  };

  // -------------------------------------------------------------------------
  // 4. Filtering & Search using Array .filter()
  // -------------------------------------------------------------------------
  const filteredNotes = notes.filter((note) => {
    // 1. Category Filter
    if (selectedCategory !== 'All' && note.category !== selectedCategory) {
      return false;
    }

    // 2. Search Query (matches title or content)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchTitle = note.title?.toLowerCase().includes(query);
      const matchContent = note.content?.toLowerCase().includes(query);
      const matchCategory = note.category?.toLowerCase().includes(query);
      return matchTitle || matchContent || matchCategory;
    }

    return true;
  });

  return (
    <section className="notes-app-card" aria-label="Notes Application">
      {/* Section Header */}
      <div className="section-header">
        <div className="section-title">
          <StickyNote className="section-title-icon" size={26} />
          <span>Notes Hub</span>
        </div>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          {notes.length} total {notes.length === 1 ? 'note' : 'notes'}
        </span>
      </div>

      {/* Note Creation Form */}
      <NoteForm onAddNote={handleAddNote} />

      {/* Search & Category Filter Toolbar */}
      <div className="notes-toolbar">
        {/* Live Search Input */}
        <div className="notes-search-wrapper">
          <Search size={16} className="notes-search-icon" />
          <input
            type="text"
            className="notes-search-input"
            placeholder="Search notes by title, keyword, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search notes"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="category-filter-chips" role="tablist" aria-label="Filter notes by category">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Notes Grid List */}
      <NoteList
        notes={filteredNotes}
        totalNoteCount={notes.length}
        onEditNote={(note) => setEditingNote(note)}
        onDeleteNote={promptDeleteNote}
        onTogglePin={handleTogglePin}
        onResetFilter={() => {
          setSelectedCategory('All');
          setSearchQuery('');
        }}
      />

      {/* Edit Note Modal */}
      <NoteModal
        key={editingNote ? editingNote.id : 'empty'}
        isOpen={Boolean(editingNote)}
        note={editingNote}
        onSave={handleUpdateNote}
        onClose={() => setEditingNote(null)}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Note?"
        message="Are you sure you want to permanently delete this note? This action cannot be undone."
        confirmText="Delete Note"
        confirmVariant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, noteId: null })}
      />
    </section>
  );
};

export default NotesApp;
