import type { Request, Response } from "express";
import { createProjectSchema } from "../schemas/project.schema";
import { prisma } from "../config/prisma";
import { formatearErroresZod } from "../utils/zodErrors";

export class ProjectController {

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await prisma.project.findMany({
                where: { userId: req.usuario.id },
                orderBy: { createdAt: "desc" }
            });

            res.json(projects);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener los proyectos' });
        }
    }

    static createProject = async (req: Request, res: Response) => {
        try {
            const validation = createProjectSchema.safeParse(req.body);
            if (!validation.success) {
                res.status(400).json({ error: formatearErroresZod(validation.error) });
                return;
            }

            await prisma.project.create({
                data: {
                    ...validation.data,
                    userId: req.usuario.id
                }
            });

            res.status(201).json({ message: "Proyecto creado correctamente" });
        } catch (error) {
            res.status(500).json({ error: 'Error al crear el proyecto' });
        }
    }

    static getProjectById = async (req: Request, res: Response) => {
        // req.project ya fue cargado por el middleware
        res.json(req.project);
    }

    static updateProject = async (req: Request, res: Response) => {
        try {
            const validation = createProjectSchema.safeParse(req.body);
            if (!validation.success) {
                res.status(400).json({ error: formatearErroresZod(validation.error) });
                return;
            }

            await prisma.project.update({
                where: { id: req.project.id },
                data: validation.data
            });

            res.json({ message: "Proyecto actualizado correctamente" });
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el proyecto' });
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        try {
            await prisma.project.delete({
                where: { id: req.project.id }
            });

            res.json({ message: "Proyecto eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el proyecto" });
        }
    }
}