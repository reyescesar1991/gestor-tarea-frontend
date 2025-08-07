import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ZodError, ZodSchema, ZodString } from 'zod';

export function zodValidator<T>(schema: ZodSchema<T> | ZodString): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        try {
            schema.parse(control.value);
            return null;
        } catch (error: any) {
            if (error instanceof ZodError) {
                return {
                    zodError: {
                        message: error.issues[0].message
                    }
                };
            }
            return { 
                zodError: {
                    message: 'Error de validación'
                }
            };
        }
    };
}