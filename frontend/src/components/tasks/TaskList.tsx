import type { Project, Task, TaskProject, TaskStatus } from "@/types";
import TaskCard from "./TaskCard";
import { statusTranslations } from "@/locales/es";
import DropTask from "./DropTask";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "@/services/TaskService";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

type TaskListProps = {
    tasks: TaskProject[];
    canEdit: boolean;
};

type GroupedTasks = {
    [key in TaskStatus]: TaskProject[];
};

const initialStatusGroups: GroupedTasks = {
    PENDING: [],
    ON_HOLD: [],
    IN_PROGRESS: [],
    UNDER_REVIEW: [],
    COMPLETED: []
};

export const statusStyles: Record<TaskStatus, string> = {
    PENDING: "border-t-slate-400 text-slate-700",
    ON_HOLD: "border-t-rose-500 text-rose-700",
    IN_PROGRESS: "border-t-violet-600 text-violet-700",
    UNDER_REVIEW: "border-t-amber-500 text-amber-700",
    COMPLETED: "border-t-emerald-500 text-emerald-700"
};

export default function TaskList({ tasks, canEdit }: TaskListProps) {
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
            navigate(location.pathname, { replace: true });
        },
        onError: (data) => {
            toast.error(data.message);
        }
    });

    const groupedTasks = (tasks || []).reduce((acc, task) => {
        const currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        return { ...acc, [task.status]: [...currentGroup, task] };
    }, initialStatusGroups);

    const handleDragEnd = (e: DragEndEvent) => {
        const { over, active } = e;

        if (over && over.id) {
            const taskId = active.id.toString();
            const status = over.id as TaskStatus;

            mutate({ projectId, taskId, status });

            queryClient.setQueryData<Project>(["editProject", projectId], (prevData) => {
                if (!prevData) return prevData;

                const updatedTasks = prevData.tasks.map((task) =>
                    task.id === taskId ? { ...task, status } : task
                );

                return {
                    ...prevData,
                    tasks: updatedTasks
                };
            });
        }
    };

    return (
        <div className="w-full">
            <h2 className="text-3xl font-black my-6 text-slate-900 tracking-tight">Tareas</h2>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3.5 pb-20 w-full">
                <DndContext onDragEnd={handleDragEnd}>
                    {Object.entries(groupedTasks).map(([status, groupTasks]) => (
                        <div key={status} className="min-w-0 flex flex-col">
                            <div className={`border border-slate-200/80 bg-white p-3 border-t-4 rounded-xl shadow-xs flex items-center justify-between ${statusStyles[status as TaskStatus]}`}>
                                <h3 className="text-xs font-bold tracking-wider uppercase truncate">
                                    {statusTranslations[status as TaskStatus]}
                                </h3>
                                <span className="text-[11px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200/50">
                                    {groupTasks.length}
                                </span>
                            </div>

                            <DropTask status={status} />

                            <ul className="mt-3 space-y-3 flex-1">
                                {groupTasks.length === 0 ? (
                                    <li className="text-slate-400 text-xs font-medium text-center py-6 border-2 border-dashed border-slate-200/70 rounded-xl bg-slate-50/40">
                                        No hay tareas
                                    </li>
                                ) : (
                                    groupTasks.map((task) => (
                                        <TaskCard key={task.id} task={task as Task} canEdit={canEdit} />
                                    ))
                                )}
                            </ul>
                        </div>
                    ))}
                </DndContext>
            </div>
        </div>
    )
}