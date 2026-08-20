import { ZodError } from "zod";

type ErroresZod = {
    [campo: string] : string;
}

export function formatearErroresZod(error: ZodError) {
    return error.issues.reduce<ErroresZod>((errores, error) => {
        const campo = error.path[0]

        if(typeof campo === "string") {
            errores[campo] = error.message
    
        }
            return errores;

    }, {})
}