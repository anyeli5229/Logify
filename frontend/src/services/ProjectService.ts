import api from "@/lib/axios";
import type { ProjectFormData } from "@/types";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await api.post("/projects", formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }

        throw new Error("Ocurrió un error inesperado al crear el proyecto");
    }
}