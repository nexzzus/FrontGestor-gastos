import {z} from 'zod'

export const registerSchema = z.object({
    firstName: z.string().min(3, "El nombre es requerido"),
    lastName: z.string().min(3, "El apellido es requerido"),
    email: z.email("El email no es válido").min(1, "El email es requerido"),
    password: z.string().min(3, "Debe tener al menos 3 carácteres"),
    confirmPassword: z.string().min(3, "Debe tener al menos 3 carácteres")
}).refine((data)=> data.password === data.confirmPassword,{
    path: ['confirmPassword'],
    message: "Las contraseñas no coinciden",
})