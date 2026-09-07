import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import type { CheckPasswordForm } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { checkPassword } from '@/services/AuthService';
import { toast } from 'sonner';
import { deleteProject } from '@/services/ProjectService';

export default function DeleteProjectModal() {
    const initialValues: CheckPasswordForm = {
        password: ''
    }
    const location = useLocation()
    const navigate = useNavigate()

    const queryParams = new URLSearchParams(location.search);
    const deleteProjectId = queryParams.get('deleteProject')!;
    const show = deleteProjectId ? true : false;

    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })
    const queryClient = useQueryClient();
    const checkPasswordFormMutation = useMutation({
        mutationFn: checkPassword,
        onError: (data) => {
            toast.error(data.message);
        }
    });

    const deleteProjectMutation = useMutation({
        mutationFn: deleteProject,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            toast.success(data.message);
            navigate(location.pathname, { replace: true })
        },
        onError: (data) => {
            toast.error(data.message);
        }
    });

    const handleForm = async (formData: CheckPasswordForm) => {
        await checkPasswordFormMutation.mutateAsync(formData);
        await deleteProjectMutation.mutateAsync(deleteProjectId);
    }

    const handleClose = () => navigate(location.pathname, { replace: true });

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleClose}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 sm:p-8 text-left align-middle shadow-2xl transition-all border border-slate-100">

                                <DialogTitle
                                    as="h3"
                                    className="text-2xl font-bold tracking-tight text-slate-800"
                                >
                                    Eliminar Proyecto
                                </DialogTitle>

                                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                                    Confirma la eliminación ingresando tu <span className="font-semibold text-rose-600">contraseña actual</span>. Esta acción no se puede deshacer.
                                </p>

                                <form
                                    className="mt-6 space-y-5"
                                    onSubmit={handleSubmit(handleForm)}
                                    noValidate
                                >
                                    <div className="space-y-2">
                                        <label
                                            className="block text-xs font-bold uppercase tracking-wider text-slate-500"
                                            htmlFor="password"
                                        >
                                            Contraseña
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            placeholder="Tu contraseña de inicio de sesión"
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600 transition-all"
                                            {...register("password", {
                                                required: "La contraseña es obligatoria",
                                            })}
                                        />
                                        {errors.password && (
                                            <ErrorMessage>{errors.password.message}</ErrorMessage>
                                        )}
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                        <button
                                            type="button"
                                            onClick={handleClose}
                                            className="w-full sm:w-1/2 py-3 px-4 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold shadow-md hover:shadow-rose-500/20 transition-all cursor-pointer"
                                        >
                                            Eliminar proyecto
                                        </button>
                                    </div>
                                </form>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}