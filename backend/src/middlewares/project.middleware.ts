import type { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import { Project, Task, User } from "@prisma/client";

export type ProjectWithRelations = Project & {
    tasks: Task[];
    team: Pick<User, 'id' | 'name' | 'email'>[];
};

declare global {
    namespace Express {
        interface Request {
            project: ProjectWithRelations;
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
                OR: [ // permitir acceso si es el manager o si pertenece al equipo
                    { userId: req.usuario.id },
                    { team: { some: { id: req.usuario.id } } }
                ]
            },
            include: {
                user: true, //Datos del colaborador
                tasks: true, //Tareas del proyecto
                team: { //Lista de colaboradores
                    select: { id: true, name: true, email: true }
                }
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