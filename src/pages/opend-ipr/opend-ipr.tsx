import styles from './opend-ipr.module.scss';
//--------------------------------------------------------------
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
//--------------------------------------------------------------
import { Status } from '@alfalab/core-components/status';
import { Button } from '@alfalab/core-components/button';
//--------------------------------------------------------------
import NavBarMini from '../../entities/navbar-mini/navbar-mini';
import { PageTitle } from '../../shared/page-title/page-title';
import { EmployeeInfoCard } from '../../entities/employee-info-card/employee-info-card';
import { Raiting } from '../../shared/rating/rating';
import { Tasks } from '../../entities/tasks/tasks';
import { FooterMain } from '../../entities/footer-main/footer-main';
//--------------------------------------------------------------
import {
	getManagerIprsList,
	selectManagerList,
} from '../../store/reducers/managerIprSlice';
import {
	getMentorIprsList,
	selectMentorList,
} from '../../store/reducers/mentorIprSlice';
import {
	getIprByIdByEmployee,
	getIprByIdBySupervisor,
} from '../../store/reducers/iprSlice';
import { getFullName, getStatusColor } from '../../shared/utils/constants';
//--------------------------------------------------------------
import { getUserById, setSelectedUser } from '../../store/reducers/userSlice';
import { TasksOverview } from '../../entities/tasks-overview/tasks-overview';
import { EmployeeRatingPicker } from '../employee-rating/employee-rating';

export const OpendIpr: React.FC = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const [pageTitle, setPageTitle] = useState('');

	const { selectedUserId } = location.state;
	const { id } = useParams<{ id: string }>(); //ID IPR
	const userData = useAppSelector((state) => state.user.user);
	const managerIprsList = useAppSelector(selectManagerList);
	const menteeIprList = useAppSelector(selectMentorList);
	const isLoadingIpr = useAppSelector((state) => state.ipr.isLoading);
	const currentIpr = useAppSelector((state) => state.ipr.ipr);
	const selectedUser = useAppSelector((state) => state.user.selectedUser);
	const [isEmployee, setIsEmployee] = useState(false);
	const [isManager, setIsManager] = useState(false);
	const [isMentor, setIsMentor] = useState(false);
	const [isConclusion, setConclusion] = useState(false);

	console.log('USER DATA in OPENED IPR', userData);

	useEffect(() => {
		dispatch(getUserById(selectedUserId));
		return () => {
			dispatch(setSelectedUser(null));
		};
	}, [dispatch, id]);

	//ручка всех ИПР сотрудников рука
	useEffect(() => {
		dispatch(getManagerIprsList());
		dispatch(getMentorIprsList());
	}, [dispatch]);

	console.log('Get menIPR List', managerIprsList?.employees);
	console.log('Get mentee IPR List', menteeIprList?.employees);

	// нашли ИПР из рута в списке ИПР
	const isIprIdFoundInManagerList = managerIprsList?.employees.some(
		(employee) => employee.iprId === Number(id)
	);
	const isIprIdFoundInMenteeList = menteeIprList?.employees.some(
		(employee) => employee.iprId === Number(id)
	);

	console.log('isIprIdFoundInManagerList', isIprIdFoundInManagerList);
	console.log('isIprIdFoundInMenteeListi', isIprIdFoundInMenteeList);

	let myCurrentRole;

	useEffect(() => {
		const fetchIprData = async () => {
			try {
				let iprDataResult;
				let myCurrentRole;

				if (!isIprIdFoundInManagerList && !isIprIdFoundInMenteeList) {
					iprDataResult = await dispatch(
						getIprByIdByEmployee(Number(id)) as any
					);
					myCurrentRole = 'employee';
					setIsEmployee(true);
					console.log('MY CURRENT ROLE', myCurrentRole);
				} else if (isIprIdFoundInManagerList) {
					iprDataResult = await dispatch(
						getIprByIdBySupervisor(Number(id)) as any
					);
					myCurrentRole = 'manager';
					setIsManager(true);
					console.log('MY CURRENT ROLE', myCurrentRole);
				} else if (isIprIdFoundInMenteeList) {
					//TODO ментор с ошибкой 403 с сервера приходит
					iprDataResult = await dispatch(
						getIprByIdBySupervisor(Number(id)) as any
					);
					myCurrentRole = 'mentee';
					setIsMentor(true);
					console.log('MY CURRENT ROLE', myCurrentRole);
				}

				if (iprDataResult.meta.requestStatus === 'fulfilled') {
					console.log('Получили Ипр по id:', iprDataResult.payload);

					switch (myCurrentRole) {
						case 'employee':
							setPageTitle('Мой план развития');
							break;
						case 'manager':
							setPageTitle('План развития сотрудника');
							break;
						case 'mentee':
							setPageTitle('Менторство сотрудника');
							break;
						default:
							setPageTitle('Индивидуальный план развития');
					}
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
	}, [dispatch, isIprIdFoundInManagerList, id]);

	console.log('CURRENT IPR OPEND', currentIpr);

	const handleDataSubmit = (goalData: any, taskData: any) => {
		// Здесь вы можете отправить оба набора данных на сервер
		console.log('ТАСК ОВЕРВЬЮ Отправка данных на сервер из Tasks:', goalData);
		console.log(
			'ТАСК ОВЕРВЬЮ Отправка данных на сервер из AnotherComponent:',
			taskData
		);
	};

	return (
		<div className={styles.generalFooterWrapper}>
			<div className={styles.generalFooterContainer}>
				<div className={styles.container}>
					<NavBarMini />
					<div>
						<div className={styles.titleContainer}>
							{/* Заголовок */}
							<PageTitle title={pageTitle} />
							{/* Статус */}
							{currentIpr?.status ? (
								<Status
									view="soft"
									color={getStatusColor(currentIpr?.status.id)}
								>
									{currentIpr.status.name}
								</Status>
							) : (
								<Status view="soft">статус не пришел</Status>
							)}
						</div>
						{/* инфа о пользователе */}
						{selectedUser ? (
							<div className={styles.employeeInfoCardWrapper}>
								<EmployeeInfoCard
									name={getFullName(selectedUser)}
									position={selectedUser.position.name}
									avatar={selectedUser.imageUrl}
								/>
							</div>
						) : (
							<div>Данные о пользователе не получены</div>
						)}
						{/* если подведение итогов кнопка, то рендерим экран Оценки */}
						{isConclusion ? (
							<EmployeeRatingPicker withBtn />
						) : (
							<div className={styles.owerviewWrapper}>
								{/* кнопки */}
								{isEmployee && currentIpr?.status.name === 'В работе' ? (
									<div className={styles.buttonsWrapper}>
										<Button
											view="secondary"
											size="s"
											className={styles.buttonSave}
										>
											Сохранить
										</Button>
									</div>
								) : isManager && currentIpr?.status.name === 'В работе' ? (
									<div className={styles.buttonsWrapper}>
										<Button
											view="secondary"
											size="s"
											className={styles.buttonSave}
										>
											Сохранить
										</Button>
										<Button
											view="secondary"
											size="s"
											className={styles.buttonSave}
										>
											Подвести итоги
										</Button>
									</div>
								) : isManager && currentIpr?.status.name === 'Черновик' ? (
									<div className={styles.buttonsWrapper}>
										<Button
											view="secondary"
											size="s"
											className={styles.buttonSave}
										>
											Сохранить
										</Button>
										<Button
											view="secondary"
											size="s"
											className={styles.buttonSave}
										>
											Отправить в работу
										</Button>
										<Button
											view="secondary"
											size="s"
											className={styles.buttonDelete}
										>
											Удалить
										</Button>
									</div>
								) : isMentor && currentIpr?.status.name === 'В работе' ? (
									<div className={styles.buttonsWrapper}>
										<Button
											view="secondary"
											size="s"
											className={styles.buttonSave}
											// onClick={
											// 	() => handleDataSubmit()
											// }
										>
											Сохранить
										</Button>
										<Button
											view="secondary"
											size="s"
											className={styles.buttonSend}
										>
											Отправить в работу
										</Button>
										<Button
											view="secondary"
											size="s"
											className={styles.buttonDiscard}
										>
											Отменить
										</Button>
									</div>
								) : null}
								{/* Оценка для работника с выполненным ИПР*/}
								{isEmployee && currentIpr?.status.name === 'Выполнен' ? (
									<Raiting title="Оценка от руководителя" isDisabled />
								) : isManager && currentIpr?.status.name === 'Выполнен' ? (
									<Raiting title="Оценка выполнения" isDisabled />
								) : (
									<></>
								)}
								{/* Общее описание //TODO этот падает */}
								<div className={styles.taskOverviewWrapper}>
									{currentIpr ? (
										<TasksOverview
											isExecutive={isManager}
											iprStatus={currentIpr?.status.id}
											handleGoalValuesChange={handleDataSubmit}
										/>
									) : (
										<></>
									)}
								</div>
								{/* Задачи //TODO на находит какой то id */}
								<div className={styles.tasksWrapper}>
									<Tasks
										isEmployee={isEmployee}
										handleTaskValuesChange={handleDataSubmit}
									/>
								</div>
							</div>
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
