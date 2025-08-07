import { FormControl } from "@angular/forms";

export interface IAssignmentTaskForm {
    assignedUser: FormControl<string | null>;
}