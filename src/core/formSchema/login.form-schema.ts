import z from "zod";

export const loginFormSchema = z.object({
    username: z.string().min(6, "El usuario debe tener al menos 6 carácteres"),
    password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{12,}$/, { message: "La contraseña debe tener al menos 12 caracteres y contener al menos una mayúscula, una minúscula, un número y un carácter especial." }),
});

// Exportamos el tipo del schema
export type LoginFormSchema = z.infer<typeof loginFormSchema>;