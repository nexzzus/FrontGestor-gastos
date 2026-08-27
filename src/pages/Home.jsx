import {useAuthStore} from "../store/authStore.js";
import {logoutService} from "../api/authApi.js";
import {useNavigate} from "react-router-dom";

const Home = () => {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutService();

        logout();

        navigate("/login", { replace: true });
    }

    return (
        <div>
            <h1>Bienvenido {user?.firstName}</h1>
            <button
                className={"bg-red-800 text-white shadow-lg rounded-lg font-normal w-auto h-10 cursor-pointer"}
                onClick={handleLogout}
            >
                Cerrar Sesión
                <span className="material-symbols-outlined">logout</span>
            </button>
        </div>
    )
}
export default Home