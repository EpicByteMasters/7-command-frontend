import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.scss';
import Header from '../../shared/header-component/header';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import { User } from '../../shared/utils/users';
import { getUserData, logInUser } from '../../store/reducers/userSlice';
import { useAppDispatch } from '../../shared/hooks/redux';
import { getIPRSData } from '../../store/reducers/iprsSlice';
import { Page404 } from '../page404/page404';
import { FooterMain } from '../../entities/footer-main/footer-main';

interface LoginProps {
	users: User[];
}

export const Login: FC<LoginProps> = ({ users }) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogin = async (email: string, password: string) => {
		try {
			const loginAction = logInUser({ email, password });
			const loginResult = await dispatch(loginAction);

			console.log('result', loginResult);

			if (logInUser.rejected.match(loginResult)) {
				console.error('Login rejected:', loginResult.error);
			} else if (logInUser.fulfilled.match(loginResult)) {
				if (loginResult.payload && loginResult.payload.access_token) {
					try {
						const userDataResult = await dispatch(getUserData());

						if (getUserData.fulfilled.match(userDataResult)) {
							console.log('User data received:', userDataResult.payload);
							// добываем ИПРы
							const iprsDataResult = await dispatch(getIPRSData());

							if (getIPRSData.fulfilled.match(iprsDataResult)) {
								console.log('IPRS data received:', iprsDataResult.payload);
							} else {
								console.error(
									'Error during fetching IPRS data:',
									iprsDataResult.error
								);
								navigate('/404', { replace: true });
							}
							navigate('/main', { replace: true });
							console.log('Login successful. Token and data received.');
						} else {
							console.error(
								'Error during fetching user data:',
								userDataResult.error
							);
							navigate('/404', { replace: true });
						}
					} catch (userDataError) {
						console.error('Error during fetching user data:', userDataError);
						navigate('/505', { replace: true });
					}
				} else {
					console.error('Token not received during login.');
					navigate('/207', { replace: true });
				}
			} else {
				console.error('Unexpected result during login:', loginResult);
				navigate('/207', { replace: true });
			}
		} catch (error) {
			console.error('Error during login:', error);
			navigate('/207', { replace: true });
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
												onClick={() => handleLogin(user.email, user.password)}
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
			<FooterMain></FooterMain>
		</>
	);
};
