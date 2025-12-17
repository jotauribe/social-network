import './Button.css';

import { clsx } from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}

export const Button = ({ children, className, variant = 'primary', ...props }: ButtonProps) => {
  return (
    <button className={clsx('button', variant, className)} {...props}>
      {children}
    </button>
  );
};
