import { Task } from '../types/task';
import { getTasksAnalytics } from '../utils/dateUtils';

interface TaskChartsProps {
  tasks: Task[];
}

export default function TaskCharts({ tasks }: TaskChartsProps) {
  const analytics = getTasksAnalytics(tasks);
  const total = analytics.total || 1; // Avoid division by zero

  const statusData = [
    { label: 'Completed', value: analytics.completed, color: '#10b981', icon: '✅' },
    { label: 'In Progress', value: analytics.inProgress, color: '#3b82f6', icon: '⚙️' },
    { label: 'To Do', value: analytics.todo, color: '#6b7280', icon: '📝' },
  ];

  const priorityData = [
    { label: 'High', value: tasks.filter(t => t.priority === 'high').length, color: '#ef4444', icon: '🔴' },
    { label: 'Medium', value: tasks.filter(t => t.priority === 'medium').length, color: '#f59e0b', icon: '🟡' },
    { label: 'Low', value: tasks.filter(t => t.priority === 'low').length, color: '#10b981', icon: '🟢' },
  ];

  const ProgressBar = ({ label, value, total, color, icon }: any) => {
    const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
    
    return (
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginBottom: '0.5rem',
          fontSize: '0.875rem',
        }}>
          <span style={{ fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>{icon}</span>
            {label}
          </span>
          <span style={{ color: 'var(--text-secondary)' }}>
            {value} ({percentage}%)
          </span>
        </div>
        <div style={{ 
          height: '8px', 
          background: 'var(--border-color)', 
          borderRadius: '4px',
          overflow: 'hidden',
        }}>
          <div 
            style={{ 
              height: '100%', 
              width: `${percentage}%`, 
              background: color,
              transition: 'width 0.5s ease',
            }}
          />
        </div>
      </div>
    );
  };

  const CircularProgress = ({ percentage, color, label, icon }: any) => {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <svg width="100" height="100" style={{ transform: 'rotate(-90deg)' }}>
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="var(--border-color)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s ease' }}
          />
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dy="0.3em"
            fontSize="20"
            fontWeight="bold"
            fill="var(--text-primary)"
            style={{ transform: 'rotate(90deg)', transformOrigin: '50px 50px' }}
          >
            {percentage}%
          </text>
        </svg>
        <div style={{ 
          textAlign: 'center',
          fontSize: '0.875rem',
          fontWeight: '500',
        }}>
          <div>{icon} {label}</div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ 
      background: 'var(--card-bg)', 
      padding: '1.5rem', 
      borderRadius: '8px',
      marginBottom: '1.5rem',
      border: '1px solid var(--card-border)',
    }}>
      <h3 style={{ marginBottom: '1.5rem', fontSize: '1.125rem', fontWeight: '600' }}>
        📈 Task Distribution
      </h3>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
      }}>
        {/* Status Chart */}
        <div>
          <h4 style={{ 
            marginBottom: '1rem', 
            fontSize: '1rem', 
            fontWeight: '600',
            color: 'var(--text-secondary)',
          }}>
            By Status
          </h4>
          {statusData.map((item) => (
            <ProgressBar
              key={item.label}
              label={item.label}
              value={item.value}
              total={total}
              color={item.color}
              icon={item.icon}
            />
          ))}
        </div>

        {/* Priority Chart */}
        <div>
          <h4 style={{ 
            marginBottom: '1rem', 
            fontSize: '1rem', 
            fontWeight: '600',
            color: 'var(--text-secondary)',
          }}>
            By Priority
          </h4>
          {priorityData.map((item) => (
            <ProgressBar
              key={item.label}
              label={item.label}
              value={item.value}
              total={total}
              color={item.color}
              icon={item.icon}
            />
          ))}
        </div>

        {/* Completion Rate Circle */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <h4 style={{ 
            marginBottom: '1rem', 
            fontSize: '1rem', 
            fontWeight: '600',
            color: 'var(--text-secondary)',
          }}>
            Completion Rate
          </h4>
          <CircularProgress
            percentage={total > 0 ? Math.round((analytics.completed / total) * 100) : 0}
            color="#10b981"
            label="Overall Progress"
            icon="🎯"
          />
        </div>
      </div>
    </div>
  );
}
