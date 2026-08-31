import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "../ErrorMessage";
import type { TeamMemberForm } from "@/types";
import Spinner from "../Spinner";
import { findMemberByEmail } from "@/services/TeamService";
import SearchResult from "./SearchResult";

export default function AddMemberForm() {
    const initialValues: TeamMemberForm = {
        email: ''
    }
    const params = useParams()
    const projectId = params.projectId!

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues })

    const mutation = useMutation({
        mutationFn: findMemberByEmail
    })

    const handleSearchUser = async (formData: TeamMemberForm) => {
        const data = {
            projectId,
            formData
        }

        mutation.mutate(data);
    }

    const resetData = () => {
        mutation.reset();
        reset()
    }

    return (
        <>

            <form
                onSubmit={handleSubmit(handleSearchUser)}
                className="bg-white rounded-lg p-8 border-t border-t-gray-200 space-y-3 mt-5"
                noValidate
            >

                <div className="flex flex-col gap-5">
                    <label htmlFor="email" className="font-normal text-2xl">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="ejemplo@correo.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-800 transition-all text-sm"
                        {...register("email", {
                            required: "El email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                </div>

                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="w-full uppercase bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-indigo-500/20 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {mutation.isPending ? "Buscando..." : "Buscar Usuario"}
                </button>

            </form>

            {mutation.isPending && (
                <div className="flex items-center justify-center">
                    <Spinner size="lg" label="Cargando..." />
                </div>
            )}

            {mutation.isError && (
                <div className="px-8">
                    <ErrorMessage>{mutation.error.message}</ErrorMessage>
                </div>    
            )}

            {mutation.data && (
                <SearchResult user={mutation.data} reset={resetData}/>
            )}
        </>
    )
}