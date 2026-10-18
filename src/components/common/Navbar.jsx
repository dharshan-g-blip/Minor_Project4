import React, { useState, useRef, useEffect } from 'react';
import { 
  CheckSquare, 
  StickyNote, 
  Columns, 
  RotateCcw, 
  Sparkles,
  Bell,
  Calendar,
  AlertTriangle,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { triggerDesktopNotification } from '../../utils/dateUtils';

/**
 * Navbar Component
 * Demonstrates:
 * - Functional Component
 * - Props destructuring ({ activeTab, setActiveTab, taskCount, noteCount, onResetData, urgentTasks, onSelectUrgentTask })
 * - Conditional rendering & state for deadline notifications dropdown
 * - Web Notifications API integration
 */
const Navbar = ({
  activeTab,
  setActiveTab,
  taskCount,
  noteCount,
  onResetData,
  urgentTasks = [],
  onSelectUrgentTask
}) => {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
    };
    if (isNotifOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotifOpen]);

  const urgentCount = urgentTasks.length;

  const handleTaskClick = (taskId) => {
    setIsNotifOpen(false);
    if (onSelectUrgentTask) {
      onSelectUrgentTask(taskId);
    }
  };

  const handleEnableDesktopAlerts = async () => {
    await triggerDesktopNotification(urgentTasks);
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand & Logo */}
        <div className="brand">
          <div className="brand-icon">
            <Sparkles size={24} />
          </div>
          <div className="brand-text">
            <h1>TaskCraft</h1>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <nav className="nav-tabs" aria-label="Main Navigation">
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'todo' ? 'active' : ''}`}
            onClick={() => setActiveTab('todo')}
          >
            <CheckSquare size={17} />
            <span>To-Do List</span>
            <span className="nav-tab-badge">{taskCount}</span>
          </button>

          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            <StickyNote size={17} />
            <span>Notes</span>
            <span className="nav-tab-badge">{noteCount}</span>
          </button>

          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'dual' ? 'active' : ''}`}
            onClick={() => setActiveTab('dual')}
            title="View both apps side-by-side"
          >
            <Columns size={17} />
            <span>Dual View</span>
          </button>
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Notification Bell with Badge */}
          <div className="notification-wrapper" ref={dropdownRef}>
            <button
              type="button"
              className={`notification-bell-btn ${isNotifOpen ? 'active' : ''}`}
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              title={urgentCount > 0 ? `${urgentCount} task(s) approaching due date!` : 'No upcoming deadlines'}
              aria-label="Upcoming Deadlines and Notifications"
            >
              <Bell size={18} />
              {urgentCount > 0 && (
                <span className="notification-badge" aria-label={`${urgentCount} urgent notifications`}>
                  {urgentCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown Panel */}
            {isNotifOpen && (
              <div className="notification-dropdown" role="region" aria-label="Due date notifications">
                <div className="notification-dropdown-header">
                  <h4>
                    <AlertTriangle size={16} color="var(--amber)" />
                    <span>Upcoming Deadlines</span>
                  </h4>
                  <span style={{ fontSize: '0.785rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {urgentCount} {urgentCount === 1 ? 'task' : 'tasks'}
                  </span>
                </div>

                {urgentTasks.length === 0 ? (
                  <div style={{ padding: '2rem 1.25rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    <CheckCircle2 size={32} color="var(--emerald)" style={{ margin: '0 auto 0.5rem' }} />
                    <p style={{ fontSize: '0.885rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      All Caught Up!
                    </p>
                    <p style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>
                      No tasks are overdue or due within the next 48 hours.
                    </p>
                  </div>
                ) : (
                  <ul className="notification-list">
                    {urgentTasks.map((t) => (
                      <li
                        key={t.id}
                        className="notification-item"
                        onClick={() => handleTaskClick(t.id)}
                        title="Click to view task"
                      >
                        <span className="notification-item-title">{t.title}</span>
                        <div className="notification-item-meta">
                          <span className={`badge-due ${t.badgeClass}`} style={{ fontSize: '0.725rem' }}>
                            <Calendar size={12} />
                            <span>{t.label}</span>
                          </span>

                          <span className={`badge badge-priority ${t.priority}`} style={{ fontSize: '0.685rem' }}>
                            {t.priority}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="notification-dropdown-footer">
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ fontSize: '0.785rem', padding: '0.35rem 0.65rem', width: '100%', justifyContent: 'center' }}
                    onClick={handleEnableDesktopAlerts}
                  >
                    <Clock size={13} />
                    <span>Enable Desktop Alerts</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Reset Data Button */}
          <button
            type="button"
            className="btn-secondary"
            onClick={onResetData}
            title="Reset to default sample data"
          >
            <RotateCcw size={16} />
            <span>Reset Data</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
