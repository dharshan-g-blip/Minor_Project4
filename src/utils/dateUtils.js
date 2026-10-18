/**
 * Utility functions for Task Due Date calculations and Deadline Notifications
 */

/**
 * Filter and format all pending tasks that are overdue, due today, or due tomorrow
 * @param {Array} tasks - Array of task objects
 * @returns {Array} List of urgent tasks sorted by urgency
 */
export const getUpcomingDueTasks = (tasks) => {
  if (!Array.isArray(tasks)) return [];

  const todayStr = new Date().toISOString().split('T')[0];
  const todayDate = new Date(todayStr + 'T00:00:00');

  return tasks
    .filter((task) => !task.completed && task.dueDate)
    .map((task) => {
      const targetDate = new Date(task.dueDate + 'T00:00:00');
      const diffTime = targetDate - todayDate;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let status = 'upcoming';
      let label = `Due in ${diffDays} days`;
      let badgeClass = 'normal';

      if (diffDays < 0) {
        status = 'overdue';
        label = `Overdue by ${Math.abs(diffDays)}d`;
        badgeClass = 'overdue';
      } else if (diffDays === 0) {
        status = 'today';
        label = 'Due Today';
        badgeClass = 'today';
      } else if (diffDays === 1) {
        status = 'tomorrow';
        label = 'Due Tomorrow';
        badgeClass = 'tomorrow';
      }

      return {
        ...task,
        diffDays,
        status,
        label,
        badgeClass,
      };
    })
    .filter((task) => task.diffDays <= 2) // Overdue, Due Today, Due Tomorrow, or in 2 days
    .sort((a, b) => a.diffDays - b.diffDays); // Most urgent first
};

/**
 * Requests browser permission and sends a test/reminder notification
 * @param {Array} urgentTasks - List of urgent tasks
 * @returns {Promise<boolean>} Whether permission was granted
 */
export const triggerDesktopNotification = async (urgentTasks = []) => {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    alert('This browser does not support desktop notifications.');
    return false;
  }

  let permission = Notification.permission;
  if (permission === 'default') {
    permission = await Notification.requestPermission();
  }

  if (permission === 'granted') {
    const count = urgentTasks.length;
    if (count > 0) {
      const topTask = urgentTasks[0];
      new Notification('TaskCraft Deadline Alert 🔔', {
        body: `"${topTask.title}" is ${topTask.label.toLowerCase()}! (${count} task${count > 1 ? 's' : ''} total)`,
        icon: '/favicon.svg',
      });
    } else {
      new Notification('TaskCraft Notifications Enabled ✅', {
        body: "You'll be alerted when tasks are due today or approaching deadline.",
        icon: '/favicon.svg',
      });
    }
    return true;
  }

  return false;
};
