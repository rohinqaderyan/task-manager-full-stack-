import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 4000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getStyles = () => {
    const baseStyles = {
      position: 'fixed' as const,
      bottom: '2rem',
      right: '2rem',
      padding: '1rem 1.5rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      minWidth: '300px',
      maxWidth: '500px',
      zIndex: 9999,
      animation: 'slideIn 0.3s ease-out',
      cursor: 'pointer',
    };

    const typeStyles = {
      success: { background: '#10b981', color: 'white' },
      error: { background: '#ef4444', color: 'white' },
      warning: { background: '#f59e0b', color: 'white' },
      info: { background: '#3b82f6', color: 'white' },
    };

    return { ...baseStyles, ...typeStyles[type] };
  };

  const getIcon = () => {
    switch (type) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      case 'info': return 'ℹ';
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
      <div style={getStyles()} onClick={onClose}>
        <span style={{ 
          fontSize: '1.25rem', 
          fontWeight: 'bold',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.2)',
        }}>
          {getIcon()}
        </span>
        <span style={{ flex: 1, fontSize: '0.95rem' }}>{message}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'white',
            fontSize: '1.25rem',
            cursor: 'pointer',
            padding: '0.25rem',
            opacity: 0.7,
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
        >
          ×
        </button>
      </div>
    </>
  );
}
