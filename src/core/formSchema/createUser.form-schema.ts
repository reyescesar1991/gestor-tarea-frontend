import z from "zod";

export const createUserFormSchemaZod = z.object({

    username: z.string().min(6, "El usuario debe tener al menos 6 carácteres"),
    email : z.email({ message: 'Formato de correo electrónico no valido' }).nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),
    phone : z.string().regex(/^(0412|0416|0424|0414)\d{7}$/, { message: 'Formato de telefono erroneo' })
        .nullable()
        .refine(value => value && value.trim().length > 0, {
            message: "Tipo de dato requerido",
        }),
    name : z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),

    lastname : z.string().nullable().refine(value => value && value.trim().length > 0, {
        message: "Tipo de dato requerido",
    }),
    password : z.string()
        .min(8, { message: 'La contraseña no cumple con el mínimo de caracteres (mínimo 8)' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}$/, { message: "La contraseña debe tener al menos 12 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial." })
        .nullable()
        .refine(value => value && value.trim().length > 0, {
            message: "Tipo de dato requerido",
    }),
})