import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "@/components/ErrorMessage";
import type { LoginForm } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Login } from "@/services/AuthService";
import { toast } from "sonner";

export default function LoginView() {
  const navigate = useNavigate();
  const initialValues: LoginForm = {
    email: "",
    password: "",
  };

  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues });

  const { mutate } = useMutation({
    mutationFn: Login,
    onSuccess: () => {
      navigate("/");
    },
    onError: (data) => {
      toast.error(data.message);
    }
  })

  const handleLogin = (formData: LoginForm) => mutate(formData)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Iniciar Sesión
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Ingresa tus credenciales para acceder a tu cuenta
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="space-y-5"
        noValidate
      >
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
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Contraseña
            </label>
            <Link
              to="/auth/forgot-password"
              className="text-xs text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 bg-gray-950 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all duration-200"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
          />
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-semibold rounded-xl shadow-lg shadow-fuchsia-600/20 active:scale-[0.99] transition-all duration-200 cursor-pointer"
        >
          Iniciar Sesión
        </button>
      </form>

      <nav className="pt-4 border-t border-gray-800 text-center">
        <p className="text-sm text-gray-400">
          ¿No tienes una cuenta?{" "}
          <Link
            to="/auth/register"
            className="font-medium text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
          >
            Regístrate aquí
          </Link>
        </p>
      </nav>
    </div>
  )
}