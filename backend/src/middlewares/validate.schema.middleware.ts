import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";
import { formatearErroresZod } from "../utils/zodErrors";

export function validateSchema<T>(schema: ZodType<T>) {
                //params, request, define el tipo de body
    return ( req: Request<{}, {}, T>, res: Response, next: NextFunction ) => {

        const resultado = schema.safeParse(req.body);

        if (!resultado.success) {
            return res.status(400).json({ error: formatearErroresZod(resultado.error)});
        }

        req.body = resultado.data;

        next();
    };
}