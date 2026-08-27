import {z} from 'zod'

export const loginSchema = z.object({
   email: z.email("El email no es válido").min(1, "El email es requerido"),
    password: z.string().min(3, "Debe tener al menos 3 carácteres"),
})