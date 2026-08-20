export const TASK_STATUS = {
  PENDING: 'PENDING',
  ON_HOLD: 'ON_HOLD',
  IN_PROGRESS: 'IN_PROGRESS',
  UNDER_REVIEW: 'UNDER_REVIEW',
  COMPLETED: 'COMPLETED',
} as const;


export type TaskStatus = typeof TASK_STATUS[keyof typeof TASK_STATUS];