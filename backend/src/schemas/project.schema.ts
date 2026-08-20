import z from "zod";

export const createProjectSchema = z.object({
    projectName: z.string().trim().min(1, "El nombre del proyecto es obligatorio"),
    clientName: z.string().trim().min(1, "El nombre del cliente es obligatorio"),
    description: z.string().trim().min(1, "La descripción del proyecto es obligatoria"),
})

export type CreateProjectInput = z.infer<typeof createProjectSchema>;