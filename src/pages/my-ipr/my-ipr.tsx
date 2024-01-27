import styles from './my-ipr.module.scss';
import styles2 from './my-ipr.module.scss';
import { useState } from 'react';
import Header from '../../shared/header-component/header';
import { useParams } from 'react-router-dom';
import { Button } from '@alfalab/core-components/button';
import { Status, StatusProps } from '@alfalab/core-components/status';
import { Tasks } from '../../entities/tasks/tasks';
import { Modal } from '../../entities/modal/modal';
import { TasksOverview } from '../../entities/tasks-overview/tasks-overview';
import { PageTitle } from '../../shared/page-title/page-title';
import NavBarMini from '../../entities/navbar-mini/navbar-mini';
import { goalsData } from '../../shared/utils/constants';

export const MyIpr: React.FC = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const onModalOpen = () => {
		setModalOpen(!modalOpen);
	};

	const { id } = useParams<{ id: string }>();
	const currentGoal = goalsData.find((goal) => goal.id === Number(id));
	if (!currentGoal) {
		return <div>Ошибка не нашел Id</div>;
	}

	const { statusText, statusColor } = currentGoal;

	return (
		<>
			<Header />
			<div className={styles.container}>
				<NavBarMini />
				{modalOpen && (
					<Modal
						title="Выйти без сохранения?"
						paragraph="Чтобы не потерять данные, вернитесь и сохраните изменения"
						button1="Выйти"
						button2="Отмена"
					></Modal>
				)}
				<div className={styles.iprDraft}>
					<div className={styles.titleWrapper}>
						<PageTitle title="Мой план развития" />
						<Status view="soft" color={statusColor}>
							{statusText}
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
							iprStatus="черновик"
						></TasksOverview>
						<fieldset className={styles2.blockWrapper}>
							<legend className={styles2.blockTitle}>Задачи</legend>
							<Tasks isEmployee={true} />
						</fieldset>
					</form>
				</div>
			</div>
		</>
	);
};
