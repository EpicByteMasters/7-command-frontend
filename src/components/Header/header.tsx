import React from 'react';
import styles from './header.module.scss';
import { MagnifierMIcon } from '@alfalab/icons-glyph/MagnifierMIcon';
import { Input } from '@alfalab/core-components/input';
import { BellMIcon } from '@alfalab/icons-glyph/BellMIcon';
import avatar from '../../images/avatar.png';
import logo from '../../images/alfa-logo.svg';

function Header() {
	return (
		<header className={styles.header}>
			<div className={styles.header__container}>
				<div className={styles.header__logo}>
					<img
						src={logo}
						className={styles.header__logoImage}
						alt="alfa-logo"
					/>
					<h1 className={styles.header__logoTitle}>Alfa People</h1>
				</div>
				<nav className={styles.header__navigation}>
					<a href="#contacts" className={styles.header__navItem}>
						Контакты
					</a>
					<a href="#info" className={styles.header__navItem}>
						Информация
					</a>
					<a href="#departments" className={styles.header__navItem}>
						Подразделения
					</a>
				</nav>
			</div>
			<div className={styles.header__container}>
				<MagnifierMIcon />
				<Input />
				<BellMIcon />
				<img src={avatar} alt="аватар" className={styles.header__avatar} />
			</div>
		</header>
	);
}

export default Header;
