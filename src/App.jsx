import React, { useState, useEffect } from 'react';
import Navbar from './components/common/Navbar';
import TodoApp from './components/todo/TodoApp';
import NotesApp from './components/notes/NotesApp';
import Toast from './components/common/Toast';
import ConfirmModal from './components/common/ConfirmModal';
import { initialTasks, initialNotes } from './data/initialData';
import { getUpcomingDueTasks } from './utils/dateUtils';
import { Calendar } from 'lucide-react';
import './styles/App.css';

/**
 * Pure helper function to get today's formatted date string
 */
const getTodayFormatted = () => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

/**
 * Root Application Component
 * Demonstrates:
 * - Top-level State Management with useState
 * - Active view switching (To-Do, Notes, or Dual View)
 * - Toast notification system with timer cleanup via useEffect
 * - Props passing to child components
 * - Clean layout architecture
 */
function App() {
  // Navigation state: 'todo' | 'notes' | 'dual'
  const [activeTab, setActiveTab] = useState('todo');

  // Counts for navbar badges & hero stats
  const [taskCount, setTaskCount] = useState(0);
  const [noteCount, setNoteCount] = useState(0);

  // Urgent tasks with upcoming due dates (for notifications)
  const [urgentTasks, setUrgentTasks] = useState([]);

  // Reusable Toast state
  const [toast, setToast] = useState(null);

  // Reset confirmation modal state
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Key to force re-render when reset is triggered
  const [dataVersion, setDataVersion] = useState(0);

  // Today's formatted date string
  const todayFormatted = getTodayFormatted();

  // -------------------------------------------------------------------------
  // Helper: Trigger Toast notification with auto-dismiss
  // -------------------------------------------------------------------------
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // -------------------------------------------------------------------------
  // Update task & note counts and urgent due tasks from localStorage
  // -------------------------------------------------------------------------
  useEffect(() => {
    const updateCounts = () => {
      try {
        const savedTasks = localStorage.getItem('taskcraft_tasks_v2');
        const tasks = savedTasks ? JSON.parse(savedTasks) : initialTasks;
        setTaskCount(tasks.length);

        const upcoming = getUpcomingDueTasks(tasks);
        setUrgentTasks(upcoming);

        const savedNotes = localStorage.getItem('taskcraft_notes_v2');
        const notes = savedNotes ? JSON.parse(savedNotes) : initialNotes;
        setNoteCount(notes.length);
      } catch (err) {
        console.error('Error reading counts:', err);
      }
    };

    updateCounts();
    // Re-check periodically or on version change
    const interval = setInterval(updateCounts, 1500);
    return () => clearInterval(interval);
  }, [dataVersion]);

  // -------------------------------------------------------------------------
  // Automatic Proactive Deadline Reminder on Load
  // -------------------------------------------------------------------------
  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('taskcraft_tasks_v2');
      const tasks = savedTasks ? JSON.parse(savedTasks) : initialTasks;
      const upcoming = getUpcomingDueTasks(tasks);

      if (upcoming.length > 0) {
        const timer = setTimeout(() => {
          showToast(
            `🔔 Deadline Alert: You have ${upcoming.length} task(s) due today or approaching deadline!`,
            'info'
          );
        }, 800);
        return () => clearTimeout(timer);
      }
    } catch (err) {
      console.error('Error checking due date reminders:', err);
    }
  }, []);

  // -------------------------------------------------------------------------
  // Reset Data to Initial Starter Data
  // -------------------------------------------------------------------------
  const handleResetData = () => {
    try {
      localStorage.setItem('taskcraft_tasks_v2', JSON.stringify(initialTasks));
      localStorage.setItem('taskcraft_notes_v2', JSON.stringify(initialNotes));
      setDataVersion((v) => v + 1);
      setIsResetConfirmOpen(false);
      showToast('Data reset to sample items!', 'info');
    } catch (err) {
      console.error('Error resetting data:', err);
    }
  };

  return (
    <div className="app-wrapper">
      {/* 1. Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        taskCount={taskCount}
        noteCount={noteCount}
        urgentTasks={urgentTasks}
        onSelectUrgentTask={() => setActiveTab('todo')}
        onResetData={() => setIsResetConfirmOpen(true)}
      />

      {/* 2. Main Container */}
      <main className="main-container">
        {/* Hero Welcome Banner */}
        <section className="hero-banner" aria-label="Welcome banner">
          <div className="hero-content">
            <div className="hero-date-badge">
              <Calendar size={14} />
              <span>{todayFormatted}</span>
            </div>
            <h2>Productivity Workspace</h2>
            <p>
              Streamline your workflow with intuitive task tracking and structured note taking.
              Stay focused, organized, and achieve your daily goals effortlessly.
            </p>
          </div>

          <div className="hero-stats">
            <div className="hero-stat-card">
              <span className="stat-value">{taskCount}</span>
              <span className="stat-label">Tasks</span>
            </div>
            <div className="hero-stat-card">
              <span className="stat-value">{noteCount}</span>
              <span className="stat-label">Notes</span>
            </div>
          </div>
        </section>

        {/* Dynamic Content Views based on activeTab */}
        {activeTab === 'todo' && (
          <div className="view-container-todo">
            <TodoApp key={`todo-${dataVersion}`} showToast={showToast} />
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="view-container-notes">
            <NotesApp key={`notes-${dataVersion}`} showToast={showToast} />
          </div>
        )}

        {activeTab === 'dual' && (
          <div className="view-container-dual">
            <TodoApp key={`dual-todo-${dataVersion}`} showToast={showToast} />
            <NotesApp key={`dual-notes-${dataVersion}`} showToast={showToast} />
          </div>
        )}
      </main>

      {/* 3. Reusable Toast Notification */}
      <Toast toast={toast} />

      {/* 4. Reset Data Confirmation Modal */}
      <ConfirmModal
        isOpen={isResetConfirmOpen}
        title="Reset to Sample Data?"
        message="This will replace all your current tasks and notes with the original sample starter data. Are you sure you want to proceed?"
        confirmText="Reset All Data"
        confirmVariant="danger"
        onConfirm={handleResetData}
        onCancel={() => setIsResetConfirmOpen(false)}
      />

      {/* 5. Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-copyright">
            TaskCraft © All rights reserved.
          </div>
          <div className="footer-links">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Support</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
