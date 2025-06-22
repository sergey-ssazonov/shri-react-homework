import { useState, type FC } from 'react';
import styles from './GeneratorPage.module.css';

import Button from '@/shared/components/buttons/button/Button';
import FileView from '@/shared/components/fileView/FileView';
import { generateCSV } from '../api/generator';
import { configGenerate } from '@/shared/constants/configGenerate.const';

const GeneratorPage: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const blob = await generateCSV(configGenerate);
      const file = new File([blob], 'report.csv', { type: 'text/csv' });
      setFile(file);

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError('Ошибка генерации файла');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
  };

  return (
    <section className={styles.page_wrap}>
      <h1 className={styles.text}>Сгенерируйте готовый csv-файл нажатием одной кнопки</h1>

      {!file && !isLoading && <Button onClick={handleGenerate}>Начать генерацию</Button>}

      {(isLoading || file) && (
        <FileView
          file={file ?? new File([], 'report.csv')}
          loading={isLoading}
          already={!!file && !isLoading}
          onRemove={handleRemoveFile}
        />
      )}

      {error && <p className={styles.error}>{error}</p>}
    </section>
  );
};

export default GeneratorPage;
