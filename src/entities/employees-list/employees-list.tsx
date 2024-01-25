import React, { useState, useRef, useEffect } from 'react';
import styles from './employees-list.module.scss';
import { useNavigate, useLocation } from 'react-router-dom';
import { Popover } from '@alfalab/core-components/popover';
import { Button } from '@alfalab/core-components/button';
import { CircularProgressBar } from '@alfalab/core-components/circular-progress-bar';
import { Status } from '@alfalab/core-components/status';
import { Space } from '@alfalab/core-components/space';
import { Typography } from '@alfalab/core-components/typography';
import { Table } from '@alfalab/core-components/table';
import { ListDefaultSIcon } from '@alfalab/icons-glyph/ListDefaultSIcon';
import { MoreMIcon } from '@alfalab/icons-glyph/MoreMIcon';

export interface EmployeeGoalPlan {
	id: number;
	name: string;
	position: string;
	goal: string;
	date: string;
	progress: number;
	status: string;
}

export interface IEmployeesListProps {
	data: EmployeeGoalPlan[];
	ipr_id: number;
	ipr_id2: number;
}

export const EmployeesList: React.FC<IEmployeesListProps> = ({
	data,
	ipr_id,
	ipr_id2,
}) => {
	const [popoverVisible, setPopoverVisible] = useState(false);
	const [selectedEmployee, setSelectedEmployee] =
		useState<EmployeeGoalPlan | null>(null);
	const buttonRef = useRef<HTMLButtonElement | null>(null);
	const popoverRef = useRef<HTMLDivElement | null>(null);
	const [sortColumn, setSortColumn] = useState<string | null>(null);
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
	const [page, setPage] = useState<number>(0);
	const navigate = useNavigate();
	const location = useLocation();
	// 	popover

	const handleMoreIconClick = (employee: EmployeeGoalPlan) => {
		setPopoverVisible(true);
		setSelectedEmployee(employee);
	};

	const closePopover = () => {
		setPopoverVisible(false);
		setSelectedEmployee(null);
	};

	const handleDeleteClick = () => {
		if (selectedEmployee) {
			// Определяем индекс выбранного сотрудника в массиве данных
			const index = data.findIndex((item) => item.id === selectedEmployee.id);

			if (index !== -1) {
				// Выводим информацию в консоль
				console.log('Deleting employee:', selectedEmployee);
			}

			// Закрываем Popover
			closePopover();
		}
	};

	// sorting

	const handleSort = (column: string) => {
		if (sortColumn === column) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
		} else {
			setSortColumn(column);
			setSortOrder('asc');
		}
	};

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'черновик':
				return 'purple';
			case 'отменен':
				return 'orange';
			case 'в работе':
				return 'blue';
			case 'не выполнен':
				return 'red';
			case 'выполнен':
				return 'green';
			case 'отсутствует':
				return 'grey';
			default:
				return 'blue';
		}
	};

	type TStatusType =
		| 'черновик'
		| 'в работе'
		| 'выполнен'
		| 'не выполнен'
		| 'отменен'
		| 'отсутствует';

	const getStatusSortOrder = (status: TStatusType): string => {
		const order = {
			черновик: '0',
			'в работе': '1',
			выполнен: '2',
			'не выполнен': '3',
			отменен: '4',
			отсутствует: '5',
		};

		return order[status] || '6';
	};

	const sortedData = [...data].sort((a, b) => {
		if (sortColumn === 'name') {
			return sortOrder === 'asc'
				? a.name.localeCompare(b.name)
				: b.name.localeCompare(a.name);
		} else if (sortColumn === 'date') {
			const getDateValue = (dateString: string) => {
				const [day, month, year] = dateString.split('.');
				return new Date(`${year}-${month}-${day}`).getTime();
			};

			const dateA = getDateValue(a.date);
			const dateB = getDateValue(b.date);

			if (dateA === dateB) {
				return 0;
			}

			return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
		} else if (sortColumn === 'status') {
			const statusA = a.status as TStatusType;
			const statusB = b.status as TStatusType;

			const statusOrderA = getStatusSortOrder(statusA);
			const statusOrderB = getStatusSortOrder(statusB);

			return sortOrder === 'asc'
				? statusOrderA.localeCompare(statusOrderB)
				: statusOrderB.localeCompare(statusOrderA);
		}

		return 0;
	});

	const perPage = 10; // Фиксированное количество строк на странице
	const handlePageChange = (pageIndex: number) => setPage(pageIndex);
	const pagesCount = Math.ceil(sortedData.length / perPage);
	const currentPageData = sortedData.slice(
		page * perPage,
		(page + 1) * perPage
	);

	const onClickToIpr = () => {
		navigate(`/service-iprs/ipr/${ipr_id}`, { replace: true });
	};
	const onClickToDraft = () => {
		navigate(`/service-iprs/ipr/${ipr_id2}`, { replace: true });
	};

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
					{currentPageData.map(
						({ id, name, position, goal, date, progress, status }) => {
							const progressPercentage = `${progress}%`;
							const color = getStatusColor(status);

							return (
								<Table.TRow key={id}>
									<Table.TCell>
										<Space size={2} align={'start'}>
											<Typography.Text view="primary-small" tag="div">
												{name}
											</Typography.Text>
											<Typography.Text view="primary-small" color="secondary">
												{position}
											</Typography.Text>
										</Space>
									</Table.TCell>
									<Table.TCell>{goal}</Table.TCell>
									<Table.TCell>{date}</Table.TCell>
									<Table.TCell>
										<CircularProgressBar
											value={progress}
											title={progressPercentage}
											size="s"
											contentColor="primary"
											className={styles.progressBar}
										/>
									</Table.TCell>
									<Table.TCell>
										<Status view="soft" color={color}>
											{status}
										</Status>
									</Table.TCell>
									<Table.TCell>
										{status ===
										('отсутствует' ||
											'в работе' ||
											'выполнен' ||
											'не выполнен' ||
											'отменен') ? (
											<Button view="tertiary" size="s" onClick={onClickToDraft}>
												Создать
											</Button>
										) : (
											<Button view="tertiary" size="s" onClick={onClickToIpr}>
												Открыть
											</Button>
										)}
									</Table.TCell>
									<Table.TCell>
										<Button
											view="ghost"
											ref={buttonRef}
											onClick={() =>
												handleMoreIconClick({
													id,
													name,
													position,
													goal,
													date,
													progress,
													status,
												})
											}
										>
											<MoreMIcon />
										</Button>
									</Table.TCell>
								</Table.TRow>
							);
						}
					)}
				</Table.TBody>
			</Table>

			{selectedEmployee && (
				<Popover
					anchorElement={buttonRef.current}
					open={popoverVisible}
					position="bottom"
				>
					<div
						style={{
							padding: '15px',
							width: '100px',
							display: 'flex',
							flexDirection: 'column',
							gap: '36px',
						}}
					>
						<Button view="ghost" size="s" onClick={handleDeleteClick}>
							Удалить
						</Button>
						<Button
							view="ghost"
							size="s"
							onClick={() => {
								closePopover();
								console.log('History clicked');
							}}
						>
							История
						</Button>
					</div>
				</Popover>
			)}
		</>
	);
};
