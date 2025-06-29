import { type FC } from 'react';
import styles from './FileView.module.css';
import SpinIcon from '@/assets/icons/spin-ic.svg';
import CrossButton from '@/shared/components/buttons/crossButton/CrossButton';

type TFileViewProps = {
  loading?: boolean;
  file: File;
  onRemove: () => void;
  isError?: boolean;
  already?: boolean;
};

const FileView: FC<TFileViewProps> = ({
  file,
  loading = false,
  onRemove,
  isError = false,
  already = false,
}) => {
  if (loading) {
    return (
      <div data-testid="loader" className={styles.file_loading}>
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
      <CrossButton onClick={onRemove} />
    </div>
  );
};

export default FileView;
