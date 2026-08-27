import bcrypt from "bcrypt";
import { prisma } from "../config/prisma";

export async function hashPassword(password:string) {
    const salts = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salts);
}

export async function verificarPassword(password:string, hashedPassword:string) {
    return await bcrypt.compare(password, hashedPassword);
}

export async function buscarUsuario(email: string) {
    return await prisma.user.findUnique({
        where: { email }
    })
}

export const generarToken = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};