interface ISaveDraftTaskDTO {
  name: string;
  description: string;
  closeDate: string;
  supervisorComment: string;
  education: number[];
  iprId: number;
  comment: string;
}

interface ISaveDraftDTO {
  goalId: string;
  specialtyId: string;
  mentorId: number;
  description: string;
  supervisorComment: string;
  iprStatusId: string;
  competency: string[];
  tasks: ISaveDraftTaskDTO[];
}

class SaveIprDraftDTO implements ISaveDraftDTO {
  readonly goalId: string;
  readonly specialtyId: string;
  readonly mentorId: number;
  readonly description: string;
  readonly supervisorComment: string;
  readonly competency: string[];
  readonly tasks: ISaveDraftTaskDTO[];
  readonly iprStatusId: string;

  constructor(payload: ISaveDraftDTO) {
    this.goalId = payload.goalId;
    this.specialtyId = payload.specialtyId;
    this.mentorId = payload.mentorId;
    this.description = payload.description;
    this.supervisorComment = payload.supervisorComment;
    this.competency = payload.competency;
    this.tasks = payload.tasks;
    this.iprStatusId = payload.iprStatusId;
  }
}

export type { ISaveDraftDTO };

export default SaveIprDraftDTO;
