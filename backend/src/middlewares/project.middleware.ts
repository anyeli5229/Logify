import type { Request, Response, NextFunction } from "express"
import z from "zod";

const paramIdSchema = z.uuid("ID no válido");

export const validarId = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const validation = paramIdSchema.safeParse(id);
    if (!validation.success) {
        res.status(400).json({ error: validation.error.issues[0].message });
        return;
    }

    next();
}