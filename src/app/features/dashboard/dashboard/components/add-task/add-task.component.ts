import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LabelTypeComponent } from '../../../../../../shared/label-type/label-type.component';
import { SnackNotificationService } from '../../../../../../core/services/snack-bar.service';
import { IAddTaskForm } from '../../../../../../core/interfaces/forms/newTask.form.interface';
import { newTaskSchemaZod } from '../../../../../../core/formSchema/newTask.form-schema';
import { zodValidator } from '../../../../../../core/zodValidator/zod.validator';
import { TaskService } from '../../../../../../core/services/task.service';
import { ICreateTaskRequest } from '../../../../../../core/interfaces/task/ICreateTaskRequest';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../../../../../core/interfaces/api/api.response.interface';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LabelTypeComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  private router = inject(Router);
  private snackBar = inject(SnackNotificationService);
  private taskService = inject(TaskService);
  private fb = inject(FormBuilder);
  protected newTaskForm: FormGroup<IAddTaskForm>;

  constructor() {
    this.newTaskForm = this.fb.group<IAddTaskForm>({
      titleTask: this.fb.control('', {
        validators: [zodValidator(newTaskSchemaZod.shape.titleTask)],
        nonNullable: true
      }),
      descriptionTask: this.fb.control('', {
        validators: [zodValidator(newTaskSchemaZod.shape.descriptionTask)],
        nonNullable: true
      }),
      dueDate: this.fb.control('', {
        validators: [zodValidator(newTaskSchemaZod.shape.dueDate)],
        nonNullable: true
      }),
      priority: this.fb.control('', {
        validators: [zodValidator(newTaskSchemaZod.shape.priority)],
        nonNullable: true
      }),
      status: this.fb.control('', {
        validators: [zodValidator(newTaskSchemaZod.shape.status)],
        nonNullable: true
      })
    });
  }

  protected redirectToDashboard() {

    this.router.navigate(['dashboard/start']);
  }

  protected addTask(){

    console.log(this.newTaskForm.getRawValue());

    let params : ICreateTaskRequest = {

      title: this.newTaskForm.get('titleTask')?.value as string,
      description: this.newTaskForm.get('descriptionTask')?.value as string,
      dueDate: this.newTaskForm.get('dueDate')?.value as string,
      priority: this.newTaskForm.get('priority')?.value as string,
      status: this.newTaskForm.get('status')?.value as string,
    }

    console.log(params);
    
    this.taskService.createTask(params).subscribe({
      next: (response) => this.handleCreateTaskSuccess(response),
      error: (response) => this.handleCreateTaskError(response),
    });

  }

  protected handleCreateTaskSuccess(response: ApiResponse<void>) {
    console.log(response);
    this.snackBar.success(response.message);
    this.redirectToDashboard();
  }

  protected handleCreateTaskError(response: HttpErrorResponse) {
    console.log(response);
    this.snackBar.error(response.error.message, 10000);
  }
}
