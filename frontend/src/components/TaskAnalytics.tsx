import { Task } from '../types/task';
import { getTasksAnalytics } from '../utils/dateUtils';

interface TaskAnalyticsProps {
  tasks: Task[];
}

export default function TaskAnalytics({ tasks }: TaskAnalyticsProps) {
  const analytics = getTasksAnalytics(tasks);
  const completionRate = analytics.total > 0 
    ? Math.round((analytics.completed / analytics.total) * 100) 
    : 0;

  return (
    <div style={{ 
      background: '#f9fafb', 
      padding: '1.5rem', 
      borderRadius: '8px',
      marginBottom: '1.5rem',
      border: '1px solid #e5e7eb'
    }}>
      <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>
        📊 Task Analytics
      </h3>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
        gap: '1rem' 
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
            {completionRate}%
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Completion Rate</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
            {analytics.completedToday}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Completed Today</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#f59e0b' }}>
            {analytics.completedThisWeek}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Completed This Week</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444' }}>
            {analytics.overdue}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>Overdue Tasks</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>
            {analytics.highPriority}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>High Priority</div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#06b6d4' }}>
            {analytics.inProgress}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>In Progress</div>
        </div>
      </div>

      {analytics.overdue > 0 && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '0.75rem', 
          background: '#fef2f2',
          borderLeft: '4px solid #ef4444',
          borderRadius: '4px'
        }}>
          <strong style={{ color: '#dc2626' }}>⚠️ Attention:</strong>
          <span style={{ color: '#7f1d1d', marginLeft: '0.5rem' }}>
            You have {analytics.overdue} overdue task{analytics.overdue !== 1 ? 's' : ''} that need{analytics.overdue === 1 ? 's' : ''} attention.
          </span>
        </div>
      )}
    </div>
  );
}
