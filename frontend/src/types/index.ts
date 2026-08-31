import z, { email, string } from "zod";

/* AUTH  */
export const authSchema = z.object({
  name: string(),
  email: email(),
  password: string(),
  password_confirmation: string(),
  token: z.string()
});
export type Auth = z.infer<typeof authSchema>;
export type LoginForm = Pick<Auth, "email" | "password">;
export type RegisterForm = Pick<Auth, "name" | "email" | "password" | "password_confirmation">;
export type InputToken = Pick<Auth, "token">;
export type InputEmail = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth,"password" | "password_confirmation">;

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

export const userSchema = authSchema.pick({
  name: true,
  email: true
}).extend({
  id: z.string()
});
export type User = z.infer<typeof userSchema>;

/* TEAM */
export const TeamMemberSchema = userSchema.pick({
  id: true,
  name: true,
  email: true
});
export const TeamMembersSchema = z.array(TeamMemberSchema);
export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, "email">;