import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-6 text-center">
      <span className="text-xs font-black tracking-widest text-fuchsia-400 uppercase bg-fuchsia-500/10 border border-fuchsia-500/20 px-3 py-1 rounded-full mb-4">
        Error 404
      </span>

      <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
        Página no encontrada
      </h1>


      <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-sm font-light">
        Lo sentimos, la página que estás buscando no existe o fue movida a otra ubicación.
      </p>

      <div className="mt-8">
        <Link
          to="/"
          className="uppercase bg-linear-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-fuchsia-600/30 active:scale-95 transition-all duration-200 cursor-pointer text-xs tracking-wider inline-block"
        >
          Volver a Proyectos
        </Link>
      </div>
    </div>
  )
}