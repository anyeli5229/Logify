import api from "@/lib/axios";
import type { Note, NoteFormData, Project, Task } from "@/types";
import { isAxiosError } from "axios";

type NoteAPIType = {
    formData: NoteFormData
    projectId: Project["id"]
    taskId: Task["id"]
    noteId: Note["id"]
}

export async function createNote({projectId, taskId, formData} : Pick<NoteAPIType, "projectId" | "taskId" | "formData" >) {
    try {
        const { data } = await api.post(`/projects/${projectId}/tasks/${taskId}/notes`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || error.response.data.message);
        }
        throw new Error("Ocurrió un error inesperado al crear la nota");
    }
}

export async function deleteNote({projectId, taskId, noteId} : Pick<NoteAPIType, "projectId" | "taskId" | "noteId" >) {
    try {
        const { data } = await api.delete(`/projects/${projectId}/tasks/${taskId}/notes/${noteId}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error || error.response.data.message);
        }
        throw new Error("Ocurrió un error inesperado al eliminar la nota");
    }
}