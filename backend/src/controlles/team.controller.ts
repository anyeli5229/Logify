import type { Request, Response } from "express"
import { EmailSchema, idSchema } from "../schemas/auth.schema";
import { formatearErroresZod } from "../utils/zodErrors";
import { prisma } from "../config/prisma";


export class TeamController {

    static findMemberByEmail = async (req: Request, res: Response) => {
        try {
            const usuario = await prisma.user.findFirst({
                where: { email: req.body.email },
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });

            if (!usuario) {
                res.status(404).json({ error: "Usuario no encontrado" });
                return;
            }

            res.json(usuario);

        } catch (error) {
            res.status(500).json({ error: "Error al buscar al usuario" });
            return;
        }
    }

    static addMemberById = async (req: Request, res: Response) => {
        try {
            const usuario = await prisma.user.findUnique({
                where: { id: req.body.id },
                select: {
                    id: true
                }
            });

            if (!usuario) {
                res.status(404).json({ error: "Usuario no encontrado" });
                return;
            }

            const isMember = req.project.team.some(member => member.id === usuario.id);
            if (isMember) {
                res.status(409).json({ error: "El usuario ya pertenece al equipo del proyecto" });
                return;
            }

            await prisma.project.update({
                where: { id: req.project.id },
                data: {
                    team: {
                        connect: { id: usuario.id }
                    }
                }
            });

            res.json({ message: "Usuario agregado al equipo correctamente" });
            return;

        } catch (error) {
            res.status(500).json({ error: "Error al agregar al usuario" });
            return;
        }
    }

    static deleteMemberById = async (req: Request<{id: string}>, res: Response) => {
        try {

            const usuario = await prisma.user.findUnique({
                where: { id: req.params.id },
                select: {
                    id: true
                }
            });

            if (!usuario) {
                res.status(404).json({ error: "Usuario no encontrado" });
                return;
            }

            const isMember = req.project.team.some(member => member.id === usuario.id);
            if (!isMember) {
                res.status(409).json({ error: "El usuario no pertenece al equipo del proyecto" });
                return;
            }

            await prisma.project.update({
                where: { id: req.project.id },
                data: {
                    team: {
                        disconnect: { id: usuario.id }
                    }
                }
            });

            res.json({ message: "Usuario eliminado del equipo correctamente" });
            return;

        } catch (error) {
            res.status(500).json({ error: "Error al eliminar al usuario" });
            return;
        }
    }

    static getProjectTeam = async (req: Request, res: Response) => {
        try {
            // req.project.team ya contiene la lista de usuarios (id, name, email) 
            // cargada previamente desde el middleware validateProjectExist
            return res.json(req.project.team);
        } catch (error) {
            return res.status(500).json({ error: "Error al obtener los colaboradores del proyecto" });
        }
    }
}