import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {registerSchema} from "../../schemas/registerSchema.js";
import Input from "../Input.jsx";
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {registerService} from "../../api/authApi.js";

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        setError
    } = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const navigate = useNavigate()
    const onSubmit = async (data) => {
        await registerService(data)
            .then(res => {
                if (res.success) {
                    navigate("/home")
                } else {
                    console.error(res.error)
                    setError("root", {
                        type: "server",
                        message: res.error
                    })
                }
            })
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const visibilityPassword = () => {
        setShowPassword(!showPassword);
    }

    const visibilityConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    return (
        <div className={"w-[40%] bg-white flex flex-col items-center justify-center px-10 my-5 rounded-lg"}>
            {/*HEADER*/}
            <div className={"flex flex-col items-center justify-center mt-5"}>
                <h1 className={"text-[#006c49] font-bold text-[30px]"}>FinanzaFlow</h1>
                <span className={"text-gray-700"}>Únete a la nueva era financiera</span>
            </div>

            {/* Mensaje de error general del servidor */}
            {errors.root && (
                <div className="bg-red-100 border border-red-400 text-red-700 py-3 rounded relative my-1 flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">error</span>
                    <span className="block sm:inline">{errors.root.message}</span>
                </div>
            )}

            {/*FORMULARIO*/}
            <form onSubmit={handleSubmit(onSubmit)} className={"grid grid-cols-1 gap-y-3 mt-7"}>

                {/*NOMBRE & APELLIDO*/}
                <div className={"grid grid-cols-2 gap-2 gap-x-4"}>
                    {/*NOMBRE*/}
                    <div className={"flex flex-col"}>
                        <label htmlFor="firstName" className="input-label">Nombre</label>
                        <Input
                            type="text"
                            id="firstName"
                            placeholder={"Ej. Juan"}
                            required
                            {...register("firstName")}
                        />
                        {errors.firstName && <span className={"text-alert"}>{errors.firstName.message}</span>}
                    </div>
                    {/*APELLIDO*/}
                    <div className={"flex flex-col"}>
                        <label htmlFor="lastName" className="input-label">Apellido</label>
                        <Input
                            type={"text"}
                            id="lastName"
                            placeholder={"Ej. Pérez"}
                            required
                            {...register("lastName")}
                        />
                        {errors.lastName && <span className={"text-alert"}>{errors.lastName.message}</span>}
                    </div>
                </div>

                {/*CORREO*/}
                <div className={"flex flex-col"}>
                    <label htmlFor="email" className={"input-label"}>Correo Electrónico</label>
                    <Input
                        type="email"
                        id={"email"}
                        placeholder={"tu@email.com"}
                        required
                        icon={"email"}
                        {...register("email")}/>
                    {errors.email && <span className={"text-alert"}>{errors.email.message}</span>}
                </div>

                {/*CONTRASEÑA*/}
                <div className={"flex flex-col"}>
                    <label htmlFor="password" className="input-label">Contraseña</label>
                    <Input
                        type={showPassword ? "text" : "password"}
                        id={"password"}
                        placeholder={"••••••••"}
                        required
                        {...register("password")}
                        icon={"lock"}
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
                    {errors.password && <span className={"text-alert"}>{errors.password.message}</span>}
                </div>

                {/*CONFIRMAR CONTRASEÑA*/}
                <div className={"flex flex-col"}>
                    <label htmlFor="confirmPassword" className="input-label">Confirmar Contraseña</label>
                    <Input
                        type={showConfirmPassword ? "text" : "password"}
                        id={"confirmPassword"}
                        placeholder={"••••••••"}
                        required
                        icon={"lock"}
                        {...register("confirmPassword")}
                        suffix={
                            <button
                                type="button"
                                className={"text-on-surface-variant/60 hover:text-on-surface transition-colors focus:outline-none flex items-center"}
                                aria-label={"Toggle password visibility"}
                                onClick={visibilityConfirmPassword}
                            >
                                <span
                                    className={"material-symbols-outlined"}>{showConfirmPassword ? "visibility_off" : "visibility"}</span>
                            </button>
                        }
                    />
                    {errors.confirmPassword && <span className={"text-alert"}>{errors.confirmPassword.message}</span>}
                </div>

                {/*BOTON REGISTRO*/}
                <div className={"mt-3"}>
                    <button
                        type="submit"
                        className={"text-white text-shadow-2xs font-medium rounded-lg bg-primary w-full h-10"}
                    >
                        Registrarse
                    </button>
                </div>

                {/*IR A LOGIN*/}
                <div className={"text-center my-4"}>
                    <p>
                        ¿Ya tienes una cuenta?
                        <Link to={"/login"} className={"ml-5  text-md text-blue-800 font-medium cursor-pointer"}>
                            Iniciar Sesión
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm