import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ZodSchema, ZodString } from 'zod';

export function zodValidator<T>(schema: ZodSchema<T> | ZodString): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        try {
            schema.parse(control.value);
            return null;
        } catch (error: any) {
            if (error.errors) {
                return {
                    zodError: {
                        message: error.errors[0].message
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