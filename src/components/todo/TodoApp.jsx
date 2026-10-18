import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskFilter from './TaskFilter';
import ConfirmModal from '../common/ConfirmModal';
import { initialTasks } from '../../data/initialData';
import { CheckSquare, CheckCircle, Clock, ListChecks } from 'lucide-react';
import '../../styles/Todo.css';

/**
 * TodoApp Component (Project 1)
 * Demonstrates:
 * - State Management using useState (tasks, filters, search, modals)
 * - Side Effects using useEffect for LocalStorage persistence
 * - ES6+ Features:
 *   - Arrow functions
 *   - Destructuring
 *   - Spread Operator for immutable state updates
 *   - Array methods: .filter(), .map()
 * - Component Reusability & Props passing
 */
const TodoApp = ({ showToast }) => {
  // -------------------------------------------------------------------------
  // 1. State Management: Tasks initialized from LocalStorage (or initialData)
  // -------------------------------------------------------------------------
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('taskcraft_tasks_v2');
      return savedTasks ? JSON.parse(savedTasks) : initialTasks;
    } catch (err) {
      console.error('Error reading tasks from LocalStorage:', err);
      return initialTasks;
    }
  });

  // State for filtering and searching
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'completed'
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all'); // 'all' | 'high' | 'medium' | 'low'

  // State for deletion confirmation modal
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    taskId: null,
    isBulkClear: false,
  });

  // -------------------------------------------------------------------------
  // 2. Side Effect: Sync tasks to LocalStorage whenever `tasks` state changes
  // -------------------------------------------------------------------------
  useEffect(() => {
    try {
      localStorage.setItem('taskcraft_tasks_v2', JSON.stringify(tasks));
    } catch (err) {
      console.error('Error saving tasks to LocalStorage:', err);
    }
  }, [tasks]);

  // -------------------------------------------------------------------------
  // 3. Task Handlers (CRUD operations using ES6 Spread & Array methods)
  // -------------------------------------------------------------------------

  /**
   * Add a new task
   * Uses Spread Operator to prepend new task to array immutably
   */
  const handleAddTask = (newTaskData) => {
    const newTask = {
      id: `task-${Date.now()}`,
      ...newTaskData,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
    showToast?.('Task added successfully!', 'success');
  };

  /**
   * Toggle task completion status
   * Uses Array .map() and Spread Operator to flip `completed` flag
   */
  const handleToggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const nextCompleted = !task.completed;
          showToast?.(
            nextCompleted ? 'Task marked as completed!' : 'Task marked as pending.',
            'info'
          );
          return { ...task, completed: nextCompleted };
        }
        return task;
      })
    );
  };

  /**
   * Prompt to delete a single task
   */
  const promptDeleteTask = (id) => {
    setDeleteModal({
      isOpen: true,
      taskId: id,
      isBulkClear: false,
    });
  };

  /**
   * Confirm deletion of single task or bulk clear
   */
  const handleConfirmDelete = () => {
    if (deleteModal.isBulkClear) {
      // Filter out all completed tasks
      setTasks((prevTasks) => prevTasks.filter((t) => !t.completed));
      showToast?.('All completed tasks cleared!', 'info');
    } else if (deleteModal.taskId) {
      // Filter out the selected task
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== deleteModal.taskId));
      showToast?.('Task deleted.', 'danger');
    }

    setDeleteModal({ isOpen: false, taskId: null, isBulkClear: false });
  };

  /**
   * Update task details (title, dueDate, priority, category)
   * Uses Array .map()
   */
  const handleUpdateTask = (id, updatedFields) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
    showToast?.('Task updated successfully!', 'success');
  };

  /**
   * Clear all completed tasks with confirmation prompt
   */
  const promptClearCompleted = () => {
    setDeleteModal({
      isOpen: true,
      taskId: null,
      isBulkClear: true,
    });
  };

  /**
   * Reset filter controls
   */
  const handleResetFilters = () => {
    setFilter('all');
    setSearchQuery('');
    setPriorityFilter('all');
  };

  // -------------------------------------------------------------------------
  // 4. Computed Statistics & Filtering Logic using Array Methods (.filter)
  // -------------------------------------------------------------------------
  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;
  const pendingCount = totalCount - completedCount;
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Filter tasks based on status, priority, and search term
  const filteredTasks = tasks.filter((task) => {
    // 1. Status Filter (All, Pending, Completed)
    if (filter === 'pending' && task.completed) return false;
    if (filter === 'completed' && !task.completed) return false;

    // 2. Priority Filter
    if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;

    // 3. Search Query (Case-insensitive)
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const matchesTitle = task.title.toLowerCase().includes(query);
      const matchesCategory = task.category?.toLowerCase().includes(query);
      return matchesTitle || matchesCategory;
    }

    return true;
  });

  return (
    <section className="todo-app-card" aria-label="To-Do Application">
      {/* Header */}
      <div className="section-header">
        <div className="section-title">
          <CheckSquare className="section-title-icon" size={26} />
          <span>To-Do List</span>
        </div>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          {pendingCount} remaining / {totalCount} total
        </span>
      </div>

      {/* Progress & Statistics Bar */}
      <div className="todo-stats-bar">
        <div className="progress-header">
          <span>Overall Task Progress</span>
          <span>{completionPercentage}% Completed</span>
        </div>
        <div className="progress-track" role="progressbar" aria-valuenow={completionPercentage} aria-valuemin="0" aria-valuemax="100">
          <div className="progress-fill" style={{ width: `${completionPercentage}%` }}></div>
        </div>

        <div className="stats-pills">
          <span className="stat-pill total">
            <ListChecks size={13} />
            Total: {totalCount}
          </span>
          <span className="stat-pill pending">
            <Clock size={13} />
            Pending: {pendingCount}
          </span>
          <span className="stat-pill completed">
            <CheckCircle size={13} />
            Completed: {completedCount}
          </span>
        </div>
      </div>

      {/* Task Creation Form */}
      <TaskForm onAddTask={handleAddTask} />

      {/* Task Filters & Search */}
      <TaskFilter
        filter={filter}
        setFilter={setFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        hasCompletedTasks={completedCount > 0}
        onClearCompleted={promptClearCompleted}
      />

      {/* Task List */}
      <TaskList
        tasks={filteredTasks}
        totalTaskCount={totalCount}
        onToggleTask={handleToggleTask}
        onDeleteTask={promptDeleteTask}
        onUpdateTask={handleUpdateTask}
        onResetFilters={handleResetFilters}
      />

      {/* Reusable Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title={deleteModal.isBulkClear ? 'Clear All Completed Tasks?' : 'Delete Task?'}
        message={
          deleteModal.isBulkClear
            ? 'Are you sure you want to delete all completed tasks? This action cannot be undone.'
            : 'Are you sure you want to delete this task? This action cannot be undone.'
        }
        confirmText={deleteModal.isBulkClear ? 'Clear Completed' : 'Delete'}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, taskId: null, isBulkClear: false })}
      />
    </section>
  );
};

export default TodoApp;
