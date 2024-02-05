interface ICommonLib {
  id: string;
  name: string;
}

interface ICommonLibWithSkillType extends ICommonLib {
  skillType: string;
}

interface ICommonLibWithEducationType extends IEducation {
  id: string;

  /** По этому ищем */
  name: string;

  /** Отдаём на бек */
  specialty: string;

  urlLink: string;
}

interface IEducation {
  id: string;
  name: string;
  specialty: string;
  urlLink: string;
}

type TCommonLibState = {
  positions: ICommonLib[];
  iprStatus: ICommonLib[];
  iprGoals: ICommonLib[];
  taskStatus: ICommonLib[];
  specialty: ICommonLib[];
  iprCompetency: ICommonLibWithSkillType[];
  education: IEducation[];
  isLoading: boolean;
  error: string;
};

export type { ICommonLib, ICommonLibWithSkillType, ICommonLibWithEducationType, IEducation, TCommonLibState };
