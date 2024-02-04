import styles from './navbar-main.module.scss';

//import { useAppSelector } from '../../shared/hooks/redux';
import { NavLink, useNavigate } from 'react-router-dom';

import iconProfile from '../../images/navbar-icons-color/icon-user-account.svg';
import iconCert from '../../images/navbar-icons-color/icon-certificate.svg';
import iconVacation from '../../images/navbar-icons-color/icon-vacation.svg';
import iconTarget from '../../images/navbar-icons-color/icon-target.svg';
import iconRocket from '../../images/navbar-icons-color/icon-rocket.png';
import iconMore from '../../images/navbar-icons-color/icon-more.svg';

export const NavBarMain: React.FC = () => {
  const navigate = useNavigate();
  // const location = useLocation();

  // const userData = useAppSelector((state) => state.user.user);

  // const isEmployee = userData.isSupervisor === false;
  // const isExecutive = userData.isSupervisor === true;
  // const isMentor = userData.isMentor === true;

  // const id = userData.id === 6;
  // const id2 = userData.id === 16;

  // console.log('isExecutive Руководитель в Главном навбаре: ', isExecutive);
  // console.log('isEmployee Работник в Главномнавбаре: ', isEmployee);
  // console.log('isEmployee Ментор в Главном навбаре: ', isMentor);

  // const onNavigate = () => {
  // 	if (location.pathname === '/main' && isExecutive) {
  // 		navigate('/service-iprs/myteam', { replace: false });
  // 	}
  // 	if (location.pathname === '/main' && isEmployee) {
  // 		console.log('isEmployee', isEmployee);
  // 		navigate('/service-iprs/my', { replace: false });
  // 	}
  // 	if (location.pathname === '/main' && id) {
  // 		navigate('/service-iprs/mentor', { replace: true });
  // 	}
  // 	if (location.pathname === '/main' && id2) {
  // 		navigate('/service-iprs/mentor', { replace: true });
  // 	}
  // };
  //TODO кода данные в базе будут ок убрать моки id

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
