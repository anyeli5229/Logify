import api from "@/lib/axios";
import { dashboardProjectSchema, type Project, type ProjectFormData } from "@/types";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await api.post("/projects", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }

        throw new Error("Ocurrió un error inesperado al crear el proyecto");
    }
}

export async function getAllProjects() {
    try {
        const { data } = await api("/projects");
        const response = dashboardProjectSchema.safeParse(data);
        if(response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }

        throw new Error("Ocurrió un error inesperado al obtener los proyectos");
    }
}

export async function getProjectById(id: Project["id"]) {
    try {
        const { data } = await api(`/projects/${id}`);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        } 
        throw new Error("Ocurrió un error inesperado al obtener el proyecto");
    }
}

type updateProjectApiType = {
    projectId: Project["id"],
    formData: ProjectFormData
}
export async function updateProject({projectId, formData} : updateProjectApiType) {
    try {
        const { data } = await api.put(`/projects/${projectId}`, formData);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
        throw new Error("Ocurrió un error inseperado al actualizar el proyecto");
    }
}

export async function deleteProject(id: Project["id"]) {
    try {
        const { data } = await api.delete(`/projects/${id}`);
        return data;
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        } 
        throw new Error("Ocurrió un error inesperado al eliminar el proyecto");
    }
}