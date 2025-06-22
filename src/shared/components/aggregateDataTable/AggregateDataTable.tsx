import { type FC } from 'react';
import styles from './AggregateDataTable.module.css';
import Cell from './Cell';
import type { TAggregateData } from '@/shared/types/aggregate';

const fieldMap = [
  {
    title: 'общие расходы в галактических кредитах',
    key: 'total_spend_galactic',
  },
  { title: 'цивилизация с минимальными расходами', key: 'less_spent_civ' },
  { title: 'количество обработанных записей', key: 'rows_affected' },
  { title: 'день года с максимальными расходами', key: 'big_spent_at' },
  { title: 'день года с минимальными расходами', key: 'less_spent_at' },
  { title: 'максимальная сумма расходов за день', key: 'big_spent_value' },
  { title: 'цивилизация с максимальными расходами', key: 'big_spent_civ' },
  {
    title: 'средние расходы в галактических кредитах',
    key: 'average_spend_galactic',
  },
] as const;

export type TVariantView = 'table' | 'column';

type TAggregateDataTableProps = {
  data: TAggregateData[];
  variant?: TVariantView;
};

const AggregateDataTable: FC<TAggregateDataTableProps> = ({ data, variant = 'table' }) => {
  const last = data[data.length - 1];

  if (!last)
    return (
      <div className={styles.empty}>
        <span className={styles.text_empty}>
          Здесь
          <br />
          появятся хайлайты
        </span>
      </div>
    );

  return (
    <section className={`${styles.table_wrap} ${variant === 'column' ? styles.column : ''}`}>
      {fieldMap.map(({ title, key }) => {
        const rawValue = last[key];
        if (rawValue === undefined || rawValue === null) return null;

        const value = typeof rawValue === 'number' ? rawValue.toLocaleString() : String(rawValue);

        return <Cell variant={variant} key={key} title={title} value={value} />;
      })}
    </section>
  );
};

export default AggregateDataTable;
