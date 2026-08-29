import { validateToken } from "@/services/AuthService";
import type { InputToken } from "@/types";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useMutation } from "@tanstack/react-query";
import { type Dispatch, type SetStateAction } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type NewPasswordTokenProps = {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
    cambiarVista: () => void;
}

export default function NewPasswordToken({token, setToken, cambiarVista }: NewPasswordTokenProps) {
    const { mutate } = useMutation({
        mutationFn: validateToken,
        onSuccess: (data) => {
            toast.success(data.message);
            cambiarVista();
        },
        onError: (data) => {
            toast.error(data.message);
        }
    });

    const handleChange = (token: InputToken["token"]) => {
        setToken(token);
    };

    const handleComplete = (token: InputToken["token"]) => mutate({token});

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-white tracking-tight">
                    Reestablecer Contraseña
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                    Ingresa el código de 6 dígitos que recibiste por correo
                </p>
            </div>

            <form className="space-y-6 pt-4">
                <div className="flex justify-center gap-2 sm:gap-3">
                    <PinInput
                        value={token}
                        onChange={handleChange}
                        onComplete={handleComplete}
                        placeholder=""
                    >
                        <PinInputField className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all duration-200" />
                        <PinInputField className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all duration-200" />
                        <PinInputField className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all duration-200" />
                        <PinInputField className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all duration-200" />
                        <PinInputField className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all duration-200" />
                        <PinInputField className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-bold bg-gray-950 border border-gray-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent transition-all duration-200" />
                    </PinInput>
                </div>
            </form>

            <nav className="pt-4 border-t border-gray-800 text-center">
                <Link
                    to="/auth/request-code"
                    className="text-sm font-medium text-fuchsia-400 hover:text-fuchsia-300 transition-colors"
                >
                    Solicitar un nuevo código
                </Link>
            </nav>
        </div>
    )
}
