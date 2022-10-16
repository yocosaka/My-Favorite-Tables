import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

type PropTypes = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
};

const Button = ({ children, variant }: PropTypes) => {
  return (
    <div className={clsx(styles.button, variant && styles[variant])}>
      {children}
    </div>
  );
};

export default Button;
