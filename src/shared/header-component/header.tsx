import styles from './header.module.scss';

import { useState, ChangeEvent, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import { MagnifierMIcon } from '@alfalab/icons-glyph/MagnifierMIcon';
import { Input } from '@alfalab/core-components/input';
import { BellMIcon } from '@alfalab/icons-glyph/BellMIcon';
import { Circle } from '@alfalab/core-components/icon-view/circle';
import { Button } from '@alfalab/core-components/button';
import { MoreMIcon } from '@alfalab/icons-glyph/MoreMIcon';

import { Notifications } from 'entities/notifications/notifications';

import { accessUrl } from '../../shared/utils/urls';
import avatar from '../../images/avatar.png';
import logo from '../../images/alfa-logo.svg';

import { useAppSelector } from '../hooks/redux';

interface HeaderProps {
	error?: string;
}
function Header({ error }: HeaderProps) {
	const userData = useAppSelector((state) => state.user.user);
	//console.log('userData in header: ', userData);

	const [searchValue, setSearchValue] = useState<string>('');

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};

	const navigate = useNavigate();
	let location = useLocation();

	const [logOut, setLogOut] = useState(false);
	const [exitBtnOpen, setExitBtnOpen] = useState(false);

	const [isOpenedNotifications, setIsOpenedNotifications] = useState(false);

	const handleOpen = () => {
		setExitBtnOpen(!exitBtnOpen);
	};

	const openNotifications = () => {
		setIsOpenedNotifications(true);
	};

	useEffect(() => {
		setExitBtnOpen(false);
	}, [location.pathname]);

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.logo}>
					<Link to={accessUrl[3].url}>
						<img src={logo} className={styles.logoImage} alt="alfa-logo" />
					</Link>
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
					size="s"
					colors="default"
					placeholder="Поиск"
					className={styles.input}
					leftAddons={<MagnifierMIcon color="#898889" />}
					error={error}
					value={searchValue}
					onChange={handleSearchChange}
					type="text"
				/>

				{location.pathname === '/' ? (
					''
				) : (
					<div onClick={openNotifications}>
						<Circle backgroundColor="#F2F3F5" size={40}>
							<BellMIcon fill="#0E0E0E" className={styles.icon} />
						</Circle>
					</div>
				)}
				{isOpenedNotifications ? (
					<Notifications
						open={isOpenedNotifications}
						close={() => setIsOpenedNotifications(false)}
					/>
				) : (
					''
				)}
				{location.pathname === '/' ? (
					''
				) : (
					<img
						src={userData.imageUrl ? userData.imageUrl : avatar}
						alt="аватар"
						className={styles.avatar}
					/>
				)}

				{location.pathname === '/' ? (
					''
				) : (
					<button onClick={handleOpen} className={styles.dotsActionBtn}>
						<MoreMIcon className={styles.dotsActionBtn} />
					</button>
				)}
			</div>
			{exitBtnOpen ? (
				<Button
					onClick={() => navigate(accessUrl[2].url)}
					view={'tertiary'}
					size={'xxs'}
					style={{
						position: 'absolute',
						top: '70px',
						right: '0px',
					}}
				>
					Демо-выход
				</Button>
			) : (
				''
			)}
		</header>
	);
}

export default Header;
