import React from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 24,
      right: 24,
      zIndex: 2000,
      background: type === 'error' ? '#ff6b81' : '#4f8cff',
      color: '#fff',
      padding: '1rem 2rem',
      borderRadius: 8,
      boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
      fontWeight: 600,
      minWidth: 200,
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }}>
      <span>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>&times;</button>
    </div>
  );
};

export default Toast; 