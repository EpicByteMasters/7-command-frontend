import styles from './backbutton.module.scss';
import { ArrowLeftMediumMIcon } from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';
import { NavLink, useNavigate } from 'react-router-dom';

function BackButton() {
	const navigate = useNavigate();

	return (
		<aside className={styles.aside}>
			<nav className={styles.navtab}>
				<div className={styles.list}>
					<li className={styles.item}>
						<NavLink
							className={styles.link}
							to="#"
							onClick={() => navigate(-1)}
						>
							<ArrowLeftMediumMIcon
								className={styles.iconBack}
								fill="currentColor"
							></ArrowLeftMediumMIcon>
							<span></span>
						</NavLink>
					</li>
				</div>
			</nav>
		</aside>
	);
}

export default BackButton;
