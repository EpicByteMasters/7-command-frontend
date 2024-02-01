import styles from './navbar-mini.module.scss';

import { useAppSelector } from '../../shared/hooks/redux';
import { NavLink } from 'react-router-dom';

import { TwoUsersMIcon } from '@alfalab/icons-glyph/TwoUsersMIcon';
import { RocketMIcon } from '@alfalab/icons-glyph/RocketMIcon';
import { UserStarMIcon } from '@alfalab/icons-glyph/UserStarMIcon';

import { roleUrl } from '../../shared/utils/urls';
import { BackButton } from '../backbutton/backbutton';

export const NavBarMini: React.FC = ({}) => {
	const userData = useAppSelector((state) => state.user.user);

	const isEmployee = userData.isSupervisor === false;
	const isExecutive = userData.isSupervisor === true;
	const isMentor = userData.isMentor === true;

	// console.log('isExecutive Руководитель в Мини навбаре: ', isExecutive);
	// console.log('isEmployee Работник в Мини навбаре: ', isEmployee);
	// console.log('isEmployee Ментор в Мини навбаре: ', isMentor);

	return (
		<aside className={styles.aside}>
			<nav className={styles.navtab}>
				<ul className={styles.list}>
					<li className={styles.item}>
						<BackButton
							isExecutive={isExecutive}
							isEmployee={isEmployee}
							isMentor={isMentor}
						/>
					</li>
					<li className={styles.item}>
						<NavLink className={styles.link} to={roleUrl[1].url}>
							<RocketMIcon
								fill="currentColor"
								className={styles.icon}
							></RocketMIcon>
							Мой план развития
						</NavLink>
					</li>

					{isExecutive ? (
						<li className={styles.item}>
							<NavLink className={styles.link} to={roleUrl[0].url}>
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
							<NavLink className={styles.link} to={roleUrl[2].url}>
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
