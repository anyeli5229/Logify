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
import NotesPanel from '../notes/NotesPanel';

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
            queryClient.invalidateQueries({ queryKey: ["task", taskId] });
            queryClient.invalidateQueries({ queryKey: ["editProject", projectId] });
            navigate(location.pathname, { replace: true });
        },
        onError: (data) => {
            toast.error(data.message);
        }
    });

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as TaskStatus;
        const data = { projectId, taskId, status };
        mutate(data);
    };

    if (isError && error) {
        toast.error(error.message, { toasterId: "error" });
        return <Navigate to={`/projects/${projectId}`} />;
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
                    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" />
                </TransitionChild>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-6">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95 translateY(4px)"
                            enterTo="opacity-100 scale-100 translateY(0)"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100 translateY(0)"
                            leaveTo="opacity-0 scale-95 translateY(4px)"
                        >
                            <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-2xl transition-all">
                                <div className="h-2 w-full bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600" />

                                <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4">
                                    <div className="space-y-1">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            Detalles de la tarea
                                        </p>
                                        <DialogTitle as="h3" className="font-bold text-2xl text-slate-800 tracking-tight leading-snug">
                                            {data.name}
                                        </DialogTitle>
                                    </div>

                                    <span className={`shrink-0 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${currentStatusStyle}`}>
                                        {currentStatusTranslation}
                                    </span>
                                </div>

                                <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                                            Descripción
                                        </h4>
                                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                                                {data.description || "Sin descripción disponible."}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="status-select" className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                                            Cambiar estado
                                        </label>
                                        <div className="relative">
                                            <select
                                                id="status-select"
                                                defaultValue={data.status}
                                                onChange={handleChange}
                                                className="w-full appearance-none p-3.5 pr-10 bg-white rounded-xl border border-slate-200 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer shadow-xs hover:border-slate-300"
                                            >
                                                {Object.entries(statusTranslations).map(([key, value]) => (
                                                    <option value={key} key={key} className="text-slate-700">{value}</option>
                                                ))}
                                            </select>
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sección de Historial de Cambios */}

                                    {data.history.length === 0 ? (
                                        null
                                    ) : (
                                        <div className="space-y-3 pt-4">
                                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                                Historial de cambios
                                            </h4>
                                            <ul className="space-y-3">
                                                {data.history.map((item) => (
                                                    <li key={item.id} className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-100 flex flex-wrap items-center justify-between gap-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-semibold text-slate-700">{item.user.name}</span>
                                                            <span className="text-slate-400">cambió el estado a</span>
                                                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${statusStyles[item.status]}`}>
                                                                {statusTranslations[item.status]}
                                                            </span>
                                                        </div>
                                                        <time className="text-slate-400 font-medium">
                                                            {formatDate(item.updatedAt)}
                                                        </time>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <NotesPanel notes={data.notes} />
                                    
                                </div>


                                <div className="bg-slate-50 px-6 py-4 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-medium text-slate-400">Creada:</span>
                                        <time className="font-semibold text-slate-700">{formatDate(data.createdAt)}</time>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-medium text-slate-400">Última actualización:</span>
                                        <time className="font-semibold text-slate-700">{formatDate(data.updatedAt)}</time>
                                    </div>
                                </div>

                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}