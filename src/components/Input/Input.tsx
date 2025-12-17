import './Input.css';

import { clsx } from 'clsx';
import type { ChangeEvent, ComponentProps } from 'react';

type BaseInputProps = {
  label?: string;
  containerClassName?: string;
  multiline?: boolean;
};

export type InputProps = BaseInputProps &
  Omit<ComponentProps<'input'>, 'onChange'> & {
    onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    rows?: number;
  };

export const Input = (props: InputProps) => {
  const { label, id, className, containerClassName, multiline, ...rest } = props;

  return (
    <div className={clsx('input-container', containerClassName)}>
      {label && (
        <label htmlFor={id} className="input-label">
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          id={id}
          className={clsx('input-field', className)}
          {...(rest as ComponentProps<'textarea'>)}
        />
      ) : (
        <input
          id={id}
          className={clsx('input-field', className)}
          {...(rest as ComponentProps<'input'>)}
        />
      )}
    </div>
  );
};
