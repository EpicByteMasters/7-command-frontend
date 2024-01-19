import styles from './leader-tasks.module.scss';
import React, { FC, ChangeEvent, useState } from 'react';
import Header from '../../components/Header/header';
import NavBar from '../../entities/navbar/navbar';
import { EmployeeInfoCard } from '../../entities/employee-info-card/employee-info-card';
import avatar from '../../images/avatars/avatar_leader.png';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import { InputAutocomplete } from '@alfalab/core-components/input-autocomplete';
import { Arrow } from '@alfalab/core-components/select/components/arrow';

interface OptionShape {
	key: string;
}

export const LeaderTasks: FC = () => {
	const options: OptionShape[] = [
		{ key: 'Карьерный рост' },
		{ key: 'Повышение грейда' },
		{ key: 'Соответствие занимаемой должности' },
		{ key: 'Развитие софт-скиллов' },
		{ key: 'Развитие хард-скиллов' },
		{ key: 'Смена специализации' },
		{ key: 'Смена команды' },
		{ key: 'Получение нового опыта' },
	];
	const [shownChevron, setShownChevron] = useState<boolean>(true);
	const [valueGoal, setValueGoal] = useState<string>('');

	const matchOption = (option: OptionShape, inputValue: string): boolean =>
		option.key.toLowerCase().includes((inputValue || '').toLowerCase());

	const handleInput = (
		event: ChangeEvent<HTMLInputElement> | null,
		{ value }: { value: string }
	) => {
		setValueGoal(value);
	};

	console.log(valueGoal);

	const handleChange = ({ selected }: { selected: OptionShape | null }) => {
		setValueGoal(selected ? selected.key : '');
	};

	const getFilteredOptions = (): OptionShape[] => {
		return options.some(({ key }) => key === valueGoal)
			? options
			: options.filter((option) => matchOption(option, valueGoal));
	};

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
									block={true}
									className="inputGoal"
									size="s"
									options={getFilteredOptions()}
									label="Цель *"
									placeholder="Начните вводить название"
									onChange={handleChange}
									onInput={handleInput}
									Arrow={shownChevron ? Arrow : undefined}
									value={valueGoal}
									allowUnselect={true}
									showEmptyOptionsList={true}
									inputProps={{
										onClear: () => setValueGoal(''),
										clear: true,
									}}
								></InputAutocomplete>
								<InputAutocomplete
									block={true}
									className="inputGoal"
									size="s"
									options={getFilteredOptions()}
									label="Цель *"
									placeholder="Начните вводить название"
									onChange={handleChange}
									onInput={handleInput}
									Arrow={shownChevron ? Arrow : undefined}
									value={valueGoal}
									allowUnselect={true}
									inputProps={{
										onClear: () => setValueGoal(''),
										clear: true,
									}}
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
