import { type FC, type ReactNode } from 'react';
import styles from './Button.module.css';

type TButtonProps = {
  children: ReactNode;
  disabled: boolean;
  onClick: () => void;
};

const Button: FC<TButtonProps> = ({ onClick, children, disabled }) => {
  return (
    <button onClick={onClick} className={styles.button} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
