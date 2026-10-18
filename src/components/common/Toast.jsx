import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

/**
 * Toast Component
 * Displays lightweight popup notifications for actions like "Task added", "Note deleted", etc.
 */
const Toast = ({ toast }) => {
  if (!toast) return null;

  const { message, type = 'success' } = toast;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} color="#10b981" />;
      case 'danger':
        return <AlertCircle size={18} color="#f43f5e" />;
      default:
        return <Info size={18} color="#06b6d4" />;
    }
  };

  return (
    <aside className="toast-container" aria-live="polite">
      <div className={`toast ${type}`}>
        {getIcon()}
        <span>{message}</span>
      </div>
    </aside>
  );
};

export default Toast;
