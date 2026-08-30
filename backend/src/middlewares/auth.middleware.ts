import type { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import { prisma } from "../config/prisma";
import { User } from "@prisma/client";

type UserReq = Pick<User, "id" | "name" | "email">;

declare global {
    namespace Express {
        interface Request {
            usuario?: UserReq
        }
    }
}

export async function autentificacion(req: Request, res: Response, next: NextFunction) {
    try {
        const bearer = req.headers.authorization;
        if (!bearer) {
            res.status(401).json({ error: "No autenticado" });
        }

        const [, token] = bearer.split(" ");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === "object" && decoded.id) {

            const usuario = await prisma.user.findUnique({
                where: { id: decoded.id },
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

            req.usuario = usuario;
        }
    } catch (error) {
        res.status(500).json({ error: "Token no válido" });
    }

    next();
}