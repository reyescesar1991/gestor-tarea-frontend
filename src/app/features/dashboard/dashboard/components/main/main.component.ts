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
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  private taskService = inject(TaskService);
  private snackBar = inject(SnackNotificationService);
  protected function = inject(functionsService);
  @Input() listTasks: ITaskModelResponse[] = [];
  protected task !: ITaskModelResponse;
  protected activeStatusFilter: 'Todas' | 'Pendiente' | 'En Progreso' | 'Terminada' = 'Todas';
  protected searchTerm: string = '';
  protected filteredTasks: ITaskModelResponse[] = [];

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
        status : (item.status === 'Terminada' ? 'Pendiente' : 'Terminada')
      }
    }

    this.taskService.updateTask(params).subscribe({
      next: (response) => this.handleUpdateTaskSuccess(response),
      error: (response) => this.handleUpdateTaskError(response),
    });

  }

  protected handleUpdateTaskSuccess(response: ApiResponse<void>) {

    this.snackBar.success(response.message);
    this.getTasks();
  }

  protected handleUpdateTaskError(response: HttpErrorResponse) {

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

    // this.snackBar.success(response.message);
    this.listTasks = response.data;
    this.applyFilters();
  }

  protected handleGetTasksError(response: HttpErrorResponse) {

    this.snackBar.error(response.error.message, 10000);
  }


  protected redirectAddTask() {

    this.router.navigate(['/dashboard/add-task'])
  }

  protected editTask(item : ITaskModelResponse) {

    const dialogRef = this.dialog.open(UpdateTaskComponent, {
      height: 'auto',
      width: 'auto',
      data: item
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.getTasks();
      }
    });
  }

  protected deleteTask(item : ITaskModelResponse) {

    const dialogRef = this.dialog.open(DeleteTaskComponent, {
      height: 'auto',
      width: 'auto',
      data: item
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.taskService.deleteTask({idTask : item._id}).subscribe({
          next: (response) => this.handleDeleteTasksSuccess(response),
          error: (response) => this.handleDeleteTasksError(response),
        });
      }
    });
  }

  protected handleDeleteTasksSuccess(response: ApiResponse<void>) {

    this.snackBar.success(response.message);
    this.getTasks();
  }

  protected handleDeleteTasksError(response: HttpErrorResponse) {

    this.snackBar.error(response.error.message, 10000);
  }

  protected assignTask(item : ITaskModelResponse) {

    this.dialog.open(AssignmentTaskComponent, {
      height: 'auto',
      width: 'auto',
      data: item
    });
  }

  protected getStatus(item : ITaskModelResponse){

    if(item.status === "Terminada") return 'completed'

    return ''
    
  }

  protected getCheckTask(item : ITaskModelResponse){

    if(item.status === "Terminada") return true

    return false

  }

  // Se activa cuando el usuario hace clic en un botón de estado
  onStatusFilterClick(status: 'Todas' | 'Pendiente' | 'En Progreso' | 'Terminada'): void {
    this.activeStatusFilter = status;
    this.applyFilters();
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.applyFilters();
  }

  applyFilters(): void {
    let tempTasks = [...this.listTasks]; // Usa una copia para no modificar la lista original

    // 1. Filtrar por término de búsqueda (título)
    if (this.searchTerm) {
      tempTasks = tempTasks.filter(task =>
        task.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    // 2. Filtrar por estado
    if (this.activeStatusFilter !== 'Todas') {
      tempTasks = tempTasks.filter(task => task.status === this.activeStatusFilter);
    }

    // Actualizar la lista que se muestra en la vista
    this.filteredTasks = tempTasks;
  }
}
