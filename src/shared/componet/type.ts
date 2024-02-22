import type { OptionShape } from '@alfalab/core-components/select/typings';

import type { ICommonLibWithEducationType as IEducationTypeDTO } from '../store/type/libraries';
import type { IIprData } from '../store/type/ipr-data';

interface ITasksProps {
  isEmployee: boolean;
  handleTaskValuesChange?: any;
  iprCurrentData: IIprData;
}

interface ICoursesOption extends OptionShape {
  value: IEducationTypeDTO;
}

interface IEducation {
  status: boolean;
  education: {
    id: number;
    name: string;
    urlLink: string;
  };
}

interface IFormData {
  id: number;
  name: string;
  closeDate: string;
  description: string;
  education: IEducation[];
  supervisorComment: string;
  commentOfEmployee: string;
}

interface INewTask {
  taskTitle: string;
  closeDate: string;
  description: string;
  courses: string;
  comment: string;
}

interface IFilesForTask {
  [taskId: string]: File[];
}

export type {
  ITasksProps,
  IEducation,
  IFormData,
  ICoursesOption,
  IEducationTypeDTO,
  IFilesForTask,
  INewTask
};
