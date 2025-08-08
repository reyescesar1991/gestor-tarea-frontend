import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AssignmentService } from '../../../../../../core/services/assignment.service';
import { SnackNotificationService } from '../../../../../../core/services/snack-bar.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IAssignmentsResponse } from '../../../../../../core/interfaces/assignment/IAssignmentResponse.interface';
import { ApiResponse } from '../../../../../../core/interfaces/api/api.response.interface';
import { functionsService } from '../../../../../../core/utils/function-util';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../../../core/services/user.service';
import { IUsersResponse } from '../../../../../../core/interfaces/users/IUsersResponse';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.scss'
})
export class AssignmentsComponent {

  private assignementService = inject(AssignmentService);
  private snackBar = inject(SnackNotificationService);
  private userService = inject(UserService);
  protected functionService = inject(functionsService);
  protected listAssignments: IAssignmentsResponse[] = [];
  protected filteredTasks: IAssignmentsResponse[] = [];
  protected searchTerm: string = "";
  protected listUsers : IUsersResponse[] = [];
  private userFilter : string = "";


  constructor() { }

  ngOnInit() {

    this.getAssignments();
    this.getUsers();
  }

  protected onFilterChange(event: Event) {
    this.userFilter = (event.target as HTMLSelectElement).value;
    console.log(this.userFilter);
    this.applyFilters();
  }


  private getUsers(){

    this.userService.getUsers().subscribe({
      next: (response) => this.handleGetUsersSuccess(response),
      error: (response) => this.handleGetUsersError(response),
    });
  }

  protected handleGetUsersSuccess(response: ApiResponse<IUsersResponse[]>) {

    console.log(response);
    this.listUsers = response.data;
  }

  protected handleGetUsersError(response: HttpErrorResponse) {
    console.log(response);
    this.snackBar.error(response.error.message, 10000);
  }

  private getAssignments(){

    this.assignementService.getAssignments().subscribe({
      next: (response) => this.handleGetAssignmentsSuccess(response),
      error: (response) => this.handleGetAssignmentsError(response),
    });
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.applyFilters();
  }

    applyFilters(): void {
    let tempAssignment = [...this.listAssignments]; // Usa una copia para no modificar la lista original

    // 1. Filtrar por término de búsqueda (título)
    if (this.searchTerm) {
      tempAssignment = tempAssignment.filter(assignment =>
        assignment.titleTask.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if(this.userFilter){
      tempAssignment = tempAssignment.filter(assignment =>
        assignment.assignUser.toLowerCase().includes(this.userFilter.toLowerCase())
      );
    }

    // Actualizar la lista que se muestra en la vista
    this.filteredTasks = tempAssignment;
  }

  protected handleGetAssignmentsSuccess(response: ApiResponse<IAssignmentsResponse[]>) {

    console.log(response);
    this.listAssignments = response.data;
    this.applyFilters();
  }

  protected handleGetAssignmentsError(response: HttpErrorResponse) {
    console.log(response);
    this.snackBar.error(response.error.message, 10000);

  }


}
