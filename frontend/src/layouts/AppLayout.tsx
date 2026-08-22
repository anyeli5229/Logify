import { Outlet } from "react-router-dom";
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";

export default function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col font-sans">

            <header className="bg-linear-to-r from-purple-700 via-slate-900 to-slate-950 border-b border-purple-500/20 shadow-lg py-3 px-6 sticky top-0 z-10 shadow-purple-200">
                <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">

                    <div className="w-32 sm:w-36 flex items-center">
                        <Logo />
                    </div>

                    <NavMenu />

                </div>
            </header>


            <main className="max-w-6xl w-full mx-auto p-6 grow">
                <Outlet />
            </main>


            <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-200 bg-white">
                Logify &copy; {new Date().getFullYear()} — Gestión de Tareas y Proyectos
            </footer>
        </div>
    );
}