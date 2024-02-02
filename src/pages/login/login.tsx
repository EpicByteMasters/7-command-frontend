import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.scss';
import Header from '../../shared/header-component/header';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import { User } from '../../shared/utils/users';
import { getUserData, logInUser } from '../../store/reducers/userSlice';
import { useAppDispatch } from '../../shared/hooks/redux';
import { getIPRSData } from '../../store/reducers/iprsSlice';
import { FooterMain } from '../../entities/footer-main/footer-main';
import { PickerButtonDesktop } from '@alfalab/core-components/picker-button/desktop';

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

	const pickerOptions = React.useMemo(
		() => [
			{ key: '1', content: 'В работе' },
			{ key: '3', content: 'Выполнена' },
			{ key: '4', content: 'Не выполнена' },
		],
		[]
	);

	// const [selectedOption, setSelectedOption] = useState(''); // Состояние выбранной опции

	// const handleSelectChange = (event: any) => {
	// 	setSelectedOption(event.target.value);
	// 	console.log(selectedOption); // Обновляем состояние выбранной опции
	// };

	return (
		<div className={styles.generalFooterWrapper}>
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
			{/* <div>
				<select
					value={selectedOption}
					onChange={handleSelectChange}
					style={{
						display: 'flex',
						height: '35px',
						width: '130px',
						backgroundColor: 'black',
						color: 'white',
						borderRadius: '6px',
						padding: '0 6px',
						margin: '5px;',
						font: 'Inter',
						fontSize: '14px',
						fontWeight: '500',
						lineHeight: '20px',
						letterSpacing: '0em',
						textAlign: 'left',
						border: '9px solid black',
					}}
				>
					<option
						style={{
							font: 'Inter',
							fontWeight: '400',
							fontSize: '20px',
							backgroundColor: 'white',
						}}
						value="В работе"
					>
						В работе
					</option>
					<option value="Отклонен">Выполнена</option>
					<option value="Сохранен">Отменена</option>
				</select>
			</div> */}
			<div className={styles.generalFooter}>
				<FooterMain></FooterMain>
			</div>
		</div>
	);
};
