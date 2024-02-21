
import { NavLink, useNavigate } from 'react-router-dom';

import iconProfile from '../../shared/images/navbar-icons-color/icon-user-account.svg';
import iconCert from '../../shared/images/navbar-icons-color/icon-certificate.svg';
import iconVacation from '../../shared/images/navbar-icons-color/icon-vacation.svg';
import iconTarget from '../../shared/images/navbar-icons-color/icon-target.svg';
import iconRocket from '../../shared/images/navbar-icons-color/icon-rocket.png';
import iconMore from '../../shared/images/navbar-icons-color/icon-more.svg';

import styles from './navbar-main.module.scss';

export const NavBarMain: React.FC = () => {
  const navigate = useNavigate();

  const onNavigate = () => {
    navigate('/service-iprs/my');
  };

  return (
    <aside className={styles.aside}>
      <nav className={styles.navtab}>
        <ul className={styles.list}>
          <h6 className={styles.title}>Сервисы </h6>
          <li className={styles.item}>
            <NavLink className={styles.link} to="#">
              <img src={iconProfile} className={styles.icon} alt="иконка"></img>
              Профиль
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink className={styles.link} to="#">
              <img src={iconCert} className={styles.icon} alt="иконка"></img>
              Пройти обучение
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink className={styles.link} to="#">
              <img src={iconVacation} className={styles.icon} alt="иконка"></img>
              Спланировать отпуск
            </NavLink>
          </li>
          <li className={styles.item}>
            <NavLink className={styles.link} to="#">
              <img src={iconTarget} className={styles.icon} alt="иконка"></img>
              Квартиальные цели
            </NavLink>
          </li>
          <li className={styles.item}>
            <button className={styles.link} onClick={onNavigate}>
              <img className={styles.icon} id="logo" src={iconRocket} alt="иконка"></img>
              План развития
            </button>
          </li>
          <li className={styles.item}>
            <NavLink className={styles.link} to="#">
              <img className={[styles.icon, styles.iconMore].join(' ')} src={iconMore} alt="иконка"></img>
              <span className={styles.titleMore}>ещё 33</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
