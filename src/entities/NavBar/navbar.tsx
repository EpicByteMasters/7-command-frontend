import styles from './navbar.module.scss';
import React from 'react';
import { TwoUsersMIcon } from '@alfalab/icons-glyph/TwoUsersMIcon';
import { UsdMIcon } from '@alfalab/icons-glyph/UsdMIcon';
import { BriefcaseMIcon } from '@alfalab/icons-glyph/BriefcaseMIcon';
import { SquareAcademicCapMIcon } from '@alfalab/icons-glyph/SquareAcademicCapMIcon';
import { HourglassMIcon } from '@alfalab/icons-glyph/HourglassMIcon';
import { WalletMIcon } from '@alfalab/icons-glyph/WalletMIcon';
import { NavigationMarketplaceMIcon } from '@alfalab/icons-glyph/NavigationMarketplaceMIcon';
import { RocketMIcon } from '@alfalab/icons-glyph/RocketMIcon';
import { ArrowLeftMediumMIcon } from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';

function NavBar() {
	return (
		<aside className={styles.aside}>
			<nav className={styles.navtab}>
				<ul className={styles.list}>
					<li className={styles.item}>
						<a className={styles.link} href="#">
							<ArrowLeftMediumMIcon
								className={styles.icon}
							></ArrowLeftMediumMIcon>
							Назад
						</a>
					</li>
					<li className={styles.item}>
						<TwoUsersMIcon className={styles.icon}></TwoUsersMIcon>
						<a className={styles.link} href="#">
							Моя команда
						</a>
					</li>
					<li className={styles.item}>
						<BriefcaseMIcon className={styles.icon}></BriefcaseMIcon>
						<a className={styles.link} href="#">
							Подбор
						</a>
					</li>
					<li className={styles.item}>
						<SquareAcademicCapMIcon
							className={styles.icon}
						></SquareAcademicCapMIcon>
						<a className={styles.link} href="#">
							Обучение
						</a>
					</li>
					<li className={styles.item}>
						<HourglassMIcon className={styles.icon}></HourglassMIcon>
						<a className={styles.link} href="#">
							Адаптация
						</a>
					</li>
					<li className={styles.item}>
						<UsdMIcon className={styles.icon}></UsdMIcon>
						<a className={styles.link} href="#">
							Премии и доход
						</a>
					</li>
					<li className={styles.item}>
						<WalletMIcon className={styles.icon}></WalletMIcon>
						<a className={styles.link} href="#">
							Лимиты и ставки
						</a>
					</li>
					<li className={styles.item}>
						<NavigationMarketplaceMIcon
							className={styles.icon}
						></NavigationMarketplaceMIcon>
						<a className={styles.link} href="#">
							Дашборды
						</a>
					</li>

					<li className={styles.item}>
						<RocketMIcon className={styles.icon}></RocketMIcon>
						<a className={styles.link} href="#">
							План развития
						</a>
					</li>
				</ul>
			</nav>
		</aside>
	);
}

export default NavBar;
