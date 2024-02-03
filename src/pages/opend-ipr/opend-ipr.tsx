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
import { getFullName, getStatusColor } from '../../shared/utils/constants';

import { Status } from '@alfalab/core-components/status';
import { Button } from '@alfalab/core-components/button';

import {
	getIprByIdByEmployee,
	getIprByIdBySupervisor,
} from '../../store/reducers/iprsSlice';
import { TasksOverview } from '../../entities/tasks-overview/tasks-overview';
import { Tasks } from '../../entities/tasks/tasks';

export const OpendIpr: React.FC = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();

	const { id } = useParams<{ id: string }>();

	const isLoading = useAppSelector((state: RootState) => state.user.isLoading);
	const selectedUser = useAppSelector((state) => state.user.selectedUser);
	const userData = useAppSelector((state) => state.user.user);
	const opendIpr = useAppSelector((state) => state.iprs.iprsData);
	const isLoadingIpr = useAppSelector((state) => state.iprs.isLoading);

	console.log('OPEND IPR', opendIpr);

	const [prevLocation, setPrevLocation] = useState<any | null>(null);
	const [iprStatusName, setIprStatusName] = useState<string>('');
	const [iprStatusId, setIprStatusId] = useState<string>('');

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

	// запрос ИПР, если пришел с юзера или с ментора или рука (другая ручка)

	useEffect(() => {
		let prevLocationData;

		const fetchIprData = async () => {
			//console.log('пришли в запрос на tasks');
			try {
				// Assign the value here
				prevLocationData =
					prevLocation && prevLocation.state
						? prevLocation.state.location
						: null;

				let iprDataResult;

				if (prevLocationData?.pathname === '/service-iprs/my') {
					iprDataResult = await dispatch(
						getIprByIdByEmployee(Number(id)) as any
					);
				} else {
					iprDataResult = await dispatch(
						getIprByIdBySupervisor(Number(id)) as any
					);
				}

				if (iprDataResult.meta.requestStatus === 'fulfilled') {
					console.log('Получили Ипр по id:', iprDataResult.payload);
				} else {
					console.error(
						'Error during fetching IPRS data:',
						iprDataResult.payload
					);
				}
			} catch (error) {
				console.error('Error during fetching user data:', error);
			}
		};

		fetchIprData();
	}, [dispatch, id, prevLocation]);

	useEffect(() => {
		if (opendIpr.length > 0) {
			const iprStatusName = opendIpr[0].status.name;
			const iprStatusId = opendIpr[0].status.id;
			console.log(
				'!!!!!!!!!!!iprStatusName!!!!!!!!!!!!!!!!!!!!!!',
				iprStatusName
			);
			setIprStatusName(iprStatusName);
			setIprStatusId(iprStatusId);
		} else {
			console.log('opendIpr is empty');
		}
	}, [opendIpr]);

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

	const handleDataSubmit = (goalData: any, taskData: any) => {
		// Здесь вы можете отправить оба набора данных на сервер
		console.log('ТАСК ОВЕРВЬЮ Отправка данных на сервер из Tasks:', goalData);
		console.log(
			'ТАСК ОВЕРВЬЮ Отправка данных на сервер из AnotherComponent:',
			taskData
		);
	};

	return isLoading && isLoadingIpr ? (
		<div>Loading...</div>
	) : (
		<div className={styles.generalFooterWrapper}>
			<div className={styles.generalFooterContainer}>
				<div className={styles.container}>
					<NavBarMini />
					<div>
						<div className={styles.titleContainer}>
							<PageTitle title={pageTitle} />
							{/* статус */}
							{iprStatusName ? (
								<Status view="soft" color={getStatusColor(iprStatusId)}>
									{iprStatusName}
								</Status>
							) : (
								<Status view="soft">статус не пришел</Status>
							)}
						</div>
						{/* инфа о пользователе */}
						{(prevLocationData?.pathname === '/service-iprs/myteam' ||
							prevLocationData?.pathname === '/service-iprs/mentor') && (
							<EmployeeInfoCard
								name={fullName}
								position={selectedUser.position.name}
								avatar={selectedUser.imageUrl}
							/>
						)}
						{/* кнопки */}
						{iprStatusName === 'В работе' ? (
							prevLocationData?.pathname === '/service-iprs/my' ? (
								<div className={styles.buttonsWrapper}>
									<Button
										// onClick={toggleVisibility}
										view="secondary"
										size="s"
										className={styles.buttonSave}
									>
										Сохранить
									</Button>
								</div>
							) : (
								<div className={styles.buttonsWrapper}>
									<Button
										// onClick={toggleVisibility}
										view="secondary"
										size="s"
										className={styles.buttonSave}
									>
										Сохранить
									</Button>
									{iprStatusName === 'В работе' ? (
										<Button
											// onClick={onClick}
											view="primary"
											size="s"
											className={styles.buttonSend}
										>
											Подвести итоги
										</Button>
									) : (
										<Button
											view="primary"
											size="s"
											className={styles.buttonSend}
											// onClick={toggleVisibility2}
										>
											Отправить в работу
										</Button>
									)}

									<Button
										view="tertiary"
										size="s"
										className={styles.buttonDelete}
										// onClick={onModalOpen}
									>
										Удалить
									</Button>
									{iprStatusName === 'В работе' ? (
										<div className={styles.btnSaveWrapper}>
											<Button
												// onClick={onModalDiscardOpen}
												view="tertiary"
												size="s"
												className={styles.buttonDiscard}
											>
												Отменить
											</Button>
										</div>
									) : null}
								</div>
							)
						) : null}
						{/* Общее описание */}
						<div className={styles.taskOverviewWrapper}>
							<TasksOverview
								isExecutive={isExecutive}
								iprStatus={iprStatusName}
								handleGoalValuesChange={handleDataSubmit}
							/>
						</div>

						{/* Задачи */}
						<fieldset className={styles.blockWrapper}>
							<legend className={styles.blockTitle}>Задачи</legend>
							<Tasks
								isEmployee={isEmployee}
								handleTaskValuesChange={handleDataSubmit}
							/>
						</fieldset>
					</div>
				</div>
			</div>
			<div className={styles.generalFooter}>
				<FooterMain />
			</div>
		</div>
	);
};
