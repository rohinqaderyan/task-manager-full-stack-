import { Task } from '../types/task';
import { isOverdue, getDaysUntilDue } from '../utils/dateUtils';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPriorityConfig = (priority: string) => {
    const configs = {
      high: { color: '#ef4444', bg: '#fee2e2', icon: '🔴', label: 'High Priority' },
      medium: { color: '#f59e0b', bg: '#fef3c7', icon: '🟡', label: 'Medium Priority' },
      low: { color: '#10b981', bg: '#d1fae5', icon: '🟢', label: 'Low Priority' },
    };
    return configs[priority as keyof typeof configs];
  };

  const getStatusConfig = (status: string) => {
    const configs = {
      'todo': { color: '#6b7280', bg: '#f3f4f6', icon: '📝', label: 'To Do' },
      'in-progress': { color: '#3b82f6', bg: '#dbeafe', icon: '⚙️', label: 'In Progress' },
      'completed': { color: '#10b981', bg: '#d1fae5', icon: '✅', label: 'Completed' },
    };
    return configs[status as keyof typeof configs];
  };

  const priorityConfig = getPriorityConfig(task.priority);
  const statusConfig = getStatusConfig(task.status);
  const isTaskOverdue = task.dueDate && isOverdue(task.dueDate, task.status);
  const daysUntil = task.dueDate ? getDaysUntilDue(task.dueDate) : null;

  return (
    <div 
      className="task-card"
      style={{
        borderLeft: `4px solid ${priorityConfig.color}`,
        transition: 'all 0.3s ease',
      }}
    >
      <div className="task-header">
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>{statusConfig.icon}</span>
          {task.title}
        </h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span 
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '600',
              background: statusConfig.bg,
              color: statusConfig.color,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            {statusConfig.label}
          </span>
          <span 
            style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '600',
              background: priorityConfig.bg,
              color: priorityConfig.color,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            {priorityConfig.icon} {priorityConfig.label}
          </span>
        </div>
      </div>
      
      {task.description && (
        <p style={{ marginBottom: '1rem', color: '#999' }}>{task.description}</p>
      )}
      
      {task.dueDate && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          padding: '0.5rem',
          background: isTaskOverdue ? '#fee2e2' : '#f0f9ff',
          borderRadius: '6px',
          marginTop: '0.75rem',
        }}>
          <span style={{ fontSize: '1rem' }}>
            {isTaskOverdue ? '⚠️' : daysUntil === 0 ? '📅' : daysUntil && daysUntil <= 3 ? '⏰' : '🗓️'}
          </span>
          <div style={{ flex: 1 }}>
            <p style={{ 
              fontSize: '0.875rem', 
              color: isTaskOverdue ? '#dc2626' : '#0369a1',
              margin: 0,
              fontWeight: '500',
            }}>
              {isTaskOverdue ? 'Overdue!' : daysUntil === 0 ? 'Due Today' : daysUntil === 1 ? 'Due Tomorrow' : `Due in ${daysUntil} days`}
            </p>
            <p style={{ 
              fontSize: '0.75rem', 
              color: '#6b7280',
              margin: 0,
            }}>
              {formatDate(task.dueDate)}
            </p>
          </div>
        </div>
      )}
      
      <div className="task-actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task._id)} style={{ backgroundColor: '#ef4444' }}>
          Delete
        </button>
      </div>
    </div>
  );
}
