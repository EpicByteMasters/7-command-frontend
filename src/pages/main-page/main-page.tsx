import styles from './main-page.module.scss';
import { useState } from 'react';
import Header from '../../components/Header/header';
import { NavBarMini1 } from '../../entities/navbar-mini-1/navbar-mini1';
import { NavBarMini2 } from '../../entities/navbar-mini-2/navbar-mini2';
import layout from '../../images/alfa-layout.png';
import { Footer } from '../../entities/footer/footer';

export const MainPage = () => {
	const [role, setRole] = useState<boolean>(true);

	return (
		<>
			{role ? <Header /> : <Header />}
			<main className={styles.main}>
				<div className={styles.container}>
					{role ? <NavBarMini1 /> : <NavBarMini2 />}
					<img src={layout} alt="layout" className="img"></img>
				</div>
			</main>
			<Footer></Footer>
		</>
	);
};
