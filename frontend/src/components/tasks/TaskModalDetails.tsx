import { Fragment, type ChangeEvent } from 'react';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateStatus } from '@/services/TaskService';
import { toast } from 'sonner';
import { formatDate } from '@/utils/utils';
import { statusTranslations } from '@/locales/es';
import { statusStyles } from './TaskList';
import type { TaskStatus } from '@/types';

export default function TaskModalDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    const projectId = params.projectId!;
    const queryParams = new URLSearchParams(location.search);
    const taskId = queryParams.get("viewTask")!;
    const show = !!taskId;

    const { data, isError, error } = useQuery({
        queryKey: ["task", taskId],
        queryFn: () => getTaskById({ projectId, taskId }),
        enabled: !!taskId,
        retry: false
    });

    const queryClient = useQueryClient();
    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({queryKey: ["task", taskId]});
            queryClient.invalidateQueries({queryKey: ["editProject", projectId]})
            navigate(location.pathname, {replace: true})
        },
        onError: (data) => {
            toast.error(data.message);
        }
    })

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus;
        const data = { projectId, taskId, status}
        mutate(data)
    }

    if (isError && error) {
        toast.error(error.message, { toasterId: "error" });
        return <Navigate to={`/projects/${projectId}`} />
    }


    if (!taskId || !data) return null;

    const currentStatusTranslation = statusTranslations[data.status] || statusTranslations.PENDING;
    const currentStatusStyle = statusStyles[data.status] || statusStyles.PENDING;

    return (
        <Transition appear show={show} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={() => navigate(location.pathname, { replace: true })}>
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs" />
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
                            <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all border border-slate-100">
                                <div className="p-6 flex items-center justify-between gap-4 mt-5">
                                    <div>
                                        <DialogTitle as="h3" className="font-semibold text-3xl text-slate-800">
                                            {data.name}
                                        </DialogTitle>
                                    </div>

                                    <span className={`text-xs font-mono font-semibold uppercase tracking-wider ${currentStatusStyle} border-none`}>
                                        {currentStatusTranslation}
                                    </span>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                                            Descripción
                                        </h4>
                                        <p className="text-slate-600 text-sm p-4">
                                            {data.description}
                                        </p>
                                    </div>

                                    <div className='space-y-3'>
                                        <label className='p-1 text-xs font-bold uppercase tracking-wider text-slate-400'>Cambiar estado:</label>
                                        <select
                                            defaultValue={data.status}
                                            onChange={handleChange}
                                            className='w-full p-3 bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                                        >{Object.entries(statusTranslations).map(([key, value]) => (
                                            <option value={key} key={key}>{value}</option>
                                        ))}</select>
                                    </div>
                                </div>

                                <div className="mb-5 px-6 py-4 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-medium text-slate-400">Creada:</span>
                                        <time className="font-semibold text-slate-700">{formatDate(data.createdAt)}</time>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-medium text-slate-400">Actualizada:</span>
                                        <time className="font-semibold text-slate-700">{formatDate(data.updatedAt)}</time>
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}