import './Avatar.css';

import { clsx } from 'clsx';

interface AvatarProps {
  src: string;
  alt?: string;
  className?: string;
}

export const Avatar = ({ src, alt = 'Avatar', className }: AvatarProps) => {
  return (
    <div className={clsx('avatar', className)}>
      <img src={src} alt={alt} />
    </div>
  );
};
