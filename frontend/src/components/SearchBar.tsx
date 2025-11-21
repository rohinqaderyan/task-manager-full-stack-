interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ value, onChange, placeholder = 'Search tasks...' }: SearchBarProps) {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '0.8rem 2.5rem 0.8rem 1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '1rem'
        }}
      />
      <span style={{
        position: 'absolute',
        right: '1rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#999'
      }}>
        🔍
      </span>
    </div>
  );
}
