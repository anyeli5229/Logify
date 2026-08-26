import { getTaskById } from "@/services/TaskService";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal";
import Spinner from "../Spinner";


export default function EditTaskData() {
    const location = useLocation();
    const params = useParams();
    const projectId = params.projectId!;
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get("editTask")!;
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getTaskById({ projectId, taskId }),
        enabled: !!taskId
    })
    if (isLoading) return <Spinner size="lg" label="Cargando tarea..." />;
    if (isError) return <Navigate to={"/404"}/>;

    if (data) return (
        <EditTaskModal key={taskId} task={data} projectId={projectId} taskId={taskId}/>
    )
}
