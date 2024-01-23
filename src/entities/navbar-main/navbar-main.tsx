import styles from './navbar-main.module.scss';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { UsdMIcon } from '@alfalab/icons-glyph/UsdMIcon';
import { SquareAcademicCapMIcon } from '@alfalab/icons-glyph/SquareAcademicCapMIcon';
import { HourglassMIcon } from '@alfalab/icons-glyph/HourglassMIcon';
import { ArrowLeftMediumMIcon } from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';
import roleUrl from '../../shared/utils/urls';
import iconProfile from '../../images/navbar-icons-color/icon-user-account.svg';
import iconCert from '../../images/navbar-icons-color/icon-certificate.svg';
import iconVacation from '../../images/navbar-icons-color/icon-vacation.svg';
import iconTarget from '../../images/navbar-icons-color/icon-target.svg';
import iconRocket from '../../images/navbar-icons-color/icon-rocket.svg';
import iconMore from '../../images/navbar-icons-color/icon-more.svg';

function NavBarMain() {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<aside className={styles.aside}>
			<nav className={styles.navtab}>
				<ul className={styles.list}>
					<h6 className={styles.title}>Сервисы </h6>
					<li className={styles.item}>
						<NavLink className={styles.link} to="#">
							<img src={iconProfile} alt="иконка"></img>
							Профиль
						</NavLink>
					</li>
					<li className={styles.item}>
						<NavLink className={styles.link} to="#">
							<img src={iconCert} alt="иконка"></img>
							Пройти обучение
						</NavLink>
					</li>
					<li className={styles.item}>
						<NavLink className={styles.link} to="#">
							<img src={iconVacation} alt="иконка"></img>
							Спланировать отпуск
						</NavLink>
					</li>
					<li className={styles.item}>
						<NavLink className={styles.link} to="#">
							<img src={iconTarget} alt="иконка"></img>
							Квартиальные цели
						</NavLink>
					</li>
					<li className={styles.item}>
						<NavLink className={styles.link} to="#">
							<img
								className={styles.icon}
								id="logo"
								src={iconRocket}
								alt="иконка"
							></img>
							План развития
						</NavLink>
					</li>
					<li className={styles.item}>
						<NavLink className={styles.link} to="#">
							<img className={styles.icon} src={iconMore} alt="иконка"></img>
							<span className={styles.title}>еще 33</span>
						</NavLink>
					</li>
				</ul>
			</nav>
		</aside>
	);
}

export default NavBarMain;
