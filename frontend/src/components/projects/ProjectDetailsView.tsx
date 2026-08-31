import { getProjectById } from "@/services/ProjectService";
import { useQuery } from "@tanstack/react-query";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import Spinner from "../Spinner";
import AddTaskModal from "../tasks/AddTaskModal";
import TaskList from "../tasks/TaskList";
import EditTaskData from "../tasks/EditTaskData";
import TaskModalDetails from "../tasks/TaskModalDetails";


export default function ProjectDetailsView() {
  const params = useParams();
  const projectId = params.projectId!;
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editProject", projectId],
    queryFn: () => getProjectById(projectId),
    retry: false
  })

  if (isError) return <Navigate to={"/404"} />;
  if (isLoading) return <Spinner size="lg" label="Cargando datos del proyecto" />
  if (data) return (

    <>
      <h1 className="text-5xl font-semibold">{data.projectName}</h1>
      <p className="text-2xl font-light text-gray-500 my-5">{data.description}</p>

      <nav className="my-8 flex flex-wrap items-center gap-4">
        <button
          type="button"
          className="uppercase bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-indigo-500/20 active:scale-95 transition-all duration-200 cursor-pointer text-xs tracking-wider"
          onClick={() => navigate(location.pathname + "?newTask=true")}
        >
          Agregar Tarea
        </button>

        <Link
          className="uppercase bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-indigo-500/20 active:scale-95 transition-all duration-200 cursor-pointer text-xs tracking-wider"
          to={`/projects/${projectId}/team`}
        >
          Colaboradores
        </Link>

        <Link
          className="uppercase bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-xl transition-all duration-200 cursor-pointer text-xs tracking-wider border border-slate-200"
          to={`/`}
        >
          Regresar a proyectos
        </Link>
      </nav>

      <TaskList
        tasks={data.tasks}
      />

      <AddTaskModal />
      <EditTaskData />
      <TaskModalDetails />
    </>
  )
}
