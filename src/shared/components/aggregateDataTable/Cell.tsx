import { type FC } from 'react';
import styles from './AggregateDataTable.module.css';
import type { TVariantView } from './AggregateDataTable';

type TCellProps = {
  title: string;
  value: string;
  variant: TVariantView;
};

const Cell: FC<TCellProps> = ({ title, value, variant }) => {
  return (
    <div className={`${styles.cell_wrap} ${variant === 'column' ? styles.column : ''} `}>
      <span className={styles.cell_value}>{value}</span>
      <span className={styles.cell_title}>{title}</span>
    </div>
  );
};

export default Cell;
