import { Task } from '../types/task';

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

  return (
    <div className="task-card">
      <div className="task-header">
        <h3>{task.title}</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span className={`task-status status-${task.status}`}>
            {task.status.replace('-', ' ')}
          </span>
          <span className={`priority-badge priority-${task.priority}`}>
            {task.priority}
          </span>
        </div>
      </div>
      
      {task.description && (
        <p style={{ marginBottom: '1rem', color: '#999' }}>{task.description}</p>
      )}
      
      {task.dueDate && (
        <p style={{ fontSize: '0.9rem', color: '#666' }}>
          Due: {formatDate(task.dueDate)}
        </p>
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
