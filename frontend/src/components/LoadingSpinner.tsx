interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export default function LoadingSpinner({ size = 'medium', color = '#646cff' }: LoadingSpinnerProps) {
  const sizes = {
    small: '20px',
    medium: '40px',
    large: '60px'
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '2rem'
    }}>
      <div
        style={{
          width: sizes[size],
          height: sizes[size],
          border: `4px solid rgba(100, 108, 255, 0.1)`,
          borderTop: `4px solid ${color}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
