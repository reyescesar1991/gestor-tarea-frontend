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
import { TaskService } from '../../../../../../core/services/task.service';
import { IUpdateTaskRequest } from '../../../../../../core/interfaces/task/IUpdateTaskRequest';
import { ITaskModelResponse } from '../../../../../../core/interfaces/task/ITaskModelResponse';
import { functionsService } from '../../../../../../core/utils/function-util';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../../../../../core/interfaces/api/api.response.interface';

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
  private taskService = inject(TaskService);
  private functionService = inject(functionsService);

  constructor(
    public dialogRef: MatDialogRef<UpdateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public dataUser: ITaskModelResponse,
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
      }),
      status : this.fb.control('', {
        validators: [zodValidator(updateTaskSchemaZod.shape.status)],
        nonNullable: false
      }),
    });
  }

  ngOnInit(){

    console.log(this.dataUser);

    this.updateTaskForm.patchValue({
      titleTask: this.dataUser.title,
      descriptionTask: this.dataUser.description,
      dueDate: this.functionService.formatDateToYYYYMMDD(this.dataUser.dueDate),
      priority: this.dataUser.priority,
      status: this.dataUser.status
    })
  }

  protected closeModal() {

    this.dialogRef.close(false);
  }

  protected updateTask() {

    console.log(this.updateTaskForm.getRawValue());

    let params : IUpdateTaskRequest = {

      idTask: this.dataUser._id,
      dataUpdateTask : {
        title: this.updateTaskForm.get('titleTask')?.value as string,
        description: this.updateTaskForm.get('descriptionTask')?.value as string,
        dueDate: this.updateTaskForm.get('dueDate')?.value as string,
        priority: this.updateTaskForm.get('priority')?.value as string,
        status: this.updateTaskForm.get('status')?.value as string
      }
    }

    this.taskService.updateTask(params).subscribe({
      next: (response) => this.handleUpdateTaskSuccess(response),
      error: (response) => this.handleUpdateTaskError(response),
    });

  }

  protected handleUpdateTaskSuccess(response: ApiResponse<void>) {

    this.snackBar.success(response.message);
    this.dialogRef.close(true);
  }

  protected handleUpdateTaskError(response: HttpErrorResponse) {

    this.snackBar.error(response.error.message, 10000);
  }
}
