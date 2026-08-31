import Spinner from "@/components/Spinner";
import AddMemberModal from "@/components/team/AddMemberModal";
import { deleteMemberById, getMembersTeam } from "@/services/TeamService";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon, UserGroupIcon } from "@heroicons/react/20/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { toast } from "sonner";

export default function ProjectTeamView() {
    const navigate = useNavigate();
    const params = useParams();
    const projectId = params.projectId!;
    const queryClient = useQueryClient();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["projectTeam", projectId],
        queryFn: () => getMembersTeam({ projectId }),
        retry: false
    });

    const { mutate } = useMutation({
        mutationFn: deleteMemberById,
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries({queryKey: ["projectTeam", projectId]});
        },
        onError: (data) => {
            toast.error(data.message);
        }
    });

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-100">
            <Spinner size="lg" label="Cargando colaboradores..." />
        </div>
    );

    if (isError) return <Navigate to={"/404"} />;

    if (data) return (
        <>
            <h1 className="text-4xl sm:text-5xl font-semibold text-slate-900 tracking-tight">
                Colaboradores
            </h1>
            <p className="text-lg font-light text-slate-500 my-3">
                Administra el equipo de trabajo asignado a este proyecto
            </p>

            <nav className="my-8 flex flex-wrap items-center gap-4">
                <button
                    type="button"
                    className="uppercase bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-indigo-500/20 active:scale-95 transition-all duration-200 cursor-pointer text-xs tracking-wider"
                    onClick={() => navigate(location.pathname + "?addMember=true")}
                >
                    Agregar Colaborador
                </button>

                <Link
                    className="uppercase bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-xl transition-all duration-200 cursor-pointer text-xs tracking-wider border border-slate-200"
                    to={`/projects/${projectId}`}
                >
                    Regresar al proyecto
                </Link>
            </nav>

            <h2 className="text-2xl font-bold text-slate-800 my-6">
                Miembros actuales ({data.length})
            </h2>

            {data.length ? (
                <ul role="list" className="divide-y divide-slate-100 border border-slate-200 rounded-2xl bg-white shadow-sm">
                    {data.map((member) => (
                        <li key={member.id} className="flex justify-between items-center gap-x-6 px-6 py-5 hover:bg-slate-50/60 transition-colors">
                            <div className="flex items-center gap-x-4 min-w-0">

                                <div className="flex items-center justify-center w-11 h-11 rounded-full bg-purple-100 text-purple-700 font-bold text-lg uppercase shrink-0">
                                    {member.name.charAt(0)}
                                </div>

                                <div className="min-w-0 flex-auto space-y-0.5">
                                    <p className="text-base font-bold text-slate-800 truncate">
                                        {member.name}
                                    </p>
                                    <p className="text-xs text-slate-500 truncate">
                                        {member.email}
                                    </p>
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center">
                                <Menu as="div" className="relative flex-none">
                                    <MenuButton className="-m-2.5 block p-2.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-all">
                                        <span className="sr-only">Opciones</span>
                                        <EllipsisVerticalIcon className="h-6 w-6" aria-hidden="true" />
                                    </MenuButton>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <MenuItems className="absolute right-0 z-20 mt-2 w-56 origin-top-right rounded-xl bg-white py-1.5 shadow-xl ring-1 ring-slate-900/10 focus:outline-none">
                                            <MenuItem>

                                                <button
                                                    type="button"
                                                    className="hover:bg-red-50 hover:text-red-700 text-red-600 group flex w-full items-center px-4 py-2 text-xs font-semibold tracking-wide transition-colors"
                                                    onClick={() => mutate({projectId, id: member.id})}
                                                >
                                                    Eliminar del proyecto
                                                </button>

                                            </MenuItem>
                                        </MenuItems>
                                    </Transition>
                                </Menu>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center bg-slate-50/50">
                    <UserGroupIcon className="h-12 w-12 text-slate-400 mb-3" />
                    <h3 className="text-base font-bold text-slate-800">No hay miembros en este equipo</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-sm">
                        Agrega personas usando su correo electrónico para colaborar en las tareas de este proyecto.
                    </p>
                </div>
            )}

            <AddMemberModal />
        </>
    )
}