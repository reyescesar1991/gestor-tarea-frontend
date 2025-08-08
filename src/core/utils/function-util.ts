import { Injectable } from "@angular/core";
import { da } from "zod/v4/locales/index.cjs";


@Injectable({
    providedIn: 'root'
})
export class functionsService {

    /**
   * Calcula la cantidad de días enteros que faltan entre la fecha actual y una fecha de vencimiento dada como un string.
   * @param dueDateString El string de la fecha de vencimiento en formato ISO 8601 (ej. "2025-08-18T00:00:00.000Z").
   * @returns La cantidad de días enteros restantes.
   */
    getDaysRemainingFromString(dueDateString: string): number {
        // 1. Convertir el string de fecha a un objeto Date de JavaScript.
        const dueDate = new Date(dueDateString);

        // 2. Verificar que la fecha sea válida. Si no, devuelve 0 o lanza un error.
        if (isNaN(dueDate.getTime())) {
            throw new Error("El string de fecha proporcionado no es un formato de fecha válido.");
        }

        // 3. Obtener la fecha actual y la de vencimiento, eliminando la parte de la hora.
        const now = new Date();
        const nowWithoutTime = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const dueDateWithoutTime = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());

        // 4. Calcular la diferencia en milisegundos y convertirla a días.
        const diffInMilliseconds = dueDateWithoutTime.getTime() - nowWithoutTime.getTime();
        const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

        // 5. Devolver la diferencia redondeada.
        return Math.round(diffInDays);
    };


    /**
 * Convierte un string de fecha en formato ISO 8601 a formato "dd-mm-yyyy".
 * @param dateString El string de la fecha en formato ISO (ej. "2025-08-18T00:00:00.000Z").
 * @returns El string de la fecha formateado como "dd-mm-yyyy".
 */
    formatDateToYYYYMMDD(dateString: string) {
        // 1. Crear un objeto Date a partir del string.
        const date = new Date(dateString);

        // 2. Extraer el día, mes y año.
        // getUTCDay() y getUTCMonth() se usan para evitar problemas con zonas horarias.
        const day = String(date.getUTCDate()).padStart(2, '0');
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Los meses en JS son 0-11
        const year = date.getUTCFullYear();

        // 3. Unir las partes con guiones.
        return `${year}-${month}-${day}`;
    };
}