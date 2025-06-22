import type { FC } from 'react';
import GeneratorIcon from '@/assets/icons/generator-ic.svg';
import HistoryIcon from '@/assets/icons/history-ic.svg';
import UploadIcon from '@/assets/icons/upload-ic.svg';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';

type TNavElement = {
  url: string;
  title: string;
  iconSrc: string;
};

const NavigationMenu: TNavElement[] = [
  {
    title: 'CSV Аналитик',
    url: '/',
    iconSrc: UploadIcon,
  },
  {
    title: 'CSV Генератор',
    url: '/generator',
    iconSrc: GeneratorIcon,
  },
  {
    title: 'История',
    url: '/history',
    iconSrc: HistoryIcon,
  },
];

const NavElement: FC<TNavElement> = ({ title, url, iconSrc }) => (
  <NavLink
    to={url}
    className={({ isActive }) => `${styles.nav_element} ${isActive ? styles.active : ''}`}
  >
    <img src={iconSrc} alt={`Иконка для ${title}`} className={styles.nav_icon} />
    {title}
  </NavLink>
);

const Navigation: FC = () => {
  return (
    <nav className={styles.navigation}>
      {NavigationMenu.map((nav, index) => (
        <NavElement key={index} {...nav} />
      ))}
    </nav>
  );
};

export default Navigation;
