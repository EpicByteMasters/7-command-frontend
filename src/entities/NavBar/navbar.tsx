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
								className={styles.icon_back}
								fill="currentColor"
							></ArrowLeftMediumMIcon>
							<span>Назад</span>
						</a>
					</li>
					<li className={styles.item}>
						<a className={styles.link} href="#">
							<TwoUsersMIcon
								fill="currentColor"
								className={styles.icon}
							></TwoUsersMIcon>
							<span>Моя команда</span>
						</a>
					</li>
					<li className={styles.item}>
						<a className={styles.link} href="#">
							<BriefcaseMIcon
								fill="currentColor"
								className={styles.icon}
							></BriefcaseMIcon>
							Подбор
						</a>
					</li>
					<li className={styles.item}>
						<a className={styles.link} href="#">
							<SquareAcademicCapMIcon
								fill="currentColor"
								className={styles.icon}
							></SquareAcademicCapMIcon>
							Обучение
						</a>
					</li>
					<li className={styles.item}>
						<a className={styles.link} href="#">
							<HourglassMIcon
								fill="currentColor"
								className={styles.icon}
							></HourglassMIcon>
							Адаптация
						</a>
					</li>
					<li className={styles.item}>
						<a className={styles.link} href="#">
							<UsdMIcon fill="currentColor" className={styles.icon}></UsdMIcon>
							Премии и доход
						</a>
					</li>
					<li className={styles.item}>
						<a className={styles.link} href="#">
							<WalletMIcon
								fill="currentColor"
								className={styles.icon}
							></WalletMIcon>
							Лимиты и ставки
						</a>
					</li>
					<li className={styles.item}>
						<a className={styles.link} href="#">
							<NavigationMarketplaceMIcon
								fill="currentColor"
								className={styles.icon}
							></NavigationMarketplaceMIcon>
							Дашборды
						</a>
					</li>

					<li className={styles.item}>
						<a className={styles.link} href="#">
							<RocketMIcon
								fill="currentColor"
								className={styles.icon}
							></RocketMIcon>
							План развития
						</a>
					</li>
				</ul>
			</nav>
		</aside>
	);
}

export default NavBar;
