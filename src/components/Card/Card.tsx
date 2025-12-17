import './Card.css';

import { clsx } from 'clsx';
import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export const Card = ({ title, subtitle, children, className }: CardProps) => {
  return (
    <div className={clsx('card', className)}>
      {title && <h1 className="card-title">{title}</h1>}
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
      {children}
    </div>
  );
};
