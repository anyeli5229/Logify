import { ZodError } from "zod";

type ErroresZod = {
    [campo: string] : string;
}

export function formatearErroresZod(error: ZodError): ErroresZod {
  return error.issues.reduce<ErroresZod>((errores, issue) => {
    // Si el path no es un string, se asigna  "general" para que no de undefined
    const campo = (typeof issue.path[0] === 'string') ? issue.path[0] : 'general';
    
    errores[campo] = issue.message;
    return errores; //acumulador
  }, {});
}