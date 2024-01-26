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
import { tasksData } from '../../shared/utils/constants';

interface IPREmployeeProps {}

export const IPREmployee: React.FC<IPREmployeeProps> = () => {
	const { id } = useParams<{ id: string }>();
	const task = tasksData.find((goal) => goal.id === Number(id));
	if (!task) {
		return <div>Ошибка не нашел Id</div>;
	}
	const { statusText, statusColor } = task;

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
