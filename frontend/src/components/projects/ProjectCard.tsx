import { Link } from "react-router-dom";
import type { Project } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject } from "@/services/ProjectService";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { isManager } from "@/utils/policies";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {

    const { data: user } = useAuth();

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: deleteProject,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success(data.message);
        },
        onError: (data) => {
            toast.error(data.message)
        }
    })

    if (user) return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-md transition-all duration-200 flex flex-col justify-between">
            <div className="space-y-3">

                <div>
                    <div className=" flex flex-col-reverse md:flex-row md:justify-between md:items-center">
                        <h3 className="text-xl font-bold text-slate-900 hover:text-purple-700 hover:underline transition-colors">
                            <Link to={`/projects/${project.id}`}>{project.projectName}</Link>
                        </h3>
                        <div className="mb-2">
                            {isManager(project.manager!.id, user.id)  ?
                                <p className="font-bold text-xs uppercase bg-blue-100 text-blue-600 border-2 border-blue-500 rounded-lg inline-block py-1 px-5">Mánager</p> :
                                <p className="font-bold text-xs uppercase bg-amber-100 text-amber-600 border-2 border-amber-500 rounded-lg inline-block py-1 px-5">Colaborador</p>
                            }
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm font-normal mt-1 line-clamp-2 leading-relaxed">
                        Cliente: {project.clientName}
                    </p>
                    <p className="text-slate-500 text-sm font-normal mt-1 line-clamp-2 leading-relaxed ">
                        {project.description}
                    </p>
                </div>
            </div>

            <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-purple-800 hover:text-purple-600 transition-colors"
                >
                    Ver proyecto
                </Link>

                {isManager(project.manager!.id, user.id) && (
                    <div className="flex items-center gap-2">
                        <Link
                            to={`/projects/${project.id}/edit`}
                            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Editar proyecto"
                        >
                            <svg
                                className="w-4 h-4 stroke-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                            </svg>
                        </Link>

                        <button
                            onClick={() => mutate(project.id)}
                            type="button"
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Eliminar proyecto"
                        >
                            <svg
                                className="w-4 h-4 stroke-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}