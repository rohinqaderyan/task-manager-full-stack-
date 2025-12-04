import { useState } from 'react';
import { Task } from '../types/task';

interface DragDropProps {
  tasks: Task[];
  onTaskMove: (taskId: string, newStatus: 'todo' | 'in-progress' | 'completed') => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
}

export default function DragDropBoard({ tasks, onTaskMove, onEdit, onDelete }: DragDropProps) {
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);

  const columns = [
    { id: 'todo', title: '📝 To Do', status: 'todo' as const, color: '#6b7280' },
    { id: 'in-progress', title: '⚙️ In Progress', status: 'in-progress' as const, color: '#3b82f6' },
    { id: 'completed', title: '✅ Completed', status: 'completed' as const, color: '#10b981' },
  ];

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDrop = (e: React.DragEvent, status: 'todo' | 'in-progress' | 'completed') => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== status) {
      onTaskMove(draggedTask._id, status);
    }
    setDragOverColumn(null);
  };

  const getPriorityBadge = (priority: string) => {
    const badges = {
      high: { icon: '🔴', color: '#ef4444' },
      medium: { icon: '🟡', color: '#f59e0b' },
      low: { icon: '🟢', color: '#10b981' },
    };
    return badges[priority as keyof typeof badges];
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem',
    }}>
      {columns.map(column => {
        const columnTasks = tasks.filter(t => t.status === column.status);
        const isOver = dragOverColumn === column.id;

        return (
          <div
            key={column.id}
            onDragOver={(e) => handleDragOver(e, column.id)}
            onDrop={(e) => handleDrop(e, column.status)}
            style={{
              background: 'var(--card-bg)',
              border: `2px solid ${isOver ? column.color : 'var(--card-border)'}`,
              borderRadius: '12px',
              padding: '1rem',
              minHeight: '400px',
              transition: 'all 0.3s ease',
              boxShadow: isOver ? `0 0 20px ${column.color}40` : 'none',
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              paddingBottom: '0.75rem',
              borderBottom: `2px solid ${column.color}`,
            }}>
              <h3 style={{
                margin: 0,
                fontSize: '1.125rem',
                fontWeight: '600',
                color: column.color,
              }}>
                {column.title}
              </h3>
              <span style={{
                background: column.color,
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.875rem',
                fontWeight: '600',
              }}>
                {columnTasks.length}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {columnTasks.map(task => {
                const priority = getPriorityBadge(task.priority);
                const isDragging = draggedTask?._id === task._id;

                return (
                  <div
                    key={task._id}
                    draggable
                    onDragStart={() => handleDragStart(task)}
                    onDragEnd={handleDragEnd}
                    style={{
                      background: 'var(--background)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      padding: '1rem',
                      cursor: 'grab',
                      opacity: isDragging ? 0.5 : 1,
                      transform: isDragging ? 'rotate(5deg)' : 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
                    onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: '0.5rem',
                    }}>
                      <h4 style={{
                        margin: 0,
                        fontSize: '1rem',
                        fontWeight: '600',
                        flex: 1,
                      }}>
                        {task.title}
                      </h4>
                      <span
                        style={{
                          fontSize: '1.25rem',
                          marginLeft: '0.5rem',
                        }}
                        title={`${task.priority} priority`}
                      >
                        {priority.icon}
                      </span>
                    </div>

                    {task.description && (
                      <p style={{
                        margin: '0.5rem 0',
                        fontSize: '0.875rem',
                        color: 'var(--text-secondary)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}>
                        {task.description}
                      </p>
                    )}

                    {task.dueDate && (
                      <div style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-secondary)',
                        marginTop: '0.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                      }}>
                        📅 {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    )}

                    <div style={{
                      display: 'flex',
                      gap: '0.5rem',
                      marginTop: '0.75rem',
                    }}>
                      <button
                        onClick={() => onEdit(task)}
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          fontSize: '0.75rem',
                          borderRadius: '4px',
                          border: '1px solid var(--border-color)',
                          background: 'var(--button-bg)',
                          cursor: 'pointer',
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => onDelete(task._id)}
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          fontSize: '0.75rem',
                          borderRadius: '4px',
                          border: '1px solid #ef4444',
                          background: '#ef4444',
                          color: 'white',
                          cursor: 'pointer',
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                );
              })}

              {columnTasks.length === 0 && (
                <div style={{
                  padding: '2rem',
                  textAlign: 'center',
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                }}>
                  Drop tasks here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
