import styles from './navbar-mini.module.scss';
import { NavLink } from 'react-router-dom';
import { TwoUsersMIcon } from '@alfalab/icons-glyph/TwoUsersMIcon';
import { RocketMIcon } from '@alfalab/icons-glyph/RocketMIcon';
import { UserStarMIcon } from '@alfalab/icons-glyph/UserStarMIcon';
import { roleUrl } from '../../shared/utils/urls';
import BackButton from '../backbutton/backbutton';

interface ExecutiveProps {
	isExecutive?: boolean;
	isEmployee?: boolean;
	isMentor?: boolean;
}
export const NavBarMini: React.FC<ExecutiveProps> = ({
	isExecutive,
	isMentor,
}) => {
	return (
		<aside className={styles.aside}>
			<nav className={styles.navtab}>
				<ul className={styles.list}>
					<li className={styles.item}>
						<BackButton />
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
					) : (
						''
					)}
					{!isMentor && (
						<li className={styles.item}>
							<NavLink className={styles.link} to={roleUrl[1].url}>
								<RocketMIcon
									fill="currentColor"
									className={styles.icon}
								></RocketMIcon>
								Мой план развития
							</NavLink>
						</li>
					)}
					{(isExecutive && isMentor) || isExecutive ? (
						<li className={styles.item}>
							<NavLink className={styles.link} to={roleUrl[2].url}>
								<UserStarMIcon
									fill="currentColor"
									className={styles.icon}
								></UserStarMIcon>
								Менторство
							</NavLink>
						</li>
					) : (
						''
					)}
				</ul>
			</nav>
		</aside>
	);
};

export default NavBarMini;
