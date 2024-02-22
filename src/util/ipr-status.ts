import IprStatusDoc from '../shared/type/ipr-status-name';

const isDraftIpr = (status?: string) => status === IprStatusDoc.Draft;
const isInProgressIpr = (status?: string) =>
  status === IprStatusDoc.InProgress;
const isCompletedIpr = (status?: string) =>
  status === IprStatusDoc.Completed;
const isNotCompletedIpr = (status?: string) =>
  status === IprStatusDoc.NotCompleted;
const isCanceledIpr = (status?: string) =>
  status === IprStatusDoc.Canceled;
const isNoIprIpr = (status?: string) => status === IprStatusDoc.NoIpr;
const isAwaitingReviewIpr = (status?: string) =>
  status === IprStatusDoc.AwaitingReview;

export {
  isDraftIpr,
  isInProgressIpr,
  isCompletedIpr,
  isNotCompletedIpr,
  isCanceledIpr,
  isNoIprIpr,
  isAwaitingReviewIpr
};
