import NewPasswordToken from "@/components/auth/NewPasswordToken";
import NewPasswordForm from "@/components/auth/NewPasswordForm";
import { useState } from "react";
import type { InputToken } from "@/types";


export default function NewPassword() {
    const [isValidToken, setIsValidToken] = useState(false);
    const [token, setToken] = useState<InputToken["token"]>("");

    const cambiarVista = () => {
        setIsValidToken(true);
    }

    return (
        <>
            {!isValidToken ?
                <NewPasswordToken
                    token={token}
                    setToken={setToken}
                    cambiarVista={cambiarVista}
                /> 
                : 
                <NewPasswordForm 
                    token={token}
                />}
        </>
    )
}
