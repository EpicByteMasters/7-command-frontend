import React, {
	ChangeEvent,
	useState,
	ReactNode,
	useMemo,
	useEffect,
} from 'react';
import { useAppSelector } from '../../shared/hooks/redux';
import { useParams } from 'react-router-dom';
import styles from './tasks.module.scss';
import { Table } from '@alfalab/core-components/table';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { Status } from '@alfalab/core-components/status';
import { BaseOption } from '@alfalab/core-components/select/components/base-option';
import type { OptionShape } from '@alfalab/core-components/select/typings';
import { Textarea } from '@alfalab/core-components/textarea';
import { UniversalDateInput } from '@alfalab/core-components/universal-date-input';
import { CalendarDesktop } from '@alfalab/core-components/calendar/desktop';
import { Collapse } from '@alfalab/core-components/collapse';
import { InputAutocomplete } from '@alfalab/core-components/input-autocomplete';
import { Arrow } from '@alfalab/core-components/select/components/arrow';
import { PickerButtonDesktop } from '@alfalab/core-components/picker-button/desktop';
import linkToCourses from '../../images/link-gotocourses.png';
import { Attach } from '@alfalab/core-components/attach';
import { FileUploadItem } from '@alfalab/core-components/file-upload-item';
import { Button } from '@alfalab/core-components/button';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { CheckmarkCircleMIcon } from '@alfalab/icons-glyph/CheckmarkCircleMIcon';
// import { courses } from '../../shared/utils/constants';
import { tasksData } from '../../shared/utils/constants';
import type { ICommonLibWithEducationType } from '../../store/reducers/libSlice';

import { selectCommonLibsEducation } from '../../store/reducers/libSlice';
import {
	Task,
	getIprByIdByEmployee,
	IprData,
} from '../../store/reducers/iprsSlice';
import { useDispatch } from 'react-redux';

interface TasksProps {
	isEmployee: boolean;
	handleTaskValuesChange?: any;
}

// interface IEducation {
// 	id: number;
// 	name: string;
// 	specialty: string;
// 	urlLink: string;
// }

interface ICoursesOption extends OptionShape {
	value: ICommonLibWithEducationType;
}

type TCoursenOptionProp = 'name' | 'specialty';

interface Education {
	name: string;
	url: string;
	status: string;
}

interface FormData {
	id: number;
	name: string;
	closeDate: string;
	description: string;
	educations: Education[];
	supervisorComment: string;
	commentOfEmployee: string;
}

interface IFilesForTask {
	[taskId: string]: File[];
}

export const Tasks: React.FC<TasksProps> = ({
	isEmployee,
	handleTaskValuesChange,
}) => {
	const dispatch = useDispatch();
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		console.log('пришли в запрос на tasks');
		const fetchIprData = async () => {
			console.log('сделали запрос на tasks');
			try {
				const iprDataResult = await dispatch(
					getIprByIdByEmployee(Number(id)) as any
				);

				if (getIprByIdByEmployee.fulfilled.match(iprDataResult)) {
					console.log('Получили Ипр по id:', iprDataResult.payload);
				} else {
					console.error(
						'Error during fetching IPRS data:',
						iprDataResult.error
					);
				}
			} catch (error) {
				console.error('Error during fetching user data:', error);
			}
		};

		fetchIprData();
	}, [dispatch, id]);

	const IPR = useAppSelector((state) => state.iprs.openedIpr);
	console.log('IPR: ', IPR);

	const courses = useAppSelector(selectCommonLibsEducation);
	console.log('optionCourses: ', courses);

	//utils
	const adaptCompetency = (
		course: ICommonLibWithEducationType
	): ICoursesOption => ({
		key: course.specialty,
		content: course.name.trim(),
		value: course,
	});

	const courseOptionList = useMemo<ICoursesOption[]>(
		() => courses.map((courseOption: any) => adaptCompetency(courseOption)),
		[courses]
	);

	// const isExecutive = useAppSelector((state) => state.user.user.isSupervisor);
	const pickerOptions = [
		{ key: 'В работе' },
		{ key: 'Выполнена' },
		{ key: 'Не выполнена' },
		{ key: 'Отменена' },
	];

	const [taskValues, setTaskValues] = React.useState<FormData>({
		id: 0,
		name: '',
		closeDate: '',
		description: '',
		educations: [],
		supervisorComment: '',
		commentOfEmployee: '',
	});

	const [shownChevron, setShownChevron] = React.useState(true);
	const [multiple, setMultiple] = React.useState(true);
	const [progress, setProgress] = useState<number | undefined>(0);
	const [valueCourse, setValueCourse] = useState<string>('');
	const [expandedTasks, setExpandedTasks] = useState<Record<number, boolean>>(
		{}
	);
	const [valueEndDate, setEndDate] = useState<string>('');
	const [filesForTask, setFilesForTask] = useState<IFilesForTask>({});

	const handleAttach = (
		taskId: number,
		event: React.ChangeEvent<HTMLInputElement>,
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

	if (!currentIpr) {
		return <div>Ошибка не нашел Id</div>;
	}

	const tasksArrayForRender = currentIpr.task;

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

	function formatDateToCustomFormat(dateString: any) {
		console.log('dateString: ', dateString);
		const months = [
			'января',
			'февраля',
			'марта',
			'апреля',
			'мая',
			'июня',
			'июля',
			'августа',
			'сентября',
			'октября',
			'ноября',
			'декабря',
		];

		const [year, month, day] = dateString.split('-').map(Number);

		const formattedDate = `${day} ${months[month - 1]}`;

		return `до ${formattedDate}`;
	}

	function formatDate(inputDate: string): string {
		const [year, month, day] = inputDate.split('-');
		const formattedDate: string = `${day}.${month}.${year}`;
		return formattedDate;
	}

	function matchOption(option: ICoursesOption, inputValue: string) {
		return (
			isOptionMatchByProp(option, 'name', inputValue) ||
			isOptionMatchByProp(option, 'specialty', inputValue)
		);
	}

	function isOptionMatchByProp(
		option: ICoursesOption,
		prop: TCoursenOptionProp,
		inputValue: string
	) {
		const optionPropValue = option.value[prop];

		if (typeof optionPropValue !== 'string') {
			return false;
		}

		return optionPropValue
			.toLowerCase()
			.includes((inputValue || '').toLowerCase());
	}

	//utils
	function filerOption(option: ICoursesOption, inputValues: string[]) {
		if (inputValues.includes(option.value.name.trim())) {
			return true;
		}

		return (
			typeof option?.value.name === 'string' &&
			inputValues.includes(option.value.name.trim())
		);
	}

	const inputValues = valueCourse.split(',').map((value) => value.trim());

	const selectedOptions = courseOptionList.filter((course) =>
		filerOption(course, inputValues)
	);

	function getOptionContent(option: OptionShape) {
		return option.value.name;
	}

	function getOptionsInputValue(selectedMultiple: OptionShape[]) {
		return selectedMultiple.map(getOptionContent).join(', ');
	}

	const makeMultipleValue = (selectedMultiple: OptionShape[]) =>
		`${getOptionsInputValue(selectedMultiple)}, `;

	const handleChangeCourse = ({
		selectedMultiple,
	}: {
		selectedMultiple: OptionShape[];
	}): void => {
		setValueCourse(makeMultipleValue(selectedMultiple));
	};

	const handleInputCourse = (_: unknown, { value }: { value: string }) =>
		setValueCourse(value);

	const selected = selectedOptions.map((option) => option.value.specialty);

	const getFilteredOptions = () => {
		return inputValues.length === selected.length
			? courseOptionList
			: courseOptionList.filter((option) => {
					return (
						selectedOptions.includes(option) ||
						matchOption(option, inputValues[inputValues.length - 1])
					);
				});
	};

	return (
		<Table className={styles.table}>
			<Table.TBody>
				{tasksArrayForRender.map(
					({
						id,
						name,
						closeDate,
						description,
						taskStatus,
						supervisorComment,
					}: Task) => (
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
								<Table.TRow className={styles.row}>
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
												{!isEmployee && (
													<div className={styles.coursesWrapper}>
														<InputAutocomplete
															size="s"
															name="course"
															selected={selected}
															options={getFilteredOptions()}
															label="Тренинги и курсы"
															placeholder="Начните вводить название"
															onChange={handleChangeCourse}
															onInput={handleInputCourse}
															value={valueCourse}
															Arrow={shownChevron ? Arrow : undefined}
															multiple={multiple}
															allowUnselect={true}
															showEmptyOptionsList={true}
															Option={BaseOption}
															block={true}
															closeOnSelect={true}
															className={styles.inputCourses}
															inputProps={{
																onClear: () => setValueCourse(''),
																clear: true,
															}}
														/>
														<img
															src={linkToCourses}
															alt="ссылка на курсы"
															className={styles.linkToCourses}
														/>
													</div>
												)}

												<div className={styles.formRowTag}>
													{valueCourse.length > 0
														? tagValues.map((value: string, key: number) => {
																return (
																	<div key={value.length + 1}>
																		<div
																			className={styles.formTag}
																			onClick={onDeleteTag}
																		>
																			<div className={styles.formCircle}>
																				<CrossCircleMIcon />
																			</div>
																			{value}
																		</div>
																	</div>
																);
															})
														: ''}
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
														{!isEmployee && (
															<div
																style={{
																	display: 'flex',
																	flexDirection: 'row',
																	justifyContent: 'flex-end',
																}}
															>
																<PickerButtonDesktop
																	options={pickerOptions}
																	view="primary"
																	label="В работе"
																/>
															</div>
														)}
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
