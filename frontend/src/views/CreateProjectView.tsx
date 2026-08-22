import { Link } from "react-router-dom";


export default function CreateProjectView() {
    return (
        <div className="space-y-10 mt-5">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-3">
                        Nuevo proyecto
                    </h1>

                    <p className="text-slate-500 text-sm max-w-md mx-auto font-normal">
                        Define las bases de tu proyecto para comenzar a asignar tareas y dar seguimiento al progreso.
                    </p>
                </div>

                <nav>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-sm transition-all duration-200 transform  hover:shadow-lg hover:shadow-blue-200"
                    >
                        Volver a proyectos
                    </Link>
                </nav>
            </div>

        </div>
    )
}