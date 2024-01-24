import React from 'react';
import styles from './ipr-employee.module.scss';
import { Tasks } from '../../entities/tasks/tasks';
import { useParams } from 'react-router-dom';
import Header from '../../shared/header-component/header';
import { Footer } from '@alfalab/core-components/select/shared';
import BackButton from '../../entities/backbutton/backbutton';
import { PageTitle } from '../../shared/page-title/page-title';
import { Status, StatusProps } from '@alfalab/core-components/status';
import { Button } from '@alfalab/core-components/button';

interface Task {
	id: number;
	goal: string;
	deadline: string;
	progress: number;
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

interface IPREmployeeProps {}

export const IPREmployee: React.FC<IPREmployeeProps> = () => {
	const tasksData: Task[] = [
		{
			id: 1,
			goal: 'Карьерный рост',
			deadline: '15.01.2024',
			progress: 0,
			statusText: 'в работе',
			statusColor: 'blue',
		},
		{
			id: 2,
			goal: 'Повышение грейда',
			deadline: '20.01.2023',
			progress: 40,
			statusText: 'отменен',
			statusColor: 'orange',
		},
		{
			id: 3,
			goal: 'Получение нового опыта',
			deadline: '16.01.2022',
			progress: 40,
			statusText: 'не выполнен',
			statusColor: 'red',
		},
		{
			id: 4,
			goal: 'Смена команды',
			deadline: '12.01.2021',
			progress: 90,
			statusText: 'выполнен',
			statusColor: 'green',
		},
		{
			id: 5,
			goal: 'Соответствие занимаемой должности',
			deadline: '23.01.2020',
			progress: 100,
			statusText: 'выполнен',
			statusColor: 'green',
		},
	];
	const { id } = useParams<{ id: string }>();

	const selectedGoal = tasksData.find((goal) => goal.id === Number(id));

	if (!selectedGoal) {
		return <div>Ошибка не нашел Id</div>;
	}

	const { statusText, statusColor } = selectedGoal;

	return (
		<>
			<Header />
			<section className={styles.myPlan}>
				<div className={styles.container}>
					<BackButton />
				</div>
				<div className={styles.wrapper}>
					<div className={styles.titleWrapper}>
						<PageTitle title="Мой план развития"></PageTitle>
						<Status view="soft" color={statusColor}>
							{statusText}
						</Status>
					</div>
					<Button view="secondary" size="m" className={styles.button}>
						Сохранить
					</Button>
					<legend className={styles.blockTitle}>Общее описание</legend>
					<div className={styles.container}>
						<Tasks isEmployee={true} />
					</div>
				</div>
			</section>
		</>
	);
};
