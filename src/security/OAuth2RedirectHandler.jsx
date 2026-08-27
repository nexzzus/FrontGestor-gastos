import {useNavigate, useSearchParams} from "react-router-dom";
import {useAuthStore} from "../store/authStore.js";
import {useEffect, useState} from "react";
import {getMe} from "../api/authApi.js";

const OAuth2RedirectHandler = () => {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [error, setError] = useState(false)

    const login = useAuthStore((state) => state.login)

    useEffect(() => {
        const token = searchParams.get("token")
        if (token) {
            getMe(token)
                .then((response) => {
                    if (response.success){
                        const user = response.data
                        login(token, user)
                        navigate("/home", {replace: true})
                    }

                })
                .catch((error) => {
                    console.error("Error logging in", error)
                    setError(true)
                })

        } else {
            navigate("/login", {replace: true})
        }
    }, [searchParams, navigate, login])

    if (error) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center">
                <span className="text-alert text-lg font-medium">Error de autenticación</span>
                <button onClick={() => navigate("/login")} className="mt-4 text-secondary underline">
                    Volver al login
                </button>
            </div>
        );
    }

    return (
        <div className="h-screen w-full flex items-center justify-center bg-background">
            <span className="text-on-surface font-medium text-lg flex items-center gap-2">
                <span className="material-symbols-outlined animate-spin">sync</span>
                Completando autenticación...
            </span>
        </div>
    )
}

export default OAuth2RedirectHandler;