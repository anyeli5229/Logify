import z from "zod";
import { TASK_STATUS } from "../types/task";

export const taskStatusSchema = z.enum([
  TASK_STATUS.PENDING,
  TASK_STATUS.ON_HOLD,
  TASK_STATUS.IN_PROGRESS,
  TASK_STATUS.UNDER_REVIEW,
  TASK_STATUS.COMPLETED
], {
  message: "Estado no válido"
});

export const createTaskSchema = z.object({
  name: z.string().trim().min(1, "El nombre de la tarea es obligatorio"),
  description: z.string().trim().min(1, "La descripción de la tarea es obligatoria"),
  status: taskStatusSchema.default(TASK_STATUS.PENDING)
});

export const updateTaskStatusSchema = z.object({
  status: taskStatusSchema
});

export type UpdateTaskStatusDTO = z.infer<typeof updateTaskStatusSchema>;