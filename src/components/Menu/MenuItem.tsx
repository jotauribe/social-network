import './Menu.css';

import { clsx } from 'clsx';
import { type ReactNode } from 'react';

interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'destructive';
}

export const MenuItem = ({ children, className, variant = 'default', ...props }: MenuItemProps) => {
  return (
    <button
      className={clsx('menu-item', { destructive: variant === 'destructive' }, className)}
      {...props}
    >
      {children}
    </button>
  );
};
