import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { TaskFormData } from '@/types';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '@/services/TaskService';
import Spinner from '../Spinner';
import { toast } from 'sonner';

export default function AddTaskModal() {
    const navigate = useNavigate();

    /*MODAL */
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const modalTask = queryParams.get("newTask");
    const show = modalTask ? true : false;

    const params = useParams();
    const projectId = params.projectId!;

    /*FORMULARIO */
    const initialValues: TaskFormData = { name: "", description: "" };
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues });

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: createTask,
        onSuccess: (data) => {
            toast.success(data.message);
            navigate(location.pathname, {replace: true}); //Cerrar modal
            queryClient.invalidateQueries({queryKey: ["editProject", projectId]});
            reset();
        },
        onError: (data) => {
            toast.error(data.message);
        }
    })


    const handleForm = (formData: TaskFormData) => {
        const data = { formData, projectId };
        mutate(data)
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
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
                                        Nueva tarea
                                    </DialogTitle>

                                    <p className="text-xl font-semibold">Llena el formulario y crea  {''}
                                        <span className="text-violet-700">una nueva tarea</span>
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
                                                "Guardar Tarea"
                                            )}
                                        </button>

                                    </form>

                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}