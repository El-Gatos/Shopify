'use client';

import { useState } from 'react';

export default function VariantPicker({ options, variants, selectedVariant, onChange }) {
  const [selected, setSelected] = useState(() => {
    if (selectedVariant) {
      return Object.fromEntries(selectedVariant.selectedOptions.map(o => [o.name, o.value]));
    }
    return Object.fromEntries(variants[0]?.selectedOptions?.map(o => [o.name, o.value]) ?? []);
  });

  const handleSelect = (optionName, value) => {
    const next = { ...selected, [optionName]: value };
    setSelected(next);
    const match = variants.find(v =>
      v.selectedOptions.every(o => next[o.name] === o.value)
    );
    if (match) onChange(match);
  };

  const isAvailable = (optionName, value) => {
    const hypothetical = { ...selected, [optionName]: value };
    const match = variants.find(v =>
      v.selectedOptions.every(o => hypothetical[o.name] === o.value)
    );
    return match?.availableForSale ?? false;
  };

  const realOptions = options.filter(
    o => !(o.values.length === 1 && o.values[0] === 'Default Title')
  );
  if (!realOptions.length) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
      {realOptions.map(option => (
        <div key={option.id}>
          <label
            htmlFor={`option-${option.id}`}
            style={{
              display: 'block',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#6b7280',
              marginBottom: 8,
            }}
          >
            {option.name}
          </label>

          <div style={{ position: 'relative' }}>
            <select
              id={`option-${option.id}`}
              value={selected[option.name] ?? ''}
              onChange={e => handleSelect(option.name, e.target.value)}
              style={{
                width: '100%',
                appearance: 'none',
                WebkitAppearance: 'none',
                padding: '12px 44px 12px 16px',
                borderRadius: 12,
                border: '1.5px solid #e5e7eb',
                background: 'white',
                fontSize: 14,
                fontWeight: 600,
                color: '#111827',
                cursor: 'pointer',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={e => {
                e.target.style.borderColor = '#7e994e';
                e.target.style.boxShadow = '0 0 0 3px rgba(126,153,78,0.12)';
              }}
              onBlur={e => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.boxShadow = 'none';
              }}
            >
              {option.values.map(value => {
                const available = isAvailable(option.name, value);
                return (
                  <option key={value} value={value} disabled={!available}>
                    {value}{!available ? ' — Sold Out' : ''}
                  </option>
                );
              })}
            </select>

            {/* Custom chevron */}
            <div style={{
              position: 'absolute',
              right: 14,
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              color: '#7e994e',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}