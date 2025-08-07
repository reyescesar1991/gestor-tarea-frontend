import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LabelTypeComponent } from '../../../../../../shared/label-type/label-type.component';
import { Router } from '@angular/router';
import { SnackNotificationService } from '../../../../../../core/services/snack-bar.service';
import { IAssignmentTaskForm } from '../../../../../../core/interfaces/forms/assignmentTask.form.interface';
import { zodValidator } from '../../../../../../core/zodValidator/zod.validator';
import { assignmentTaskFormSchemaZod } from '../../../../../../core/formSchema/assignmentTask.form-schema';

@Component({
  selector: 'app-assignment-task',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule, ReactiveFormsModule, LabelTypeComponent
  ],
  templateUrl: './assignment-task.component.html',
  styleUrl: './assignment-task.component.scss'
})
export class AssignmentTaskComponent {

  private router = inject(Router);
  private snackBar = inject(SnackNotificationService);
  private fb = inject(FormBuilder);
  protected assignmentTaskForm: FormGroup<IAssignmentTaskForm>;

  constructor(
    public dialogRef: MatDialogRef<AssignmentTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser: any,
  ) {

    this.assignmentTaskForm = this.fb.group<IAssignmentTaskForm>({
      assignedUser: this.fb.control('', {
        validators: [zodValidator(assignmentTaskFormSchemaZod.shape.assignedUser)],
        nonNullable: true
      }),
    })
  }

  protected closeModal(){

    this.dialogRef.close(false);
  }

  protected assignTask(){

    console.log(this.assignmentTaskForm.getRawValue());
    
  }
}
