interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div style={{
      backgroundColor: '#fee2e2',
      border: '1px solid #ef4444',
      borderRadius: '8px',
      padding: '1rem',
      margin: '1rem 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      color: '#991b1b'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.5rem' }}>⚠️</span>
        <span>{message}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Retry
        </button>
      )}
    </div>
  );
}
