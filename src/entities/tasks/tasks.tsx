import React, { FC, ChangeEvent, ReactNode, useMemo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// -----------------------------------------------------------------------------

import type { OptionShape } from '@alfalab/core-components/select/typings';

import { Table } from '@alfalab/core-components/table';
import { Button } from '@alfalab/core-components/button';

import { Status } from '@alfalab/core-components/status';
import { Textarea } from '@alfalab/core-components/textarea';

import { Arrow } from '@alfalab/core-components/select/components/arrow';
import { Attach } from '@alfalab/core-components/attach';
import { Collapse } from '@alfalab/core-components/collapse';

import { InputAutocomplete } from '@alfalab/core-components/input-autocomplete';
import { BaseOption } from '@alfalab/core-components/select/components/base-option';

import { UniversalDateInput } from '@alfalab/core-components/universal-date-input';
import { CalendarDesktop } from '@alfalab/core-components/calendar/desktop';

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
  INewTask,
} from './type';

// ----------------------------------------------------------------------------

import { MONTH_FULL_NAME_LIST, PICKER_OPTIONS } from './const';

// ----------------------------------------------------------------------------

import { getArrLastEl, isCourseSelectedOption, isCourseFilteredOption, formatDateToCustomFormat } from './utils';

// ----------------------------------------------------------------------------

import linkToCourses from '../../images/link-gotocourses.png';

import styles from './tasks.module.scss';

import { getStatusColor } from '../../shared/utils/constants';
import { TestResultButton } from '../../componet/test-result-button';
import { ButtonDesktop } from '@alfalab/core-components/button/desktop';
import { NewTask } from '../../entities/new-task/new-task';

// ----------------------------------------------------------------------------

// utils
const adaptCompetency = (course: IEducationTypeDTO): ICoursesOption => ({
  key: course.id,
  content: course.name.trim(),
  value: course,
});

// ----------------------------------------------------------------------------

// const showTestResultButtonComponent = (
// 	course: ICoursesOption,
// 	navigateToUrl: (urlLink: string) => void,
// ) => {
// 	return (
// 		<Button
// 			size="xxs"
// 			view="tertiary"
// 			style={{ marginLeft: '550px' }}
// 			className={styles.buttonResult}
// 			onClick={() => navigateToUrl(course.value.urlLink)}
// 		>
// 			Посмотреть результат
// 		</Button>
// 	)
// }

// const TEST_RESULT_DUMMY_URL = 'https://testlink_empty.com'

// /** Проверка на тестовую ссылку результатов обучения */
// const isTestResultDummyUrl = (url: string): boolean => url === TEST_RESULT_DUMMY_URL

// ----------------------------------------------------------------------------

export const Tasks: FC<ITasksProps> = ({ isEmployee, handleTaskValuesChange, iprCurrentData }) => {
  // const iprCurrentData = useAppSelector((state) => state.ipr.ipr);

  // const navigate = useNavigate()
  // const testResultButton = (urlLink: string) => navigate(urlLink)

  // Sub comps
  // -------------------------------------------------------------------------------------

  // const showTestResultButton = (cource: ICoursesOption) => (
  // 	testResultButton(cource, navigateToUrl)
  // )

  // -------------------------------------------------------------------------------------

  console.log('IPR: ', iprCurrentData);

  const courses = useAppSelector(selectCommonLibsEducation);
  console.log('optionCourses: ', courses);

  //#region State

  const [taskValues, setTaskValues] = useState<IFormData>({
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
  const [expandedTasks, setExpandedTasks] = useState<Record<number, boolean>>({});
  const [valueEndDate, setEndDate] = useState<string>('');
  const [filesForTask, setFilesForTask] = useState<IFilesForTask>({});
  const [selectedStatusOption, setSelectedStatusOption] = useState(''); // Состояние выбранной опции Селекта
  const [localArrayTask, setLocalArrayTask] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState<INewTask[]>([]);
  const [newTaskOpen, setNewTaskOpen] = useState(false);

  useEffect(() => {
    if (iprCurrentData) {
      setLocalArrayTask(iprCurrentData.task);
    }
  }, [iprCurrentData]);

  //#endregion

  //#region Computed

  /** Опции тренингов и курсов */
  const courseOptionList = useMemo<ICoursesOption[]>(
    () => courses.map((courseOption) => adaptCompetency(courseOption)),
    [courses]
  );

  /** Введённые значения */
  const inputValues: string[] = useMemo(
    () =>
      valueCourse
        .split(',')
        .map((value) => value.trim())
        .filter((value) => Boolean(value)),
    [valueCourse]
  );

  /** Последнее ведённое значение */
  const coursesInputLastValue = useMemo(() => getArrLastEl(inputValues), [inputValues]);

  /** Выбранные опции */
  const optionsSelected = useMemo(
    () => courseOptionList.filter((course) => isCourseSelectedOption(course, inputValues)),
    [courseOptionList, inputValues]
  );

  /** Фильтрованные опции курсов */
  const filteredOptions = useMemo(
    () => courseOptionList.filter((option) => isCourseFilteredOption(optionsSelected, option, coursesInputLastValue)),
    [optionsSelected, coursesInputLastValue]
  );

  /** Подставнока текущего выбранного образования в курсы */
  useEffect(() => {
    const taskList = iprCurrentData?.task;

    if (!taskList) {
      return;
    }

    const educationList = taskList.map((task) => task.education);

    const educationInnerList = educationList.map((education) => education.map((education) => education.education.name));

    const educationNameList = educationInnerList.flat();

    setValueCourse(`${educationNameList.join(',')}, `);
  }, [iprCurrentData]);

  //#endregion

  const handleAttach = (taskId: number, event: ChangeEvent<HTMLInputElement>, payload: { files: File[] }) => {
    setFilesForTask((prevFiles) => ({
      ...prevFiles,
      [taskId]: [...(prevFiles[taskId] || []), ...payload.files],
    }));
  };

  console.log('taskValues из задач: ', taskValues);

  const handleCallback = (): void => {
    handleTaskValuesChange(taskValues);
  };

  const tasksArrayForRender = iprCurrentData?.task;
  console.log('tasksArrayForRender', tasksArrayForRender);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
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

  /**
   * Удаление курса
   * @param key - Кулюч удаляемого курса
   */
  const onDeleteTag = (key: string) => {
    const filteredOptions = optionsSelected.filter((option) => option.key !== key);

    setValueCourse(makeMultipleValue(filteredOptions));
  };

  console.log('tasksArrayForRender: ', tasksArrayForRender);

  function formatDate(inputDate: string): string {
    const [year, month, day] = inputDate.split('-');
    const formattedDate: string = `${day}.${month}.${year}`;
    return formattedDate;
  }

  /** Массив введённых */

  function getOptionContent(option: OptionShape) {
    return option.value.name;
  }

  function getOptionsInputValue(selectedMultiple: OptionShape[]) {
    return selectedMultiple.map(getOptionContent).join(', ');
  }

  const makeMultipleValue = (selectedMultiple: OptionShape[]) => {
    return `${getOptionsInputValue(selectedMultiple)}, `;
  };

  //#region Cources

  /** Фильтрованные и выбранные опциии для выпадающего списка */
  const getFilteredOptionsCourses = () => {
    console.log({ inputValues, selected });

    return inputValues.length === selected.length ? courseOptionList : filteredOptions;
  };

  // Data
  // --------------------------------------------------------------------------

  /** Выбранные опции для компоннета */
  const selected = courseOptionList.filter((course) => isCourseSelectedOption(course, inputValues));

  // hadlers
  // --------------------------------------------------------------------------

  /** Обработчик выбора опции */
  const handleChangeCourse = ({ selectedMultiple }: { selectedMultiple: OptionShape[] }) => {
    const value = selectedMultiple.length ? selectedMultiple.map((option) => option.content).join(', ') + ', ' : '';
    setValueCourse(value);
  };

  /** Обработчик ввода в поле */
  const handleInputCourse = (_: unknown, { value }: { value: string }) => setValueCourse(value);

  /** Обработчик очистки */
  const onCoursesInputClear = () => setValueCourse('');

  //#endregion

  const handleSelectStatusChange = (event: any) => {
    setSelectedStatusOption(event.target.value);
    console.log(selectedStatusOption); // Обновляем состояние выбранной опции выбора статуса - Селект
  };

  const onDeleteTask = (id: number) => {
    const filteredTaskList = localArrayTask.filter((task) => task.id !== id);
    setLocalArrayTask(filteredTaskList);
  };
  /** Открытие попапа и запись данных в массив */

  const handleNewTaskOpen = () => {
    setNewTaskOpen(!newTaskOpen);
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
    <>
      <legend className={styles.blockTitle} onClick={handleCallback}>
        Задачи
      </legend>
      <Table className={styles.table}>
        <Table.TBody>
          {localArrayTask?.map(
            ({ id, name, taskStatus, description, supervisorComment, closeDate, education, comment }: ITask) => (
              <React.Fragment key={id}>
                <Table.TRow className={styles.row}>
                  <Table.TCell className={styles.cellWithIcon}>
                    {!isEmployee && (taskStatus.name === 'Выполнена' || taskStatus.name === 'Не выполнена') && (
                      <CrossCircleMIcon color="#70707A" onClick={() => onDeleteTask(id)} />
                    )}
                    {name}
                  </Table.TCell>
                  <Table.TCell>{formatDateToCustomFormat(closeDate)}</Table.TCell>
                  <Table.TCell>
                    <Status view="soft" color={getStatusColor(taskStatus.id)}>
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

                          <div className={styles.coursesWrapper}>
                            <InputAutocomplete
                              size="s"
                              name="course"
                              label="Тренинги и курсы"
                              placeholder="Начните вводить название"
                              className={styles.inputCourses}
                              block={true}
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
                            <img src={linkToCourses} alt="ссылка на курсы" className={styles.linkToCourses} />
                          </div>

                          <div className={styles.formRowTag}>
                            {optionsSelected.length > 0 &&
                              optionsSelected.map((course: OptionShape) => (
                                <div key={course.key} className={styles.tagContainer}>
                                  <div className={styles.formTag} onClick={() => onDeleteTag(course.key)}>
                                    <div className={styles.formCircle}>
                                      <CrossCircleMIcon />
                                    </div>

                                    {course.content}

                                    <TestResultButton course={course as ICoursesOption} />
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

                          <div>
                            <div className={styles.attachWrapper}>
                              <p className={styles.attachTitle}>Приклепленные файлы</p>

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
                                onChange={(event, payload) => handleAttach(id, event, payload)}
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
                                <div>
                                  <select
                                    value={selectedStatusOption}
                                    onChange={handleSelectStatusChange}
                                    className={styles.select}
                                  >
                                    <option className={styles.option} value="В работе">
                                      В работе
                                    </option>
                                    <option value="Отклонен">Выполнена</option>
                                    <option value="Сохранен">Отменена</option>
                                  </select>
                                </div>
                              </div>
                            )}
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
      {newTaskOpen && <NewTask isEmployee={isEmployee}></NewTask>}
    </>
  );
};
