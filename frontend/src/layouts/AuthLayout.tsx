import Logo from "@/components/Logo";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export default function AuthLayout() {
    return (

        <>
            <Toaster position="top-right" richColors />
            <div className="bg-linear-to-br from-gray-950 via-slate-900 to-gray-950 min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-48 sm:w-64 md:w-72 transition-all duration-200">
                            <Logo />
                        </div>
                    </div>
                    <div className="bg-gray-900/80 backdrop-blur-md border border-gray-800 shadow-2xl rounded-2xl p-6 sm:p-8">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}