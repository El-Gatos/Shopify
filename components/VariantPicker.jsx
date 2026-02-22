'use client';

// Receives Shopify product options + variants, calls onChange(selectedVariant)
export default function VariantPicker({ options, variants, selectedVariant, onChange }) {
  // Current selections per option name e.g. { Color: 'Black', Size: 'Large' }
  const [selected, setSelected] = useState(() => {
    if (selectedVariant) {
      return Object.fromEntries(selectedVariant.selectedOptions.map(o => [o.name, o.value]));
    }
    // Default to first variant's options
    return Object.fromEntries(variants[0]?.selectedOptions?.map(o => [o.name, o.value]) ?? []);
  });

  // When a swatch/button is clicked, find the matching variant
  const handleSelect = (optionName, value) => {
    const next = { ...selected, [optionName]: value };
    setSelected(next);

    // Find variant that matches ALL selected options
    const match = variants.find(v =>
      v.selectedOptions.every(o => next[o.name] === o.value)
    );
    if (match) onChange(match);
  };

  // Check if a specific option value is available for sale
  // (considering already-selected other options)
  const isAvailable = (optionName, value) => {
    const hypothetical = { ...selected, [optionName]: value };
    const match = variants.find(v =>
      v.selectedOptions.every(o => hypothetical[o.name] === o.value)
    );
    return match?.availableForSale ?? false;
  };

  // Only render if there are real options (ignore default "Title" option)
  const realOptions = options.filter(o => !(o.values.length === 1 && o.values[0] === 'Default Title'));
  if (!realOptions.length) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 28 }}>
      {realOptions.map(option => (
        <div key={option.id}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#374151', marginBottom: 10 }}>
            {option.name}
            <span style={{ fontWeight: 400, color: '#9ca3af', marginLeft: 8 }}>
              {selected[option.name]}
            </span>
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {option.values.map(value => {
              const isActive = selected[option.name] === value;
              const available = isAvailable(option.name, value);
              const isColor = option.name.toLowerCase() === 'color' || option.name.toLowerCase() === 'colour';

              if (isColor) {
                return (
                  <ColorSwatch
                    key={value}
                    value={value}
                    isActive={isActive}
                    available={available}
                    onClick={() => available && handleSelect(option.name, value)}
                  />
                );
              }

              return (
                <button
                  key={value}
                  onClick={() => available && handleSelect(option.name, value)}
                  title={available ? value : `${value} — sold out`}
                  style={{
                    padding: '8px 18px', borderRadius: 9999,
                    border: `2px solid ${isActive ? '#7e994e' : '#e5e7eb'}`,
                    background: isActive ? '#f1f5e9' : 'white',
                    color: available ? (isActive ? '#2d3a1e' : '#374151') : '#d1d5db',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: 13, cursor: available ? 'pointer' : 'not-allowed',
                    transition: 'all 0.15s',
                    position: 'relative',
                    textDecoration: available ? 'none' : 'line-through',
                  }}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// Tries to map color names to hex — falls back to a dot with the name
const COLOR_MAP = {
  black: '#1a1a1a', white: '#ffffff', red: '#ef4444', blue: '#3b82f6',
  green: '#22c55e', yellow: '#eab308', pink: '#ec4899', purple: '#a855f7',
  orange: '#f97316', grey: '#9ca3af', gray: '#9ca3af', brown: '#92400e',
  navy: '#1e3a5f', beige: '#d4b896', cream: '#fdf6e3', silver: '#c0c0c0',
  gold: '#ffd700', rose: '#fb7185',
};

function ColorSwatch({ value, isActive, available, onClick }) {
  const hex = COLOR_MAP[value.toLowerCase()];

  return (
    <button
      onClick={onClick}
      title={available ? value : `${value} — sold out`}
      style={{
        width: 36, height: 36, borderRadius: '50%', padding: 0,
        border: `3px solid ${isActive ? '#7e994e' : 'transparent'}`,
        outline: `2px solid ${isActive ? '#7e994e' : '#e5e7eb'}`,
        outlineOffset: 2,
        background: hex || '#f1f5e9',
        cursor: available ? 'pointer' : 'not-allowed',
        opacity: available ? 1 : 0.35,
        transition: 'all 0.15s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {!hex && (
        <span style={{ fontSize: 9, fontWeight: 700, color: '#374151', lineHeight: 1, padding: 2, textAlign: 'center', display: 'block' }}>
          {value.slice(0, 3).toUpperCase()}
        </span>
      )}
      {/* Diagonal line for sold out */}
      {!available && (
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, transparent 45%, rgba(255,255,255,0.7) 45%, rgba(255,255,255,0.7) 55%, transparent 55%)' }} />
      )}
    </button>
  );
}

// useState needs to be imported
import { useState } from 'react';