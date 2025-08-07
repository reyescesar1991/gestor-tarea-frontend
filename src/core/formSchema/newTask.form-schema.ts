import z from "zod";

const priorities: String[] = ["Baja", "Media", "Alta"];
const status: String[] = ["Pendiente", "En progreso", "Terminada"];

export const newTaskSchemaZod = z.object({

    titleTask: z.string().min(6, "El usuario debe tener al menos 6 carácteres"),
    descriptionTask: z.string(),
    dueDate: z.string().transform((val, ctx) => {
        // ... (Your Zod transformation logic)
        const date = new Date(val);
        if (isNaN(date.getTime())) {
            ctx.addIssue({ code: z.ZodIssueCode.invalid_type, message: 'Fecha invalida', expected: "date" });
            return z.NEVER;
        }
        return date;
    }),
    status: z.string().refine(value => {

        if (!status.includes(value)) return false;

        return true;
    }, {
        message: "Tipo de dato requerido",
    }),
    priority: z.string().refine(value => {

        if (!priorities.includes(value)) return false;

        return true;
    }, {
        message: "Tipo de dato requerido",
    }),
})