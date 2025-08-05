import { FormControl } from "@angular/forms";

export interface ILoginForm {
    username: FormControl<string | null>;
    password: FormControl<string | null>;
}