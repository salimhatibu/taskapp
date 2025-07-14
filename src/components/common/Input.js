import React from 'react';

const Input = ({ label, type = 'text', value, onChange, className = '', ...props }) => (
  <div className={`input-group ${className}`} style={{ marginBottom: '1rem' }}>
    {label && <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-accent)' }}>{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      style={{ width: '100%', background: '#23272f', color: '#fff', border: '1px solid var(--color-border)', borderRadius: '6px', padding: '0.5rem' }}
      {...props}
    />
  </div>
);

export default Input; 