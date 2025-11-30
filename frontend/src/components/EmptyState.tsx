interface EmptyStateProps {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: string;
}

export default function EmptyState({ 
  title, 
  message, 
  actionLabel, 
  onAction,
  icon = '📋'
}: EmptyStateProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 2rem',
      textAlign: 'center',
      color: '#999'
    }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
        {icon}
      </div>
      <h2 style={{ marginBottom: '0.5rem', color: 'inherit' }}>
        {title}
      </h2>
      <p style={{ marginBottom: '2rem', maxWidth: '400px' }}>
        {message}
      </p>
      {actionLabel && onAction && (
        <button onClick={onAction} style={{ padding: '0.8rem 2rem' }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
