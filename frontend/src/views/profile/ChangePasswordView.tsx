import { useForm } from "react-hook-form"
import ErrorMessage from "@/components/ErrorMessage"
import type { UpdateCurrentUserPasswordForm } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/services/ProfileService";
import { toast } from "sonner";


export default function ChangePasswordView() {
  const initialValues: UpdateCurrentUserPasswordForm = {
    current_password: '',
    password: '',
    password_confirmation: ''
  }

  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm({ defaultValues: initialValues })

  const password = watch('password');

      const { mutate } = useMutation({
        mutationFn: changePassword,
        onSuccess: (data) => {
            toast.success(data.message);
            reset();
        },
        onError: (data) => {
            toast.error(data.message);
        }
    });

  const handleChangePassword = (formData: UpdateCurrentUserPasswordForm) => mutate(formData)

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 space-y-2 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
          Cambiar Contraseña
        </h1>
        <p className="text-sm text-slate-500">
          Utiliza este formulario para actualizar la contraseña de tu cuenta
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 sm:p-10 border border-slate-100 space-y-6 transition-all"
        noValidate
      >
        <div className="space-y-2">
          <label
            className="block text-xs font-bold uppercase tracking-wider text-slate-500"
            htmlFor="current_password"
          >
            Contraseña Actual
          </label>
          <input
            id="current_password"
            type="password"
            placeholder="Ingresa tu contraseña actual"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
            {...register("current_password", {
              required: "La contraseña actual es obligatoria",
            })}
          />
          {errors.current_password && (
            <ErrorMessage>{errors.current_password.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-2">
          <label
            className="block text-xs font-bold uppercase tracking-wider text-slate-500"
            htmlFor="password"
          >
            Nueva Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Mínimo 8 caracteres"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
            {...register("password", {
              required: "La nueva contraseña es obligatoria",
              minLength: {
                value: 8,
                message: 'La contraseña debe tener mínimo 8 caracteres'
              }
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="password_confirmation"
            className="block text-xs font-bold uppercase tracking-wider text-slate-500"
          >
            Repetir Nueva Contraseña
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repite tu nueva contraseña"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all"
            {...register("password_confirmation", {
              required: "La confirmación de contraseña es obligatoria",
              validate: value => value === password || 'Las contraseñas no coinciden'
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className="w-full uppercase bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-md hover:shadow-indigo-500/20 transition-all duration-200 cursor-pointer text-sm tracking-wider mt-4"
        >
          Cambiar Contraseña
        </button>
      </form>
    </div>
  )
}