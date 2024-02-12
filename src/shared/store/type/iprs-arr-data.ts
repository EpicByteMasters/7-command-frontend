interface IGoal {
  id: string;
  name: string;
}

interface IStatus {
  id: string;
  name: string;
}

interface IIpr {
  id: number;
  goal: IGoal;
  status: IStatus;
  createDate: string;
  closeDate: string;
  taskCount: number;
  taskCompleted: number;
}

interface IIprsArrState {
  iprsData: IIpr[];
  iprsHistoryData: IIpr[];
  isLoading: boolean;
  error: string;
}

export type { IGoal, IStatus, IIpr, IIprsArrState };
