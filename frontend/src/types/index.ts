import z from "zod";

/* TAREAS */

export const taskStatusSchema = z.enum(["PENDING", "ON_HOLD", "IN_PROGRESS", "UNDER_REVIEW", "COMPLETED"]);

export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  proyect_id: z.string(),
  status: taskStatusSchema,
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;


/* PROYECTOS */

export const projectSchema = z.object({
  id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  tasks: z.array(taskSchema)
});

export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    id: true,
    projectName: true,
    clientName: true,
    description: true,
    tasks: true
  })
);

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, "projectName" | "clientName" | "description">;