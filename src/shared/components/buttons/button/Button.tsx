import { type FC, type ReactNode } from 'react';
import styles from './Button.module.css';

type TButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
  variant?: 'primary' | 'black';
};

const Button: FC<TButtonProps> = ({ onClick, children, disabled = false, variant = 'primary' }) => {
  const className = `${styles.button} ${variant === 'black' ? styles.black : ''}`;

  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
