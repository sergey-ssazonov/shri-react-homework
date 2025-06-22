import { useEffect, useState, type FC } from 'react';
import styles from './HistoryPage.module.css';

import { useHistoryStore } from '../storage/history.store';
import ModalAggregateData from './ModalAggregateData/ModalAggregateData';
import type { TAggregateData } from '@/shared/types/aggregate';
import Button from '@/shared/components/buttons/button/Button';
import RecordHistory from './RecordHistory/RecordHistory';
import { useNavigate } from 'react-router-dom';

const HistoryPage: FC = () => {
  const navigate = useNavigate();
  const [openData, setOpenData] = useState<TAggregateData | null>(null);
  const { records, loadHistory, deleteRecord, clearHistory } = useHistoryStore();

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  const handleClick = (record: (typeof records)[number]) => {
    if (record.status === 'success' && record.result) {
      setOpenData(record.result);
    }
  };

  return (
    <>
      <section className={styles.page_wrap}>
        {records.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.text_empty}>
              Здесь
              <br />
              появится история запросов
            </span>
          </div>
        ) : (
          <>
            {records.map((record) => (
              <RecordHistory
                key={record.id}
                {...record}
                onClick={() => handleClick(record)}
                onDelete={() => deleteRecord(record.id)}
              />
            ))}

            <div className={styles.footer_wrap}>
              <Button
                onClick={() => {
                  navigate('/generator');
                }}
              >
                Сгенерировать больше
              </Button>
              <Button variant="black" onClick={clearHistory}>
                Очистить все
              </Button>
            </div>
          </>
        )}
      </section>
      <ModalAggregateData isOpen={!!openData} data={openData} onClose={() => setOpenData(null)} />
    </>
  );
};

export default HistoryPage;
