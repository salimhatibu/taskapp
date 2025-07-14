import React from 'react';

const Button = ({ children, onClick, type = 'button', className = '', ...props }) => (
  <button type={type} className={`btn ${className}`} onClick={onClick} {...props}>
    {children}
  </button>
);

export default Button; 