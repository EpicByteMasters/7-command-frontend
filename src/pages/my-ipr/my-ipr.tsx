import styles from './my-ipr.module.scss';
import styles2 from './my-ipr.module.scss';

import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Button } from '@alfalab/core-components/button';
import { Status } from '@alfalab/core-components/status';

import { Tasks } from '../../entities/tasks/tasks';
import { Modal } from '../../entities/modal/modal';
import { TasksOverview } from '../../entities/tasks-overview/tasks-overview';
import { PageTitle } from '../../shared/page-title/page-title';
import NavBarMini from '../../entities/navbar-mini/navbar-mini';
import { FooterMain } from '../../entities/footer-main/footer-main';

import { useAppSelector } from '../../shared/hooks/redux';

export const MyIpr: React.FC = () => {
	const [modalOpen, setModalOpen] = useState(false);

	const onModalOpen = () => {
		setModalOpen(!modalOpen);
	};

	const iprData = useAppSelector((state) => state.iprs.iprsData);
	console.log('iprData в tasks: ', iprData);
	const { id } = useParams<{ id: string }>();
	const currentIpr = iprData.find((goal) => goal.id === Number(id));
	if (!currentIpr) {
		return <div>Ошибка не нашел Id</div>;
	}

	const { status } = currentIpr;
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

	const handleDataSubmit = (goalData: any, taskData: any) => {
		// Здесь вы можете отправить оба набора данных на сервер
		console.log('Отправка данных на сервер из Tasks:', goalData);
		console.log('Отправка данных на сервер из AnotherComponent:', taskData);
	};

	return (
		<div className={styles.generalFooterWrapper}>
			<div className={styles.generalFooterContainer}>
				<div className={styles.container}>
					<NavBarMini />
					{modalOpen && (
						<Modal
							title="Выйти без сохранения?"
							paragraph="Чтобы не потерять данные, вернитесь и сохраните изменения"
							confirmButtonLabel="Выйти"
							cancelButtonLabel="Отмена"
						></Modal>
					)}
					<div className={styles.iprDraft}>
						<div className={styles.titleWrapper}>
							<PageTitle title="Мой план развития" />
							<Status view="soft" color={getStatusColor(status.name)}>
								{status.name}
							</Status>
						</div>
						<div className={styles.buttonsWrapper}>
							<Button view="secondary" size="m" className={styles.buttonSave}>
								Сохранить
							</Button>
						</div>
						<form className={styles2.form}>
							<TasksOverview
								isExecutive={false}
								iprStatus={status.name}
								handleGoalValuesChange={handleDataSubmit}
							/>
							<fieldset className={styles2.blockWrapper}>
								<legend className={styles2.blockTitle}>Задачи</legend>
								<Tasks
									isEmployee={true}
									handleTaskValuesChange={handleDataSubmit}
								/>
							</fieldset>
						</form>
					</div>
				</div>
			</div>
			<div className={styles.generalFooter}>
				<FooterMain></FooterMain>
			</div>
		</div>
	);
};
