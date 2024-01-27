import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './login.module.scss';
import Header from '../../shared/header-component/header';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import { Footer } from '../../entities/footer/footer';
import { User } from '../../shared/utils/users';
import { getUserData, logInUser } from '../../store/reducers/userSlice';
import { useAppDispatch } from '../../shared/hooks/redux';

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

			console.log('result', result);

			if (logInUser.rejected.match(result)) {
				console.error('Login rejected:', result.error);
			} else if (logInUser.fulfilled.match(result)) {
				// Проверяем наличие токена в ответе
				if (result.payload && result.payload.access_token) {
					try {
						// Запрос данных пользователя
						const userDataResult = await dispatch(getUserData());

						if (getUserData.fulfilled.match(userDataResult)) {
							// Выводим данные пользователя в консоль
							console.log('User data received:', userDataResult.payload);

							// Переход на роут пользователя
							navigate(userLink);
						} else {
							// Обработка ошибки при получении данных о пользователе
							console.error(
								'Error during fetching user data:',
								userDataResult.error
							);
						}

						console.log('Login successful. Token received.');
					} catch (userDataError) {
						// Обработка ошибки при запросе данных о пользователе
						console.error('Error during fetching user data:', userDataError);
					}
				} else {
					// Токен не получен, или его нет в ответе
					console.error('Token not received during login.');
				}
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
