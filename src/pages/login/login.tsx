import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.scss';
import Header from '../../components/Header/header';
import users from '../../shared/utils/users.js';

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
								<Link to={user.link} className={styles.link} replace>
									Войти
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};
