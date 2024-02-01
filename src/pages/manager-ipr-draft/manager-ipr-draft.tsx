import styles from './manager-ipr-draft.module.scss';
import styles2 from './manager-ipr-form-styles.module.scss';
import React, { FC, ChangeEvent, useState, useCallback } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../shared/header-component/header';
import { EmployeeInfoCard } from '../../entities/employee-info-card/employee-info-card';
import { Button } from '@alfalab/core-components/button';
import { Status, StatusProps } from '@alfalab/core-components/status';
import { TrashCanMIcon } from '@alfalab/icons-glyph/TrashCanMIcon';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import avatar from '../../images/avatars/avatar_head-of-dept.png';
import { Tasks } from '../../entities/tasks/tasks';
import NavBarMini from '../../entities/navbar-mini/navbar-mini';
import { Modal } from '../../entities/modal/modal';
import { TasksOverview } from '../../entities/tasks-overview/tasks-overview';
import { useAppSelector } from '../../shared/hooks/redux';
import { NewTask } from '../../entities/new-task/new-task';
import { Notification } from '@alfalab/core-components/notification';
import { FooterMain } from '../../entities/footer-main/footer-main';

interface ManagerIprDraftProps {
	statusText: string;
	statusColor: StatusProps['color'];
	isExecutive: boolean;
	ipr_id: number;
}
interface Task {
	taskTitle: string;
	closeDate: string;
	description: string;
	courses: string;
	comment: string;
}

export const ManagerIprDraft = ({
	statusText,
	statusColor,
	isExecutive,
}: ManagerIprDraftProps) => {
	const navigate = useNavigate();

	const [modalOpen, setModalOpen] = useState(false);
	const [modalDisacrd, setDiscardOpen] = useState(false);
	const [modalSave, setSaveOpen] = useState(false);
	const [taskValues, setTaskValues] = useState('');
	const [newTaskOpen, setNewTaskOpen] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [isVisible2, setIsVisible2] = useState(false);
	const [newTask, setNewTask] = useState<Task[]>([]);

	//---------------------------
	const toggleVisibility = useCallback(() => setIsVisible((prev) => !prev), []);
	const hideNotification = useCallback(() => setIsVisible(false), []);
	const toggleVisibility2 = useCallback(
		() => setIsVisible2((prev) => !prev),
		[]
	);
	const hideNotification2 = useCallback(() => setIsVisible2(false), []);

	//---------------------------
	// const iprData = useAppSelector((state) => state.iprs.iprsData);
	// console.log('iprData в tasks: ', iprData);

	const onModalOpen = () => {
		setModalOpen(!modalOpen);
	};
	const onClick = () => {
		// navigate(`/service-iprs/ipr/${ipr_id}`, { replace: true });
		navigate('/iprs/rating', { replace: true });
	};

	const onModalDiscardOpen = () => {
		setDiscardOpen(!modalDisacrd);
	};
	const onModalSaveOpen = () => {
		setSaveOpen(!modalSave);
	};

	const handleDataSubmit = (goalData: any, taskData: any) => {
		// Здесь вы можете отправить оба набора данных на сервер
		console.log('Отправка данных на сервер из Tasks:', taskData);
		console.log('Отправка данных на сервер из TasksOverview:', goalData);
	};

	const handleNewTaskOpen = () => {
		setNewTaskOpen(true);
		setNewTask((prevTasks) => [
			...prevTasks,
			{
				taskTitle: '',
				closeDate: '',
				description: '',
				courses: '',
				comment: '',
			},
		]);
	};

	return (
		<div className={styles.generalFooterWrapper}>
			<div className={styles.generalFooterContainer}>
				<Header />
				<div className={styles.container}>
					{/* <NavBarMini isExecutive={isExecutive} /> */}
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
							<h1 className={styles.title}>План развития сотрудника</h1>
							{statusText && (
								<Status view="soft" color={statusColor}>
									{statusText}
								</Status>
							)}
						</div>
						<div className={styles.employeeWrapper}>
							<EmployeeInfoCard
								name="Сошнева Инна Павловна"
								position="Руководитель направления"
								avatar={avatar}
							/>
						</div>
						<div className={styles.buttonsWrapper}>
							<Button
								onClick={toggleVisibility}
								view="secondary"
								size="s"
								className={styles.buttonSave}
							>
								Сохранить
							</Button>
							{statusText === 'в работе' ? (
								<Button
									onClick={onClick}
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
									onClick={toggleVisibility2}
								>
									Отправить в работу
								</Button>
							)}

							{/* <button onClick={onModalOpen} className={styles.trashCan}>
							<TrashCanMIcon color="#EC2E13"></TrashCanMIcon>
						</button> */}

							<Button
								view="tertiary"
								size="s"
								className={styles.buttonDelete}
								onClick={onModalOpen}
							>
								Удалить
							</Button>
							{statusText === 'в работе' ? (
								<div className={styles.btnSaveWrapper}>
									<Button
										onClick={onModalDiscardOpen}
										view="tertiary"
										size="s"
										className={styles.buttonDiscard}
									>
										Отменить
									</Button>
								</div>
							) : (
								''
							)}
						</div>

						<form className={styles2.form}>
							<TasksOverview
								handleGoalValuesChange={handleDataSubmit}
								isExecutive={isExecutive}
								iprStatus="черновик"
							></TasksOverview>
							<fieldset className={styles2.blockWrapper}>
								<legend className={styles2.blockTitle}>Задачи</legend>
								<Tasks isEmployee={true} />
							</fieldset>

							{newTask.map((item) => {
								return (
									<div>
										<NewTask isEmployee={false}></NewTask>
									</div>
								);
							})}

							{/* {newTaskOpen && (
							<NewTask isEmployee={false} isExecutive={true}></NewTask>
						)} */}
							<ButtonDesktop
								onClick={handleNewTaskOpen}
								view="tertiary"
								shape="rectangular"
								size="s"
								className={styles.buttonComponent}
								nowrap={false}
								colors="default"
							>
								Добавить новую
							</ButtonDesktop>
						</form>
					</div>
				</div>
				{modalDisacrd ? (
					<Modal
						title={'Отмена плана развития сотрудника'}
						paragraph={
							'Вы дейстивтельно хотите отменить индивидуальный план развития?'
						}
						button1={'Да'}
						button2={'Нет'}
					></Modal>
				) : (
					''
				)}
				{modalSave ? <Modal title={'Изменения сохранены'}></Modal> : ''}

				{isVisible ? (
					<div className={styles2.containerNote}>
						<Notification
							title={'Сохранено'}
							block={true}
							colors={'default'}
							titleClassName={styles2.title}
							contentClassName={styles2.content}
							hasCloser={true}
							badge={'positive'}
							visible={isVisible}
							offset={140}
							autoCloseDelay={1500}
							zIndex={10}
							onClose={hideNotification}
							onCloseTimeout={hideNotification}
							usePortal={true}
						>
							{'План развития добавлен в общий список как черновик'}
						</Notification>
					</div>
				) : (
					''
				)}

				{isVisible2 ? (
					<div className={styles2.containerNote}>
						<Notification
							title={'Отправлено в работу'}
							block={true}
							colors={'default'}
							titleClassName={styles2.title}
							contentClassName={styles2.content}
							hasCloser={true}
							badge={'positive'}
							visible={isVisible2}
							offset={140}
							autoCloseDelay={1500}
							zIndex={10}
							onClose={hideNotification2}
							onCloseTimeout={hideNotification2}
							usePortal={true}
						>
							{'План развития отправлен сотруднику для исполнения'}
						</Notification>
					</div>
				) : (
					''
				)}
				<FooterMain></FooterMain>
			</div>
			<div className={styles.generalFooter}>
				<FooterMain></FooterMain>
			</div>
		</div>
	);
};
