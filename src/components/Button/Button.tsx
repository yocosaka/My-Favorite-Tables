import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

type PropTypes = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const Button = ({ children, variant, onClick }: PropTypes) => {
  return (
    <button
      className={clsx(styles.button, variant && styles[variant])}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
