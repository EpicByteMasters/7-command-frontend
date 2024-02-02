import styles2 from './tasks-overview-form.module.scss';
import React, { FC, ChangeEvent, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { InputAutocomplete } from '@alfalab/core-components/input-autocomplete';
import { Arrow } from '@alfalab/core-components/select/components/arrow';
import { CalendarDesktop } from '@alfalab/core-components/calendar/desktop';
import { Textarea } from '@alfalab/core-components/textarea';
import { FilterTag } from '@alfalab/core-components/filter-tag';
import { UniversalDateInput } from '@alfalab/core-components/universal-date-input';
import { Notification } from '@alfalab/core-components/notification';
import avatarMentor from '../../images/avatars/avatar_mentor1.png';

import {
	goal,
	role,
	mentor,
	objCompetence,
} from '../../shared/utils/constants';
import { useAppSelector } from '../../shared/hooks/redux';
import {
	selectCommonLibsIPRGoals,
	selectCommonLibsSpecialty,
	selectCommonLibsIPRCompetency,
} from '../../store/reducers/libSlice';

interface ManagerIprDraftProps {
	isExecutive: boolean;
	iprStatus: string;
	handleGoalValuesChange?: any;
}
interface OptionShape {
	key: string;
}

export const TasksOverview = ({
	isExecutive,
	iprStatus,
	handleGoalValuesChange,
}: ManagerIprDraftProps) => {
	const pickerOptions = [
		{ key: 'В работе' },
		{ key: 'Выполнена' },
		{ key: 'Не выполнена' },
		{ key: 'Отменена' },
	];
	// Преобразование объекта с данными комптенций в массив с key:value
	const newObj = objCompetence.map((item) => ({ key: item.name }));
	// Подключение БД данных по знаячениям импутов
	const iprGoals = useAppSelector(selectCommonLibsIPRGoals);
	const specialty = useAppSelector(selectCommonLibsSpecialty);
	const iprCompetency = useAppSelector(selectCommonLibsIPRCompetency);
	// Константы из /utils/constants
	const optionsRole: OptionShape[] = role;
	const optionsGoal: OptionShape[] = goal;
	const optionsMentor: OptionShape[] = mentor;
	const optionsCompetence: OptionShape[] = newObj;
	// Стейты
	const [multiple, setMultiple] = useState(true);
	const [shownChevron, setShownChevron] = useState(true);

	const [valueGoal, setValueGoal] = useState<string>(
		isExecutive ? '' : 'Соответствие занимаемой должности'
	);
	const [valueRole, setValueRole] = useState<string>(
		isExecutive ? '' : 'Руководитель'
	);
	const [valueMentor, setValueMentor] = useState<string>(
		isExecutive ? '' : 'Евдокимов Сергей Семёнович'
	);
	const [valueCompetence, setValueCompetence] = useState<string>(
		isExecutive
			? ''
			: 'Ведение переговоров, Делегирование, Лидерство, Понимание бизнеса и структуры организации, Построение эффективных процессов, Публичные выступления, Стратегическое мышление, Управление конфликтами'
	);
	const [valueStartDate, setStartDate] = useState<string>('2024-08-01');
	const [valueEndDate, setEndDate] = useState<string>(
		isExecutive ? '' : '2024-09-01'
	);
	const [valueDescription, setValueDescription] = useState<string>(
		isExecutive
			? ''
			: 'Выработаем план развития для достижения поставленных целей'
	);
	const [valueComment, setValueComment] = useState<string>('');

	// Ошибки
	const [errorGoal, setErrorGoal] = useState<string>('');
	const [errorRole, setErrorRole] = useState<string>('');
	const [errorCompetence, setErrorCompetence] = useState<string>('');
	const [errorComment, setErrorComment] = useState<string>('');
	const [errorDescription, setErrorDescription] = useState<string>('');
	const [isVisible, setIsVisible] = useState(false);

	//Уведомления
	const toggleVisibility = useCallback(() => setIsVisible((prev) => !prev), []);
	const hideNotification = useCallback(() => setIsVisible(false), []);

	//Получаем данные текущегоИПР с Сервера
	const iprData = useAppSelector((state) => state.iprs.iprsData);
	const { id } = useParams<{ id: string }>();
	const currentIpr: any | undefined = iprData.find(
		(goal: any) => goal.id === Number(id)
	);
	const [currentIpr2, setCurrentIpr] = useState(currentIpr);

	// console.log(currentIpr, currentIpr2, '!STATE-CurrentIpr');

	// console.log(currentIpr.goal, '!Competency');
	// if (!currentIpr) {
	// 	return <div>Ошибка не нашел Id</div>;
	// }

	// Значение Filter Tags без replace()
	const tagValues = valueCompetence.trim().split(',');

	// Поиск id Цели
	const goalId: string | undefined = iprGoals.find(
		(o) => o.name === valueGoal
	)?.id;

	// Поиск id Роли
	const roleId: string | undefined = specialty.find(
		(o) => o.name === valueRole
	)?.id;

	// Поиск id Компетенций
	const result = iprCompetency.filter((obj) =>
		tagValues.map((item) => item.trim()).includes(obj.name)
	);
	const idArray = result.map((item) => item.id);

	// console.log(idArray, 'RESULTS ARRAY');

	const taskValues = {
		goal: goalId,
		specialty: roleId,
		competency: idArray,
		createDate: valueStartDate,
		closeDate: valueEndDate,
		mentorId: '', // из стора подтянуть mentorId
		description: valueDescription,
		comment: valueComment,
		iprStatus: iprStatus,
	};
	const handleCallback = (): void => {
		handleGoalValuesChange(taskValues);
	};

	const matchOption = (option: OptionShape, inputValue: string): boolean =>
		option.key.toLowerCase().includes((inputValue || '').toLowerCase());

	// Обработка импутов - Goal
	const handleInputGoal = (
		event: ChangeEvent<HTMLInputElement> | null,
		{ value }: { value: string }
	) => {
		if (value) {
			setValueGoal(value);
			setErrorGoal('');
			handleCallback();
		}
		if (errorGoal || !value) {
			setErrorGoal('');
			setValueGoal('');
		}
		// handleCallback();
	};

	const handleChangeGoal = ({ selected }: { selected: OptionShape | null }) => {
		if (selected && !errorGoal) {
			setValueGoal(selected.key);
			setErrorGoal('');
			handleCallback();
		}
		if (!selected) {
			setErrorGoal('Обязательное поле');
			setValueGoal('');
			toggleVisibility();
		}
	};

	const getFilteredGoals = (): OptionShape[] => {
		return optionsGoal.some(({ key }) => key === valueGoal)
			? optionsGoal
			: optionsGoal.filter((option) => matchOption(option, valueGoal));
	};

	// Обработка импутов - Role

	const handleInputRole = (
		event: ChangeEvent<HTMLInputElement> | null,
		{ value }: { value: string }
	) => {
		if (value) {
			setValueRole(value);
			handleCallback();
			setErrorRole('');
		}
		if (errorRole || !value) {
			setValueRole('');
			setErrorRole('');
			// handleCallback();
		}
	};

	const handleChangeRole = ({ selected }: { selected: OptionShape | null }) => {
		if (selected && !errorRole) {
			setValueRole(selected.key);
			handleCallback();
			setErrorRole('');
		}
		if (!selected) {
			setErrorRole('Обязательное поле');
			setValueRole('');
			toggleVisibility();
		}
	};

	const getFilteredRoles = (): OptionShape[] => {
		return optionsRole.some(({ key }) => key === valueRole)
			? optionsRole
			: optionsRole.filter((option) => matchOption(option, valueRole));
	};

	// Обработка импутов - Mentor

	const handleInputMentor = (
		event: ChangeEvent<HTMLInputElement> | null,
		{ value }: { value: string }
	) => {
		// setValueMentor(value);
		handleCallback();
		setErrorRole('');
	};

	const handleChangeMentor = ({
		selected,
	}: {
		selected: OptionShape | null;
	}) => {
		setValueMentor(selected ? selected.key : '');
		handleCallback();
		toggleVisibility();
	};

	const getMentor = (id: number) => {
		switch (id) {
			case 5:
				return 'Хорошёва Анна Дмитриевна';
			case 4:
				return 'Чаевская Евгения Владимировна';
			case 2:
				return 'Куприна Валентина Ивановна';
			default:
				return '';
		}
	};

	// Обработка импутов - Description

	function handleInputDescription(
		event: ChangeEvent<HTMLTextAreaElement>
	): void {
		event.preventDefault();
		const target = event.target as HTMLTextAreaElement;
		const regexp = /[а-я\d ,.]+/iu;

		if (target.name === 'description' && regexp.test(target.value)) {
			setValueDescription(target.value);
			handleCallback();
		}
		if (!target.value) {
			setErrorDescription(
				'Допустимы только латинские и кириллические буквы и символы, числа и знаки препинания'
			);
			setErrorDescription('');
			setValueDescription('');

			return;
		}
	}
	// Обработка импутов - Comment

	function handleInputComment(event: ChangeEvent<HTMLTextAreaElement>): void {
		event.preventDefault();
		const target = event.target as HTMLTextAreaElement;
		const regexp = /[а-я\d ,.]+/iu;

		if (target.name === 'comment' && regexp.test(target.value)) {
			setValueComment(target.value);
			handleCallback();
		}
		if (!target.value) {
			setErrorComment(
				'Допустимы только латинские и кириллические буквы и символы, числа и знаки препинания'
			);
			setValueComment('');

			setErrorComment('');

			return;
		}
	}

	// Импуты для ДАТ

	const handleChangeStartDate = (event: any, { value }: { value: string }) => {
		// setStartDate(value);
		var d = new Date(Date.now()).toLocaleString().split(',')[0];
		d.toString();
		setStartDate(d);
	};
	const handleChangeEndDate = (event: any, { value }: { value: string }) => {
		setEndDate(value);
	};

	function convertDate(dateString: any) {
		const parts = dateString.split('-');
		const year = parts[0];
		const month = parts[1];
		const day = parts[2];

		return `${day}.${month}.${year}`;
	}

	// Обработка фильтры поиска значения

	const getFilteredMentor = (): OptionShape[] => {
		return optionsMentor.some(({ key }) => key === valueMentor)
			? optionsMentor
			: optionsMentor.filter((option) => matchOption(option, valueMentor));
	};

	// Все хендлеры для импута - Competence
	const handleInputCompetence = (
		event: ChangeEvent<HTMLInputElement> | null,
		{ value }: { value: string }
	) => {
		setValueCompetence(value);
		handleCallback();
		// setErrorCompetence('');
	};
	const inputValues: string[] = valueCompetence.split(', ');
	const selectedOptions: OptionShape[] = optionsCompetence.filter((option) =>
		inputValues.includes(option.key.trim())
	);

	const selected: string[] | OptionShape = multiple
		? selectedOptions.map((option) => option.key)
		: optionsCompetence.find((o) => o.key === inputValues[0]) || [];

	// console.log(inputValues, 'input');
	// console.log(tagValues, 'tag');

	const handleChangeCompetence = ({
		selected,
		selectedMultiple,
	}: {
		selected: OptionShape | null;
		selectedMultiple: OptionShape[] | null;
	}): void => {
		if (multiple) {
			const value = selectedMultiple?.length
				? selectedMultiple.map((option) => option.key).join(',') + ' '
				: '';
			setValueCompetence(value);
			handleCallback();
			setErrorCompetence('');
			if (!value) {
				setErrorCompetence('Обязательное поле');
				toggleVisibility();
			}
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

	// console.log(convertedDate, 'DATE');

	return (
		<>
			{/* {!currentIpr ? (
				<div>Данные IPR отсутствуют или ещё не загружены с сервера</div>
			) : ( */}
			<fieldset className={styles2.blockWrapper}>
				<React.Fragment key={id}>
					<legend className={styles2.blockTitle} onClick={handleCallback}>
						Общее описание
					</legend>
					<div className={styles2.formBlock}>
						<div className={styles2.formRow}>
							<div style={{ width: 496 }}>
								<InputAutocomplete
									error={errorGoal}
									name="goal"
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
									value={isExecutive ? valueGoal : currentIpr.goal.name}
									allowUnselect={true}
									showEmptyOptionsList={true}
									inputProps={{
										onClear: () => setValueGoal(''),
										clear: true,
									}}
									disabled={isExecutive ? false : true}
								></InputAutocomplete>
							</div>
							<div style={{ width: 496 }}>
								<InputAutocomplete
									error={errorRole}
									name="role"
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
									value={isExecutive ? valueRole : currentIpr.specialty.name}
									allowUnselect={true}
									inputProps={{
										onClear: () => setValueRole(''),
										clear: true,
									}}
									disabled={isExecutive ? false : true}
								></InputAutocomplete>
							</div>
						</div>
						<div>
							<InputAutocomplete
								error={errorCompetence}
								name="competence"
								value={
									isExecutive
										? valueCompetence
										: currentIpr.competency[0].competencyRel.name
								}
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
								className={styles2.inputCompetence}
								size="s"
								label="Компетенция *"
								placeholder="Начните вводить название"
								disabled={isExecutive ? false : true}
							></InputAutocomplete>
						</div>
						<div className={styles2.formRowTag}>
							{valueCompetence.length > 0
								? tagValues.map((value: string, key: number) => {
										return (
											<div key={value.length + 1} style={{ maxWidth: '319' }}>
												<FilterTag
													disabled={isExecutive ? false : true}
													showClear={true}
													size="xxs"
													shape="rounded"
													view="filled"
													checked={false}
													onClear={() => {
														setValueCompetence('');
													}}
												>
													{value}
												</FilterTag>
											</div>
										);
									})
								: ''}
							{/* {!isExecutive
							? [...currentIpr.competency[0].competencyRel].map(
									(id: string, name: number) => {
										return (
											<div key={id.length + 1} style={{ maxWidth: '319' }}>
												<FilterTag
													disabled={isExecutive ? false : true}
													showClear={true}
													size="xxs"
													shape="rounded"
													view="filled"
													checked={true}
													onClear={() => {
														setValueCompetence('');
													}}
												>
													{name}
												</FilterTag>
											</div>
										);
									}
								)
							: ''} */}
							{/* {valueCompetence.length > 0
								? tagValues.map((value: string, key: number) => {
										return (
											<div key={value.length + 1} style={{ maxWidth: '319' }}>
												<FilterTag
													disabled={isExecutive ? false : true}
													showClear={true}
													size="xxs"
													shape="rounded"
													view="filled"
													checked={true}
													onClear={() => {
														setValueCompetence('');
													}}
												>
													{isExecutive
														? value
														: currentIpr.competency[0].competencyRel.name}
												</FilterTag>
											</div>
										);
									})
								: ''} */}
						</div>
						<div className={styles2.formRow}>
							<div>
								<InputAutocomplete
									name="mentor"
									block={true}
									closeOnSelect={true}
									className={styles2.inputMentor}
									size="s"
									options={getFilteredMentor()}
									label="Ментор"
									placeholder="Начните вводить название"
									onChange={handleChangeMentor}
									onInput={handleInputMentor}
									Arrow={shownChevron ? Arrow : undefined}
									value={
										isExecutive
											? valueMentor
											: getMentor(currentIpr.supervisorId)
									}
									allowUnselect={true}
									inputProps={{
										onClear: () => setValueMentor(''),
										clear: true,
									}}
									disabled={isExecutive ? false : true}
								></InputAutocomplete>

								{!isExecutive && iprStatus === 'черновик' ? (
									<img
										className={styles2.avatarMentor}
										src={avatarMentor}
										alt="avatar"
									></img>
								) : (
									''
								)}
							</div>

							<div style={{ width: 236 }}>
								<UniversalDateInput
									name="startDate"
									block={true}
									view="date"
									label="Дата создания"
									size="s"
									value={convertDate(valueStartDate)}
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
									disabled={true}
								/>
							</div>
							<div style={{ width: 236 }}>
								<UniversalDateInput
									name="endDate"
									block={true}
									view="date"
									label="Дата завершения"
									size="s"
									value={isExecutive ? '' : convertDate(valueEndDate)}
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
									disabled={true}
								/>
							</div>
							<div
								style={{
									width: 1016,
								}}
							>
								<Textarea
									error={errorDescription}
									name="description"
									value={
										isExecutive ? valueDescription : currentIpr.description
									}
									onChange={handleInputDescription}
									fieldClassName={styles2.textClass}
									maxHeight={91}
									label="Описание"
									labelView="inner"
									size="m"
									block={true}
									minLength={0}
									maxLength={96}
									showCounter={true}
									autosize={true}
									disabled={isExecutive ? false : true}
								/>
							</div>
							<div
								style={{
									width: 1016,
								}}
							>
								{isExecutive ? (
									<Textarea
										error={errorComment}
										name="comment"
										onChange={handleInputComment}
										fieldClassName={styles2.textClass}
										maxHeight={91}
										label="Комментарий (виден только вам)"
										labelView="inner"
										size="m"
										block={true}
										minLength={0}
										maxLength={96}
										showCounter={true}
										autosize={true}
										disabled={isExecutive ? false : true}
										value={isExecutive ? valueComment : currentIpr.comment}
									/>
								) : (
									''
								)}
							</div>
						</div>
					</div>
				</React.Fragment>
			</fieldset>
			{/* )} */}
			{isVisible ? (
				<div className={styles2.containerNote}>
					<Notification
						title={'Не отправлено в работу'}
						block={true}
						colors={'default'}
						titleClassName={styles2.title}
						contentClassName={styles2.content}
						hasCloser={true}
						badge={'negative'}
						visible={isVisible}
						offset={240}
						autoCloseDelay={2500}
						zIndex={10}
						onClose={hideNotification}
						onCloseTimeout={hideNotification}
						usePortal={true}
					>
						{'Заполните все обязательные поля'}
					</Notification>
				</div>
			) : (
				''
			)}
		</>
	);
};
