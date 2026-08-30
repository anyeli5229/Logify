import api from "@/lib/axios";
import { userSchema, type InputEmail, type InputToken, type LoginForm, type NewPasswordForm, type RegisterForm } from "@/types";
import { isAxiosError } from "axios";

export async function createAccount(formData: RegisterForm) {
    try {
        const { data } = await api.post("/auth/create-account", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || error.response.data.message);
        }
        throw new Error("Ocurrió un error inesperado al registrar el usuario");
    }
}

export async function confirmAccount(formData: InputToken) {
    try {
        const { data } = await api.post("/auth/confirm-account", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || error.response.data.message);
        }
        throw new Error("Ocurrió un error inesperado al registrar el token");
    }
}

export async function RequestConfirmCode(formData: InputEmail) {
    try {
        const { data } = await api.post("/auth/request-code", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || error.response.data.message);
        }
        throw new Error("Ocurrió un error inesperado al enviar el token");
    }
}

export async function Login(formData: LoginForm) {
    try {
        const { data } = await api.post("/auth/login", formData);
        localStorage.setItem("AUTH_TOKEN", data);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || error.response.data.message);
        }
        throw new Error("Ocurrió un error inesperado al autenticar usuario");
    }
}

export async function forgotPassword(formData: InputEmail) {
    try {
        const { data } = await api.post("/auth/forgot-password", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || error.response.data.message);
        }
        throw new Error("Ocurrió un error inesperado al enviar el token");
    }
}

export async function validateToken(formData: InputToken) {
    try {
        const { data } = await api.post("/auth/validate-token", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || error.response.data.message);
        }
        throw new Error("Ocurrió un error inesperado al enviar el token");
    }
}

export async function updatePassword({ formData, token }: { formData: NewPasswordForm; token: string }) {
    try {
        const { data } = await api.post(`/auth/update-password/${token}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || error.response.data.message);
        }
        throw new Error("Ocurrió un error inesperado al cambiar la contraseña");
    }
}

export async function getUser() {
    try {
        const { data } = await api("auth/user");
        const response = userSchema.safeParse(data);
        if(response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || error.response.data.message);
        }
        throw new Error("Ocurrió un error inesperado al obtener al usuario");
    }
}