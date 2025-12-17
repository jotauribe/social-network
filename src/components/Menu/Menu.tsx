import './Menu.css';

import { clsx } from 'clsx';
import { type ReactNode, useRef, useState } from 'react';

interface MenuProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Menu = ({ trigger, children, className }: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const closeMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div className={clsx('menu-container', className)} ref={menuRef}>
      <div onClick={toggleMenu} className="menu-trigger">
        {trigger}
      </div>
      {isOpen && (
        <>
          <div className="menu-backdrop" onClick={closeMenu} />
          <div className="menu-dropdown" onClick={(e) => e.stopPropagation()}>
            {children}
          </div>
        </>
      )}
    </div>
  );
};
