import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import styles from './employees-list.module.scss';

import { Button } from '@alfalab/core-components/button';
import { CircularProgressBar } from '@alfalab/core-components/circular-progress-bar';
import { Status } from '@alfalab/core-components/status';
import { Space } from '@alfalab/core-components/space';
import { Typography } from '@alfalab/core-components/typography';
import { Table } from '@alfalab/core-components/table';
import { ListDefaultSIcon } from '@alfalab/icons-glyph/ListDefaultSIcon';
import { MoreMIcon } from '@alfalab/icons-glyph/MoreMIcon';

import { Modal } from '../modal/modal';
import { Employee } from '../../store/reducers/managerIprSlice';
import {
	formatDateString,
	getStatusColor,
	getValueById,
} from '../../shared/utils/constants';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux';
import {
	selectCommonLibsIPRGoals,
	selectCommonLibsIPRStatus,
	selectCommonLibsPositions,
} from '../../store/reducers/libSlice';
import {
	createIPR,
	getIprByIdBySupervisor,
} from '../../store/reducers/iprsSlice';
import { TIprStatusType } from '../../shared/utils/types';
import avatar from '../../images/avatars/avatar_mentor1.png';
import { useDispatch } from 'react-redux';

export interface IEmployeesListProps {
	data: Employee[] | undefined;
	status: string;
	goal: string;
}

export const EmployeesList: React.FC<IEmployeesListProps> = ({
	data,
	status,
	goal,
}) => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const draft = useAppSelector((state) => state.iprs.openedIpr);

	const fetchDataCreateDraft = async (userId: number) => {
		try {
			const resultAction = await dispatch(
				createIPR({ employeeId: userId }) as any
			);

			if (createIPR.fulfilled.match(resultAction)) {
				return resultAction.payload;
				// const iprId = resultAction.payload.id;

				// navigate(`/service-iprs/ipr/${iprId}`);
			} else if (createIPR.rejected.match(resultAction)) {
				console.error('Не удалось создать IPR:', resultAction.error.message);
			}
		} catch (error) {
			console.error('Ошибка при создании IPR:', error);
		}
	};

	const location = useLocation();

	console.log('EmployeeList DATA', data);
	console.log('EmployeeList DATA', goal);
	console.log('EmployeeList DATA', status);

	const positionsLib = useAppSelector(selectCommonLibsPositions);
	const iprGoalsLib = useAppSelector(selectCommonLibsIPRGoals);
	const iprStatusLib = useAppSelector(selectCommonLibsIPRStatus);

	const userData = useAppSelector((state) => state.user.user);
	const userId = userData.id;

	const isEmployee = userData.isSupervisor === false;
	const isExecutive = userData.isSupervisor === true;

	const [modalCreate, setModalCreate] = useState(false);

	//sorting
	const [sortColumn, setSortColumn] = useState<string | null>(null);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

	const handleSort = (column: string) => {
		if (sortColumn === column) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortColumn(column);
			setSortOrder('asc');
		}
	};

	const getStatusSortOrder = (status: TIprStatusType): string => {
		const order = {
			DRAFT: '0',
			IN_PROGRESS: '1',
			COMPLETED: '2',
			NOT_COMPLETED: '3',
			CANCELED: '4',
			NO_IPR: '5',
		};

		return order[status] || '6';
	};

	// Filtered data
	const [filteredData, setFilteredData] = useState<Employee[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			if (data && data.length > 0) {
				let filteredResult = data;

				// Фильтрация по цели
				if (goal) {
					filteredResult = filteredResult.filter((item) => item.goal === goal);
				}

				// Фильтрация по статусу
				if (status) {
					filteredResult = filteredResult.filter(
						(item) => item.status === status
					);
				}

				setFilteredData(filteredResult);
				setLoading(false);
			}
		};

		// Запускаем функцию получения данных
		fetchData();
	}, [data, goal, status]);

	console.log('filteredData', filteredData);

	// Sorted and filtered data
	const sortedAndFilteredData = useMemo(() => {
		if (!filteredData) return [];

		return [...filteredData].sort((a, b) => {
			if (sortColumn === 'name') {
				const fullNameA = `${a.lastName} ${a.firstName} ${a.middleName}`;
				const fullNameB = `${b.lastName} ${b.firstName} ${b.middleName}`;

				return sortOrder === 'asc'
					? fullNameA.localeCompare(fullNameB)
					: fullNameB.localeCompare(fullNameA);
			} else if (sortColumn === 'date') {
				const getDateValue = (dateString: string | undefined) => {
					if (!dateString) {
						return sortOrder === 'asc' ? Infinity : -Infinity;
					}

					const [day, month, year] = dateString.split('.');
					return new Date(`${year}-${month}-${day}`).getTime();
				};

				const dateA = getDateValue(a.date_of_end);
				const dateB = getDateValue(b.date_of_end);

				return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
			} else if (sortColumn === 'status') {
				const statusA = a.status as TIprStatusType;
				const statusB = b.status as TIprStatusType;

				const statusOrderA = getStatusSortOrder(statusA);
				const statusOrderB = getStatusSortOrder(statusB);

				return sortOrder === 'asc'
					? statusOrderA.localeCompare(statusOrderB)
					: statusOrderB.localeCompare(statusOrderA);
			}

			return 0;
		});
	}, [filteredData, sortColumn, sortOrder]);

	const onClickToCreateDraft = async (id: any) => {
		setModalCreate(!modalCreate);
		const createdDraft = await fetchDataCreateDraft(id);
		console.log('createdDraft: ', createdDraft);
		navigate(`/service-iprs/ipr/${createdDraft.id}`, { replace: true });
		console.log('draft: ', draft);
	};

	const handleOpenButtonClick = (id: number) => {
		try {
			navigate(`/test/${id}`, { state: { location } });
		} catch (error) {
			console.error('Error during navigating:', error);
		}
	};

	//pagination
	const [page, setPage] = useState<number>(0);

	const perPage = 5; // Фиксированное количество строк на странице
	const handlePageChange = (pageIndex: number) => setPage(pageIndex);
	const pagesCount = Math.ceil(sortedAndFilteredData.length / perPage);
	const currentPageData = sortedAndFilteredData.slice(
		page * perPage,
		(page + 1) * perPage
	);

	//Popover
	const [activeRowIndex, setActiveRowIndex] = useState<number | null>(null);
	const popoverRef = useRef<HTMLDivElement>(null);

	const handleMoreButtonClick = (rowIndex: number) => {
		setActiveRowIndex(rowIndex === activeRowIndex ? null : rowIndex);
	};

	useEffect(() => {
		const handleMouseDown = (event: MouseEvent) => {
			if (
				popoverRef.current &&
				!popoverRef.current.contains(event.target as Node)
			) {
				setActiveRowIndex(null);
			}
		};

		document.addEventListener('mousedown', handleMouseDown);

		return () => {
			document.removeEventListener('mousedown', handleMouseDown);
		};
	}, [popoverRef, setActiveRowIndex]);

	return (
		<>
			<Table
				className={styles.table}
				wrapper={false}
				pagination={
					<Table.Pagination
						perPage={perPage}
						currentPageIndex={page}
						pagesCount={pagesCount}
						onPageChange={handlePageChange}
						hidePerPageSelect={true}
					/>
				}
			>
				<Table.THead>
					<Table.THeadCell>
						<div className={styles.sortBtn}>
							<span>Сотрудник</span>
							<ListDefaultSIcon
								className={styles.sortIcon}
								onClick={() => handleSort('name')}
							/>
						</div>
					</Table.THeadCell>
					<Table.THeadCell>Цель</Table.THeadCell>
					<Table.THeadCell>
						<div className={styles.sortBtn}>
							<span>Дата</span>
							<ListDefaultSIcon
								className={styles.sortIcon}
								onClick={() => handleSort('date')}
							/>
						</div>
					</Table.THeadCell>
					<Table.THeadCell>Прогресс</Table.THeadCell>
					<Table.THeadCell>
						<div className={styles.sortBtn}>
							<span>Статус</span>
							<ListDefaultSIcon
								className={styles.sortIcon}
								onClick={() => handleSort('status')}
							/>
						</div>
					</Table.THeadCell>
					<Table.THeadCell title="Пустая"></Table.THeadCell>
					<Table.THeadCell title="Пустая"></Table.THeadCell>
				</Table.THead>
				<Table.TBody>
					{currentPageData && currentPageData.length > 0 ? (
						currentPageData.map(
							(
								{
									id,
									firstName,
									lastName,
									middleName,
									position_id,
									specialty_id,
									imageUrl,
									goal,
									date_of_end,
									progress,
									task_completed,
									task_count,
									status,
								},
								rowIndex
							) => {
								const progressPercent = (task_completed / task_count) * 100;
								const color = getStatusColor(status);
								//TODO вставить в верстку аватарку
								return (
									<Table.TRow key={id}>
										<Table.TCell>
											<Space size={2} align={'start'}>
												<div
													className={styles.tCell}
													style={{
														display: 'flex',
														flexDirection: 'row',
														alignItems: 'center',
													}}
												>
													<img
														src={avatar}
														style={{
															width: '40px',
															height: '40px',
														}}
														alt="аватар"
													></img>
													<div style={{ marginLeft: '10px', width: '250px' }}>
														<Typography.Text view="primary-small" tag="div">
															{`${lastName} ${firstName} ${middleName}`}
														</Typography.Text>
														<Typography.Text
															view="primary-small"
															color="secondary"
														>
															{getValueById(position_id, positionsLib)}
														</Typography.Text>
													</div>
												</div>
											</Space>
										</Table.TCell>
										<Table.TCell>
											<div className={styles.tCell}>
												{goal ? getValueById(goal, iprGoalsLib) : '—'}
											</div>
										</Table.TCell>
										<Table.TCell>
											<div
												className={styles.tCell}
												style={{ textAlign: 'center' }}
											>
												{date_of_end ? formatDateString(date_of_end) : '—'}
											</div>
										</Table.TCell>
										<Table.TCell>
											{progress ? (
												<CircularProgressBar
													value={progressPercent}
													title={`${task_completed}/${task_count}`}
													size="s"
													contentColor="primary"
													className={styles.progressBar}
												/>
											) : (
												<div
													style={{ textAlign: 'center' }}
													className={styles.tCell}
												>
													—
												</div>
											)}
										</Table.TCell>
										<Table.TCell>
											<div className={styles.tCell}>
												<Status view="soft" color={color}>
													{getValueById(status, iprStatusLib)}
												</Status>
											</div>
										</Table.TCell>
										<Table.TCell>
											<div className={styles.tBtn}>
												{status === 'NO_IPR' ? (
													<Button
														view="tertiary"
														size="xxs"
														onClick={() => onClickToCreateDraft(id)}
													>
														Создать
													</Button>
												) : (
													<Button
														view="tertiary"
														size="xxs"
														onClick={() => handleOpenButtonClick(id)}
													>
														Открыть
													</Button>
												)}
											</div>
										</Table.TCell>
										<Table.TCell>
											<div className={styles.tBtnDot}>
												<Button
													view="ghost"
													onClick={() => handleMoreButtonClick(rowIndex)}
												>
													<MoreMIcon style={{ fill: '#898889' }} />
												</Button>
											</div>
											{activeRowIndex === rowIndex && (
												<div
													className={styles.popoverContainer}
													ref={popoverRef}
												>
													<div className={styles.popoverButtons}>
														<Button
															className={styles.btnText}
															view="ghost"
															size="s"
															onClick={() => console.log('del')}
														>
															Удалить
														</Button>
														<Button
															className={styles.btnText}
															view="ghost"
															size="s"
															onClick={() => {
																navigate(`/service-iprs/myteam/history/${id}`); //TODO перейти на историю конкретного сотрудника
															}}
														>
															История
														</Button>
													</div>
												</div>
											)}
										</Table.TCell>
									</Table.TRow>
								);
							}
						)
					) : (
						<Table.TRow>
							<Table.TCell>Нет данных для отображения</Table.TCell>
						</Table.TRow>
					)}
				</Table.TBody>
			</Table>
			{modalCreate ? (
				<Modal
					title="Создать новый план развития"
					paragraph={'Вы можете создать черновик и вернуться к нему позже'}
					button1={'Создать'}
					button2={'Отмена'}
				></Modal>
			) : (
				''
			)}
		</>
	);
};

// export const EmployeesList: React.FC<IEmployeesListProps> = ({
// 	data,
// 	goal,
// 	status,
// }) => {
// 	const [popoverVisible, setPopoverVisible] = useState(false);
// 	const [selectedEmployee, setSelectedEmployee] =
// 		useState<EmployeeGoalPlan | null>(null);
// 	const buttonRef = useRef<HTMLButtonElement | null>(null);
// 	const popoverRef = useRef<HTMLDivElement | null>(null);
// 	const [sortColumn, setSortColumn] = useState<string | null>(null);
// 	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
// 	const [page, setPage] = useState<number>(0);
// 	const navigate = useNavigate();
// 	const location = useLocation();

// 	// 	popover
// 	const [modalDelete, setModalDelete] = useState(false);
// 	const [modalCreate, setModalCreate] = useState(false);
// 	const handleMoreIconClick = (employee: EmployeeGoalPlan) => {
// 		setPopoverVisible(true);
// 		setSelectedEmployee(employee);
// 	};

// 	const closePopover = () => {
// 		setPopoverVisible(false);
// 		setSelectedEmployee(null);
// 	};

// 	const handleDeleteClick = () => {
// 		if (selectedEmployee) {
// 			// Определяем индекс выбранного сотрудника в массиве данных
// 			const index = data.findIndex((item) => item.id === selectedEmployee.id);

// 			if (index !== -1) {
// 				// Выводим информацию в консоль
// 				console.log('Deleting employee:', selectedEmployee);
// 			}

// 			// Закрываем Popover
// 			closePopover();
// 		}
// 	};

// 	const onClickToIpr = () => {
// 		navigate(`/service-iprs/ipr/3`, { replace: true });
// 	};
// 	const onClickToDraft = () => {
// 		setModalCreate(true);
// 		// navigate(`/service-iprs/ipr/${ipr_id2}`, { replace: true });
// 	};

// 	return (
// 		<>
// 			<Table
// 				className={styles.table}
// 				wrapper={false}
// 				pagination={
// 					<Table.Pagination
// 						perPage={perPage}
// 						currentPageIndex={page}
// 						pagesCount={pagesCount}
// 						onPageChange={handlePageChange}
// 						hidePerPageSelect={true}
// 					/>
// 				}
// 			>
// 				<Table.THead>
// 					<Table.THeadCell>
// 						<div className={styles.sortBtn}>
// 							<span>Сотрудник</span>
// 							<ListDefaultSIcon
// 								className={styles.sortIcon}
// 								onClick={() => handleSort('name')}
// 							/>
// 						</div>
// 					</Table.THeadCell>
// 					<Table.THeadCell>Цель</Table.THeadCell>
// 					<Table.THeadCell>
// 						<div className={styles.sortBtn}>
// 							<span>Дата</span>
// 							<ListDefaultSIcon
// 								className={styles.sortIcon}
// 								onClick={() => handleSort('date')}
// 							/>
// 						</div>
// 					</Table.THeadCell>
// 					<Table.THeadCell>Прогресс</Table.THeadCell>
// 					<Table.THeadCell>
// 						<div className={styles.sortBtn}>
// 							<span>Статус</span>
// 							<ListDefaultSIcon
// 								className={styles.sortIcon}
// 								onClick={() => handleSort('status')}
// 							/>
// 						</div>
// 					</Table.THeadCell>
// 					<Table.THeadCell title="Пустая"></Table.THeadCell>
// 					<Table.THeadCell title="Пустая"></Table.THeadCell>
// 				</Table.THead>
// 				<Table.TBody>
// 					{!goal && !status
// 						? currentPageData.map(
// 								({
// 									id,
// 									name,
// 									position,
// 									goal,
// 									date,
// 									progress,
// 									taskAll,
// 									taskDone,
// 									status,
// 								}) => {
// 									const progressPercentage = `${progress}%`;
// 									const color = getStatusColor(status);

// 									return (
// 										<Table.TRow key={id}>
// 											<Table.TCell>
// 												<Space size={2} align={'start'}>
// 													<Typography.Text view="primary-small" tag="div">
// 														{name}
// 													</Typography.Text>
// 													<Typography.Text
// 														view="primary-small"
// 														color="secondary"
// 													>
// 														{position}
// 													</Typography.Text>
// 												</Space>
// 											</Table.TCell>
// 											<Table.TCell>{goal}</Table.TCell>
// 											<Table.TCell>{date}</Table.TCell>
// 											<Table.TCell>
// 												<CircularProgressBar
// 													value={progress}
// 													title={`${taskDone}/${taskAll}`}
// 													size="s"
// 													contentColor="primary"
// 													className={styles.progressBar}
// 												/>
// 											</Table.TCell>
// 											<Table.TCell>
// 												<Status view="soft" color={color}>
// 													{status}
// 												</Status>
// 											</Table.TCell>
// 											<Table.TCell>
// 												{status ===
// 												('отсутствует' ||
// 													'в работе' ||
// 													'выполнен' ||
// 													'не выполнен' ||
// 													'отменен') ? (
// 													<Button
// 														view="tertiary"
// 														size="xxs"
// 														onClick={onClickToDraft}
// 													>
// 														Создать
// 													</Button>
// 												) : (
// 													<Button
// 														view="tertiary"
// 														size="xxs"
// 														onClick={onClickToIpr}
// 													>
// 														Открыть
// 													</Button>
// 												)}
// 											</Table.TCell>
// 											<Table.TCell>
// 												<Button
// 													view="ghost"
// 													ref={buttonRef}
// 													onClick={() =>
// 														handleMoreIconClick({
// 															id,
// 															name,
// 															position,
// 															goal,
// 															date,
// 															progress,
// 															taskAll,
// 															taskDone,
// 															status,
// 														})
// 													}
// 												>
// 													<MoreMIcon style={{ fill: '#898889' }} />
// 												</Button>
// 											</Table.TCell>
// 										</Table.TRow>
// 									);
// 								}
// 							)
// 						: ''}
// 					{goal
// 						? resultGoal.map(
// 								({
// 									id,
// 									name,
// 									position,
// 									goal,
// 									date,
// 									progress,
// 									taskAll,
// 									taskDone,
// 									status,
// 								}) => {
// 									const progressPercentage = `${progress}%`;
// 									const color = getStatusColor(status);

// 									return (
// 										<Table.TRow key={id}>
// 											<Table.TCell>
// 												<Space size={2} align={'start'}>
// 													<Typography.Text view="primary-small" tag="div">
// 														{name}
// 													</Typography.Text>
// 													<Typography.Text
// 														view="primary-small"
// 														color="secondary"
// 													>
// 														{position}
// 													</Typography.Text>
// 												</Space>
// 											</Table.TCell>
// 											<Table.TCell>{goal}</Table.TCell>
// 											<Table.TCell>{date}</Table.TCell>
// 											<Table.TCell>
// 												<CircularProgressBar
// 													value={progress}
// 													title={`${taskDone}/${taskAll}`}
// 													size="s"
// 													contentColor="primary"
// 													className={styles.progressBar}
// 												/>
// 											</Table.TCell>
// 											<Table.TCell>
// 												<Status view="soft" color={color}>
// 													{status}
// 												</Status>
// 											</Table.TCell>
// 											<Table.TCell>
// 												{status ===
// 												('отсутствует' ||
// 													'в работе' ||
// 													'выполнен' ||
// 													'не выполнен' ||
// 													'отменен') ? (
// 													<Button
// 														view="tertiary"
// 														size="xxs"
// 														onClick={onClickToDraft}
// 													>
// 														Создать
// 													</Button>
// 												) : (
// 													<Button
// 														view="tertiary"
// 														size="xxs"
// 														onClick={onClickToIpr}
// 													>
// 														Открыть
// 													</Button>
// 												)}
// 											</Table.TCell>
// 											<Table.TCell>
// 												<Button
// 													view="ghost"
// 													ref={buttonRef}
// 													onClick={() =>
// 														handleMoreIconClick({
// 															id,
// 															name,
// 															position,
// 															goal,
// 															date,
// 															progress,
// 															taskAll,
// 															taskDone,
// 															status,
// 														})
// 													}
// 												>
// 													<MoreMIcon style={{ fill: '#898889' }} />
// 												</Button>
// 											</Table.TCell>
// 										</Table.TRow>
// 									);
// 								}
// 							)
// 						: ''}

// 					{status
// 						? resultStatus.map(
// 								({
// 									id,
// 									name,
// 									position,
// 									goal,
// 									date,
// 									progress,
// 									taskAll,
// 									taskDone,
// 									status,
// 								}) => {
// 									const progressPercentage = `${progress}%`;
// 									const color = getStatusColor(status);

// 									return (
// 										<Table.TRow key={id}>
// 											<Table.TCell>
// 												<Space size={2} align={'start'}>
// 													<Typography.Text view="primary-small" tag="div">
// 														{name}
// 													</Typography.Text>
// 													<Typography.Text
// 														view="primary-small"
// 														color="secondary"
// 													>
// 														{position}
// 													</Typography.Text>
// 												</Space>
// 											</Table.TCell>
// 											<Table.TCell>{goal}</Table.TCell>
// 											<Table.TCell>{date}</Table.TCell>
// 											<Table.TCell>
// 												<CircularProgressBar
// 													value={progress}
// 													title={`${taskDone}/${taskAll}`}
// 													size="s"
// 													contentColor="primary"
// 													className={styles.progressBar}
// 												/>
// 											</Table.TCell>
// 											<Table.TCell>
// 												<Status view="soft" color={color}>
// 													{status}
// 												</Status>
// 											</Table.TCell>
// 											<Table.TCell>
// 												{status ===
// 												('отсутствует' ||
// 													'в работе' ||
// 													'выполнен' ||
// 													'не выполнен' ||
// 													'отменен') ? (
// 													<Button
// 														view="tertiary"
// 														size="xxs"
// 														onClick={onClickToDraft}
// 													>
// 														Создать
// 													</Button>
// 												) : (
// 													<Button
// 														view="tertiary"
// 														size="xxs"
// 														onClick={onClickToIpr}
// 													>
// 														Открыть
// 													</Button>
// 												)}
// 											</Table.TCell>
// 											<Table.TCell>
// 												<Button
// 													view="ghost"
// 													ref={buttonRef}
// 													onClick={() =>
// 														handleMoreIconClick({
// 															id,
// 															name,
// 															position,
// 															goal,
// 															date,
// 															progress,
// 															taskAll,
// 															taskDone,
// 															status,
// 														})
// 													}
// 												>
// 													<MoreMIcon style={{ fill: '#898889' }} />
// 												</Button>
// 											</Table.TCell>
// 										</Table.TRow>
// 									);
// 								}
// 							)
// 						: ''}
// 				</Table.TBody>
// 			</Table>

// 			<Popover
// 				anchorElement={buttonRef.current}
// 				open={popoverVisible}
// 				position="bottom"
// 				className={styles.container}
// 			>
// 				<div className={styles.btnWrapper}>
// 					<Button
// 						className={styles.btnText}
// 						view="ghost"
// 						size="s"
// 						onClick={() => {
// 							handleDeleteClick();
// 							setModalDelete(!modalDelete);
// 						}}
// 					>
// 						Удалить
// 					</Button>

// 					<Button
// 						className={styles.btnText}
// 						view="ghost"
// 						size="s"
// 						onClick={() => {
// 							navigate('/service-iprs/myteam/history', { replace: true });
// 							closePopover();
// 							console.log('History clicked');
// 						}}
// 					>
// 						История
// 					</Button>
// 				</div>
// 			</Popover>
// 			{modalDelete ? (
// 				<Modal
// 					title="Удаление плана развития"
// 					paragraph={'Вы действительно хотите удалить план развития?'}
// 					button1={'Удалить'}
// 					button2={'Отмена'}
// 				></Modal>
// 			) : (
// 				''
// 			)}
// 			{modalCreate ? (
// 				<Modal
// 					title="Создать новый план развития"
// 					paragraph={'Вы можете создать черновик и вернуться к нему позже'}
// 					button1={'Создать'}
// 					button2={'Отмена'}
// 				></Modal>
// 			) : (
// 				''
// 			)}
// 		</>
// 	);
// };
