import { getTaskById } from "@/services/TaskService";
import { useQuery } from "@tanstack/react-query";
import { Navigate, useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal";
import type { Task } from "@/types";
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
    if (isError || !data) return null;
    //if (isError || !data) return <Navigate to={"/404"}/>;

    const taskToEdit = data.tasks.find((task: Task) => task.id === taskId);

    if (!taskToEdit) return null;
    //if (!taskToEdit) return <Navigate to={"/404"}/>;

    if (data) return (
        <EditTaskModal key={taskId} task={taskToEdit} projectId={projectId} taskId={taskId}/>
    )
}
