import { type FC } from 'react';
import styles from './RecordHistory.module.css';
import TrashIcon from '@/assets/icons/trash-ic.svg';
import FileIcon from '@/assets/icons/file-ic.svg';
import NiceSmileIcon from '@/assets/icons/smiley-nice-ic.svg';
import SadSmileIcon from '@/assets/icons/smiley-sad-ic.svg';
import type { TAggregateHistoryRecord } from '@/shared/types/aggregate';

type TRecordHistoryProps = {
  onDelete: () => void;
  onClick: () => void;
};

const RecordHistory: FC<TAggregateHistoryRecord & TRecordHistoryProps> = ({
  fileName,
  date,
  status,
  onDelete,
  onClick,
}) => {
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className={styles.record_wrap}>
      <div className={styles.info_wrap} onClick={onClick}>
        <span className={styles.file_name}>
          <img src={FileIcon} alt="Файл" className={styles.icon} />
          {fileName}
        </span>
        <span className={styles.date}>{formattedDate}</span>
        <span className={`${styles.status} ${status === 'error' ? styles.dimmed : ''}`}>
          Обработан успешно
          <img src={NiceSmileIcon} className={styles.icon} alt="Успех" />
        </span>
        <span className={`${styles.status} ${status === 'success' ? styles.dimmed : ''}`}>
          Не удалось обработать
          <img src={SadSmileIcon} className={styles.icon} alt="Ошибка" />
        </span>
      </div>
      <button className={styles.delete_btn} onClick={onDelete}>
        <img src={TrashIcon} className={styles.icon} alt="Удалить" />
      </button>
    </div>
  );
};

export default RecordHistory;
