import z from "zod";

export const RegisterSchema = z.object({
    name: z.string().trim().min(1, "Debes de agregar un nombre de usuario"),
    password: z.string().trim().min(8, "La contraseña debe de contener mínimo 8 caracteres"),
    password_confirmation: z.string().trim().min(1, "Debes confirmar tu contraseña"),
    email: z.email("Agrega un email válido"),
})
.refine((data) => data.password === data.password_confirmation, {
    message: "Las contraseñas no son iguales",
    path: ["password_confirmation"]
});
export type RegisterInput = z.infer<typeof RegisterSchema>;

export const TokenSchema = z.object({
    token: z.string().trim().min(1, "Debes de agregar un token válido"),
});

export const LoginSchema = z.object({
    email: z.email("Agrega un email válido"),
    password: z.string().trim().min(1, "La contraseña no puede ir vacía"),
});