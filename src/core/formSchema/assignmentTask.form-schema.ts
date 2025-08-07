import z from "zod";


export const assignmentTaskFormSchemaZod = z.object({

    assignedUser : z.string().min(1, "Tipo de dato requerido")

})