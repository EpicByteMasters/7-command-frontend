import { useState, ChangeEvent } from 'react';
import styles from './header.module.scss';
import { MagnifierMIcon } from '@alfalab/icons-glyph/MagnifierMIcon';
import { Input } from '@alfalab/core-components/input';
import { BellMIcon } from '@alfalab/icons-glyph/BellMIcon';
import { Circle } from '@alfalab/core-components/icon-view/circle';
import avatar from '../../images/avatar.png';
import logo from '../../images/alfa-logo.svg';

interface HeaderProps {
	error?: string;
}

function Header({ error }: HeaderProps) {
	const [searchValue, setSearchValue] = useState<string>('');

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	// const stylesWrapper = {
	// 	backgroundColor: '#F2F3F5',
	// };

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.logo}>
					<img src={logo} className={styles.logoImage} alt="alfa-logo" />
					<h1 className={styles.logoTitle}>Alfa People</h1>
				</div>
				<nav className={styles.navigation}>
					<a href="#contacts" className={styles.navItem}>
						Контакты
					</a>
					<a href="#info" className={styles.navItem}>
						Информация
					</a>
					<a href="#departments" className={styles.navItem}>
						Подразделения
					</a>
				</nav>
			</div>
			<div className={styles.container}>
				<Input
					colors="default"
					placeholder="Поиск"
					className={styles.input}
					leftAddons={<MagnifierMIcon color="#898889" />}
					error={error}
					value={searchValue}
					onChange={handleSearchChange}
					type="text"
				/>
				<Circle backgroundColor="#F2F3F5" size={40}>
					<BellMIcon fill="#0E0E0E" className={styles.icon} />
				</Circle>
				<img src={avatar} alt="аватар" className={styles.avatar} />
			</div>
		</header>
	);
}

export default Header;
