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
	const optionsGoal: OptionShape[] = [
		{ key: 'Карьерный рост' },
		{ key: 'Повышение грейда' },
		{ key: 'Соответствие занимаемой должности' },
		{ key: 'Развитие софт-скиллов' },
		{ key: 'Развитие хард-скиллов' },
		{ key: 'Смена специализации' },
		{ key: 'Смена команды' },
		{ key: 'Получение нового опыта' },
	];

	const optionsRole: OptionShape[] = [
		{ key: 'Продакт-менеджер' },
		{ key: 'Проджект-менеджер' },
		{ key: 'Бизнес-аналитик' },
		{ key: 'Системный аналитик' },
		{ key: 'Дизайнер' },
		{ key: 'QA-инженер' },
		{ key: 'Фронтенд-разработчик' },
		{ key: 'Бэкенд-разработчик' },
		{ key: 'Мобильный разработчик' },
		{ key: 'DevOps-инженер' },
		{ key: 'Системный администратор' },
		{ key: 'Дата-аналитик' },
		{ key: 'Дата-сайентист' },
		{ key: 'Руководитель' },
		{ key: 'HR' },
		{ key: 'Другое' },
	];

	const optionsCompetence: OptionShape[] = [
		{ key: 'Адаптивность и стрессоустойчивость' },
		{ key: 'Анализ и решение проблем' },
		{ key: 'Английский язык' },
		{ key: 'Аналитическое мышление' },
		{ key: 'Ведение переговоров' },
		{ key: 'Выявление паттернов или связей' },
		{ key: 'Гибкость и готовность к изменениям' },
		{ key: 'Делегирование' },
		{ key: 'Исполнительская дисциплина' },
		{ key: 'Клиентоориентированность' },
		{ key: 'Креативное мышление' },
		{ key: 'Критическое мышление' },
		{ key: 'Лидерство' },
		{ key: 'Навык деловой переписки' },
		{ key: 'Наставничество и менторинг' },
		{ key: 'Ориентация на результат' },
		{ key: 'Ответственность' },
		{ key: 'Планирование и организация' },
		{ key: 'Поиск информации и ресурсов для решения задач' },
		{ key: 'Понимание бизнеса и структуры организации' },
		{ key: 'Построение эффективных процессов' },
		{ key: 'Принятие управленческих решений' },
		{ key: 'Публичные выступления' },
		{ key: 'Работа в команде' },
		{ key: 'Работа в режиме неопределенности' },
		{ key: 'Работа в режиме неопределенности' },
		{ key: 'Работоспособность и личная эффективность' },
		{ key: 'Самоанализ и саморефлексия' },
		{ key: 'Самомотивация' },
		{ key: 'Самосовершенствование (самообучение)' },
		{ key: 'Самостоятельность (самоорганизация)' },
		{ key: 'Системное мышление' },
		{ key: 'Следование стандартам деятельности' },
		{ key: 'Способности к анализу и прогнозированию результатов' },
		{ key: 'Стратегическое мышление' },
		{ key: 'Умение обрабатывать полученную информацию' },
		{ key: 'Умение оценивать сроки выполнения задач' },
		{ key: 'Умение проводить исследования' },
		{ key: 'Умение слушать' },
		{ key: 'Управление данными' },
		{ key: 'Управление изменениям' },
		{ key: 'Управление конфликтами' },
		{ key: 'Управление людьми' },
		{ key: 'Управление проектами' },
		{ key: 'Целеустремленность' },
		{ key: 'Эмоциональный интеллект' },
		{ key: 'Эмпатия' },
		{ key: 'Другое' },
	];

	const [multiple, setMultiple] = React.useState(false);
	const [shownChevron, setShownChevron] = useState<boolean>(true);
	const [valueGoal, setValueGoal] = useState<string>('');
	const [valueRole, setValueRole] = useState<string>('');
	const [valueCompetence, setValueCompetence] = useState<string>('');

	const matchOption = (option: OptionShape, inputValue: string): boolean =>
		option.key.toLowerCase().includes((inputValue || '').toLowerCase());

	const handleInputGoal = (
		event: ChangeEvent<HTMLInputElement> | null,
		{ value }: { value: string }
	) => {
		setValueGoal(value);
	};

	const handleInputRole = (
		event: ChangeEvent<HTMLInputElement> | null,
		{ value }: { value: string }
	) => {
		setValueRole(value);
	};

	const handleInputCompetence = (
		event: ChangeEvent<HTMLInputElement> | null,
		{ value }: { value: string }
	) => {
		setValueCompetence(value);
	};

	const handleChangeGoal = ({ selected }: { selected: OptionShape | null }) => {
		setValueGoal(selected ? selected.key : '');
	};

	const handleChangeRole = ({ selected }: { selected: OptionShape | null }) => {
		setValueRole(selected ? selected.key : '');
	};

	const handleChangeCompetence = ({
		selected,
		selectedMultiple,
	}: {
		selected: OptionShape | null;
		selectedMultiple: OptionShape | null;
	}): void => {
		if (multiple) {
			const value: string = selectedMultiple.length
				? selectedMultiple.map((option) => option.key).join(', ') + ', '
				: '';
			setValueCompetence(value);

			return;
		}

		setValueCompetence(selected ? selected.key : '');
	};
	const inputValues = valueCompetence.replace(/ /g, '').split(',');

	const selectedOptions = optionsCompetence.filter((option) =>
		inputValues.includes(option.key.trim())
	);
	const selected = multiple
		? selectedOptions.map((option) => option.key)
		: optionsCompetence.find((o) => o.key === inputValues[0]) || [];

	const getFilteredOptions = (): OptionShape[] => {
		return optionsGoal.some(({ key }) => key === valueGoal)
			? optionsGoal
			: optionsGoal.filter((option) => matchOption(option, valueGoal));
	};

	const getFilteredRoles = (): OptionShape[] => {
		return optionsRole.some(({ key }) => key === valueGoal)
			? optionsRole
			: optionsRole.filter((option) => matchOption(option, valueRole));
	};

	const getFilteredCompetence = (): OptionShape[] => {
		if (multiple) {
			return inputValues.length === selected.length
				? optionsCompetence
				: optionsCompetence.filter((option) => {
						return (
							selectedOptions.includes(option) ||
							matchOption(option, inputValues[inputValues.length - 1])
						);
					});
		}
		return optionsCompetence.some(({ key }) => key === valueGoal)
			? optionsCompetence
			: optionsCompetence.filter((option) => matchOption(option, valueRole));
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
									onChange={handleChangeGoal}
									onInput={handleInputGoal}
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
									className="inputRole"
									size="s"
									options={getFilteredRoles()}
									label="Специализация *"
									placeholder="Начните вводить название"
									onChange={handleChangeRole}
									onInput={handleInputRole}
									Arrow={shownChevron ? Arrow : undefined}
									value={valueRole}
									allowUnselect={true}
									inputProps={{
										onClear: () => setValueRole(''),
										clear: true,
									}}
								></InputAutocomplete>
								<InputAutocomplete
									block={true}
									multiple={multiple}
									selected={selected}
									className="inputCompetence"
									size="s"
									options={getFilteredCompetence()}
									label="Компетенция *"
									placeholder="Начните вводить название"
									onChange={handleChangeCompetence}
									onInput={handleInputCompetence}
									Arrow={shownChevron ? Arrow : undefined}
									value={valueCompetence}
									allowUnselect={true}
									inputProps={{
										onClear: () => setValueCompetence(''),
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
