import type { Task } from "@/types"
import TaskCard from "./TaskCard"

type TaskListProps = {
    tasks: Task[]
}

type GroupedTasks = {
    [key: string]: Task[]
}

const initialStatusGroups: GroupedTasks = {
    PENDING: [],
    ON_HOLD: [],
    IN_PROGRESS: [],
    UNDER_REVIEW: [],
    COMPLETED: []
}

const statusTranslations: { [key: string]: string } = {
    PENDING: "Pendiente",
    ON_HOLD: "En espera",
    IN_PROGRESS: "En progreso",
    UNDER_REVIEW: "En revisión",
    COMPLETED: "Completada"
}

const statusStyles: { [key: string]: string } = {
    PENDING: "border-t-slate-400 text-slate-700",
    ON_HOLD: "border-t-rose-500 text-rose-700",
    IN_PROGRESS: "border-t-violet-600 text-violet-700",
    UNDER_REVIEW: "border-t-amber-500 text-amber-700",
    COMPLETED: "border-t-emerald-500 text-emerald-700"
}

export default function TaskList({ tasks }: TaskListProps) {

    const groupedTasks = tasks.reduce((acc, task) => {
        let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
        currentGroup = [...currentGroup, task]
        return { ...acc, [task.status]: currentGroup };
    }, initialStatusGroups);

    return (
        <div className="w-full">
            <h2 className="text-3xl font-black my-6 text-slate-900 tracking-tight">Tareas</h2>

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 pb-20 w-full'>
                {Object.entries(groupedTasks).map(([status, tasks]) => (
                    <div key={status} className='min-w-0 flex flex-col'>
                        
                        <div className={`border border-slate-200/80 bg-white p-3 border-t-4 rounded-xl shadow-xs flex items-center justify-between ${statusStyles[status]}`}>
                            <h3 className="text-xs font-bold tracking-wider uppercase truncate">
                                {statusTranslations[status]}
                            </h3>
                            <span className="text-[11px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full border border-slate-200/50">
                                {tasks.length}
                            </span>
                        </div>
                        
                        <ul className='mt-3 space-y-3 flex-1'>
                            {tasks.length === 0 ? (
                                <li className="text-slate-400 text-xs font-medium text-center py-6 border-2 border-dashed border-slate-200/70 rounded-xl bg-slate-50/40">
                                    No hay tareas
                                </li>
                            ) : (
                                tasks.map(task =>
                                    <TaskCard key={task.id} task={task} />
                                )
                            )}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}