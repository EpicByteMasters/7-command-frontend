import type { OptionShape } from '@alfalab/core-components/select/typings';

import type { ICommonLibWithSkillType } from '../../store/reducers/libSlice';
import type { IIprData } from '../../store/reducers/iprSlice';

interface ITasksObverviewProps {
  isExecutive: boolean;
  iprStatus: string;
  handleGoalValuesChange?: any;
  iprCurrentData: IIprData | null;
}

interface ICompetitionOption extends OptionShape {
  value: ICommonLibWithSkillType;
}

interface OptionCompetitionShape extends OptionShape {
  value?: ICommonLibWithSkillType;
}

export type { ICompetitionOption, ITasksObverviewProps, OptionCompetitionShape };
