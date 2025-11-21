import { getTaskStats } from '../utils/taskUtils';

interface StatsCardProps {
  tasks: any[];
}

export default function TaskStats({ tasks }: StatsCardProps) {
  const stats = getTaskStats(tasks);

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    }}>
      <div className="stat-card" style={{ backgroundColor: '#3b82f6' }}>
        <h3>{stats.total}</h3>
        <p>Total Tasks</p>
      </div>
      
      <div className="stat-card" style={{ backgroundColor: '#8b5cf6' }}>
        <h3>{stats.todo}</h3>
        <p>To Do</p>
      </div>
      
      <div className="stat-card" style={{ backgroundColor: '#f59e0b' }}>
        <h3>{stats.inProgress}</h3>
        <p>In Progress</p>
      </div>
      
      <div className="stat-card" style={{ backgroundColor: '#10b981' }}>
        <h3>{stats.completed}</h3>
        <p>Completed</p>
      </div>
      
      {stats.overdue > 0 && (
        <div className="stat-card" style={{ backgroundColor: '#ef4444' }}>
          <h3>{stats.overdue}</h3>
          <p>Overdue</p>
        </div>
      )}
      
      {stats.highPriority > 0 && (
        <div className="stat-card" style={{ backgroundColor: '#ec4899' }}>
          <h3>{stats.highPriority}</h3>
          <p>High Priority</p>
        </div>
      )}
    </div>
  );
}
