import { IprStatusDoc } from '../../../shared/type';

interface ITask {
  id: number;
  name: string;
  taskStatus: {
    id: IprStatusDoc;
    name: string;
  };
  description: string;
  supervisorComment: string;
  closeDate: string;
  education: {
    status: boolean;
    education: {
      id: number;
      name: string;
      urlLink: string;
    };
  }[];
  comment: string;
}

interface ICompetencyRel {
  id: string;
  name: string;
}

interface ICompetency {
  competencyRel: ICompetencyRel;
}

interface IMentor {
  id: number;
  firstName: string;
  surname: string;
  patronymic: string;
  imageUrl: string;
}

interface IIprData {
  id: number;
  employeeId: number;
  supervisorId: number;
  closeDate: string;
  createDate: string;
  mentor: IMentor;
  status: {
    id: string;
    name: string;
  };
  goal: {
    id: string;
    name: string;
  };
  specialty: {
    id: string;
    name: string;
  };
  competency: ICompetency[];
  description: string;
  supervisorComment: string;
  task: ITask[];
  comment?: string;
  iprGrade: number;
}

type TIprDataState = {
  ipr: IIprData | null;
  isLoading: boolean;
  error: string;
  taskValues: string[];
};

export type { ITask, TIprDataState, IIprData, IMentor, ICompetency };
