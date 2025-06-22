import Button from '@/shared/components/button/Button';
import { type FC } from 'react';
import styles from './GeneratorPage.module.css';

const GeneratorPage: FC = () => {
  return (
    <section className={styles.page_wrap}>
      <h1 className={styles.text}>Сгенерируйте готовый csv-файл нажатием одной кнопки</h1>
      <Button>Начать генерацию</Button>
    </section>
  );
};

export default GeneratorPage;
