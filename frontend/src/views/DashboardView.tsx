import { Link } from "react-router-dom";

export default function DashboardView() {
  return (
    <>

      <div className="border-b border-slate-200 space-y-6 my-10 pb-6">

        <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-3">
          Proyectos
        </h1>

        <p className="text-base text-slate-500 font-medium">
          Maneja, organiza y coordina los flujos de trabajo de tus equipos.
        </p>


        <nav>
          <Link
            to="/projects/create"
            className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-sm px-5 py-3 rounded-xl shadow-sm transition-all duration-200 transform  hover:shadow-lg hover:shadow-blue-200"
          >
            <svg
              className="w-4 h-4 stroke-[2.5]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Nuevo proyecto
          </Link>
        </nav>
      </div>

      <h3 className="text-base font-bold text-slate-800 text-center">
        No hay proyectos registrados aun.
      </h3>
    </>
  )
}