import { type FC } from 'react';
import styles from './FileStatus.module.css';
import CrossIcon from '@/assets/icons/cross-ic.svg';
import SpinIcon from '@/assets/icons/spin-ic.svg';

type TFileStatusProps = {
  loading?: boolean;
  file: File;
  onRemove: () => void;
  isError?: boolean;
  already?: boolean;
};

const FileStatus: FC<TFileStatusProps> = ({
  file,
  loading = false,
  onRemove,
  isError = false,
  already = false,
}) => {
  if (loading) {
    return (
      <div className={styles.file_loading}>
        <img className={styles.spin_icon} src={SpinIcon} alt="Загрузка" />
      </div>
    );
  }

  return (
    <div className={styles.file_wrap}>
      <span
        className={`${styles.file_name} ${already ? styles.already : ''} ${
          isError ? styles.error : ''
        }`}
      >
        {file.name}
      </span>
      <button
        className={styles.remove_file_button}
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        aria-label="Удалить файл"
      >
        <img className={styles.cross_icon} src={CrossIcon} alt="Удалить" />
      </button>
    </div>
  );
};

export default FileStatus;
