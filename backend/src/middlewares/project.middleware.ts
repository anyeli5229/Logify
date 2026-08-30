import type { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import { Project, Task } from "@prisma/client";

declare global {
    namespace Express {
        interface Request {
            project?: Project,
            task?: Task
        }
    }
}

export async function validateProjectExist(req: Request, res: Response, next: NextFunction, projectId: string) {
    try {

        if (!req.usuario) {
            res.status(401).json({ error: "Usuario no autenticado" });
            return;
        }

        const project = await prisma.project.findFirst({
            where: { 
                id: projectId,
                userId: req.usuario.id
            }
        });

        if (!project) {
            res.status(404).json({ error: "Proyecto no encontrado" });
            return;
        }

        req.project = project;

        next();
    } catch (error) {
        res.status(500).json({ error: "Hubo un error" });
    }
}