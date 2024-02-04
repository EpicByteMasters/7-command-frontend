import styles from './navbar-mini.module.scss';

import { useAppSelector } from '../../shared/hooks/redux';
import { NavLink, useLocation } from 'react-router-dom';

import { TwoUsersMIcon } from '@alfalab/icons-glyph/TwoUsersMIcon';
import { RocketMIcon } from '@alfalab/icons-glyph/RocketMIcon';
import { UserStarMIcon } from '@alfalab/icons-glyph/UserStarMIcon';

import { roleUrl } from '../../shared/utils/urls';
import { BackButton } from '../backbutton/backbutton';

export const NavBarMini: React.FC = ({}) => {
	const location = useLocation();

	const userData = useAppSelector((state) => state.user.user);

	const isEmployee = userData.isSupervisor === false;
	const isExecutive = userData.isSupervisor === true;
	const isMentor = userData.isMentor === true;

	// console.log('isExecutive Руководитель в Мини навбаре: ', isExecutive);
	// console.log('isEmployee Работник в Мини навбаре: ', isEmployee);
	// console.log('isEmployee Ментор в Мини навбаре: ', isMentor);
	let isActive = false;

	if (location.pathname === '/service-iprs/myteam') {
		isActive = true;
	}
	if (location.pathname === '/service-iprs/my') {
		isActive = true;
	}
	if (location.pathname === '/service-iprs/mentor') {
		isActive = true;
	}

	return (
		<aside className={styles.aside}>
			<nav className={styles.navtab} id="#nav">
				<BackButton
					className={styles.btnBack}
					isExecutive={isExecutive}
					isEmployee={isEmployee}
					isMentor={isMentor}
				/>
				<ul className={styles.list}>
					<li className={styles.item}>
						<NavLink
							className={({ isActive }) =>
								[isActive ? styles.active : '', styles.link].join(' ')
							}
							to={roleUrl[1].url}
							replace
						>
							<RocketMIcon
								fill="currentColor"
								className={styles.icon}
							></RocketMIcon>
							Мой план развития
						</NavLink>
					</li>

					{isExecutive ? (
						<li className={styles.item}>
							<NavLink
								className={({ isActive }) =>
									[isActive ? styles.active : '', styles.link].join(' ')
								}
								to={roleUrl[0].url}
								replace
							>
								<TwoUsersMIcon
									fill="currentColor"
									className={styles.icon}
								></TwoUsersMIcon>
								<span>Развитие команды</span>
							</NavLink>
						</li>
					) : null}

					{isMentor ? (
						<li className={styles.item}>
							<NavLink
								className={({ isActive }) =>
									[isActive ? styles.active : '', styles.link].join(' ')
								}
								to={roleUrl[2].url}
								replace
							>
								<UserStarMIcon
									fill="currentColor"
									className={styles.icon}
								></UserStarMIcon>
								Менторство
							</NavLink>
						</li>
					) : null}
				</ul>
			</nav>
		</aside>
	);
};

export default NavBarMini;
