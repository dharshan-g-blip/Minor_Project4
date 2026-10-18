import React, { useState } from 'react';
import { PlusCircle, Calendar, Flag, Tag } from 'lucide-react';

/**
 * TaskForm Component
 * Demonstrates:
 * - Controlled input components with useState
 * - Form submission event handling (e.preventDefault)
 * - Input validation (ensuring task title is not empty)
 * - Object creation and passing data via callback props (onAddTask)
 */
const TaskForm = ({ onAddTask }) => {
  // Local state for the form inputs
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [category, setCategory] = useState('Personal');
  const [error, setError] = useState(false);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation check: Trim whitespace to prevent blank tasks
    if (!title.trim()) {
      setError(true);
      return;
    }

    // Call parent handler function passed via props
    onAddTask({
      title: title.trim(),
      dueDate: dueDate || '',
      priority: priority,
      category: category,
    });

    // Reset form inputs back to default values
    setTitle('');
    setDueDate('');
    setPriority('medium');
    setCategory('Personal');
    setError(false);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {/* Task Title Input */}
      <div className="form-row-main">
        <input
          type="text"
          className={`form-input-title ${error ? 'has-error' : ''}`}
          placeholder="What needs to be done? (e.g., Prepare study notes)"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError(false);
          }}
          aria-label="New task title"
        />
        {error && (
          <p style={{ color: 'var(--accent-rose)', fontSize: '0.78rem', marginTop: '0.35rem', fontWeight: 600 }}>
            * Please enter a task description before adding.
          </p>
        )}
      </div>

      {/* Task Meta Options: Due Date, Priority, Category & Submit */}
      <div className="form-row-options">
        <div className="form-controls-group">
          {/* Due Date Picker */}
          <div className="form-control-item">
            <Calendar size={15} color="var(--primary)" />
            <input
              type="date"
              className="form-input-date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              title="Set Due Date"
              aria-label="Due Date"
            />
          </div>

          {/* Priority Selector */}
          <div className="form-control-item">
            <Flag size={15} color="var(--primary)" />
            <select
              className="form-select"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              aria-label="Priority level"
            >
              <option value="low">🟢 Low Priority</option>
              <option value="medium">🟡 Medium Priority</option>
              <option value="high">🔴 High Priority</option>
            </select>
          </div>

          {/* Category Selector */}
          <div className="form-control-item">
            <Tag size={15} color="var(--primary)" />
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Category"
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Study">Study</option>
              <option value="Health">Health</option>
            </select>
          </div>
        </div>

        {/* Add Task Button */}
        <button type="submit" className="btn-primary">
          <PlusCircle size={18} />
          <span>Add Task</span>
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
