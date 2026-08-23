import { Link, useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import Spinner from "../Spinner";
import type { Project, ProjectFormData } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProject } from "@/services/ProjectService";
import { toast } from "sonner";

type EditProjectFormProps = {
    data: ProjectFormData,
    projectId: Project["id"]
}

export default function EditProjectForm({ data, projectId }: EditProjectFormProps) {
    const initialValues: ProjectFormData = { projectName: data.projectName, clientName: data.clientName, description: data.description };

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: updateProject,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["projects"]});
            queryClient.invalidateQueries({queryKey: ["editProject", projectId]});
            toast.success(data.message),
            navigate("/")
        },
        onError: (data) => {
            toast.error(data.message)
        }
    });

    const handleForm = (formData: ProjectFormData) => {
        const data = { projectId, formData }
        mutate(data)
    }

    return (
        <div className="space-y-6 my-10 pb-6">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-3">
                Editar proyecto
            </h1>

            <p className="text-slate-500 text-base font-medium">
                Edita las bases de tu proyecto para comenzar a asignar tareas y dar seguimiento al progreso.
            </p>

            <nav>
                <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-sm transition-all duration-200 transform  hover:shadow-lg hover:shadow-blue-200"
                >
                    Volver a proyectos
                </Link>
            </nav>

            <form
                onSubmit={handleSubmit(handleForm)}
                className="bg-white rounded-lg p-8 shadow-lg space-y-6"
                noValidate
            >

                <ProjectForm
                    register={register}
                    errors={errors}
                />

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full uppercase bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-indigo-500/20 transition-all duration-200 cursor-pointer"
                >
                    {isPending ? (
                        <Spinner size="sm" />
                    ) : (
                        "Guardar Cambios"
                    )}
                </button>

            </form>

        </div>

    )
}
