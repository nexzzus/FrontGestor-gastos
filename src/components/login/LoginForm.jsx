import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import Input from "../Input.jsx";
import {useState} from "react";
import {loginSchema} from "../../schemas/loginSchema.js";
import {loginService} from "../../api/authApi.js";
import {Link, useNavigate} from "react-router-dom";


const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const navigate = useNavigate();
    const onSubmit = async (data) => {
        await loginService(data)
        navigate("/home")
    }

    const loginGoogle = () => {
        const backendBase = import.meta.env.VITE_BACKEND_URL.replace('/api', '');
        window.location.href = `${backendBase}/oauth2/authorization/google`;
    }

    const [showPassword, setShowPassword] = useState(false);
    const visibilityPassword = () => {
        setShowPassword(!showPassword);
    }

    return (
        <div className={"w-full min-h-dvh lg:min-h-[75dvh] xl:mt-3 pt-5 bg-white xl:w-[40%] flex flex-col items-center justify-center rounded-lg"}>
            {/*ICONO*/}
            <div className={"bg-background rounded-full w-11.25 h-11.25 flex flex-col items-center justify-center"}>
             <span
                 className="material-symbols-outlined text-4xl text-[#006c49] justify-center items-center"
                 data-weight="fill"
                 style={{fontVariationSettings: "'FILL' 1"}}
             >
  account_balance
</span>
            </div>

            {/*TITULO*/}
            <h1 className={"text-black font-bold text-xl"}>FinanzaFlow</h1>
            <p className={"text-gray-800"}>Tu ruta clara hacia la seguridad financiera.</p>

            <div className={"w-[80%] flex flex-col"}>
                {/*FORMULARIO*/}
                <form onSubmit={handleSubmit(onSubmit)} className={"grid grid-cols-1 gap-y-7 xl:gap-y-4 mt-10"}>
                    <div className={"grid grid-cols-1 gap-y-4 xl:gap-y-1"}>
                        <label htmlFor="email" className={"input-label"}>Correo Electrónico</label>
                        <Input
                            type="text"
                            id={"email"}
                            placeholder={"tu@correo.com"}
                            icon={"mail"}
                            required
                            {...register("email")}
                        />
                        {errors.email && <span className={"text-alert"}>{errors.email.message}</span>}
                    </div>

                    <div className={"flex flex-col  gap-y-4 xl:gap-y-1"}>
                        <div className={"grid grid-cols-2"}>
                            <label htmlFor="password" className={"input-label"}>Contraseña</label>
                            <p className={"text-sm text-blue-700 text-right"}>¿Olvidaste tu contraseña?</p>
                        </div>

                        <Input
                            type={showPassword ? "text" : "password"}
                            id={"password"}
                            {...register("password")}
                            icon={"lock"}
                            placeholder={"••••••••"}
                            suffix={
                                <button
                                    type="button"
                                    className={"text-on-surface-variant/60 hover:text-on-surface transition-colors focus:outline-none flex items-center"}
                                    aria-label={"Toggle password visibility"}
                                    onClick={visibilityPassword}
                                >
                                <span
                                    className={"material-symbols-outlined"}>{showPassword ? "visibility_off" : "visibility"}</span>
                                </button>
                            }
                        />
                        {errors.password &&
                            <span className={"text-alert"}>{errors.password.message}</span>}
                    </div>

                    <div>
                        <button
                            type={"submit"}
                            className={"bg-primary w-full h-10 rounded-lg text-sm font-medium cursor-pointer text-white text-shadow-2xs"}
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </form>

                {/*CONTINUAR CON*/}
                <div className={"w-full text-center mt-5"}>
                    <span className={"text-xs cursor-none"}>O CONTINUAR CON</span>

                    <div className={"grid grid-cols-1 gap-y-2 w-full mt-5"}>
                        <button
                            onClick={loginGoogle}
                            className="cursor-pointer w-full py-3 bg-transparent border-2 border-gray-300 text-on-surface font-label-md text-label-md rounded-xl hover:border-secondary hover:text-secondary transition-colors duration-200 btn-active flex justify-center items-center gap-3"
                            type="button">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    fill="#4285F4"></path>
                                <path
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    fill="#34A853"></path>
                                <path
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    fill="#FBBC05"></path>
                                <path
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    fill="#EA4335"></path>
                            </svg>
                            Google
                        </button>
                    </div>

                    <div className={"text-center my-5"}>
                        <p>
                            ¿No tienes una cuenta?
                            <Link
                                className={"text-md text-blue-700 cursor-pointer ml-5"}
                                to={"/register"}>
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginForm