import api from "@/lib/axios";
import { taskSchema, type Project, type Task, type TaskFormData } from "@/types";
import { isAxiosError } from "axios";

type TaskType = {
    formData: TaskFormData,
    projectId: Project["id"],
    taskId: Task["id"],
    status: Task["status"]
}

export async function createTask({ formData, projectId }: Pick<TaskType, "formData" | "projectId">) {
    try {
        const { data } = await api.post(`/projects/${projectId}/tasks`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("Ocurrió un error inesperado al crear la tarea del proyecto");
    }
}

export async function getTaskById({ projectId, taskId }: { projectId: string; taskId: string }) {
    try {
        const { data } = await api(`/projects/${projectId}/tasks/${taskId}`);
        const response = taskSchema.safeParse(data);        
        if (response.success) {
            return response.data;
        } 
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || "No se pudo obtener la tarea");
        }
        throw new Error("Ocurrió un error inesperado al consultar la tarea");
    }

}

export async function updateTask({ projectId, taskId, formData }: Pick<TaskType, "projectId" | "taskId" | "formData">) {
    try {
        const { data } = await api.put(`/projects/${projectId}/tasks/${taskId}`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data?.error || "Error al actualizar la tarea");
        }
        throw new Error("Ocurrió un error inesperado al actualizar la tarea del proyecto");
    }
}

export async function deleteTask({ projectId, taskId }: Pick<TaskType, "projectId" | "taskId">) {
    try {
        const { data } = await api.delete(`/projects/${projectId}/tasks/${taskId}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data?.error || "Error al obtener la tarea");
        }
        throw new Error("Ocurrió un error inesperado al obtener la tarea del proyecto");
    }
}

export async function updateStatus({ projectId, taskId, status }: Pick<TaskType, "projectId" | "taskId" | "status">) {
    try {
        const { data } = await api.post(`/projects/${projectId}/tasks/${taskId}/status`, {status});
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data?.error || "Error al actualizar el estado de la tarea");
        }
        throw new Error("Ocurrió un error inesperado al actualizar el estado de la tarea del proyecto");
    }
}