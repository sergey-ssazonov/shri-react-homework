import { type FC } from 'react';
import styles from './CrossButton.module.css';
import CrossIcon from '@/assets/icons/cross-ic.svg';

type CrossButtonProps = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const CrossButton: FC<CrossButtonProps> = ({ onClick }) => {
  return (
    <button
      className={styles.remove_button}
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      aria-label="Удалить"
    >
      <img className={styles.cross_icon} src={CrossIcon} alt="Удалить" />
    </button>
  );
};

export default CrossButton;
