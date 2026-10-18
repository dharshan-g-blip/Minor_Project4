import React from 'react';
import { X, AlertTriangle } from 'lucide-react';

/**
 * ConfirmModal Component
 * A reusable modal dialog for confirmation actions (e.g. deleting tasks or resetting data)
 * Demonstrates:
 * - Props usage
 * - Conditional rendering
 * - Event handling (close on overlay click or cancel button)
 */
const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Delete', confirmVariant = 'danger' }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: confirmVariant === 'danger' ? '#ef4444' : '#4f46e5' }}>
            <AlertTriangle size={20} />
            <h3>{title}</h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onCancel}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{message}</p>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-primary"
            style={{
              backgroundColor: confirmVariant === 'danger' ? '#ef4444' : 'var(--primary)'
            }}
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
