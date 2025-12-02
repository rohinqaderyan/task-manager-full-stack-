interface DateRangeFilterProps {
  value: 'today' | 'week' | 'month' | 'all';
  onChange: (range: 'today' | 'week' | 'month' | 'all') => void;
}

export default function DateRangeFilter({ value, onChange }: DateRangeFilterProps) {
  const options = [
    { value: 'all', label: 'All Tasks', icon: '📋' },
    { value: 'today', label: 'Due Today', icon: '📅' },
    { value: 'week', label: 'This Week', icon: '📆' },
    { value: 'month', label: 'This Month', icon: '🗓️' },
  ];

  return (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {options.map(option => (
        <button
          key={option.value}
          onClick={() => onChange(option.value as any)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: '1px solid',
            borderColor: value === option.value ? '#3b82f6' : '#d1d5db',
            background: value === option.value ? '#3b82f6' : 'white',
            color: value === option.value ? 'white' : '#374151',
            cursor: 'pointer',
            fontSize: '0.875rem',
            fontWeight: value === option.value ? '600' : '500',
            transition: 'all 0.2s',
          }}
        >
          {option.icon} {option.label}
        </button>
      ))}
    </div>
  );
}
