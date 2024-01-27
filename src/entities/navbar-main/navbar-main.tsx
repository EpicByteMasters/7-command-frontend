import styles from './navbar-main.module.scss';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import iconProfile from '../../images/navbar-icons-color/icon-user-account.svg';
import iconCert from '../../images/navbar-icons-color/icon-certificate.svg';
import iconVacation from '../../images/navbar-icons-color/icon-vacation.svg';
import iconTarget from '../../images/navbar-icons-color/icon-target.svg';
import iconRocket from '../../images/navbar-icons-color/icon-rocket.svg';
import iconMore from '../../images/navbar-icons-color/icon-more.svg';
import { useAppSelector } from '../../shared/hooks/redux';
interface ExecutiveProps {
	isExecutive: boolean;
}
export const NavBarMain: React.FC<ExecutiveProps> = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const userData = useAppSelector((state) => state.user.user);
	console.log('userData в навбаре: ', userData);
	const isEmployee = userData.positionId === 'EMPLOYEE';
	console.log('isEmployee в навбаре: ', isEmployee);
	const isExecutive = userData.positionId === 'MANAGER';

	const onNavigate = () => {
		//Сотрудник
		if (location.pathname === '/main' && isExecutive) {
			navigate('/service-iprs/myteam', { replace: true });
		}
		if (location.pathname === '/main' && isEmployee) {
			console.log('isEmployee', isEmployee);
			navigate('/service-iprs/my', { replace: true });
		}
		// //Руководитель
		// if (
		// 	location.pathname === '/service-iprs/myteam' &&
		// 	user.role === 'myteam'
		// ) {
		// 	navigate('/', { replace: true });
		// }
		// if (
		// 	location.pathname === ' /service-iprs/myteam/history' &&
		// 	user.role === 'myteam'
		// ) {
		// 	navigate('/service-iprs/myteam', { replace: true });
		// }
		// if (
		// 	location.pathname === '/service-iprs/ipr/:id' &&
		// 	user.role === 'myteam'
		// ) {
		// 	navigate('/service-iprs/myteam', { replace: true });
		// }
		// if (location.pathname === '/service-iprs/ipr/:id' && user.role === 'my') {
		// 	navigate('/service-iprs/my', { replace: true });
		// }
		// if (location.pathname === '/service-iprs/my' && user.role === 'my') {
		// 	navigate('/', { replace: true });
		// }
		// if (location.pathname === '/service-iprs/ipr/:id' && user.role === 'my') {
		// 	navigate('/service-iprs/my', { replace: true });
		// }
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
