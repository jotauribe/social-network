import './Input.css';

import { clsx } from 'clsx';
import type { InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClassName?: string;
}

export const Input = ({ label, id, className, containerClassName, ...props }: InputProps) => {
  return (
    <div className={clsx('input-container', containerClassName)}>
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input id={id} className={clsx('input-field', className)} {...props} />
    </div>
  );
};
