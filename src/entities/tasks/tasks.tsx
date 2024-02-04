import React, {
	ChangeEvent,
	ReactNode,
	useMemo,
	useEffect,
	useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';

// -----------------------------------------------------------------------------

import type { OptionShape } from '@alfalab/core-components/select/typings';

import { Table } from '@alfalab/core-components/table';
import { Button } from '@alfalab/core-components/button';
import { Status } from '@alfalab/core-components/status';
import { BaseOption } from '@alfalab/core-components/select/components/base-option';
import { Textarea } from '@alfalab/core-components/textarea';
import { Arrow } from '@alfalab/core-components/select/components/arrow';
import { Attach } from '@alfalab/core-components/attach';
import { Collapse } from '@alfalab/core-components/collapse';
import { UniversalDateInput } from '@alfalab/core-components/universal-date-input';

import { InputAutocomplete } from '@alfalab/core-components/input-autocomplete';

import { CalendarDesktop } from '@alfalab/core-components/calendar/desktop';
import { PickerButtonDesktop } from '@alfalab/core-components/picker-button/desktop';

import { FileUploadItem } from '@alfalab/core-components/file-upload-item';

import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';

// -----------------------------------------------------------------------------

import type { IIprData, ITask } from '../../store/reducers/iprSlice';

// -----------------------------------------------------------------------------

import { getIprByIdByEmployee } from '../../store/reducers/iprSlice';

import { selectCommonLibsEducation } from '../../store/reducers/libSlice';

// -----------------------------------------------------------------------------

import { useAppSelector } from '../../shared/hooks/redux';

// -----------------------------------------------------------------------------

import type {
	ITasksProps,
	IEducation,
	IFormData,
	ICoursesOption,
	IEducationTypeDTO,
	IFilesForTask,
} from './type';

// ----------------------------------------------------------------------------

import { MONTH_FULL_NAME_LIST, PICKER_OPTIONS } from './const';

// ----------------------------------------------------------------------------

import {
	getArrLastEl,
	isCourseSelectedOption,
	isCourseFilteredOption,
	formatDateToCustomFormat,
} from './util';

// ----------------------------------------------------------------------------

import linkToCourses from '../../images/link-gotocourses.png';
import styles from './tasks.module.scss';

// ----------------------------------------------------------------------------

// utils
const adaptCompetency = (course: IEducationTypeDTO): ICoursesOption => ({
	key: course.specialty,
	content: course.name.trim(),
	value: course,
});

// ----------------------------------------------------------------------------

export const Tasks: FC<ITasksProps> = ({
	isEmployee,
	handleTaskValuesChange,
}) => {
	const dispatch = useDispatch();
	const { id } = useParams<{ id: string }>();
	const [selectedOption, setSelectedOption] = useState(''); // Состояние выбранной опции Селекта

	const iprCurrentData = useAppSelector((state) => state.ipr.ipr);

	console.log('IPR: ', iprCurrentData);

	const courses = useAppSelector(selectCommonLibsEducation);
	console.log('optionCourses: ', courses);

	//#region State

	const [taskValues, setTaskValues] = React.useState<IFormData>({
		id: 0,
		name: '',
		closeDate: '',
		description: '',
		education: [],
		supervisorComment: '',
		commentOfEmployee: '',
	});

	const [shownChevron, setShownChevron] = useState(true);
	const [multiple, setMultiple] = useState(true);
	const [progress, setProgress] = useState<number | undefined>(0);
	const [valueCourse, setValueCourse] = useState<string>('');
	const [expandedTasks, setExpandedTasks] = useState<Record<number, boolean>>(
		{}
	);
	const [valueEndDate, setEndDate] = useState<string>('');
	const [filesForTask, setFilesForTask] = useState<IFilesForTask>({});
	const navigate = useNavigate();

	//#endregion

	//#region Computed

	/** Опции тренингов и курсов */
	const courseOptionList = useMemo<ICoursesOption[]>(
		() => courses.map((courseOption) => adaptCompetency(courseOption)),
		[courses]
	);

	/** Введённые значения */
	const inputValues: string[] = useMemo(
		() => valueCourse.split(',').map((value) => value.trim()),
		[valueCourse]
	);

	/** Последнее ведённое значение */
	const coursesInputLastValue = useMemo(
		() => getArrLastEl(inputValues),
		[inputValues]
	);

	/** Выбранные опции */
	const optionsSelected = useMemo(
		() =>
			courseOptionList.filter((course) =>
				isCourseSelectedOption(course, inputValues)
			),
		[courseOptionList, inputValues]
	);

	/** Фильтрованные опции курсов */
	const filteredOptions = useMemo(
		() =>
			courseOptionList.filter((option) =>
				isCourseFilteredOption(optionsSelected, option, coursesInputLastValue)
			),
		[optionsSelected, coursesInputLastValue]
	);

	//#endregion

	const handleAttach = (
		taskId: number,
		event: ChangeEvent<HTMLInputElement>,
		payload: { files: File[] }
	) => {
		setFilesForTask((prevFiles) => ({
			...prevFiles,
			[taskId]: [...(prevFiles[taskId] || []), ...payload.files],
		}));
	};

	console.log('taskValues из задач: ', taskValues);

	const handleCallback = (): void => {
		handleTaskValuesChange(taskValues);
	};

	const iprData = useAppSelector((state) => state.iprs.iprsData);
	console.log('iprData в tasks: ', iprData);
	const currentIpr = iprData.find((goal: any) => goal.id === Number(id));
	console.log('currentIpr: ', currentIpr);

	if (!currentIpr) {
		return <div>Ошибка не нашел Id</div>;
	}

	// console.log('currentIpr: ', currentIpr);

	const tasksArrayForRender = iprCurrentData?.task;
	console.log('tasksArrayForRender', tasksArrayForRender);

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void => {
		const { name, value } = event.target;
		setTaskValues((prevData) => ({ ...prevData, [name]: value }));
		handleCallback();
	};

	const tagValues = valueCourse.trim().split(',');

	const handleChangeEndDate = (event: any, { value }: { value: string }) => {
		setEndDate(value);
		setTaskValues((prevData) => ({ ...prevData, endDate: value }));
		handleCallback();
	};

	const chevronClick = (taskId: number) => {
		setExpandedTasks((prevExpandedTasks) => ({
			...prevExpandedTasks,
			[taskId]: !prevExpandedTasks[taskId],
		}));
	};

	const simulateProgress = () => {
		const interval = setInterval(() => {
			setProgress((prevProgress) => {
				if (prevProgress === 100) {
					clearInterval(interval);
					return 100;
				}
				return prevProgress !== undefined ? prevProgress + 1 : 0;
			});
		}, 100);
	};

	const handleChange = () => {
		simulateProgress();
	};

	const onDeleteTag = (event: React.MouseEvent<HTMLDivElement>) => {
		const clickedTagValue = event.currentTarget.textContent;
		const updatedTagValues = tagValues.filter(
			(value) => value !== clickedTagValue
		);

		setValueCourse(updatedTagValues.join(', '));
	};
	const { status } = currentIpr;
	const getStatusColor = (status: string) => {
		switch (status) {
			case 'ожидает проверки':
				return 'purple';
			case 'отменена':
				return 'orange';
			case 'в работе':
				return 'blue';
			case 'не выполнена':
				return 'red';
			case 'выполнена':
				return 'green';
			case 'отсутствует':
				return 'grey';
			default:
				return 'blue';
		}
	};

	console.log('tasksArrayForRender: ', tasksArrayForRender);

	function formatDate(inputDate: string): string {
		const [year, month, day] = inputDate.split('-');
		const formattedDate: string = `${day}.${month}.${year}`;
		return formattedDate;
	}

	//utils

	/** Массив введённых */

	function getOptionContent(option: OptionShape) {
		return option.value.name;
	}

	function getOptionsInputValue(selectedMultiple: OptionShape[]) {
		return selectedMultiple.map(getOptionContent).join(', ');
	}

	const makeMultipleValue = (selectedMultiple: OptionShape[]) =>
		`${getOptionsInputValue(selectedMultiple)}, `;

	//#region Cources

	/** Фильтрованные и выбранные опциии для выпадающего списка */
	const getFilteredOptionsCourses = () =>
		inputValues.length === selected.length ? courseOptionList : filteredOptions;

	// Data
	// --------------------------------------------------------------------------

	/** Выбранные опции для компоннета */
	const selected = courseOptionList
		.filter((course) => isCourseSelectedOption(course, inputValues))
		.map((option) => option.value.name);

	// hadlers
	// --------------------------------------------------------------------------

	/** Обработчик выбора опции */
	const handleChangeCourse = ({
		selectedMultiple,
	}: {
		selectedMultiple: OptionShape[];
	}): void => {
		setValueCourse(makeMultipleValue(selectedMultiple));
	};

	/** Обработчик ввода в поле */
	const handleInputCourse = (_: unknown, { value }: { value: string }) =>
		setValueCourse(value);

	/** Обработчик очистки */
	const onCoursesInputClear = () => setValueCourse('');

	//#endregion

	const navigateToUrl = (urlLink: string) => {
		navigate(urlLink);
	};

	const handleSelectChange = (event: any) => {
		setSelectedOption(event.target.value);
		console.log(selectedOption); // Обновляем состояние выбранной опции выбора статуса - Селект
	};
	return (
		<Table className={styles.table}>
			<Table.TBody>
				{tasksArrayForRender?.map(
					({
						id,
						name,
						taskStatus,
						description,
						supervisorComment,
						closeDate,
						education,
						comment,
					}: ITask) => (
						<React.Fragment key={id}>
							<Table.TRow className={styles.row}>
								<Table.TCell className={styles.cellWithIcon}>
									{!isEmployee &&
										(taskStatus.name === 'Выполнена' ||
											taskStatus.name === 'Не выполнена') && (
											<CrossCircleMIcon color="#70707A" />
										)}
									{name}
								</Table.TCell>
								<Table.TCell>{formatDateToCustomFormat(closeDate)}</Table.TCell>
								<Table.TCell>
									<Status
										view="soft"
										color={getStatusColor(taskStatus.name.toLowerCase())}
									>
										{taskStatus.name}
									</Status>
								</Table.TCell>
								<Table.TCell>
									<ChevronDownMIcon onClick={() => chevronClick(id)} />
								</Table.TCell>
							</Table.TRow>
							{expandedTasks[id] && (
								<Table.TRow className={styles.row} withoutBorder={true}>
									<Table.TCell colSpan={4}>
										<Collapse expanded={expandedTasks[id]}>
											<div className={styles.openedTask}>
												<div className={styles.wrapper}>
													<Textarea
														fieldClassName={styles.goalName}
														maxHeight={56}
														label="Название*"
														value={name}
														name="name"
														onChange={handleInputChange}
														labelView="inner"
														size="m"
														block={true}
														showCounter={true}
														autosize={true}
														disabled={isEmployee}
													/>
													<UniversalDateInput
														block={true}
														view="date"
														label="Дата завершения"
														size="m"
														value={formatDate(closeDate)}
														onChange={handleChangeEndDate}
														picker={true}
														Calendar={CalendarDesktop}
														disabled={isEmployee}
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
												<Textarea
													fieldClassName={styles.textClass}
													maxHeight={91}
													label="Описание"
													name="description"
													value={description}
													onChange={handleInputChange}
													labelView="inner"
													size="m"
													block={true}
													maxLength={96}
													showCounter={true}
													autosize={true}
													disabled={isEmployee}
												/>
												{/* {!isEmployee && ( */}
												<div className={styles.coursesWrapper}>
													<InputAutocomplete
														size="s"
														name="course"
														label="Тренинги и курсы"
														placeholder="Начните вводить название"
														className={styles.inputCourses}
														block={true}
														closeOnSelect={true}
														showEmptyOptionsList={true}
														Option={BaseOption}
														Arrow={shownChevron ? Arrow : undefined}
														multiple={multiple}
														options={getFilteredOptionsCourses()}
														selected={selected}
														onChange={handleChangeCourse}
														onInput={handleInputCourse}
														allowUnselect={true}
														value={valueCourse}
														inputProps={{
															onClear: onCoursesInputClear,
															clear: true,
														}}
													/>
													<img
														src={linkToCourses}
														alt="ссылка на курсы"
														className={styles.linkToCourses}
													/>
												</div>
												{/* )} */}

												<div className={styles.formRowTag}>
													{education.map((education) => (
														<div key={education.education.id}>
															<div
																className={styles.formTag}
																onClick={onDeleteTag}
															>
																<div className={styles.formCircle}>
																	<CrossCircleMIcon />
																</div>
																{education.education.name}
																<Button
																	size="xxs"
																	view="tertiary"
																	style={{ marginLeft: '550px' }}
																	onClick={() =>
																		navigateToUrl(education.education.urlLink)
																	}
																>
																	Посмотреть результат
																</Button>
															</div>
														</div>
													))}
													{valueCourse.length > 0 &&
														tagValues.map((course: any) => (
															<div
																className={styles.tagContainer}
																key={course.id}
															>
																<div
																	className={styles.formTag}
																	onClick={onDeleteTag}
																>
																	{course.name === 'Подготовка к IELTS' ? (
																		<CheckmarkCircleMIcon fill={'#08C44D'} />
																	) : (
																		<CrossCircleMIcon />
																	)}
																	{course.name}
																	<Button
																		size="xxs"
																		view="tertiary"
																		className={styles.buttonResult}
																	>
																		Посмотреть результат
																	</Button>
																</div>
															</div>
														))}
												</div>

												<Textarea
													fieldClassName={styles.textClass}
													maxHeight={91}
													label="Комментарий руководителя"
													name="commentOfMentor"
													value={supervisorComment}
													onChange={handleInputChange}
													labelView="inner"
													size="m"
													block={true}
													maxLength={96}
													showCounter={true}
													autosize={true}
													disabled={isEmployee}
												/>
												{isEmployee && (
													<Textarea
														fieldClassName={styles.textClass}
														maxHeight={91}
														label="Ваш комментарий"
														name="commentOfEmployee"
														onChange={handleInputChange}
														labelView="inner"
														size="m"
														block={true}
														maxLength={96}
														showCounter={true}
														autosize={true}
													/>
												)}
												{isEmployee && (
													<div>
														<div className={styles.attachWrapper}>
															<p className={styles.attachTitle}>
																Приклепленные файлы
															</p>
															<Attach
																buttonContent="Добавить"
																value={filesForTask[id] || []}
																buttonProps={{
																	style: {
																		backgroundColor: 'transparent',
																		color: '#2A77EF',
																		padding: '0',
																		margin: '0',
																	},
																}}
																size="m"
																onChange={(event, payload) =>
																	handleAttach(id, event, payload)
																}
																multiple={multiple}
																fileClassName={styles.attachButton}
																noFileText=""
																disabled={taskStatus.name !== 'В работе'}
															/>
														</div>
														{filesForTask[id] && (
															<div>
																{filesForTask[id].map((file, index) => (
																	<FileUploadItem
																		key={index}
																		name={file.name}
																		uploadDate="31.01.2024"
																		size={file.size}
																		showDelete={true}
																		downloadLink="/link"
																		className={styles.attachedFile}
																	/>
																))}
															</div>
														)}
														<Button
															view="primary"
															size="s"
															className={styles.button}
															disabled={taskStatus.name !== 'В работе'}
														>
															Отправить на проверку
														</Button>
														{/* // Селектор статуса */}
														<div>
															<select
																value={selectedOption}
																onChange={handleSelectChange}
																style={{
																	display: 'flex',
																	height: '35px',
																	width: '130px',
																	backgroundColor: 'black',
																	color: 'white',
																	borderRadius: '6px',
																	padding: '0 6px',
																	margin: '5px;',
																	font: 'Inter',
																	fontSize: '14px',
																	fontWeight: '500',
																	lineHeight: '20px',
																	letterSpacing: '0em',
																	textAlign: 'left',
																	border: '9px solid black',
																}}
															>
																<option
																	style={{
																		font: 'Inter',
																		fontWeight: '400',
																		fontSize: '20px',
																		backgroundColor: 'white',
																	}}
																	value="В работе"
																>
																	В работе
																</option>
																<option value="Отклонен">Выполнена</option>
																<option value="Сохранен">Отменена</option>
															</select>
														</div>
													</div>
												)}
											</div>
										</Collapse>
									</Table.TCell>
								</Table.TRow>
							)}
						</React.Fragment>
					)
				)}
			</Table.TBody>
		</Table>
	);
};
