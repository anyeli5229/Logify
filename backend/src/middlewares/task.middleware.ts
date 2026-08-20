import type { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";


export async function validateTaskExist(req: Request, res: Response, next: NextFunction, taskId: string) {
    try {
        const task = await prisma.task.findUnique({
            where: {
                id: taskId,
                projectId: req.project.id
            }
        });

        if(!task) {
            res.status(404).json({error: "Tarea no encontrada"});
            return;
        }

        req.task = task;

        next();
        
    } catch (error) {
        res.status(500).json({error: "Hubo un error"});
    }
}