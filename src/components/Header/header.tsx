import { useState, ChangeEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './header.module.scss';
import { MagnifierMIcon } from '@alfalab/icons-glyph/MagnifierMIcon';
import { Input } from '@alfalab/core-components/input';
import { BellMIcon } from '@alfalab/icons-glyph/BellMIcon';
import { Circle } from '@alfalab/core-components/icon-view/circle';
import { ModalDesktop } from '@alfalab/core-components/modal/desktop';
import { Button } from '@alfalab/core-components/button';
import { MoreMIcon } from '@alfalab/icons-glyph/MoreMIcon';

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

	// Modal

	const navigate = useNavigate();
	const [logOut, setLogOut] = useState(false);
	const [exitBtnOpen, setExitBtnOpen] = useState(false);

	const handleOpen = () => {
		setExitBtnOpen(!exitBtnOpen);
	};
	// const [open, setOpen] = useState(false);
	// const handleOpen = () => setOpen(true);
	// const handleClose = () => setOpen(false);
	// const handleLogIn = () => {
	// 	setOpen(false);
	// 	setLogOut(false);
	// };
	// const handleLogOut = () => {
	// 	navigate('/main', { replace: true });
	// 	setOpen(false);
	// 	setLogOut(true);
	// };

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.logo}>
					<Link to="/main">
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
				<Circle backgroundColor="#F2F3F5" size={40}>
					<BellMIcon fill="#0E0E0E" className={styles.icon} />
				</Circle>

				{logOut ? (
					''
				) : (
					<Link to="/">
						<img
							onClick={handleOpen}
							src={avatar}
							alt="аватар"
							className={styles.avatar}
						/>
					</Link>
				)}

				{
					// open ?
					// <ModalDesktop open={open} onClose={handleClose} size={'s'}>
					// 	<ModalDesktop.Header
					// 		hasCloser={true}
					// 		sticky={true}
					// 		title={'Демо-выход'}
					// 	/>
					// 	<ModalDesktop.Content>
					// 		<p>Вы действительно хотите выйти из своего аккаунта?</p>
					// 	</ModalDesktop.Content>
					// 	<ModalDesktop.Footer sticky={true}>
					// 		<ModalDesktop.Controls
					// 			primary={
					// 				<Button view="primary" size="s" onClick={handleLogOut}>
					// 					Да
					// 				</Button>
					// 			}
					// 			secondary={
					// 				<Button view="secondary" size="s" onClick={handleLogIn}>
					// 					Нет
					// 				</Button>
					// 			}
					// 		/>
					// 	</ModalDesktop.Footer>
					// </ModalDesktop>
					// ) : (
					// 	''
					// )
				}
				<button onClick={handleOpen} className={styles.dotsActionBtn}>
					<MoreMIcon className={styles.dotsActionBtn} />
				</button>
			</div>
			{exitBtnOpen ? (
				<Button
					view={'tertiary'}
					size={'xs'}
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
