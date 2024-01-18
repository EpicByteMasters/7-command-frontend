import styles from './backbutton.module.scss';
import React from 'react';
import { ArrowLeftMediumMIcon } from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';

function BackButton() {
	return (
		<aside className={styles.aside}>
			<nav className={styles.navtab}>
				<div className={styles.list}>
					<li className={styles.item}>
						<a className={styles.link} href="#">
							<ArrowLeftMediumMIcon
								className={styles.icon_back}
								fill="currentColor"
							></ArrowLeftMediumMIcon>
							<span>Назад</span>
						</a>
					</li>
				</div>
			</nav>
		</aside>
	);
}

export default BackButton;
