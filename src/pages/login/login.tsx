import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.scss';
import Header from '../../components/Header/header';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';

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
			<main>
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
			<footer
				style={{
					display: 'flex',
					flexDirection: 'row',
					gap: '10px',
					margin: '0 auto',
					justifyContent: 'center',
				}}
			>
				<Link className={styles.paragraph} to="/head">
					Выход
				</Link>
				<Link className={styles.paragraph} to="/myteam/iprs">
					Список сотрудников для руководителя
				</Link>
				<Link className={styles.paragraph} to="/myteam/iprs/ipr/1">
					Создание черновика
				</Link>
				<Link className={styles.paragraph} to="/myteam/iprs/history/1">
					История ИПР от лица руководителя
				</Link>
				<Link className={styles.paragraph} to="/iprs">
					История ИПРов от лица сотрудника
				</Link>
			</footer>
		</>
	);
};
