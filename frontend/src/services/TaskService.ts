import api from "@/lib/axios";
import type { Project, Task, TaskFormData } from "@/types";
import { isAxiosError } from "axios";

type TaskType = {
    formData: TaskFormData,
    projectId: Project["id"],
    taskId: Task["id"]
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

export async function getTaskById({ projectId, taskId }: Pick<TaskType, "projectId" | "taskId">) {
    try {
        const { data } = await api(`/projects/${projectId}/tasks/${taskId}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data?.error || "Error al obtener la tarea");
        }
        throw new Error("Ocurrió un error inesperado al obtener la tarea del proyecto");
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