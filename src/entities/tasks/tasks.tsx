import React, { ChangeEvent, useState } from 'react';
import styles from './tasks.module.scss';
import { Table } from '@alfalab/core-components/table';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';
import { Status } from '@alfalab/core-components/status';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { Textarea } from '@alfalab/core-components/textarea';
import { UniversalDateInput } from '@alfalab/core-components/universal-date-input';
import { CalendarDesktop } from '@alfalab/core-components/calendar/desktop';
import { Collapse } from '@alfalab/core-components/collapse';
import { FilterTag } from '@alfalab/core-components/filter-tag';
import { InputAutocomplete } from '@alfalab/core-components/input-autocomplete';
import { Arrow } from '@alfalab/core-components/select/components/arrow';
import linkToCourses from '../../images/link-gotocourses.png';
import { Attach } from '@alfalab/core-components/attach';
import { FileUploadItem } from '@alfalab/core-components/file-upload-item';
import { Button } from '@alfalab/core-components/button';
import { courses } from '../../shared/utils/constants';
import { tasksData } from '../../shared/utils/constants';

interface TasksProps {
	isEmployee: boolean;
}

interface OptionShape {
	key: string;
}

export const Tasks: React.FC<TasksProps> = ({ isEmployee }) => {
	const [shownChevron, setShownChevron] = React.useState(true);
	const [multiple, setMultiple] = React.useState(false);
	const [progress, setProgress] = useState<number | undefined>(0);

	const optionsCourses: OptionShape[] = courses;

	const [valueCourse, setValueCourse] = useState<string>('');
	const [tagValues, setTagValues] = useState<string[]>([]);

	// const handleChangeCourse: ({selected: OptionShape | null}): void => {
	//   // Обработка выбора опции в автозаполнении
	//   const selectedOption = optionsCourses.find(option => option.key === payload.value);

	//   if (selectedOption) {
	//     setValueCourse(selectedOption.key);

	//     // Добавление выбранного значения в массив tagValues
	//     setTagValues((prevTagValues) => [...prevTagValues, selectedOption.key]);
	//   }
	// };

	//const selected = optionsCourses.find((o) => o.key === inputValues[0]) || [];

	const handleChangeCourse = ({
		selected,
	}: {
		selected: OptionShape | null;
	}) => {
		setValueCourse(selected ? selected.key : '');
	};

	const handleInputCourse = (
		event: ChangeEvent<HTMLInputElement> | null,
		payload: { value: string }
	) => {
		// Обработка изменения ввода в автозаполнении
		if (event && event.target) {
			// При изменении значения
			setValueCourse(event.target.value);
		} else {
			// При событии очистки
			setValueCourse('');
		}
	};
	const inputValues = valueCourse.replace(/ /g, '').split(',');

	const matchOption = (optionsCourses: any, inputValue: any) =>
		optionsCourses.key.toLowerCase().includes((inputValue || '').toLowerCase());

	const selectedOptions = optionsCourses.filter((option) =>
		inputValues.includes(option.key.trim())
	);

	const getFilteredOptions = () => {
		return optionsCourses.some(({ key }) => key === valueCourse)
			? optionsCourses
			: optionsCourses.filter((option) => matchOption(option, valueCourse));
	};

	const handleClearCourse = () => {
		// Обработка очистки выбранного курса
		setValueCourse('');
	};

	const handleTagRemove = (tagValue: string) => {
		const updatedTags = tagValues.filter((value) => value !== tagValue);
		setTagValues(updatedTags);
	};

	const [expandedTasks, setExpandedTasks] = useState<Record<number, boolean>>(
		{}
	);
	const [valueEndDate, setEndDate] = useState<string>('');

	const handleChangeEndDate = (event: any, { value }: { value: string }) => {
		setEndDate(value);
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

	return (
		<Table className={styles.table}>
			<Table.TBody>
				{tasksData.map(
					({ id, title, deadline, statusColor, statusText, closeButton }) => (
						<React.Fragment key={id}>
							<Table.TRow className={styles.row}>
								<Table.TCell className={styles.cellWithIcon}>
									{closeButton && <CrossCircleMIcon color="#70707A" />}
									{title}
								</Table.TCell>
								<Table.TCell>{deadline}</Table.TCell>
								<Table.TCell>
									<Status view="soft" color={statusColor}>
										{statusText}
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
														labelView="inner"
														size="m"
														block={true}
														showCounter={true}
														autosize={true}
													/>
													<UniversalDateInput
														block={true}
														view="date"
														label="Дата завершения"
														size="m"
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
												<Textarea
													fieldClassName={styles.textClass}
													maxHeight={91}
													label="Описание"
													labelView="inner"
													size="m"
													block={true}
													maxLength={96}
													showCounter={true}
													autosize={true}
												/>
												<div className={styles.coursesWrapper}>
													<InputAutocomplete
														name="course"
														value={valueCourse}
														block={true}
														allowUnselect={true}
														closeOnSelect={true}
														onChange={handleChangeCourse}
														onInput={handleInputCourse}
														options={optionsCourses}
														Arrow={shownChevron ? Arrow : undefined}
														inputProps={{
															onClear: handleClearCourse,
															clear: true,
														}}
														showEmptyOptionsList={true}
														className={styles.inputCourses}
														size="s"
														label="Тренинги и курсы"
														placeholder="Начните вводить название"
													/>
													<div className={styles.formRowTag}>
														{tagValues.length > 0 &&
															tagValues.map((value, index) => (
																<div key={index} style={{ maxWidth: '952px' }}>
																	<FilterTag
																		showClear={true}
																		size="s"
																		shape="rectangular"
																		view="outlined"
																		checked={true}
																	>
																		{value}
																	</FilterTag>
																</div>
															))}
													</div>
													<img
														src={linkToCourses}
														alt="ссылка на курсы"
														className={styles.linkToCourses}
													></img>
												</div>
												<Textarea
													fieldClassName={styles.textClass}
													maxHeight={91}
													label="Ваш комментарий"
													labelView="inner"
													size="m"
													block={true}
													maxLength={96}
													showCounter={true}
													autosize={true}
												/>
												{isEmployee && (
													<div>
														<div className={styles.attachWrapper}>
															<p className={styles.attachTitle}>
																Приклепленные файлы
															</p>
															<Attach
																buttonContent="Добавить"
																buttonProps={{
																	style: {
																		backgroundColor: 'transparent',
																		color: '#2A77EF',
																		padding: '0',
																		margin: '0',
																	},
																}}
																size="m"
																onChange={handleChange}
																multiple={multiple}
																fileClassName={styles.attachButton}
																noFileText=""
															/>
														</div>
														<FileUploadItem
															name="Название файла.pdf"
															uploadDate="22.01.2018"
															size={45000}
															showDelete={true}
														/>
														<FileUploadItem
															name="Название файла.pdf"
															uploadDate="22.01.2018"
															uploadPercent={23.5678}
															uploadStatus="UPLOADING"
															showDelete={true}
														/>
														<FileUploadItem
															name="Название файла.jpg"
															uploadDate="22.01.2018"
															size={45000}
															uploadStatus="ERROR"
															showDelete={true}
														/>
														<Button
															view="primary"
															size="m"
															className={styles.button}
														>
															Отправить на проверку
														</Button>
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
