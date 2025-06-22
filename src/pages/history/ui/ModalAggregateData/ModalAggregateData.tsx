import { type FC } from 'react';
import ReactDOM from 'react-dom';
import styles from './ModalAggregateData.module.css';
import type { TAggregateData } from '@/shared/types/aggregate';
import AggregateDataTable from '@/shared/components/aggregateDataTable/AggregateDataTable';
import CrossButton from '@/shared/components/buttons/crossButton/CrossButton';

type ModalAggregateDataProps = {
  isOpen: boolean;
  onClose: () => void;
  data: TAggregateData | null;
};

const ModalAggregateData: FC<ModalAggregateDataProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal_overlay} onClick={onClose}>
      <div className={styles.close_button}>
        <CrossButton onClick={onClose} />
      </div>
      <div className={styles.modal_content} onClick={(e) => e.stopPropagation()}>
        <AggregateDataTable variant="column" data={[data]} />
      </div>
    </div>,
    document.body
  );
};

export default ModalAggregateData;
