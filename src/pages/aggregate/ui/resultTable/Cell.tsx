// Cell.tsx
import { type FC } from 'react';
import styles from './ResultTable.module.css';

type TCellProps = {
  title: string;
  value: string;
};

const Cell: FC<TCellProps> = ({ title, value }) => {
  return (
    <div className={styles.cell_wrap}>
      <span className={styles.cell_value}>{value}</span>
      <span className={styles.cell_title}>{title}</span>
    </div>
  );
};

export default Cell;
