interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'danger'
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const colors = {
    danger: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '400px' }}
      >
        <h2 style={{ marginBottom: '1rem' }}>{title}</h2>
        <p style={{ marginBottom: '2rem', color: '#999' }}>{message}</p>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={onCancel}
            style={{ 
              flex: 1,
              backgroundColor: '#6b7280'
            }}
          >
            {cancelLabel}
          </button>
          <button 
            onClick={onConfirm}
            style={{ 
              flex: 1,
              backgroundColor: colors[variant]
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
