import { Navigate, Outlet } from "react-router-dom";
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import { Toaster } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import Spinner from "@/components/Spinner";

export default function AppLayout() {

    const { data, isLoading, isError } = useAuth();

    if (isError) return <Navigate to={"/auth/login"} />

    if (isLoading) {
        return (
            <div className="min-h-100 flex items-center justify-center">
                <Spinner size="lg" label="Cargando..." />
            </div>
        )
    }


    if(data) return (
        <div className="min-h-screen flex flex-col font-sans">

            <Toaster position="top-right" richColors />

            <header className="bg-linear-to-r from-purple-700 via-slate-900 to-slate-950 border-b border-purple-500/20 shadow-lg py-3 px-6 shadow-purple-200">
                <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">

                    <div className="w-32 sm:w-36 flex items-center">
                        <Logo />
                    </div>

                    <NavMenu name={data.name}/>

                </div>
            </header>


            <main className="max-w-5xl w-full mx-auto p-6 grow">
                <Outlet />
            </main>


            <footer className="bg-gray-100 py-4 text-center text-xs text-slate-500 border-t border-slate-300 ">
                Logify &copy; {new Date().getFullYear()} — Gestión de Tareas y Proyectos
            </footer>
        </div>
    );
}