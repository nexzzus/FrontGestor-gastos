import {useAuthStore} from "../store/authStore.js";
import {Navigate, Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {getMe} from "../api/authApi.js";

export default function ProtectedRoute() {
    const token = useAuthStore((state) => state.token)
    const login = useAuthStore((state) => state.login)
    const user = useAuthStore((state) => state.user)
    const [isRestoringSession, setIsRestoringSession] = useState(!!token && !user)

    useEffect(() => {
        if (token && !user) {
            getMe(token)
                .then((response) => {
                    if (response.success) {
                        login(token, response.data)
                    }
                })
                .catch((error) => {
                    console.error("Error recuperando usuario", error)
                })
                .finally(() =>setIsRestoringSession(false))
        }
    }, [token, user, login]);

    if (!token) {
        return <Navigate to={"/login"}/>
    }

    // Mientras recupera los datos del backend, mostramos una carga temporal
    if (isRestoringSession) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-background">
                <span className="text-on-surface">Restaurando sesión...</span>
            </div>
        );
    }

    return <Outlet/>
}