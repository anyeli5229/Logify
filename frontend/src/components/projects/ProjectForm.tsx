import type { FieldErrors, UseFormRegister } from "react-hook-form"
import ErrorMessage from "../ErrorMessage";
import type { ProjectFormData } from "@/types";

type ProjectFormProps = {
    register: UseFormRegister<ProjectFormData>
    errors: FieldErrors<ProjectFormData>
}

export default function ProjectForm({ register, errors }: ProjectFormProps) {
    return (
        <>
            <div>
                <label htmlFor="projectName" className="block text-sm font-bold text-slate-800 mb-2">
                    Nombre del proyecto
                </label>
                <input
                    id="projectName"
                    type="text"
                    placeholder="Ej. Reorganización de Marca Logify"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-800 transition-all text-sm"
                    {...register("projectName", { required: "El título del proyecto es obligatorio" })}
                />
            </div>

            {errors.projectName && (
                <ErrorMessage>{errors.projectName.message}</ErrorMessage>
            )}

            <div>
                <label htmlFor="clientName" className="block text-sm font-bold text-slate-800 mb-2">
                    Nombre del cliente
                </label>
                <input
                    id="clientName"
                    type="text"
                    placeholder="Ej. Empresa / Cliente"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-800 transition-all text-sm"
                    {...register("clientName", {
                        required: "El nombre del cliente es obligatotio"
                    })}
                />
            </div>

            {errors.clientName && (
                <ErrorMessage>{errors.clientName.message}</ErrorMessage>
            )}

            <div>
                <label htmlFor="description" className="block text-sm font-bold text-slate-800 mb-2">
                    Descripción
                </label>
                <textarea
                    id="description"
                    rows={4}
                    placeholder="Escribe una breve descripción del proyecto..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-800 transition-all text-sm resize-none"
                    {...register("description", {
                        required: "Debes agregar información sobre el proyecto"
                    })}
                />

                {errors.description && (
                    <ErrorMessage>{errors.description.message}</ErrorMessage>
                )}
            </div>
        </>
    )
}
