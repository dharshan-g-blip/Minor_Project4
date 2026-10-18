import React from 'react';
import { Search, Filter, Trash } from 'lucide-react';

/**
 * TaskFilter Component
 * Demonstrates:
 * - Filter state passing and management via Props
 * - Event handling for buttons, inputs, and selects
 * - Conditional rendering for "Clear Completed" button
 */
const TaskFilter = ({
  filter,
  setFilter,
  searchQuery,
  setSearchQuery,
  priorityFilter,
  setPriorityFilter,
  hasCompletedTasks,
  onClearCompleted
}) => {
  return (
    <div className="todo-filter-bar">
      {/* Status Filter Tabs */}
      <div className="filter-tabs" role="tablist">
        <button
          type="button"
          className={`filter-tab-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          type="button"
          className={`filter-tab-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button
          type="button"
          className={`filter-tab-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      {/* Priority Filter */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        <Filter size={15} color="var(--text-muted)" />
        <select
          className="form-select"
          style={{ padding: '0.4rem 0.75rem', width: 'auto', fontSize: '0.825rem' }}
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          aria-label="Filter by priority"
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      {/* Search Input */}
      <div className="filter-search-box">
        <Search size={15} className="filter-search-icon" />
        <input
          type="text"
          className="filter-search-input"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search tasks"
        />
      </div>

      {/* Clear Completed Tasks Button (Conditional Rendering) */}
      {hasCompletedTasks && (
        <button
          type="button"
          className="btn-secondary btn-small"
          style={{ color: 'var(--accent-rose)', borderColor: '#fca5a5' }}
          onClick={onClearCompleted}
          title="Remove all completed tasks"
        >
          <Trash size={14} />
          <span>Clear Completed</span>
        </button>
      )}
    </div>
  );
};

export default TaskFilter;
