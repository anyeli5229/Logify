import ProjectCard from "@/components/projects/ProjectCard";
import Spinner from "@/components/Spinner";
import { getAllProjects } from "@/services/ProjectService";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function DashboardView() {
  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: getAllProjects
  })


  if (isLoading) {
    return (
      <div className="min-h-100 flex items-center justify-center">
        <Spinner size="lg" label="Cargando proyectos..." />
      </div>
    )
  }

  if (data) return (
    <>

      <div className="border-b border-slate-200 space-y-6 mb-10 pb-6">

        <h1 className="text-5xl font-semibold">Proyectos</h1>
        <p className="text-2xl font-light text-gray-500 my-5">Maneja, organiza y coordina los flujos de trabajo de tus equipos.</p>

        <nav>
          <Link
            to="/projects/create"
            className="inline-flex items-center justify-center gap-2 uppercase bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-indigo-500/20 active:scale-95 transition-all duration-200 cursor-pointer text-xs tracking-wider"
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

      {data.length ? ( 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
            />
          ))}
        </div>
      ) : (
        <p className="text-base font-bold text-slate-800 text-center">
          No hay proyectos registrados aún. {" "}
          <span>
            <Link
              className="text-violet-700 font-bold"
              to={"/projects/create"}
            >
              Comienza creando uno.
            </Link>
          </span>
        </p>
      )}
    </>
  )
}