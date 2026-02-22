export default function LegalLayout({ title, lastUpdated, children }) {
  return (
    <div style={{ background: '#fdfdfc', minHeight: '100vh' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '64px 24px 96px' }}>
        {/* Header */}
        <div style={{ marginBottom: 48, paddingBottom: 32, borderBottom: '1px solid #e8eedc' }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#7e994e', marginBottom: 12 }}>
            Legal
          </p>
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.75rem)', fontWeight: 800, color: '#111827', letterSpacing: '-0.02em', marginBottom: 10 }}>
            {title}
          </h1>
          <p style={{ color: '#9ca3af', fontSize: 13 }}>Last updated: {lastUpdated}</p>
        </div>

        {/* Content */}
        <div style={{ color: '#374151', lineHeight: 1.8, fontSize: '0.95rem' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Reusable section components
export function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111827', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid #f1f5e9' }}>
        {title}
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {children}
      </div>
    </div>
  );
}

export function P({ children }) {
  return <p style={{ margin: 0, color: '#4b5563' }}>{children}</p>;
}

export function Ul({ items }) {
  return (
    <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 6 }}>
      {items.map((item, i) => (
        <li key={i} style={{ color: '#4b5563' }}>{item}</li>
      ))}
    </ul>
  );
}