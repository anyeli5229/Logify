import { Fragment } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import type { Task } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteTask } from "@/services/TaskService";

interface TaskCardProps {
    task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteTask,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({queryKey: ["editProject", projectId]})
        },
        onError: (data) => {
            toast.error(data.message);
        }
    })

    return (
        <li className="p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 space-y-1.5 group relative flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {task.name}
                </h4>
                {task.description && (
                    <p className="text-slate-500 text-xs font-normal leading-relaxed line-clamp-2 mt-1">
                        {task.description}
                    </p>
                )}
            </div>

            <Menu as="div" className="relative shrink-0">
                <MenuButton className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">
                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                </MenuButton>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <MenuItems className="absolute right-0 z-10 mt-1 w-40 origin-top-right rounded-xl bg-white p-1 shadow-lg ring-1 ring-slate-900/5 focus:outline-hidden text-xs font-medium">

                        <MenuItem>
                            <button
                                type="button"
                                onClick={() => navigate(location.pathname + `?viewTask=${task.id}`)}
                                className="hover:bg-slate-100 hover:text-slate-900 text-slate-700 flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 cursor-pointer"
                            >
                                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Ver tarea
                            </button>
                        </MenuItem>

                        <MenuItem>
                            <button
                                type="button"
                                className="hover:bg-slate-100 hover:text-slate-900 text-slate-700 flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 cursor-pointer"
                                onClick={() => navigate(location.pathname + `?editTask=${task.id}`)}
                            >
                                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                Editar tarea
                            </button>
                        </MenuItem>

                        <MenuItem>
                            <button
                                type="button"
                                onClick={() => mutate({projectId, taskId: task.id})}
                                className="hover:bg-red-50  hover:text-red-700 text-red-600 flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 cursor-pointer"
                            >
                                <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Eliminar
                            </button>
                        </MenuItem>
                    </MenuItems>
                </Transition>
            </Menu>
        </li>
    )
}