import z from "zod";

/* PROYECTOS */

export const projectSchema = z.object({
    id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string()
});
export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, "projectName" | "clientName" | "description">;