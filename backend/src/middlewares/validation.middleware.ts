import type { Request, Response, NextFunction } from "express"
import z from "zod";

const paramIdSchema = z.uuid("ID no válido");

export const validateId = (req: Request, res: Response, next: NextFunction, paramValue:string) => {
    const validation = paramIdSchema.safeParse(paramValue);
    if (!validation.success) {
        res.status(400).json({ error: validation.error.issues[0].message });
        return;
    }

    next();
}

const paramTokenSchema = z
    .string("Token no válido")
    .length(6, "El token debe tener 6 dígitos")
    .regex(/^\d+$/, "El token solo debe contener números");

export const validateToken = (req: Request, res: Response, next: NextFunction, paramValue:string) => {
    const validation = paramTokenSchema.safeParse(paramValue);
    if (!validation.success) {
        res.status(400).json({ error: validation.error.issues[0].message });
        return;
    }

    next();
}