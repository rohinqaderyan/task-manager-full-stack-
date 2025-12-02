import { useState } from 'react';

interface ExportMenuProps {
  onExport: (format: 'json' | 'csv' | 'report') => void;
  disabled?: boolean;
}

export default function ExportMenu({ onExport, disabled }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleExport = (format: 'json' | 'csv' | 'report') => {
    onExport(format);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          border: '1px solid #d1d5db',
          background: 'white',
          cursor: disabled ? 'not-allowed' : 'pointer',
          fontSize: '0.875rem',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: disabled ? 0.5 : 1,
        }}
      >
        📥 Export Tasks
        <span style={{ fontSize: '0.75rem' }}>▼</span>
      </button>

      {isOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 998,
            }}
            onClick={() => setIsOpen(false)}
          />
          <div
            style={{
              position: 'absolute',
              top: 'calc(100% + 0.5rem)',
              right: 0,
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              minWidth: '200px',
              zIndex: 999,
              overflow: 'hidden',
            }}
          >
            <button
              onClick={() => handleExport('json')}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: 'none',
                background: 'white',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            >
              <div style={{ fontWeight: '500' }}>📄 JSON Format</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                Export as structured JSON data
              </div>
            </button>

            <div style={{ height: '1px', background: '#e5e7eb' }} />

            <button
              onClick={() => handleExport('csv')}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: 'none',
                background: 'white',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            >
              <div style={{ fontWeight: '500' }}>📊 CSV Format</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                Export for Excel/spreadsheets
              </div>
            </button>

            <div style={{ height: '1px', background: '#e5e7eb' }} />

            <button
              onClick={() => handleExport('report')}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: 'none',
                background: 'white',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.875rem',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#f3f4f6'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
            >
              <div style={{ fontWeight: '500' }}>📋 Text Report</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                Export detailed text summary
              </div>
            </button>
          </div>
        </>
      )}
    </div>
  );
}
