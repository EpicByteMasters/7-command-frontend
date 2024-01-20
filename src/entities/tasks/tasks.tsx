import React from 'react';
import styles from './tasks.module.scss';
import { Table } from '@alfalab/core-components/table';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { Status } from '@alfalab/core-components/status';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';

interface TaskProps {
	id: number;
	title: string;
	deadline: string;
	statusText: string;
	statusColor?:
		| 'green'
		| 'orange'
		| 'red'
		| 'blue'
		| 'grey'
		| 'teal'
		| 'purple'
		| undefined;
	closeButton?: boolean | undefined;
}

const tasksData: TaskProps[] = [
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

export const Task: React.FC = () => {
	return (
		<Table className={styles.table}>
			<Table.TBody>
				{tasksData.map(
					({ id, title, deadline, statusColor, statusText, closeButton }) => (
						<Table.TRow className={styles.row} key={id}>
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
								<ChevronDownMIcon />
							</Table.TCell>
						</Table.TRow>
					)
				)}
			</Table.TBody>
		</Table>
	);
};
