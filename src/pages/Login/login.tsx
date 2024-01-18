import React from 'react';
import styles from './login.module.scss';
import Header from '../../components/Header/header';
import { Link, NavLink } from 'react-router-dom';
import { users } from '../../shared/utils/users';

function Login() {
	return (
		<div className={styles.container}>
			<Header></Header>
			<div className={styles.wrapper}>
				<ul className={styles.list}>
					<h3 className={styles.header}>Сотрудник</h3>

					{users.map((user: any, key: any) => {
						return (
							<li className={styles.item} key={user.name}>
								<img src={user.pic} className={styles.img} alt="аватар" />
								<div className={styles.text_wrapper}>
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
}

export default Login;
