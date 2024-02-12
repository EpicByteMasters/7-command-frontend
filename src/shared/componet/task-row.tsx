import React, { FC, ChangeEvent, useMemo, useState, useEffect } from 'react';

import type { OptionShape } from '@alfalab/core-components/select/typings';

import { useAppDispatch } from '../hooks/redux';

import { Table } from '@alfalab/core-components/table';
import { Collapse } from '@alfalab/core-components/collapse';
import { Textarea } from '@alfalab/core-components/textarea';
import { UniversalDateInput } from '@alfalab/core-components/universal-date-input';
import { CalendarDesktop } from '@alfalab/core-components/calendar/desktop';
import { InputAutocomplete } from '@alfalab/core-components/input-autocomplete';
import { BaseOption } from '@alfalab/core-components/select/components/base-option';
import { Arrow } from '@alfalab/core-components/select/components/arrow';
import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { TestResultButton } from './test-result-button';
import { Button } from '@alfalab/core-components/button';

import type { ICoursesOption, IEducationTypeDTO, IFilesForTask } from './type';

import type { ITask } from '../store/type/ipr-data';

import { IprStatusDoc } from '../type';

import { isCompletedIpr, isInProgressIpr, isNotCompletedIpr, isCanceledIpr } from '../../util/ipr-status';

import { getArrLastEl, isCourseSelectedOption, isCourseFilteredOption } from './utils';

import linkToCourses from '../images/link-gotocourses.png';
import { adaptDateToClient } from '../../util';
import { completeTask } from '../store/reducers/iprSlice';
import styles from '../../entities/tasks/tasks.module.scss';

interface ITasksRowProps {
  task: ITask;
  expandedTasks: Record<number, boolean>;
  id: number;
  isEmployee: boolean;
  courseList: IEducationTypeDTO[];
  statusId: IprStatusDoc;
}

// ----------------------------------------------------------------------------

/** @TODO: Поддержка кастомного пути к пропу с данными */
function getOptionContent(option: OptionShape) {
  return option.value.name;
}

function getOptionsInputValue(selectedMultiple: OptionShape[]) {
  return selectedMultiple.map(getOptionContent).join(', ');
}

const makeMultipleValue = (selectedMultiple: OptionShape[]) => {
  return `${getOptionsInputValue(selectedMultiple)}, `;
};

// Utils
// ----------------------------------------------------------------------------
const adaptCompetency = (course: IEducationTypeDTO): ICoursesOption => ({
  key: course.id,
  content: course.name.trim(),
  value: course,
});

const TasksRow: FC<ITasksRowProps> = ({ expandedTasks, id, isEmployee, courseList, statusId, task }) => {
  const [makeDisable, setMakeDisable] = useState(false);
  const dispatch = useAppDispatch();
  console.log('statusId: ', statusId);
  console.log('isEmployee В TASK ROW: ', isEmployee);
  const [titleValue, setTitleValue] = useState('');
  const [endDateValue, setEndDateValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [coursesValue, setCoursesValue] = useState('');
  const [supervisorCommentValue, setSupervisorCommentValue] = useState('');
  const [employeeComment, setEmployeeComment] = useState('');
  const [, setAttachFiles] = useState<IFilesForTask>({});
  const [selectedStatus, setSelectedStatus] = useState('');

  const isShowCoursesChevron = true;
  const isMultipleSelect = true;

  // @TODO: Добавить подъём в данные ИПР для отправки

  useEffect(() => {
    const titleValue = task.name;
    const endDateValue = task?.closeDate ? adaptDateToClient(task.closeDate) : '';
    const educationList = task.education;
    const educationInnerList = educationList.map((education) => education.education.name);
    const coursesValue = `${educationInnerList.join(', ')}, `;
    const supervisorCommentValue = task.supervisorComment;
    const employeeCommentValue = task.comment;
    const selectedStatusValue = task.taskStatus.name;
    const descriptionValue = task.description;

    setTitleValue(titleValue);
    setEndDateValue(endDateValue);
    setDescriptionValue(descriptionValue);
    setCoursesValue(coursesValue);
    setSupervisorCommentValue(supervisorCommentValue);
    setEmployeeComment(employeeCommentValue);
    setSelectedStatus(selectedStatusValue);
  }, [task]);

  /** Введённые значения */
  const inputValues: string[] = useMemo(
    () =>
      coursesValue
        .split(',')
        .map((value) => value.trim())
        .filter((value) => Boolean(value)),
    [coursesValue]
  );

  /** Последнее ведённое значение */
  const coursesInputLastValue = useMemo(() => getArrLastEl(inputValues), [inputValues]);

  /** Опции тренингов и курсов */
  const courseOptionList = useMemo<ICoursesOption[]>(
    () => courseList.map((courseOption) => adaptCompetency(courseOption)),
    [courseList]
  );

  /** Выбранные опции */
  const courseSelectedOptions = useMemo(
    () => courseOptionList.filter((course) => isCourseSelectedOption(course, inputValues)),
    [courseOptionList, inputValues]
  );

  /** Фильтрованные опции курсов */
  const filteredOptions = useMemo(
    () =>
      courseOptionList.filter((option) => isCourseFilteredOption(courseSelectedOptions, option, coursesInputLastValue)),
    [courseSelectedOptions, coursesInputLastValue]
  );

  /** Фильтрованные и выбранные опциии для выпадающего списка */
  const getFilteredOptionsCourses = () => {
    return coursesValue.length === courseSelectedOptions.length ? courseOptionList : filteredOptions;
  };

  const onTitleChange = (_: any, { value }: { value: string }) => {
    setTitleValue(value);
  };

  const onTaskEndDateChange = (_: any, { value }: { value: string }) => {
    console.log('onTaskEndDateChange', { value });
    setEndDateValue(value);
  };

  const onDescriptionChange = (_: any, { value }: { value: string }) => {
    // console.log('e', value);
    setDescriptionValue(value);
  };

  const onSupervisorCommentChange = (_: any, { value }: { value: string }) => {
    setSupervisorCommentValue(value);
  };

  const onEmployeeCommentChange = (_: any, { value }: { value: string }) => {};

  const handleSelectStatusChange = () => {};

  /** Обработчик ввода в поле */
  const handleCourseInput = (_: unknown, { value }: { value: string }) => setCoursesValue(value);

  /** Обработчик выбора опции */
  const onCoursesChange = ({ selectedMultiple }: { selectedMultiple: OptionShape[] }) => {
    const value = selectedMultiple.length ? makeMultipleValue(selectedMultiple) : '';
    setCoursesValue(value);
  };

  /** Обработчик очистки поля ввода курсов */
  const onCoursesInputClear = () => setCoursesValue('');

  /**
   * Удаление курса
   * @param key - Кулюч удаляемого курса
   */
  const onCoursesTagDelete = (key: string) => {
    const filteredOptions = courseSelectedOptions.filter((option) => option.key !== key);

    setCoursesValue(makeMultipleValue(filteredOptions));
  };

  const onTaskEndDateClear = (evt: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    evt.stopPropagation();
    setEndDateValue('');
  };

  const handleAttach = (taskId: number, event: ChangeEvent<HTMLInputElement>, payload: { files: File[] }) => {
    setAttachFiles((prevFiles) => ({
      ...prevFiles,
      [taskId]: [...(prevFiles[taskId] || []), ...payload.files],
    }));
  };

  const onclicktoComplete = (id: any) => {
    dispatch(completeTask(id));
  };

  return (
    <Table.TRow className={styles.row} withoutBorder={true}>
      <Table.TCell colSpan={4}>
        <Collapse expanded={expandedTasks[id]}>
          <div className={styles.openedTask}>
            <div className={styles.wrapper}>
              <Textarea
                fieldClassName={styles.goalName}
                maxHeight={56}
                label="Название *"
                value={titleValue}
                name="name"
                onChange={onTitleChange}
                labelView="inner"
                size="m"
                block={true}
                showCounter={true}
                autosize={true}
                disabled={
                  isEmployee ||
                  isCompletedIpr(statusId) ||
                  isCanceledIpr(statusId) ||
                  isNotCompletedIpr(statusId) ||
                  isCompletedIpr(statusId)
                }
              />
              <UniversalDateInput
                block={true}
                view="date"
                label="Дата завершения"
                size="m"
                value={endDateValue}
                onChange={onTaskEndDateChange}
                picker={true}
                Calendar={CalendarDesktop}
                calendarProps={{
                  selectorView: 'month-only',
                }}
                clear={true}
                onClear={onTaskEndDateClear}
                disabled={
                  isEmployee ||
                  isCompletedIpr(statusId) ||
                  isCanceledIpr(statusId) ||
                  isNotCompletedIpr(statusId) ||
                  isCompletedIpr(statusId)
                }
              />
            </div>

            <Textarea
              fieldClassName={styles.textClass}
              maxHeight={91}
              label="Описание"
              name="description"
              value={descriptionValue}
              onChange={onDescriptionChange}
              labelView="inner"
              size="m"
              block={true}
              maxLength={96}
              showCounter={true}
              autosize={true}
              disabled={
                isEmployee ||
                isCompletedIpr(statusId) ||
                isCanceledIpr(statusId) ||
                isNotCompletedIpr(statusId) ||
                isCompletedIpr(statusId)
              }
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
                Arrow={isShowCoursesChevron ? Arrow : undefined}
                multiple={isMultipleSelect}
                options={getFilteredOptionsCourses()}
                selected={courseSelectedOptions}
                onChange={onCoursesChange}
                onInput={handleCourseInput}
                allowUnselect={true}
                value={coursesValue}
                disabled={true}
                inputProps={{
                  onClear: onCoursesInputClear,
                  clear: true,
                }}
              />
              <img src={linkToCourses} alt="ссылка на курсы" className={styles.linkToCourses} />
            </div>

            <div className={styles.formRowTag}>
              {courseSelectedOptions.length > 0 &&
                courseSelectedOptions.map((course: OptionShape) => (
                  <div key={course.key} className={styles.tagContainer}>
                    <div
                      style={{
                        opacity:
                          isEmployee ||
                          isCompletedIpr(statusId) ||
                          isCanceledIpr(statusId) ||
                          isNotCompletedIpr(statusId)
                            ? 0.5
                            : 1,
                      }}
                      className={styles.formTag}
                    >
                      <div className={styles.formCircle}>
                        <CrossCircleMIcon onClick={() => onCoursesTagDelete(course.key)} />
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
              value={supervisorCommentValue}
              onChange={onSupervisorCommentChange}
              labelView="inner"
              size="m"
              block={true}
              maxLength={96}
              showCounter={true}
              autosize={true}
              disabled={
                isEmployee ||
                isCompletedIpr(statusId) ||
                isCanceledIpr(statusId) ||
                isNotCompletedIpr(statusId) ||
                isCompletedIpr(statusId)
              }
            />
            {isEmployee && (
              <Textarea
                fieldClassName={styles.textClass}
                maxHeight={91}
                label="Ваш комментарий"
                name="commentOfEmployee"
                value={employeeComment}
                onChange={onEmployeeCommentChange}
                labelView="inner"
                size="m"
                block={true}
                maxLength={96}
                showCounter={true}
                autosize={true}
                disabled={
                  isCompletedIpr(statusId) ||
                  isCanceledIpr(statusId) ||
                  isNotCompletedIpr(statusId) ||
                  isCompletedIpr(statusId)
                }
              />
            )}

            <div>
              {isInProgressIpr(statusId) && isEmployee && (
                <Button
                  view="primary"
                  size="s"
                  className={styles.button}
                  disabled={makeDisable}
                  onClick={() => {
                    setMakeDisable(true);
                    onclicktoComplete(id);
                  }}
                >
                  Отправить на проверку
                </Button>
              )}

              {!isEmployee && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}
                >
                  {isInProgressIpr(statusId) && !isEmployee && (
                    <div>
                      <select value={selectedStatus} onChange={handleSelectStatusChange} className={styles.select}>
                        <option className={styles.option} value="В работе">
                          В работе
                        </option>
                        <option value="Отклонен">Выполнена</option>
                        <option value="Сохранен">Отменена</option>
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Collapse>
      </Table.TCell>
    </Table.TRow>
  );
};

export default TasksRow;
