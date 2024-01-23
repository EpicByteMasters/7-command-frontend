import styles from './manager-ipr-draft.module.scss';
import styles2 from './manager-ipr-form-styles.module.scss';
import React, { FC, ChangeEvent, useState } from 'react';
import { Footer } from '../../entities/footer/footer';
import Header from '../../components/Header/header';
import NavBar from '../../entities/navbar/navbar';
import { EmployeeInfoCard } from '../../entities/employee-info-card/employee-info-card';
import { Button } from '@alfalab/core-components/button';
import { Status, StatusProps } from '@alfalab/core-components/status';
import { TrashCanMIcon } from '@alfalab/icons-glyph/TrashCanMIcon';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import { InputAutocomplete } from '@alfalab/core-components/input-autocomplete';
import { Arrow } from '@alfalab/core-components/select/components/arrow';
import { CalendarDesktop } from '@alfalab/core-components/calendar/desktop';
import { Textarea } from '@alfalab/core-components/textarea';
import { FilterTag } from '@alfalab/core-components/filter-tag';
import { UniversalDateInput } from '@alfalab/core-components/universal-date-input';
import avatar from '../../images/avatars/avatar_head-of-dept.png';
import { Tasks } from '../../entities/tasks/tasks';

interface ManagerIprDraftProps {
	statusText: string;
	statusColor: StatusProps['color'];
}
interface OptionShape {
	key: string;
}

export const ManagerIprDraft = ({
	statusText,
	statusColor,
}: ManagerIprDraftProps) => {
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

	const optionsMentor: OptionShape[] = [
		{ key: 'Иванова Наталья Дмитриевна' },
		{ key: 'Петрова Наталья Дмитриевна' },
		{ key: 'Сидорова Наталья Дмитриевна' },
	];

	const [multiple, setMultiple] = useState(true);
	const [shownChevron, setShownChevron] = useState(true);

	const [valueGoal, setValueGoal] = useState<string>('');
	const [valueRole, setValueRole] = useState<string>('');
	const [valueMentor, setValueMentor] = useState<string>('');
	const [valueCompetence, setValueCompetence] = useState<string>('');
	const [valueStartDate, setStartDate] = useState<string>('');
	const [valueEndDate, setEndDate] = useState<string>('');

	const matchOption = (option: OptionShape, inputValue: string): boolean =>
		option.key.toLowerCase().includes((inputValue || '').toLowerCase());

	// Обработка импутов
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

	const handleInputMentor = (
		event: ChangeEvent<HTMLInputElement> | null,
		{ value }: { value: string }
	) => {
		setValueMentor(value);
	};
	// Обработка изменения импутов

	const handleChangeGoal = ({ selected }: { selected: OptionShape | null }) => {
		setValueGoal(selected ? selected.key : '');
	};

	const handleChangeRole = ({ selected }: { selected: OptionShape | null }) => {
		setValueRole(selected ? selected.key : '');
	};
	const handleChangeMentor = ({
		selected,
	}: {
		selected: OptionShape | null;
	}) => {
		setValueMentor(selected ? selected.key : '');
	};

	const handleChangeStartDate = (event: any, { value }: { value: string }) => {
		setStartDate(value);
	};
	const handleChangeEndDate = (event: any, { value }: { value: string }) => {
		setEndDate(value);
	};
	// Обработка фильтры поиска значения

	const getFilteredGoals = (): OptionShape[] => {
		return optionsGoal.some(({ key }) => key === valueGoal)
			? optionsGoal
			: optionsGoal.filter((option) => matchOption(option, valueGoal));
	};

	const getFilteredRoles = (): OptionShape[] => {
		return optionsRole.some(({ key }) => key === valueRole)
			? optionsRole
			: optionsRole.filter((option) => matchOption(option, valueRole));
	};
	const getFilteredMentor = (): OptionShape[] => {
		return optionsMentor.some(({ key }) => key === valueMentor)
			? optionsMentor
			: optionsMentor.filter((option) => matchOption(option, valueMentor));
	};

	// // Competence
	const handleInputCompetence = (
		event: ChangeEvent<HTMLInputElement> | null,
		{ value }: { value: string }
	) => {
		setValueCompetence(value);
	};
	// Работает
	const inputValues: string[] = valueCompetence.replace(/ /g, '').split(',');
	const selectedOptions: OptionShape[] = optionsCompetence.filter((option) =>
		inputValues.includes(option.key.trim())
	);

	const selected: string[] | OptionShape = multiple
		? selectedOptions.map((option) => option.key)
		: optionsCompetence.find((o) => o.key === inputValues[0]) || [];

	const tagValues = valueCompetence.trim().split(',');

	// console.log(inputValues, 'input-values');
	// console.log(tagValues, 'tag');
	// console.log(valueCompetence, 'competence');

	const handleChangeCompetence = ({
		selected,
		selectedMultiple,
	}: {
		selected: OptionShape | null;
		selectedMultiple: OptionShape[] | null;
	}): void => {
		if (multiple) {
			const value = selectedMultiple?.length
				? selectedMultiple.map((option) => option.key).join(', ') + ', '
				: '';
			setValueCompetence(value);
			return;
		}
		setValueCompetence(selected ? selected.key : '');
	};

	const getFilteredOptionsCompetence = (): OptionShape[] => {
		if (multiple) {
			return optionsCompetence.filter((option) => {
				return (
					selectedOptions.includes(option) ||
					matchOption(option, inputValues[inputValues.length - 1])
				);
			});
		}

		return optionsCompetence.some(({ key }) => key === valueCompetence)
			? optionsCompetence
			: optionsCompetence.filter((option) =>
					matchOption(option, valueCompetence)
				);
	};

	return (
		<>
			<Header />
			<div className={styles.container}>
				<NavBar />
				<div className={styles.iprDraft}>
					<div className={styles.titleWrapper}>
						<h1 className={styles.title}>План развития сотрудника</h1>
						<Status view="soft" color={statusColor}>
							{statusText}
						</Status>
					</div>
					<div className={styles.employeeWrapper}>
						<EmployeeInfoCard
							name="Сошнева Инна Павловна"
							position="Менеджер направления"
							avatar={avatar}
						/>
					</div>
					<div className={styles.buttonsWrapper}>
						<Button view="secondary" size="m" className={styles.buttonSave}>
							Сохранить
						</Button>
						<Button view="primary" size="m" className={styles.buttonSend}>
							Отправить в работу
						</Button>
						<TrashCanMIcon color="#EC2E13" />
					</div>
					<form className={styles2.form}>
						<fieldset className={styles2.blockWrapper}>
							<legend className={styles2.blockTitle}>Общее описание</legend>
							<div className={styles2.formBlock}>
								<div className={styles2.formRow}>
									<div style={{ width: 468 }}>
										<InputAutocomplete
											name={'goal'}
											block={true}
											closeOnSelect={true}
											className="inputGoal"
											size="s"
											options={getFilteredGoals()}
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
									</div>
									<div style={{ width: 468 }}>
										<InputAutocomplete
											name={'role'}
											block={true}
											closeOnSelect={true}
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
									</div>
								</div>
								<div style={{ width: 720 }}>
									<InputAutocomplete
										name={'competence'}
										value={valueCompetence}
										block={true}
										multiple={multiple}
										allowUnselect={true}
										closeOnSelect={true}
										onChange={handleChangeCompetence}
										onInput={handleInputCompetence}
										options={getFilteredOptionsCompetence()}
										Arrow={shownChevron ? Arrow : undefined}
										inputProps={{
											onClear: () => setValueCompetence(''),
											clear: true,
										}}
										showEmptyOptionsList={true}
										className={styles.inputCompetence}
										size="s"
										label="Компетенция *"
										placeholder="Начните вводить название"
									></InputAutocomplete>
								</div>
								<div className={styles2.formRowTag}>
									{valueCompetence.length > 0
										? tagValues.map((value: string, key: number) => {
												return (
													<div
														key={value.length + 1}
														style={{ maxWidth: '319' }}
													>
														<FilterTag
															showClear={true}
															size="xxs"
															shape="rounded"
															view="filled"
															checked={true}
															onClear={() => setValueCompetence('')}
														>
															{value}
														</FilterTag>
													</div>
												);
											})
										: ''}
								</div>
								<div className={styles2.formRow}>
									<div style={{ width: 468 }}>
										<InputAutocomplete
											name={'mentor'}
											block={true}
											closeOnSelect={true}
											className={styles.inputMentor}
											size="s"
											options={getFilteredMentor()}
											label="Ментор"
											placeholder="Начните вводить название"
											onChange={handleChangeMentor}
											onInput={handleInputMentor}
											Arrow={shownChevron ? Arrow : undefined}
											value={valueMentor}
											allowUnselect={true}
											inputProps={{
												onClear: () => setValueMentor(''),
												clear: true,
											}}
										></InputAutocomplete>
									</div>

									<div style={{ width: 222 }}>
										<UniversalDateInput
											block={true}
											view="date"
											label="Дата создания"
											size="s"
											value={valueStartDate}
											onChange={handleChangeStartDate}
											picker={true}
											Calendar={CalendarDesktop}
											calendarProps={{
												selectorView: 'month-only',
											}}
											clear={true}
											onClear={(e) => {
												e.stopPropagation();
												setStartDate('');
											}}
										/>
									</div>
									<div style={{ width: 222 }}>
										<UniversalDateInput
											block={true}
											view="date"
											label="Дата завершения"
											size="s"
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
									<div
										style={{
											width: 960,
										}}
									>
										<Textarea
											fieldClassName={styles2.textClass}
											maxHeight={91}
											label="Описание"
											labelView="inner"
											size="m"
											block={true}
											maxLength={96}
											showCounter={true}
											autosize={true}
										/>
									</div>
									<div
										style={{
											width: 960,
										}}
									>
										<Textarea
											fieldClassName={styles2.textClass}
											maxHeight={91}
											label="Комментарий (виден только вам)"
											labelView="inner"
											size="m"
											block={true}
											maxLength={96}
											showCounter={true}
											autosize={true}
										/>
									</div>
								</div>
							</div>
						</fieldset>

						<fieldset className={styles2.blockWrapper}>
							<legend className={styles2.blockTitle}>Задачи</legend>
							<Tasks />
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
			<Footer></Footer>
		</>
	);
};
