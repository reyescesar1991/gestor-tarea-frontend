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
import { UserService } from '../../../../../../core/services/user.service';
import { IUsersResponse } from '../../../../../../core/interfaces/users/IUsersResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../../../../../core/interfaces/api/api.response.interface';
import { ITaskModelResponse } from '../../../../../../core/interfaces/task/ITaskModelResponse';
import { ICreateAssignmentRequest } from '../../../../../../core/interfaces/assignment/ICreateAssignment.interface';
import { AuthService } from '../../../../../../core/services/auth.service';
import { AssignmentService } from '../../../../../../core/services/assignment.service';

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
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private assignmentService = inject(AssignmentService);
  private fb = inject(FormBuilder);
  protected assignmentTaskForm: FormGroup<IAssignmentTaskForm>;
  protected listUser : IUsersResponse[] = [];

  constructor(
    public dialogRef: MatDialogRef<AssignmentTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public dataTask: ITaskModelResponse,
  ) {

    this.assignmentTaskForm = this.fb.group<IAssignmentTaskForm>({
      assignedUser: this.fb.control('', {
        validators: [zodValidator(assignmentTaskFormSchemaZod.shape.assignedUser)],
        nonNullable: true
      }),
    })
  }

  ngOnInit(){

    this.userService.getUsers().subscribe({
      next: (response) => this.handleGetUsersSuccess(response),
      error: (response) => this.handleGetUsersError(response),
    });
  }

  protected handleGetUsersSuccess(response: ApiResponse<IUsersResponse[]>) {

    this.listUser = response.data;
  }

  protected handleGetUsersError(response: HttpErrorResponse) {

    this.snackBar.error(response.error.message, 10000);
  }


  protected closeModal(){

    this.dialogRef.close(false);
  }

  protected assignTask(){

    console.log(this.assignmentTaskForm.getRawValue());

    let params : ICreateAssignmentRequest = {
      task : this.dataTask._id,
      assignedBy : this.authService.getUserData()?._id as string,
      assignedTo : this.assignmentTaskForm.get('assignedUser')?.value as string,
      assignUser : this.authService.getUserData()?.username as string,
      titleTask : this.dataTask.title
    }

    console.log(params);
    
    this.assignmentService.createAssignment(params).subscribe({
      next: (response) => this.handleCreateAssignmentSuccess(response),
      error: (response) => this.handleCreateAssignmentError(response),
    });
  
  }

  protected handleCreateAssignmentSuccess(response: ApiResponse<void>) {

    this.snackBar.success(response.message);
    this.dialogRef.close(true);
  }

  protected handleCreateAssignmentError(response: HttpErrorResponse) {

    this.snackBar.error(response.error.message, 10000);
  }
}
