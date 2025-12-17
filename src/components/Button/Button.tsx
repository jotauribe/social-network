import './Button.css';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = ({ children, variant = 'primary', className, ...props }: ButtonProps) => {
  // Simple class merging
  const combinedClassName = `button ${variant} ${className || ''}`.trim();

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
};
