import type { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { createTaskSchema, updateTaskStatusSchema } from "../schemas/task.schema";
import { formatearErroresZod } from "../utils/zodErrors";

export class TaskController {
    static getAllTasks = async (req: Request<{ projectId: string }>, res: Response) => {
        try {

            const tasks = await prisma.task.findMany({
                where: {
                    projectId: req.project.id
                },
                include: {
                    project: true
                }
            })

            res.json(tasks);

        } catch (error) {
            res.status(500).json({ error: "Error al buscar las tareas" });
        }
    }

    static createTask = async (req: Request<{ projectId: string }>, res: Response) => {
        try {

            const validation = createTaskSchema.safeParse(req.body);
            if (!validation.success) {
                res.status(400).json({ error: formatearErroresZod(validation.error) });
                return;
            }

            await prisma.task.create({
                data: {
                    ...validation.data,
                    projectId: req.project.id
                }
            })

            res.status(201).json({ message: "Tarea creada correctamente" });

        } catch (error) {
            res.status(500).json({ error: "Error al crear la tarea" });
        }
    }

    static getTaskById = async (req: Request<{ projectId: string; taskId: string }>, res: Response) => {
        try {
            const task = await prisma.task.findUnique({
                where: {
                    id: req.task.id
                },
                include: {
                    history: {
                        orderBy: { updatedAt: 'desc' },
                        include: {
                            user: {
                                select: { id: true, name: true, email: true }
                            }
                        }
                    },
                    notes: {
                        orderBy: { updatedAt: 'desc'},
                        include: {
                            user: {
                                select: { id: true, name: true, email: true}
                            }
                        }
                    }
                }
            });
            res.json(task);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener la tarea" });
        }
    }

    static updateTaskById = async (req: Request<{ projectId: string; taskId: string }>, res: Response) => {
        try {
            const validation = createTaskSchema.safeParse(req.body);

            if (!validation.success) {
                res.status(400).json({ error: formatearErroresZod(validation.error) });
                return;
            }

            await prisma.task.update({
                where: {
                    id: req.task.id
                },
                data: validation.data
            })

            res.json({ message: "Tarea actualizada correctamente" });

        } catch (error) {
            res.status(500).json({ error: "Error al actualizar la tarea" });
        }
    }

    static deleteTaskById = async (req: Request<{ projectId: string; taskId: string }>, res: Response) => {
        try {

            await prisma.task.delete({
                where: {
                    id: req.task.id
                }
            })

            res.json({ message: "Tarea eliminada correctamente" });

        } catch (error) {
            res.status(500).json({ error: "Error al eliminar la tarea" });
        }
    }

    static updateStatusTask = async (req: Request<{ projectId: string; taskId: string }>, res: Response) => {
        try {

            const validation = updateTaskStatusSchema.safeParse(req.body);
            if (!validation.success) {
                res.status(400).json({ error: formatearErroresZod(validation.error) });
                return;
            }

            const { status } = validation.data;

            await prisma.task.update({//Actualizar estado 
                where: {
                    id: req.task.id
                },
                data: {
                    status
                }
            });

            //Historial de cambios
            await prisma.taskHistory.create({
                data: {
                    status,
                    taskId: req.task.id,
                    userId: req.usuario.id
                }
            });

            res.json({ message: "Estado de la tarea actualizado correctamente" });

        } catch (error) {
            res.status(500).json({ error: "Error al actualizar el estado de la tarea" });
        }
    }
}
