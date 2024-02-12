import type { OptionShape } from '@alfalab/core-components/select/typings';

import { ICommonLibWithSkillType } from 'src/shared/store/type/libraries';

import type { IIprData } from '../../shared/store/type/ipr-data';

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
