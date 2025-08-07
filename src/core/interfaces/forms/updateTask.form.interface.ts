import { FormControl } from "@angular/forms";

export interface IUpdateTaskForm {
    titleTask: FormControl<string | null>;
    descriptionTask: FormControl<string | null>;
    dueDate: FormControl<string | null>;
    priority: FormControl<string | null>;
}