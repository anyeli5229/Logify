import z from "zod";
import { TASK_STATUS } from "../types/task";

export const createTaskSchema = z.object({
    name: z.string().trim().min(1, "El nombre de la tarea es obligatoria"),
    description: z.string().trim().min(1, "La descripción de la tarea es obligatoria"),
    status: z.enum([
        TASK_STATUS.PENDING,
        TASK_STATUS.ON_HOLD,
        TASK_STATUS.IN_PROGRESS,
        TASK_STATUS.UNDER_REVIEW,
        TASK_STATUS.COMPLETED
    ]).default(TASK_STATUS.PENDING)
});