import api from "@/lib/axios";
import { TeamMembersSchema, type Project, type TeamMember, type TeamMemberForm } from "@/types"
import { isAxiosError } from "axios";

type TeamType = {
    formData: TeamMemberForm,
    projectId: Project["id"]
    id: TeamMember["id"]
}

export async function findMemberByEmail({formData, projectId} : Pick<TeamType, 'formData' | 'projectId'>) {
    try {
        const { data } = await api.post(`/projects/${projectId}/team/find`, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("Ocurrió un error inesperado al buscar al usuario");
    }
}

export async function addMemberById({id, projectId} : Pick<TeamType, 'id' | 'projectId'>) {
    try {
        const { data } = await api.post(`/projects/${projectId}/team`, {id});
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("Ocurrió un error inesperado al agregar al usuario");
    }
}

export async function getMembersTeam({ projectId } : Pick<TeamType, 'projectId'>) {
    try {
        const { data } = await api(`/projects/${projectId}/team`);
        const response = TeamMembersSchema.safeParse(data);
        if(response.success){
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("Ocurrió un error inesperado al obtener a los usuarios del equipo");
    }
}

export async function deleteMemberById({id, projectId} : Pick<TeamType, 'id' | 'projectId'>) {
    try {
        const { data } = await api.delete(`/projects/${projectId}/team/${id}`);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
        throw new Error("Ocurrió un error inesperado al agregar al usuario");
    }
}