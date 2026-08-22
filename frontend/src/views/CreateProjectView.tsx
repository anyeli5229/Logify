import ProjectForm from "@/components/projects/ProjectForm";
import { createProject } from "@/services/ProjectService";
import type { ProjectFormData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";


export default function CreateProjectView() {
    const initialValues: ProjectFormData = { projectName: "", clientName: "", description: "" };

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const navigate = useNavigate();

    const { mutate }= useMutation({
        mutationFn: createProject,
        onSuccess: (data) => {
            toast.success(data.message);
            navigate("/");
        },
        onError: (data) => {
            toast.error(data.message);
        }
    })

    const handleForm =  (formData: ProjectFormData) => mutate(formData);

    return (
        <div className="space-y-6 my-10 pb-6">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-3">
                Nuevo proyecto
            </h1>

            <p className="text-slate-500 text-base font-medium">
                Define las bases de tu proyecto para comenzar a asignar tareas y dar seguimiento al progreso.
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
                    className="w-full uppercase bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-indigo-500/20 transition-all duration-200 cursor-pointer"
                >
                    Crear Proyecto
                </button>

            </form>

        </div>

    )
}