import { useState } from 'react';

interface BulkActionsProps {
  selectedCount: number;
  onBulkDelete: () => void;
  onBulkStatusChange: (status: 'todo' | 'in-progress' | 'completed') => void;
  onBulkPriorityChange: (priority: 'low' | 'medium' | 'high') => void;
  onClearSelection: () => void;
}

export default function BulkActions({
  selectedCount,
  onBulkDelete,
  onBulkStatusChange,
  onBulkPriorityChange,
  onClearSelection,
}: BulkActionsProps) {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);

  if (selectedCount === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      background: 'var(--card-bg)',
      border: '2px solid var(--primary)',
      borderRadius: '12px',
      padding: '1rem 1.5rem',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      zIndex: 1000,
    }}>
      <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
        {selectedCount} task{selectedCount > 1 ? 's' : ''} selected
      </span>

      <div style={{ width: '1px', height: '24px', background: 'var(--border-color)' }} />

      <div style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
        <button
          onClick={() => setShowStatusMenu(!showStatusMenu)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: '1px solid var(--border-color)',
            background: 'var(--button-bg)',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
          }}
        >
          📝 Change Status
        </button>

        {showStatusMenu && (
          <>
            <div
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 998 }}
              onClick={() => setShowStatusMenu(false)}
            />
            <div style={{
              position: 'absolute',
              bottom: 'calc(100% + 0.5rem)',
              left: 0,
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              zIndex: 999,
            }}>
              {[
                { value: 'todo', label: 'To Do', icon: '📝' },
                { value: 'in-progress', label: 'In Progress', icon: '⚙️' },
                { value: 'completed', label: 'Completed', icon: '✅' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    onBulkStatusChange(option.value as any);
                    setShowStatusMenu(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: 'none',
                    background: 'transparent',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--button-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  {option.icon} {option.label}
                </button>
              ))}
            </div>
          </>
        )}

        <button
          onClick={() => setShowPriorityMenu(!showPriorityMenu)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: '1px solid var(--border-color)',
            background: 'var(--button-bg)',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
          }}
        >
          🎯 Change Priority
        </button>

        {showPriorityMenu && (
          <>
            <div
              style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 998 }}
              onClick={() => setShowPriorityMenu(false)}
            />
            <div style={{
              position: 'absolute',
              bottom: 'calc(100% + 0.5rem)',
              left: '8rem',
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              zIndex: 999,
            }}>
              {[
                { value: 'low', label: 'Low', icon: '🟢' },
                { value: 'medium', label: 'Medium', icon: '🟡' },
                { value: 'high', label: 'High', icon: '🔴' },
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => {
                    onBulkPriorityChange(option.value as any);
                    setShowPriorityMenu(false);
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    border: 'none',
                    background: 'transparent',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--button-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  {option.icon} {option.label}
                </button>
              ))}
            </div>
          </>
        )}

        <button
          onClick={onBulkDelete}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: '1px solid #ef4444',
            background: '#ef4444',
            color: 'white',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
          }}
        >
          🗑️ Delete
        </button>

        <button
          onClick={onClearSelection}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: '1px solid var(--border-color)',
            background: 'var(--button-bg)',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: '500',
          }}
        >
          Clear
        </button>
      </div>
    </div>
  );
}
