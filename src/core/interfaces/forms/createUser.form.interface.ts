import { FormControl } from "@angular/forms";

export interface ICreateUserForm {
    name: FormControl<string | null>;
    lastname: FormControl<string | null>;
    username: FormControl<string | null>;
    email: FormControl<string | null>;
    phone: FormControl<string | null>;
    password: FormControl<string | null>;
}