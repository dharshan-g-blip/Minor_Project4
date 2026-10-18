import React from 'react';
import TaskItem from './TaskItem';
import { CheckCircle2, Inbox } from 'lucide-react';

/**
 * TaskList Component
 * Demonstrates:
 * - List Rendering using Array .map() with unique key props
 * - Conditional Rendering for empty states
 * - Component Composition & Reusability
 */
const TaskList = ({
  tasks,
  totalTaskCount,
  onToggleTask,
  onDeleteTask,
  onUpdateTask,
  onResetFilters
}) => {
  // If there are no tasks matching the current search/filter
  if (tasks.length === 0) {
    // Case 1: Total tasks exist, but filters/search filtered them all out
    if (totalTaskCount > 0) {
      return (
        <div className="empty-state">
          <div className="empty-state-icon">
            <Inbox size={28} />
          </div>
          <h4>No tasks match your filters</h4>
          <p>Try clearing your search query or selecting a different status filter.</p>
          <button
            type="button"
            className="btn-secondary btn-small"
            style={{ marginTop: '0.5rem' }}
            onClick={onResetFilters}
          >
            Reset Filters
          </button>
        </div>
      );
    }

    // Case 2: No tasks have been created yet
    return (
      <div className="empty-state">
        <div className="empty-state-icon" style={{ backgroundColor: '#dcfce7', color: '#16a34a' }}>
          <CheckCircle2 size={32} />
        </div>
        <h4>All Caught Up!</h4>
        <p>You have no pending tasks right now. Use the form above to add a new task and stay organized.</p>
      </div>
    );
  }

  // Render the list of tasks using .map()
  return (
    <ul className="task-list" aria-label="Task list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleTask={onToggleTask}
          onDeleteTask={onDeleteTask}
          onUpdateTask={onUpdateTask}
        />
      ))}
    </ul>
  );
};

export default TaskList;
