import styles from './navbar-mini2.module.scss';
import { NavLink } from 'react-router-dom';

import { UserMIcon } from '@alfalab/icons-glyph/UserMIcon';

export const NavBarMini2 = () => {
	return (
		<aside className={styles.aside}>
			<nav className={styles.navtab}>
				<ul className={styles.list}>
					<li className={styles.item}>
						<NavLink className={styles.link} to="#">
							<UserMIcon
								fill="currentColor"
								className={styles.icon}
							></UserMIcon>
							<span>План развития</span>
						</NavLink>
					</li>
				</ul>
			</nav>
		</aside>
	);
};
