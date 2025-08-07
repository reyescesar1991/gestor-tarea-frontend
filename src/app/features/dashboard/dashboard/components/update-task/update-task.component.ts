import { CommonModule } from '@angular/common';
import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IUpdateTaskForm } from '../../../../../../core/interfaces/forms/updateTask.form.interface';
import { Router } from '@angular/router';
import { SnackNotificationService } from '../../../../../../core/services/snack-bar.service';
import { LabelTypeComponent } from '../../../../../../shared/label-type/label-type.component';
import { zodValidator } from '../../../../../../core/zodValidator/zod.validator';
import { updateTaskSchemaZod } from '../../../../../../core/formSchema/updateTask.form-schema';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule, ReactiveFormsModule, LabelTypeComponent
  ],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.scss'
})
export class UpdateTaskComponent {

  protected updateTaskForm: FormGroup<IUpdateTaskForm>;

  private router = inject(Router);
  private snackBar = inject(SnackNotificationService);
  private fb = inject(FormBuilder);

  constructor(
    public dialogRef: MatDialogRef<UpdateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser: any,
  ) {

    this.updateTaskForm = this.fb.group<IUpdateTaskForm>({
      titleTask: this.fb.control('', {
        validators: [zodValidator(updateTaskSchemaZod.shape.titleTask)],
        nonNullable: true
      }),
      descriptionTask: this.fb.control('', {
        validators: [zodValidator(updateTaskSchemaZod.shape.descriptionTask)],
        nonNullable: false
      }),
      dueDate: this.fb.control('', {
        validators: [zodValidator(updateTaskSchemaZod.shape.dueDate)],
        nonNullable: false
      }),
      priority: this.fb.control('', {
        validators: [zodValidator(updateTaskSchemaZod.shape.priority)],
        nonNullable: false
      })
    });
  }

  protected closeModal() {

    this.dialogRef.close(false);
  }

  protected updateTask() {

    console.log(this.updateTaskForm.getRawValue());

  }
}
