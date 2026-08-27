import { Request, Response } from "express";
import { LoginSchema, RegisterSchema, TokenSchema } from "../schemas/auth.schema";
import { formatearErroresZod } from "../utils/zodErrors";
import { buscarUsuario, generarToken, hashPassword, verificarPassword } from "../utils/auth";
import { prisma } from "../config/prisma";
import { AuthEmail } from "../emails/auth.email";

export class AuthController {

    static createAccount = async (req: Request, res: Response) => {
        try {
            const validation = RegisterSchema.safeParse(req.body);
            if (!validation.success) {
                res.status(400).json({ error: formatearErroresZod(validation.error) });
                return;
            }

            const usuario = await buscarUsuario(validation.data.email);
            if (usuario) {
                res.status(409).json({ error: "El email que ingresaste ya se encuentra registrado" });
                return;
            }

            const hashedPassword = await hashPassword(validation.data.password);
            const { password_confirmation, ...userData } = validation.data;

            const { user, token } = await prisma.$transaction(async (tx) => {
                const newUser = await tx.user.create({
                    data: {
                        ...userData,
                        password: hashedPassword
                    }
                });

                const newToken = await tx.token.create({
                    data: {
                        token: generarToken(),
                        userId: newUser.id,
                        expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutos
                    }
                });

                return { user: newUser, token: newToken };
            });

            await AuthEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token
            });

            res.status(201).json({
                message: "Usuario registrado correctamente, revisa tu email para confirmar tu cuenta"
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al registrar usuario' });
        }
    }

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const validation = TokenSchema.safeParse(req.body);
            if (!validation.success) {
                res.status(400).json({ error: formatearErroresZod(validation.error) })
                return;
            }
            const token = await prisma.token.findFirst({
                where: { token: validation.data.token }
            });

            if (!token) {
                res.status(404).json({ error: "El token no es válido." })
                return;
            }

            if (token.expiresAt < new Date()) {
                await prisma.token.delete({
                    where: { id: token.id }
                });
                res.status(400).json({ error: "El token ha expirado. Solicita uno nuevo para seguir con el proceso de confirmación de cuenta." })
                return;
            }

            await prisma.$transaction([
                prisma.user.update({
                    where: { id: token.userId },
                    data: { confirmed: true }
                }),

                prisma.token.delete({
                    where: { id: token.id }
                })
            ]);

            res.json({ message: "Cuenta confirmada éxitosamente." })

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al confirmar cuenta' });
        }
    }

    static login = async (req: Request, res: Response) => {
        try {
            const validation = LoginSchema.safeParse(req.body);
            if (!validation.success) {
                res.status(400).json({ error: formatearErroresZod(validation.error) })
                return;
            }

            const usuario = await prisma.user.findUnique({
                where: { email: validation.data.email }
            });

            if (!usuario) {
                res.status(404).json({ error: "El email que ingresaste no se encuentra registrado" })
                return;
            }

            if (!usuario.confirmed) {
                res.status(401).json({ error: "La cuenta no a sido confirmada, hemos enviado un email a tu cuenta para que puedas hacerlo" })
                return;
            }

            const checkPassword = await verificarPassword(validation.data.password, usuario.password);

            if (!checkPassword) {
                res.status(401).json({ error: "La contraseña que ingresaste no es correcta" })
                return;
            }

            res.status(200).json({ message: "Usuario autenticado correctamente" });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al autenticar al usuario' });
        }
    }
}