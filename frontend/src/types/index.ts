import { z } from "zod";

/* AUTH */
export const authSchema = z.object({
  name: z.string(),
  email: z.email(),
  current_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  token: z.string()
});
export type Auth = z.infer<typeof authSchema>;
export type LoginForm = Pick<Auth, "email" | "password">;
export type RegisterForm = Pick<Auth, "name" | "email" | "password" | "password_confirmation">;
export type InputToken = Pick<Auth, "token">;
export type InputEmail = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "password_confirmation">;

/* USUARIO */
export const userSchema = authSchema.pick({
  name: true,
  email: true
}).extend({
  id: z.string()
});
export type User = z.infer<typeof userSchema>;
export type UserProfileForm = Pick<User, "name" | "email">;
export type UpdateCurrentUserPasswordForm = Pick<Auth, 'current_password' | 'password' | 'password_confirmation'>;
export type CheckPasswordForm = Pick<Auth, 'password'>;

/* TEAM */
export const TeamMemberSchema = userSchema.pick({
  id: true,
  name: true,
  email: true
});
export const TeamMembersSchema = z.array(TeamMemberSchema);
export type TeamMember = z.infer<typeof TeamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, "email">;

/* NOTAS */
export const noteSchema = z.object({
  id: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdBy: z.string(),
  taskId: z.string(),
  user: userSchema,
});

export const createNoteFormSchema = z.object({
  content: z.string(),
});

export type Note = z.infer<typeof noteSchema>;
export type NoteFormData = Pick<Note, "content">;

/* TAREAS */
export const taskStatusSchema = z.enum(["PENDING", "ON_HOLD", "IN_PROGRESS", "UNDER_REVIEW", "COMPLETED"]);
export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskHistorySchema = z.object({
  id: z.string(),
  status: taskStatusSchema,
  updatedAt: z.string(),
  user: userSchema
});

export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable().optional().default(""),
  status: taskStatusSchema,
  projectId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  project: z.object({
    id: z.string(),
    projectName: z.string(),
    clientName: z.string()
  }).optional(),
  history: z.array(taskHistorySchema).optional().default([]),
  notes: z.array(noteSchema).optional().default([])
});

export const taskProjectSchema = taskSchema.pick({
  id: true,
  name: true,
  description: true,
  status: true
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;
export type TaskProject = z.infer<typeof taskProjectSchema>;

/* PROYECTOS */
export const editProjectSchema = z.object({
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
});

export const projectSchema = editProjectSchema.extend({
  id: z.string(),
  userId: z.string().optional(),
  manager: TeamMemberSchema.optional(),
  tasks: z.array(taskSchema).optional(),
});

export const dashboardProjectSchema = z.array(
  projectSchema.pick({
    id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true
  })
);

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, "projectName" | "clientName" | "description">;