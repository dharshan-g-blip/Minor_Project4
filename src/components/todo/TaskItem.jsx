import React, { useState } from 'react';
import { 
  Check, 
  Trash2, 
  Edit3, 
  Calendar, 
  Save, 
  X 
} from 'lucide-react';

/**
 * Pure helper function to format and determine status of the due date
 */
const formatDueDateInfo = (dueDate) => {
  if (!dueDate) return null;

  const todayStr = new Date().toISOString().split('T')[0];
  const targetDate = new Date(dueDate + 'T00:00:00');
  const todayDate = new Date(todayStr + 'T00:00:00');

  // Calculate difference in calendar days
  const diffTime = targetDate - todayDate;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let label = dueDate;
  let className = 'normal';

  if (diffDays < 0) {
    label = `Overdue (${Math.abs(diffDays)}d ago)`;
    className = 'overdue';
  } else if (diffDays === 0) {
    label = 'Due Today';
    className = 'today';
  } else if (diffDays === 1) {
    label = 'Due Tomorrow';
    className = 'normal';
  } else {
    label = `Due in ${diffDays} days (${dueDate})`;
    className = 'normal';
  }

  return { label, className };
};

/**
 * TaskItem Component
 * Demonstrates:
 * - Props destructuring ({ task, onToggleTask, onDeleteTask, onUpdateTask })
 * - Conditional rendering (View Mode vs. Inline Edit Mode)
 * - State management for inline editing using useState
 * - Template literals for dynamic class names
 * - Date comparison and formatting logic
 */
const TaskItem = ({ task, onToggleTask, onDeleteTask, onUpdateTask }) => {
  // Destructuring properties from the task object
  const { id, title, completed, dueDate, priority, category } = task;

  // Local state to track whether this item is currently being edited
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDueDate, setEditDueDate] = useState(dueDate || '');
  const [editPriority, setEditPriority] = useState(priority || 'medium');
  const [editCategory, setEditCategory] = useState(category || 'Personal');

  const dueDateInfo = formatDueDateInfo(dueDate);

  // Save changes from inline edit
  const handleSave = () => {
    if (!editTitle.trim()) return;

    onUpdateTask(id, {
      title: editTitle.trim(),
      dueDate: editDueDate,
      priority: editPriority,
      category: editCategory,
    });

    setIsEditing(false);
  };

  // Cancel inline editing
  const handleCancel = () => {
    setEditTitle(title);
    setEditDueDate(dueDate || '');
    setEditPriority(priority || 'medium');
    setEditCategory(category || 'Personal');
    setIsEditing(false);
  };

  // -------------------------------------------------------------------------
  // Render: Edit Mode
  // -------------------------------------------------------------------------
  if (isEditing) {
    return (
      <li className="task-item" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
        <div className="task-edit-box">
          <input
            type="text"
            className="form-input-title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
            aria-label="Edit task title"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem' }}>
            <input
              type="date"
              className="form-input-date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              aria-label="Edit due date"
            />

            <select
              className="form-select"
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              aria-label="Edit priority"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>

            <select
              className="form-select"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              aria-label="Edit category"
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Study">Study</option>
              <option value="Health">Health</option>
            </select>
          </div>

          <div className="task-edit-actions">
            <button
              type="button"
              className="btn-secondary btn-small"
              onClick={handleCancel}
            >
              <X size={14} />
              <span>Cancel</span>
            </button>
            <button
              type="button"
              className="btn-primary btn-small"
              onClick={handleSave}
            >
              <Save size={14} />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </li>
    );
  }

  // -------------------------------------------------------------------------
  // Render: View Mode
  // -------------------------------------------------------------------------
  return (
    <li className={`task-item ${completed ? 'completed' : ''}`}>
      <div className="task-left">
        {/* Toggle Checkbox Button */}
        <button
          type="button"
          className={`task-checkbox-btn ${completed ? 'checked' : ''}`}
          onClick={() => onToggleTask(id)}
          title={completed ? 'Mark as pending' : 'Mark as completed'}
          aria-label={completed ? 'Mark as pending' : 'Mark as completed'}
        >
          {completed && <Check size={16} strokeWidth={3} />}
        </button>

        {/* Task Title & Metadata */}
        <div className="task-content">
          <span className="task-title">{title}</span>

          <div className="task-meta">
            {/* Task Status Badge: Completed / Pending */}
            <span className={`badge badge-status ${completed ? 'completed' : 'pending'}`}>
              {completed ? 'Completed' : 'Pending'}
            </span>

            {/* Priority Badge */}
            <span className={`badge badge-priority ${priority}`}>
              {priority} priority
            </span>

            {/* Category Badge */}
            {category && (
              <span className="badge badge-category">
                {category}
              </span>
            )}

            {/* Due Date Indicator */}
            {dueDateInfo && (
              <span className={`badge-due ${dueDateInfo.className}`}>
                <Calendar size={13} />
                <span>{dueDateInfo.label}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Task Actions (Edit, Delete) */}
      <div className="task-actions">
        <button
          type="button"
          className="action-btn edit"
          onClick={() => setIsEditing(true)}
          title="Edit Task"
          aria-label="Edit task"
        >
          <Edit3 size={17} />
        </button>

        <button
          type="button"
          className="action-btn delete"
          onClick={() => onDeleteTask(id)}
          title="Delete Task"
          aria-label="Delete task"
        >
          <Trash2 size={17} />
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
