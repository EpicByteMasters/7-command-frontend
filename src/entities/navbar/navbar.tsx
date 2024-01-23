import styles from './navbar.module.scss';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { TwoUsersMIcon } from '@alfalab/icons-glyph/TwoUsersMIcon';
import { UsdMIcon } from '@alfalab/icons-glyph/UsdMIcon';
import { BriefcaseMIcon } from '@alfalab/icons-glyph/BriefcaseMIcon';
import { SquareAcademicCapMIcon } from '@alfalab/icons-glyph/SquareAcademicCapMIcon';
import { HourglassMIcon } from '@alfalab/icons-glyph/HourglassMIcon';
import { WalletMIcon } from '@alfalab/icons-glyph/WalletMIcon';
import { NavigationMarketplaceMIcon } from '@alfalab/icons-glyph/NavigationMarketplaceMIcon';
import { RocketMIcon } from '@alfalab/icons-glyph/RocketMIcon';
import { ArrowLeftMediumMIcon } from '@alfalab/icons-glyph/ArrowLeftMediumMIcon';
import { UserStarMIcon } from '@alfalab/icons-glyph/UserStarMIcon';
import roleUrl from '../../shared/utils/urls';

function NavBar() {
	const navigate = useNavigate();
	const location = useLocation();

	return (
		<aside className={styles.aside}>
			<nav className={styles.navtab}>
				<ul className={styles.list}>
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
							<span>Назад</span>
						</NavLink>
					</li>
					<li className={styles.item}>
						<NavLink className={styles.link} to="#">
							<TwoUsersMIcon
								fill="currentColor"
								className={styles.icon}
							></TwoUsersMIcon>
							<span>Развитие команды</span>
						</NavLink>
					</li>
					<li className={styles.item}>
						<NavLink className={styles.link} to="#">
							<BriefcaseMIcon
								fill="currentColor"
								className={styles.icon}
							></BriefcaseMIcon>
							Подбор
						</NavLink>
					</li>
					<li className={styles.item}>
						<NavLink className={styles.link} to="#">
							<SquareAcademicCapMIcon
								fill="currentColor"
								className={styles.icon}
							></SquareAcademicCapMIcon>
							Обучение
						</NavLink>
					</li>
					<li className={styles.item}>
						<NavLink className={styles.link} to="#">
							<HourglassMIcon
								fill="currentColor"
								className={styles.icon}
							></HourglassMIcon>
							Адаптация
						</NavLink>
					</li>
					<li className={styles.item}>
						<NavLink className={styles.link} to="#">
							<UsdMIcon fill="currentColor" className={styles.icon}></UsdMIcon>
							Премии и доход
						</NavLink>
					</li>
					<li className={styles.item}>
						<NavLink className={styles.link} to="#">
							<WalletMIcon
								fill="currentColor"
								className={styles.icon}
							></WalletMIcon>
							Лимиты и ставки
						</NavLink>
					</li>
					<li className={styles.item}>
						<NavLink className={styles.link} to="#">
							<NavigationMarketplaceMIcon
								fill="currentColor"
								className={styles.icon}
							></NavigationMarketplaceMIcon>
							Дашборды
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
					<li className={styles.item}>
						<NavLink className={styles.link} to="#">
							<UserStarMIcon
								fill="currentColor"
								className={styles.icon}
							></UserStarMIcon>
							Менторство
						</NavLink>
					</li>
				</ul>
			</nav>
		</aside>
	);
}

export default NavBar;
