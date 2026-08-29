import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ErrorMessage from "@/components/ErrorMessage";
import type { RegisterForm } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "@/services/AuthService";
import { toast } from "sonner";

export default function RegisterView() {
    const initialValues: RegisterForm = {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    };

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

    const { mutate } = useMutation({
        mutationFn: createAccount,
        onSuccess: (data) => {
            toast.success(data.message);
            reset();
        },
        onError: (data) => {
            toast.error(data.message);
        }
    });

    const password = watch('password');

    const handleRegister = (formData: RegisterForm) => mutate(formData);

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    Crear Cuenta
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                    Llena los siguientes datos para crear una cuenta en Logify
                </p>
            </div>

            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-5"
                noValidate
            >
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-200">
                        Nombre
                    </label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Ingresa tu nombre de usuario"
                        className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all duration-200"
                        {...register("name", {
                            required: "El nombre de usuario es obligatorio",
                        })}
                    />
                    {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
                </div>

                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                        Correo electrónico
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="ejemplo@correo.com"
                        className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all duration-200"
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
                    Crear Cuenta
                </button>
            </form>

            <nav className="pt-4 border-t border-gray-800 text-center">
                <p className="text-sm text-gray-400">
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                        to="/auth/login"
                        className="font-medium text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
                    >
                        Inicia sesión aquí
                    </Link>
                </p>
            </nav>
        </div>
    )
}