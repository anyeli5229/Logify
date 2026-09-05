import ErrorMessage from "@/components/ErrorMessage"
import type { User, UserProfileForm } from "@/types"
import { useForm } from "react-hook-form"

type ProfileFormProps = {
    data: User
}

export default function ProfileForm({ data }: ProfileFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm<UserProfileForm>({ defaultValues: data })

    const handleEditProfile = (formData: UserProfileForm) => {
        // Lógica de mutación para actualizar perfil
    }

    return (
        <div className="mx-auto max-w-2xl px-4 py-8">
            <div className="mb-8 space-y-2 text-center sm:text-left">
                <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                    Mi Perfil
                </h1>
                <p className="text-sm text-slate-500">
                    Actualiza tu nombre y correo electrónico de cuenta
                </p>
            </div>

            <form
                onSubmit={handleSubmit(handleEditProfile)}
                className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 sm:p-10 border border-slate-100 space-y-6 transition-all"
                noValidate
            >
                <div className="space-y-2">
                    <label
                        className="block text-xs font-bold uppercase tracking-wider text-slate-500"
                        htmlFor="name"
                    >
                        Nombre de Usuario
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Tu Nombre"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                        {...register("name", {
                            required: "El nombre de usuario es obligatorio",
                        })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>

                <div className="space-y-2">
                    <label
                        className="block text-xs font-bold uppercase tracking-wider text-slate-500"
                        htmlFor="email"
                    >
                        E-mail
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Tu Email"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
                        {...register("email", {
                            required: "El e-mail es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full uppercase bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-indigo-500/20 transition-all duration-200 cursor-pointer text-sm tracking-wider mt-4"
                >
                    Guardar Cambios
                </button>
            </form>
        </div>
    )
}