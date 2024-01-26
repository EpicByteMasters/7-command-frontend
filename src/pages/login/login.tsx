import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './login.module.scss';
import Header from '../../shared/header-component/header';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import { Footer } from '../../entities/footer/footer';
import { User } from '../../shared/utils/users';
import { logInUser } from '../../store/reducers/userSlice';
import { useDispatch } from 'react-redux';
import { useAppDispatch } from '../../shared/hooks/redux';
import { unstable_HistoryRouter } from 'react-router-dom';

interface LoginProps {
	users: User[];
}

export const Login: FC<LoginProps> = ({ users }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogin = async (
		email: string,
		password: string,
		userLink: string
	) => {
		try {
			const action = logInUser({ email, password });

			const result = await dispatch(action);

			if (logInUser.rejected.match(result)) {
				console.error('Login rejected:', result.error); // Выводим информацию об ошибке в консоль
			} else if (logInUser.fulfilled.match(result) && result.payload) {
				const auth_token = result.payload.auth_token;
				console.log('Login successful. Token:', auth_token);

				navigate(userLink); // Переход на роут пользователя
			} else {
				console.error('Unexpected result during login:', result);
			}
		} catch (error) {
			console.error('Error during login:', error);
		}
	};

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
									<li className={styles.item} key={user.id}>
										<img src={user.pic} className={styles.img} alt="аватар" />
										<div className={styles.textWrapper}>
											<h3 className={styles.title}>{user.name}</h3>
											<p className={styles.paragraph}>{user.position}</p>
										</div>

										<div className={styles.link}>
											<ButtonDesktop
												view="tertiary"
												shape="rectangular"
												size="xxs"
												href={JSON.stringify(user.link).replace(
													/[\s.,""%]/g,
													''
												)}
												onClick={() =>
													handleLogin(
														user.email,
														user.password,
														JSON.stringify(user.link).replace(/[\s.,""%]/g, '')
													)
												}
												name={user.role}
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
