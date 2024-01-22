import React, { FC } from 'react';
import styles from './login.module.scss';
import Header from '../../components/Header/header';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import { Footer } from '../../entities/footer/footer';

interface User {
	pic: string;
	userName: string;
	position: string;
	link: string;
}

interface LoginProps {
	users: User[];
}

export const Login: FC<LoginProps> = ({ users }) => {
	return (
		<>
			<main className={styles.page}>
				<div className={styles.container}>
					<Header></Header>
					<div className={styles.wrapper}>
						<ul className={styles.list}>
							<h3 className={styles.header}>Сотрудник</h3>

							{users.map((user: User, key: number) => {
								return (
									<li className={styles.item} key={user.userName}>
										<img src={user.pic} className={styles.img} alt="аватар" />
										<div className={styles.textWrapper}>
											<h3 className={styles.title}>{user.userName}</h3>
											<p className={styles.paragraph}>{user.position}</p>
										</div>

										<div className={styles.link}>
											<ButtonDesktop
												view="tertiary"
												shape="rectangular"
												size="xxs"
												href={user.link}
											>
												Вход
											</ButtonDesktop>
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</main>
			<Footer></Footer>
		</>
	);
};
