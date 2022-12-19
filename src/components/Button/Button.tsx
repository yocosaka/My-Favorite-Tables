import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

type PropTypes = {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  size?: 'small' | 'medium' | 'large';
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const Button = ({
  children,
  variant = 'secondary',
  size = 'medium',
  onClick,
}: PropTypes) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], styles[size])}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
