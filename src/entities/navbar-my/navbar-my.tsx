import styles from './navbar-mini.module.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { RocketMIcon } from '@alfalab/icons-glyph/RocketMIcon';
import { ArrowLeftMediumMIcon } from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';

function NavBarMy() {
	const navigate = useNavigate();

	const onGoBack = () => {
		navigate('/service-iprs/my', { replace: true });
	};

	return (
		<aside className={styles.aside}>
			<nav className={styles.navtab}>
				<ul className={styles.list}>
					<li className={styles.item}>
						<NavLink
							className={styles.link}
							to="/service-iprs/myteam"
							onClick={onGoBack}
						>
							<ArrowLeftMediumMIcon
								className={styles.iconBack}
								fill="currentColor"
							></ArrowLeftMediumMIcon>
							<span>Назад</span>
						</NavLink>
					</li>
					<li className={styles.item}>
						<NavLink className={styles.link} to="#">
							<RocketMIcon
								fill="currentColor"
								className={styles.icon}
							></RocketMIcon>
							Мой план развития
						</NavLink>
					</li>
				</ul>
			</nav>
		</aside>
	);
}

export default NavBarMy;
