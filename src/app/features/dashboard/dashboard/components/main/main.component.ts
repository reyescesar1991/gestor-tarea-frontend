import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpdateTaskComponent } from '../update-task/update-task.component';
import { DeleteTaskComponent } from '../delete-task/delete-task.component';
import { AssignmentTaskComponent } from '../assignment-task/assignment-task.component';
import { TaskService } from '../../../../../../core/services/task.service';
import { SnackNotificationService } from '../../../../../../core/services/snack-bar.service';
import { ITaskModelResponse } from '../../../../../../core/interfaces/task/ITaskModelResponse';
import { ApiResponse } from '../../../../../../core/interfaces/api/api.response.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { functionsService } from '../../../../../../core/utils/function-util';
import { IUpdateTaskRequest } from '../../../../../../core/interfaces/task/IUpdateTaskRequest';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  private taskService = inject(TaskService);
  private snackBar = inject(SnackNotificationService);
  protected function = inject(functionsService);
  @Input() listTasks: ITaskModelResponse[] = [];


  constructor(private readonly router: Router, public readonly dialog: MatDialog) { }

  ngOnInit() {

    this.getTasks();
  }

  protected getTasks() {

    this.taskService.getTasks().subscribe({
      next: (response) => this.handleGetTasksSuccess(response),
      error: (response) => this.handleGetTasksError(response),
    });
  }

  protected getTask(item: ITaskModelResponse) {

    let params: IUpdateTaskRequest = {
      idTask: item._id,
      dataUpdateTask : {
        status : "Terminada"
      }
    }

    this.taskService.updateTask(params).subscribe({
      next: (response) => this.handleUpdateTaskSuccess(response),
      error: (response) => this.handleUpdateTaskError(response),
    });

    console.log(item);
  }

  protected handleUpdateTaskSuccess(response: ApiResponse<void>) {

    console.log(response);
    this.snackBar.success(response.message);
    this.getTasks();
  }

  protected handleUpdateTaskError(response: HttpErrorResponse) {
    console.log(response);
    this.snackBar.error(response.error.message, 10000);
  }


  protected getPriorityClass(priority: string): string {

    if (priority === 'Alta') {
      return 'priority-high';
    } else if (priority === 'Media') {
      return 'priority-medium';
    } else {
      return 'priority-low';
    }
  }

  protected handleGetTasksSuccess(response: ApiResponse<ITaskModelResponse[]>) {

    console.log(response);
    // this.snackBar.success(response.message);
    this.listTasks = response.data;
  }

  protected handleGetTasksError(response: HttpErrorResponse) {

    console.log(response);
    this.snackBar.error(response.error.message, 10000);
  }


  protected redirectAddTask() {

    this.router.navigate(['/dashboard/add-task'])
  }

  protected editTask() {

    this.dialog.open(UpdateTaskComponent, {
      height: 'auto',
      width: 'auto',
      data: {}
    });
  }

  protected deleteTask() {

    this.dialog.open(DeleteTaskComponent, {
      height: 'auto',
      width: 'auto',
      data: {}
    });
  }

  protected assignTask() {

    this.dialog.open(AssignmentTaskComponent, {
      height: 'auto',
      width: 'auto',
      data: {}
    });
  }
}
