import React, { useState } from 'react';
import styles from './tasks.module.scss';
import { Table } from '@alfalab/core-components/table';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { Status } from '@alfalab/core-components/status';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { Textarea } from '@alfalab/core-components/textarea';
import { UniversalDateInput } from '@alfalab/core-components/universal-date-input';
import { CalendarDesktop } from '@alfalab/core-components/calendar/desktop';
import { Collapse } from '@alfalab/core-components/collapse';
import { Grid } from '@alfalab/core-components/grid';

export const Tasks = () => {
	const tasksData = [
		{
			id: 1,
			title: 'Менторинг новых сотрудников',
			deadline: 'До 30 января',
			statusText: 'не выполнена',
			statusColor: 'red',
			closeButton: false,
		},
		{
			id: 2,
			title: 'Разработка стратегии компании',
			deadline: 'До 20 марта',
			statusText: 'ожидает проверки',
			statusColor: 'purple',
			closeButton: true,
		},
		{
			id: 3,
			title: 'Найм сотрудников',
			deadline: 'До 10 апреля',
			statusText: 'выполнена',
			statusColor: 'green',
			closeButton: false,
		},
		{
			id: 4,
			title: 'Подготовка и выступление на конференции',
			deadline: 'До 1 июня',
			statusText: 'отменена',
			statusColor: 'orange',
			closeButton: true,
		},
	];

	const [expandedTasks, setExpandedTasks] = useState({});

	const [valueEndDate, setEndDate] = useState('');

	const handleChangeEndDate = (event, { value }) => {
		setEndDate(value);
	};

	const chevronClick = (taskId) => {
		setExpandedTasks((prevExpandedTasks) => ({
			...prevExpandedTasks,
			[taskId]: !prevExpandedTasks[taskId],
		}));
	};

	return (
		<Table className={styles.table}>
			<Table.TBody>
				{tasksData.map(
					({ id, title, deadline, statusColor, statusText, closeButton }) => (
						<React.Fragment key={id}>
							<Table.TExpandableRow className={styles.row}>
								<Table.TCell className={styles.cellWithIcon}>
									{closeButton && <CrossCircleMIcon color="#70707A" />}
									{title}
								</Table.TCell>
								<Table.TCell>{deadline}</Table.TCell>
								<Table.TCell>
									<Status view="soft" color={statusColor}>
										{statusText}
									</Status>
								</Table.TCell>
								<Table.TCell>
									<ChevronDownMIcon onClick={() => chevronClick(id)} />
								</Table.TCell>
							</Table.TExpandableRow>
							{expandedTasks[id] && (
								<Table.TExpandableRow className={styles.row}>
									<Table.TCell colSpan={4}>
										<Collapse expanded={expandedTasks[id]}>
											<div className={styles.openedTask}>
												<div className={styles.wrapper}>
													<Textarea
														fieldClassName={styles.goalName}
														maxHeight={56}
														label="Название*"
														labelView="ouiter"
														size="m"
														block={true}
														showCounter={true}
														autosize={true}
													/>
													<UniversalDateInput
														block={true}
														view="date"
														label="Дата завершения"
														size="m"
														value={valueEndDate}
														onChange={handleChangeEndDate}
														picker={true}
														Calendar={CalendarDesktop}
														calendarProps={{
															selectorView: 'month-only',
														}}
														clear={true}
														onClear={(e) => {
															e.stopPropagation();
															setEndDate('');
														}}
													/>
												</div>
											</div>
										</Collapse>
									</Table.TCell>
								</Table.TExpandableRow>
							)}
						</React.Fragment>
					)
				)}
			</Table.TBody>
		</Table>
	);
};
