import EditProjectForm from "@/components/projects/EditProjectForm";
import Spinner from "@/components/Spinner";
import { getProjectById } from "@/services/ProjectService";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom"

export default function EditProjectView() {
    const params = useParams();
    const projectId = params.projectId!;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["editProject", projectId],
        queryFn: () => getProjectById(projectId),
        retry: false
    })

    if(isError) return <Navigate to={"/404"}/>
    if (isLoading) return (
        <Spinner size="lg" label="Cargando datos del proyecto..." />
    )
    if(data)return (
        <EditProjectForm data={data} projectId={projectId}/>
    )
}
