import type { NewPasswordForm } from "@/types";
import ErrorMessage from "../ErrorMessage";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "@/services/AuthService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type NewPasswordFormProps = {
    token: string
}

export default function NewPasswordForm({ token }: NewPasswordFormProps) {
    const navigate = useNavigate();
    const initialValues: NewPasswordForm = {
        password: "",
        password_confirmation: ""
    }

    const { register, watch, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: updatePassword,
        onSuccess: (data) => {
            toast.success(data.message);
            navigate("/auth/login");
        },
        onError: (data) => {
            toast.error(data.message);
        }
    })

    const password = watch("password");

    const handleNewPassword = (formData: NewPasswordForm) => {
        const data = {
            formData, 
            token
        }

        mutate(data);
    }
    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    Nueva Contraseña
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                    Ingresa tu nueva contraseña de registro
                </p>
            </div>

            <form
                onSubmit={handleSubmit(handleNewPassword)}
                className="space-y-5"
                noValidate
            >

                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                        Contraseña
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all duration-200"
                        {...register("password", {
                            required: "La contraseña es obligatoria",
                            minLength: {
                                value: 8,
                                message: "La contraseña debe tener mínimo 8 caracteres"
                            }
                        })}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-200">
                        Confirmar contraseña
                    </label>
                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all duration-200"
                        {...register("password_confirmation", {
                            required: "Debes confirmar tu contraseña",
                            validate: value => value === password || "Las contraseñas no son iguales"
                        })}
                    />
                    {errors.password_confirmation && <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>}
                </div>

                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold rounded-xl shadow-lg shadow-fuchsia-600/20 active:scale-[0.99] transition-all duration-200 cursor-pointer"
                >
                    Reestablecer Contraseña
                </button>
            </form>

        </div>
    )
}
