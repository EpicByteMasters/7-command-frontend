import React, {
  FC,
  ChangeEvent,
  useMemo,
  useEffect,
  useState
} from 'react';

import { Table } from '@alfalab/core-components/table';

import { Status } from '@alfalab/core-components/status';

import { CrossCircleMIcon } from '@alfalab/icons-glyph/CrossCircleMIcon';
import { ChevronDownMIcon } from '@alfalab/icons-glyph/ChevronDownMIcon';

import { ButtonDesktop } from '@alfalab/core-components/button/desktop';

import { selectCommonLibsEducation } from '../../shared/store/reducers/libSlice';

import { useAppSelector } from '../../shared/hooks/redux';

import { IprStatusDoc } from '../../shared/type';

import TasksRow from '../../shared/componet/task-row';

import { getStatusColor } from '../../shared/utils/constants';
import { NewTask } from '../../entities/new-task/new-task';

import { isCompletedIpr, isNotCompletedIpr } from '../../util/ipr-status';

import styles from './tasks.module.scss';
import { getArrLastEl } from './utils';

import type {
  ITasksProps,
  IFormData,
  ICoursesOption,
  IEducationTypeDTO,
  IFilesForTask,
  INewTask
} from './type';

import type { ITask } from '../../shared/store/type/ipr-data';
import type { OptionShape } from '@alfalab/core-components/select/typings';

// Utils
// ----------------------------------------------------------------------------
const adaptCompetency = (course: IEducationTypeDTO): ICoursesOption => ({
  key: course.id,
  content: course.name.trim(),
  value: course
});

function formatDate(inputDate: string): string {
  const pattern = /(\d){4}-(\d){2}-(\d){2}/;

  if (!pattern.test(inputDate)) {
    return '';
  }

  const [year, month, day] = inputDate.split('-');

  return `${day}.${month}.${year}`;
}

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

// ----------------------------------------------------------------------------

const dummyIprTaskData: ITask = {
  id: 0,
  name: '',
  taskStatus: {
    id: IprStatusDoc.Draft,
    name: 'Черновик'
  },
  description: '',
  supervisorComment: '',
  closeDate: '-',
  education: [],
  comment: ''
};

// ----------------------------------------------------------------------------

export const Tasks: FC<ITasksProps> = ({
  isEmployee,
  handleTaskValuesChange,
  iprCurrentData
}) => {
  const courseList = useAppSelector(selectCommonLibsEducation);

  //#region State

  const [taskValues, setTaskValues] = useState<IFormData>({
    id: 0,
    name: '',
    closeDate: '',
    description: '',
    education: [],
    supervisorComment: '',
    commentOfEmployee: ''
  });

  const [, setShownChevron] = useState(true);
  const [, setMultiple] = useState(true);
  const [, setProgress] = useState<number | undefined>(0);
  const [valueCourse, setValueCourse] = useState<string>('');
  const [expandedTasks, setExpandedTasks] = useState<
    Record<number, boolean>
  >({});
  const [, setEndDate] = useState<string>('');
  const [, setFilesForTask] = useState<IFilesForTask>({});

  const [localArrayTask, setLocalArrayTask] = useState<ITask[]>([]);
  const [, setNewTask] = useState<INewTask[]>([]);
  const [newTaskOpen, setNewTaskOpen] = useState(false);

  useEffect(() => {
    if (iprCurrentData) {
      setLocalArrayTask(iprCurrentData.task);
    }
  }, [iprCurrentData]);

  //#endregion

  //#region Computed

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
  const coursesInputLastValue = useMemo(
    () => getArrLastEl(inputValues),
    [inputValues]
  );

  /** Подставнока текущего выбранного образования в курсы */
  useEffect(() => {
    const taskList = iprCurrentData?.task;

    if (!taskList) {
      return;
    }

    const educationList = taskList.map((task) => task.education);

    const educationInnerList = educationList.map((education) =>
      education.map((education) => education.education.name)
    );

    const educationNameList = educationInnerList.flat();

    setValueCourse(`${educationNameList.join(',')}, `);
  }, [iprCurrentData]);

  //#endregion

  const handleAttach = (
    taskId: number,
    event: ChangeEvent<HTMLInputElement>,
    payload: { files: File[] }
  ) => {
    setFilesForTask((prevFiles) => ({
      ...prevFiles,
      [taskId]: [...(prevFiles[taskId] || []), ...payload.files]
    }));
  };

  const handleCallback = (): void => {
    handleTaskValuesChange(taskValues);
  };

  const tasksArrayForRender = iprCurrentData?.task;

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setTaskValues((prevData) => ({ ...prevData, [name]: value }));
    handleCallback();
  };

  const tagValues = valueCourse.trim().split(',');

  const handleChangeEndDate = (
    event: any,
    { value }: { value: string }
  ) => {
    setEndDate(value);
    setTaskValues((prevData) => ({ ...prevData, endDate: value }));
    handleCallback();
  };

  const chevronClick = (taskId: number) => {
    setExpandedTasks((prevExpandedTasks) => ({
      ...prevExpandedTasks,
      [taskId]: !prevExpandedTasks[taskId]
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

  /** Массив введённых */

  //#region Cources

  /** Обработчик очистки */
  const onCoursesInputClear = () => setValueCourse('');

  //#endregion

  const onDeleteTask = (id: number) => {
    const filteredTaskList = localArrayTask.filter(
      (task) => task.id !== id
    );
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
        comment: ''
      }
    ]);
  };

  return (
    <>
      <legend className={styles.blockTitle} onClick={handleCallback}>
        Задачи
      </legend>
      <Table className={styles.table}>
        <Table.TBody>
          {iprCurrentData.task.length === 0 ? (
            <TasksRow
              task={dummyIprTaskData}
              expandedTasks={[true]}
              id={0}
              isEmployee={isEmployee}
              courseList={courseList}
              statusId={IprStatusDoc.Draft}
            />
          ) : (
            ''
          )}

          {iprCurrentData.task?.map((task: ITask) => (
            <React.Fragment key={task.id}>
              <Table.TRow className={styles.row}>
                <Table.TCell className={styles.cellWithIcon}>
                  {!isEmployee &&
                    (isCompletedIpr(task.taskStatus.id) ||
                      isNotCompletedIpr(task.taskStatus.id)) && (
                      <CrossCircleMIcon
                        color="#70707A"
                        onClick={() => onDeleteTask(task.id)}
                      />
                    )}
                  {task.name}
                </Table.TCell>
                <Table.TCell>{task.closeDate}</Table.TCell>
                <Table.TCell>
                  <Status
                    view="soft"
                    color={getStatusColor(task.taskStatus.id)}>
                    {task.taskStatus.name}
                  </Status>
                </Table.TCell>
                <Table.TCell>
                  <ChevronDownMIcon
                    onClick={() => chevronClick(task.id)}
                  />
                </Table.TCell>
              </Table.TRow>
              {expandedTasks[task.id] && (
                <TasksRow
                  task={task}
                  expandedTasks={expandedTasks}
                  id={task.id}
                  isEmployee={isEmployee}
                  courseList={courseList}
                  statusId={task.taskStatus.id}
                />
              )}
            </React.Fragment>
          ))}
        </Table.TBody>
      </Table>
      <ButtonDesktop
        onClick={handleNewTaskOpen}
        view="tertiary"
        shape="rectangular"
        size="s"
        className={styles.buttonComponent}
        nowrap={false}
        colors="default">
        Добавить новую
      </ButtonDesktop>
      <div>
        {newTaskOpen && <NewTask isEmployee={isEmployee}></NewTask>}
      </div>
    </>
  );
};
