import { Task } from '../types/task';

interface TaskQuickActionsProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: 'todo' | 'in-progress' | 'completed') => void;
  onPriorityChange: (taskId: string, newPriority: 'low' | 'medium' | 'high') => void;
}

export default function TaskQuickActions({ task, onStatusChange, onPriorityChange }: TaskQuickActionsProps) {
  const statusOptions = [
    { value: 'todo', label: 'To Do', icon: '📝', color: '#6b7280' },
    { value: 'in-progress', label: 'In Progress', icon: '⚙️', color: '#3b82f6' },
    { value: 'completed', label: 'Completed', icon: '✅', color: '#10b981' },
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', icon: '🟢', color: '#10b981' },
    { value: 'medium', label: 'Medium', icon: '🟡', color: '#f59e0b' },
    { value: 'high', label: 'High', icon: '🔴', color: '#ef4444' },
  ];

  return (
    <div style={{ 
      display: 'flex', 
      gap: '0.5rem', 
      marginTop: '0.75rem',
      flexWrap: 'wrap',
    }}>
      <div style={{ 
        display: 'flex', 
        gap: '0.25rem',
        padding: '0.25rem',
        background: 'var(--background)',
        borderRadius: '6px',
        border: '1px solid var(--border-color)',
      }}>
        {statusOptions.map(option => (
          <button
            key={option.value}
            onClick={() => onStatusChange(task._id, option.value as any)}
            disabled={task.status === option.value}
            style={{
              padding: '0.25rem 0.5rem',
              border: 'none',
              borderRadius: '4px',
              background: task.status === option.value ? option.color : 'transparent',
              color: task.status === option.value ? 'white' : 'var(--text-secondary)',
              cursor: task.status === option.value ? 'default' : 'pointer',
              fontSize: '0.75rem',
              fontWeight: '500',
              transition: 'all 0.2s',
              opacity: task.status === option.value ? 1 : 0.6,
            }}
            title={`Set status to ${option.label}`}
            onMouseEnter={(e) => {
              if (task.status !== option.value) {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.background = 'var(--button-hover)';
              }
            }}
            onMouseLeave={(e) => {
              if (task.status !== option.value) {
                e.currentTarget.style.opacity = '0.6';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            {option.icon}
          </button>
        ))}
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '0.25rem',
        padding: '0.25rem',
        background: 'var(--background)',
        borderRadius: '6px',
        border: '1px solid var(--border-color)',
      }}>
        {priorityOptions.map(option => (
          <button
            key={option.value}
            onClick={() => onPriorityChange(task._id, option.value as any)}
            disabled={task.priority === option.value}
            style={{
              padding: '0.25rem 0.5rem',
              border: 'none',
              borderRadius: '4px',
              background: task.priority === option.value ? option.color : 'transparent',
              color: task.priority === option.value ? 'white' : 'var(--text-secondary)',
              cursor: task.priority === option.value ? 'default' : 'pointer',
              fontSize: '0.75rem',
              fontWeight: '500',
              transition: 'all 0.2s',
              opacity: task.priority === option.value ? 1 : 0.6,
            }}
            title={`Set priority to ${option.label}`}
            onMouseEnter={(e) => {
              if (task.priority !== option.value) {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.background = 'var(--button-hover)';
              }
            }}
            onMouseLeave={(e) => {
              if (task.priority !== option.value) {
                e.currentTarget.style.opacity = '0.6';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            {option.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
