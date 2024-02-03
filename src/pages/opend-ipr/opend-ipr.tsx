import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import styles from './opend-ipr.module.scss';

import { FooterMain } from '../../entities/footer-main/footer-main';
import NavBarMini from '../../entities/navbar-mini/navbar-mini';
import Header from '../../shared/header-component/header';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import { PageTitle } from '../../shared/page-title/page-title';
import { getUserById, setSelectedUser } from '../../store/reducers/userSlice';
import { RootState } from '../../store/store';
import { EmployeeInfoCard } from '../../entities/employee-info-card/employee-info-card';
import { getFullName } from '../../shared/utils/constants';

import { Status } from '@alfalab/core-components/status';
import {
	getIprByIdByEmployee,
	getIprByIdBySupervisor,
} from '../../store/reducers/iprsSlice';

export const OpendIpr: React.FC = () => {
	const dispatch = useAppDispatch();
	const { id } = useParams<{ id: string }>();
	const location = useLocation();

	const isLoading = useAppSelector((state: RootState) => state.user.isLoading);
	const selectedUser = useAppSelector((state) => state.user.selectedUser);
	const userData = useAppSelector((state) => state.user.user);
	const IPR = useAppSelector((state) => state.iprs.openedIpr);

	const [prevLocation, setPrevLocation] = useState<any | null>(null);

	// Сохранение предыдущего маршрута при монтировании компонента
	useEffect(() => {
		const storedPrevLocation = localStorage.getItem('prevLocation');
		if (storedPrevLocation) {
			setPrevLocation(JSON.parse(storedPrevLocation));
		}
	}, []);

	// Сохранение текущего маршрута в localStorage при изменении location
	useEffect(() => {
		localStorage.setItem('prevLocation', JSON.stringify(location));
	}, [location]);

	useEffect(() => {
		dispatch(getUserById(Number(id)));
		return () => {
			dispatch(setSelectedUser(null));
		};
	}, [dispatch, id]);

	// запрос ИПР

	useEffect(() => {
		const fetchIprData = async () => {
			console.log('пришли в запрос на tasks');
			try {
				const iprDataResult = await dispatch(
					getIprByIdBySupervisor(Number(id)) as any
				);

				if (getIprByIdBySupervisor.fulfilled.match(iprDataResult)) {
					console.log('Получили Ипр по id:', iprDataResult.payload);
				} else {
					console.error(
						'Error during fetching IPRS data:',
						iprDataResult.error
					);
				}
			} catch (error) {
				console.error('Error during fetching user data:', error);
			}
		};

		fetchIprData();
	}, [dispatch, id, prevLocation]); // Включение prevLocation в зависимости

	// Если данные еще загружаются, показываем заглушку
	if (isLoading) {
		return <p>Loading...</p>;
	}

	// Если не удалось получить данные о пользователе, показываем сообщение об ошибке
	if (!selectedUser) {
		return <p>Невозможно получить данные о пользователе.</p>;
	}

	console.log('SELECTED_USER', selectedUser);
	const fullName = getFullName(selectedUser);

	// Определение заголовка в зависимости от роли пользователя
	let pageTitle = '';

	const isEmployee = userData.isSupervisor === false;
	const isExecutive = userData.isSupervisor === true;
	const isMentor = userData.isMentor === true;

	// Получение объекта location из предыдущего маршрута
	const prevLocationData =
		prevLocation && prevLocation.state ? prevLocation.state.location : null;

	console.log('prevLocation', prevLocationData);

	if (prevLocationData.pathname === '/service-iprs/myteam') {
		pageTitle = 'План развития сотрудника';
	} else if (prevLocationData.pathname === '/service-iprs/mentor') {
		pageTitle = 'Менторство сотрудника';
	} else if (prevLocationData.pathname === '/service-iprs/my') {
		pageTitle = 'Мой план развития';
	}

	console.log('IPR: ', IPR);

	return (
		<div className={styles.generalFooterWrapper}>
			<div className={styles.generalFooterContainer}>
				<Header />
				<div className={styles.container}>
					<NavBarMini />
					<div>
						<div>
							<PageTitle title={pageTitle} />
							<Status view="soft">Черновик</Status>
						</div>
						{(prevLocationData?.pathname === '/service-iprs/myteam' ||
							prevLocationData?.pathname === '/service-iprs/mentor') && (
							<EmployeeInfoCard
								name={fullName}
								position={selectedUser.position.name}
								avatar={selectedUser.imageUrl}
							/>
						)}
					</div>
				</div>
			</div>
			<div className={styles.generalFooter}>
				<FooterMain />
			</div>
		</div>
	);
};
