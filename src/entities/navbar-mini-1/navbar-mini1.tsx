import styles from './navbar-mini1.module.scss';
import { NavLink } from 'react-router-dom';
import { TwoUsersMIcon } from '@alfalab/icons-glyph/TwoUsersMIcon';

export const NavBarMini1 = () => {
	return (
		<aside className={styles.aside}>
			<nav className={styles.navtab}>
				<ul className={styles.list}>
					<li className={styles.item}>
						<NavLink className={styles.link} to="/myteam/iprs">
							<TwoUsersMIcon
								fill="currentColor"
								className={styles.icon}
							></TwoUsersMIcon>
							<span>Моя команда</span>
						</NavLink>
					</li>
				</ul>
			</nav>
		</aside>
	);
};
