import z from "zod";

/* TAREAS */

export const taskStatusSchema = z.enum(["PENDING", "ON_HOLD", "IN_PROGRESS", "UNDER_REVIEW", "COMPLETED"]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional().default(""),
  status: taskStatusSchema,
  
  // Nombres que devuelve Prisma Client
  projectId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),

  // Relación opcional/incluida según el controlador
  project: z.object({
    id: z.string(),
    projectName: z.string(),
    clientName: z.string()
  }).optional()
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;


/* PROYECTOS */

export const projectSchema = z.object({
  id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  //tasks: z.array(taskSchema)
});

export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    id: true,
    projectName: true,
    clientName: true,
    description: true,
    //tasks: true
  })
);

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, "projectName" | "clientName" | "description">;


/* USUARIO */
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  confirmed: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional()
});

export type User = z.infer<typeof userSchema>;