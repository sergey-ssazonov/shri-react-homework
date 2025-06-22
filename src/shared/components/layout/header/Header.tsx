import { type FC } from 'react';
import styles from './Header.module.css';
import Logo from '@/assets/logo.svg';
import Navigation from './Navigation';

const Header: FC = () => {
  return (
    <header className={styles.header_wrap}>
      <div className={styles.conteiner_name_logo}>
        <img src={Logo} alt="Логотип Летних Школ" className={styles.logo} />
        <h1 className={styles.title}>Межгалактическая аналитика</h1>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
