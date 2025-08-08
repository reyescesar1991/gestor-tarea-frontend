import z from "zod";

const priorities: String[] = ["Baja", "Media", "Alta"];
const status: String[] = ["Pendiente", "En progreso", "Terminada"];

export const updateTaskSchemaZod = z.object({

    titleTask: z.string().min(6, "El usuario debe tener al menos 6 carácteres").optional(),
    descriptionTask: z.string().optional(),
    dueDate: z.string().optional(),
    status: z.string().refine(value => {

        if (!status.includes(value)) return false;

        return true;
    }, {
        message: "Tipo de dato requerido",
    }).optional(),
    priority: z.string().refine(value => {

        if (!priorities.includes(value)) return false;

        return true;
    }, {
        message: "Tipo de dato requerido",
    }).optional(),
    
})