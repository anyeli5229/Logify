import api from "@/lib/axios";
import type { UpdateCurrentUserPasswordForm, UserProfileForm } from "@/types";
import { isAxiosError } from "axios";


export async function updateProfile(formData: UserProfileForm) {
    try {
        const { data } = await api.put(`/auth/profile`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || error.response.data.message);
        }
        throw new Error("Ocurrió un error inesperado al actualizar el perfil");
    }
}

export async function changePassword(formData: UpdateCurrentUserPasswordForm) {
    try {
        const { data } = await api.post(`/auth/update-password`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || error.response.data.message);
        }
        throw new Error("Ocurrió un error inesperado al cambiar la contraseña");
    }
}