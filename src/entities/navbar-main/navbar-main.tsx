import styles from './navbar-main.module.scss';
import { useAppSelector } from '../../shared/hooks/redux';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import iconProfile from '../../images/navbar-icons-color/icon-user-account.svg';
import iconCert from '../../images/navbar-icons-color/icon-certificate.svg';
import iconVacation from '../../images/navbar-icons-color/icon-vacation.svg';
import iconTarget from '../../images/navbar-icons-color/icon-target.svg';
import iconRocket from '../../images/navbar-icons-color/icon-rocket.svg';
import iconMore from '../../images/navbar-icons-color/icon-more.svg';
interface ExecutiveProps {
	// isMentor: boolean;
}
export const NavBarMain: React.FC<ExecutiveProps> = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const userData = useAppSelector((state) => state.user.user);
	const isEmployee = userData.positionId === 'EMPLOYEE';
	const isExecutive = userData.positionId === 'MANAGER';
	const id = userData.id === 6;
	const id2 = userData.id === 5;

	console.log('isExecutive: ', isExecutive);
	console.log('isEmployee в навбаре: ', isEmployee);
	console.log('userData: ', userData);
	console.log('id: ', id);
	console.log('id2: ', id2);

	const onNavigate = () => {
		if (location.pathname === '/main' && isExecutive) {
			navigate('/service-iprs/myteam', { replace: false });
		}
		if (location.pathname === '/main' && isEmployee) {
			console.log('isEmployee', isEmployee);
			navigate('/service-iprs/my', { replace: false });
		}
		if (location.pathname === '/main' && id) {
			navigate('/service-iprs/mentor', { replace: true });
		}
		if (location.pathname === '/main' && id2) {
			navigate('/service-iprs/mentor', { replace: true });
		}
	};
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
						<button className={styles.link} onClick={onNavigate}>
							<img
								className={styles.icon}
								id="logo"
								src={iconRocket}
								alt="иконка"
							></img>
							План развития
						</button>
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
};
