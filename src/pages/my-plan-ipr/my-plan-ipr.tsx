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

interface TasksProps {
	isEmployee: boolean;
}

interface TaskProps {
	id: number;
	title: string;
	deadline: string;
	statusText: string;
	statusColor?:
		| 'green'
		| 'orange'
		| 'red'
		| 'blue'
		| 'grey'
		| 'teal'
		| 'purple'
		| undefined;
	closeButton?: boolean | undefined;
}

interface TasksProps {
	isEmployee: boolean;
}

interface OptionShape {
	key: string;
}

export const Tasks: React.FC = () => {
	const tasksData: TaskProps[] = [
		{
			id: 1,
			title: 'Менторинг новых сотрудников',
			deadline: 'До 30 января',
			statusText: 'не выполнена',
			statusColor: 'red',
			closeButton: false,
		},
		{
			id: 2,
			title: 'Разработка стратегии компании',
			deadline: 'До 20 марта',
			statusText: 'ожидает проверки',
			statusColor: 'purple',
			closeButton: true,
		},
		{
			id: 3,
			title: 'Найм сотрудников',
			deadline: 'До 10 апреля',
			statusText: 'выполнена',
			statusColor: 'green',
			closeButton: false,
		},
		{
			id: 4,
			title: 'Подготовка и выступление на конференции',
			deadline: 'До 1 июня',
			statusText: 'отменена',
			statusColor: 'orange',
			closeButton: true,
		},
	];

	const [valueCourse, setValueCourse] = useState<string>('');
	const [tagValues, setTagValues] = useState<string[]>([]);
	const [shownChevron, setShownChevron] = useState(true);
	const [multiple, setMultiple] = React.useState(false);
	const [progress, setProgress] = useState<number | undefined>(0);

	const optionsCourses: OptionShape[] = [
		{ key: 'Подготовка к IELTS' },
		{ key: 'Профессиональный английский' },
	];

	const handleChangeCourse = (payload: any) => {
		// Извлекаем значение из payload
		const value = payload.selectedItem?.key || '';

		setValueCourse(value);
		if (value && !tagValues.includes(value)) {
			setTagValues([...tagValues, value]);
		}
	};

	const handleInputCourse = (
		event: ChangeEvent<HTMLInputElement> | null,
		{ value }: { value: string }
	) => {
		setValueCourse(value);
		if (value && !tagValues.includes(value)) {
			setTagValues([...tagValues, value]);
		}
	};

	const handleClearCourse = () => {
		setValueCourse('');
		setTagValues([]);
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
													></InputAutocomplete>
													<div className={styles.formRowTag}>
														{tagValues.length > 0 &&
															tagValues.map((value, index) => (
																<div key={index} style={{ maxWidth: '319px' }}>
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

												<div>
													<div className={styles.attachWrapper}>
														<p className={styles.attachTitle}>
															Приклепленные файлы
														</p>
														<Attach
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
														Отметить выполненной
													</Button>
												</div>
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
