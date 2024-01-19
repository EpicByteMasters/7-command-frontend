import styles from './leader-tasks.module.scss';
import React from 'react';
import { ChangeEvent, useState, useRef, FC } from 'react';
import Header from '../../components/Header/header';
import NavBar from '../../entities/navbar/navbar';
import { EmployeeInfoCard } from '../../entities/employee-info-card/employee-info-card';
import avatar from '../../images/avatars/avatar_leader.png';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import { InputAutocomplete } from '@alfalab/core-components/input-autocomplete';

export const LeaderTasks = () => {
	const options = [
		{ key: 'Соответствие занимаемой должности' },
		{ key: 'Соответствие занимаемой должности' },
		{ key: 'Соответствие занимаемой должности' },
		{ key: 'Соответствие занимаемой должности' },
		{ key: 'Соответствие занимаемой должности' },
	];

	const [disabled, setDisabled] = useState<boolean>(false);

	return (
		<>
			<Header />
			<div className={styles.container}>
				<NavBar />
				<div className={styles.wrapper}>
					<h2 className={styles.title}>План развития сотрудника</h2>
					<div className={styles.employeeWrapper}>
						<EmployeeInfoCard
							name="Кириллов Константин Соломонович"
							position="Руководитель направления"
							avatar={avatar}
						/>
					</div>
					<div className={styles.buttonWrapper}>
						<ButtonDesktop
							view="secondary"
							shape="rectangular"
							size="s"
							className="string"
							nowrap={false}
							colors="default"
						>
							Отменить
						</ButtonDesktop>
						<ButtonDesktop
							view="primary"
							shape="rectangular"
							size="s"
							className="string"
							nowrap={false}
							colors="default"
						>
							Подвести итоги
						</ButtonDesktop>
					</div>
					<form className={styles.form}>
						<fieldset className={styles.blockWrapper}>
							<legend className={styles.blockTitle}>Общее описание</legend>
							<div className={styles.formBlock}>
								<InputAutocomplete
									options={options}
									label="Цель *"
									optionsListWidth="field"
									labelView="inner"
								></InputAutocomplete>
							</div>
						</fieldset>
						<fieldset className={styles.blockWrapper}>
							<legend className={styles.blockTitle}>Задачи</legend>
							<div className={styles.formBlock}></div>
						</fieldset>
						<ButtonDesktop
							view="tertiary"
							shape="rectangular"
							size="s"
							className="button__component"
							nowrap={false}
							colors="default"
						>
							Добавить новую
						</ButtonDesktop>
					</form>
				</div>
			</div>
		</>
	);
};
