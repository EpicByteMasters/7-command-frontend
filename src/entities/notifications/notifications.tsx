import styles from './notifications.module.scss';

import { useState } from 'react';
import { Backdrop } from '@alfalab/core-components/backdrop';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';

export const Notifications = ({ close }: any) => {
	const [notificationsList, setNotificationsList] = useState([1, 2, 3]);

	return (
		<>
			<div style={{ zIndex: 1, position: 'relative' }}>
				<div className={styles.notifications}>
					<ul className={styles.list}>
						{notificationsList.map((el) => {
							return (
								<li className={styles.item} key={el}>
									<b className={styles.title}>Досье развития: твой успех</b>
									<p className={styles.description}>
										Поздравляю! Ты первый среди всех сотрудников, достигший
										своих целей, установленных в индивидуальном плане развития.
										Продолжай двигаться вперёд!
									</p>
									<footer className={styles.footer}>
										<div className={styles.date}>15.01.2024</div>
										<a href="#" className={styles.link}>
											Ссылка
										</a>
									</footer>
								</li>
							);
						})}
					</ul>
					<div className={styles.wrapperShowMore}>
						<ButtonDesktop view="primary" size="s">
							Показать все
						</ButtonDesktop>
					</div>
				</div>
				<Backdrop open={true} onClick={() => close()} />
			</div>
		</>
	);
};
