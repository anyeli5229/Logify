import type { Request, Response, NextFunction } from "express";
import { prisma } from "../config/prisma";
import { Project, Task, User } from "@prisma/client";

type UserSimple = Pick<User, 'id' | 'name' | 'email'>;

export type ProjectWithRelations = Project & {
    tasks: Task[];
    team: UserSimple[];
    manager: UserSimple;
};

declare global {
    namespace Express {
        interface Request {
            project: ProjectWithRelations;
            task?: Task;
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
                manager: { //Datos del colaborador
                    select: { id: true, name: true, email: true }
                },
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

export async function hasAuthorization(req: Request, res: Response, next: NextFunction) {
    if (req.usuario.id !== req.project.userId) {
        res.status(401).json({ error: "Acción no válida: Solo el Manager puede realizar esta acción" });
        return;
    }
    next();
}