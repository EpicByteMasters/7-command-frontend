import styles from './backbutton.module.scss';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftMediumMIcon } from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';

function BackButton() {
	const navigate = useNavigate();
	const goBack = () => navigate(-1);
	return (
		<aside className={styles.aside}>
			<nav className={styles.navtab}>
				<div className={styles.list}>
					<li className={styles.item}>
						<button className={styles.link} onClick={goBack}>
							<ArrowLeftMediumMIcon
								className={styles.iconBack}
								fill="currentColor"
							></ArrowLeftMediumMIcon>
							<span>Назад</span>
						</button>
					</li>
				</div>
			</nav>
		</aside>
	);
}

export default BackButton;
