import { Fragment } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import type { Project, Task, TaskFormData } from '@/types';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '@/services/TaskService';
import { toast } from 'sonner';
import Spinner from '../Spinner';

type EditTaskModalProps = {
    task: Task,
    projectId: Project["id"],
    taskId: Task["id"]
}

export default function EditTaskModal({ task, projectId, taskId }: EditTaskModalProps) {
    const navigate = useNavigate();
    const initialValues: TaskFormData = { name: task.name, description: task.description };
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues, values: initialValues });

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: updateTask,
        onSuccess: (data) => {
            toast.success(data.message),
            navigate(location.pathname, {replace:true}),
            queryClient.invalidateQueries({queryKey: ["editProject", projectId]})
        },
        onError: (data) => {
            toast.error(data.message)
        },
    });

    const handleForm = (formData: TaskFormData) => {
        const data = {projectId, taskId, formData}
        mutate(data);
    }

    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/60" />
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
                            <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                <DialogTitle
                                    as="h3"
                                    className="font-bold text-4xl mb-5"
                                >
                                    Editar tarea
                                </DialogTitle>

                                <p className="text-xl font-semibold">Realiza cambios de la tarea en {''}
                                    <span className="text-violet-700">este formulario</span>
                                </p>

                                <form
                                    onSubmit={handleSubmit(handleForm)}
                                    className="bg-white rounded-lg p-8 border-t border-t-gray-200 space-y-3 mt-5"
                                    noValidate
                                >
                                    <TaskForm
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
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}