import { useState, type FC } from 'react';
import styles from './AggregatePage.module.css';
import UploadFile from '@/pages/aggregate/ui/uploadFile/UploadFile';
import Button from '@/shared/components/buttons/button/Button';
import { handleAggregate } from '../model/handleAggregate';
import AggregateDataTable from '@/shared/components/aggregateDataTable/AggregateDataTable';
import { useAggregateStore } from '../storage/aggregate.store';

const AggregatePage: FC = () => {
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const { chunks } = useAggregateStore();

  const handleSend = async () => {
    if (uploadFile) {
      await handleAggregate(uploadFile);
    }
  };

  return (
    <section className={styles.page_wrap}>
      <h1 className={styles.text}>
        Загрузите <strong>csv</strong> файл и получите <strong>полную информацию</strong> о нём за
        сверхнизкое время
      </h1>
      <UploadFile onFileUpload={setUploadFile} />
      <Button onClick={handleSend} disabled={!uploadFile}>
        Отправить
      </Button>

      <AggregateDataTable data={chunks} />
    </section>
  );
};

export default AggregatePage;
