import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ICreateUserForm } from '../../../../../../core/interfaces/forms/createUser.form.interface';
import { SnackNotificationService } from '../../../../../../core/services/snack-bar.service';
import { zodValidator } from '../../../../../../core/zodValidator/zod.validator';
import { createUserFormSchemaZod } from '../../../../../../core/formSchema/createUser.form-schema';
import { LabelTypeComponent } from '../../../../../../shared/label-type/label-type.component';
import { UserService } from '../../../../../../core/services/user.service';
import { ICreateUserRequest } from '../../../../../../core/interfaces/users/ICreateUserRequest';
import { ICreateUserResponse } from '../../../../../../core/interfaces/users/ICreateUserResponse';
import { HttpErrorResponse } from '@angular/common/http';
import { ApiResponse } from '../../../../../../core/interfaces/api/api.response.interface';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, LabelTypeComponent],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss'
})
export class CreateUserComponent {

  protected formCreateUser: FormGroup<ICreateUserForm>;

  private router = inject(Router);
  private snackBar = inject(SnackNotificationService);
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  constructor() {
    this.formCreateUser = this.fb.group<ICreateUserForm>({
      name: this.fb.control('', {
        validators: [zodValidator(createUserFormSchemaZod.shape.name)],
        nonNullable: true
      }),
      lastname: this.fb.control('', {
        validators: [zodValidator(createUserFormSchemaZod.shape.lastname)],
        nonNullable: true
      }),
      username: this.fb.control('', {
        validators: [zodValidator(createUserFormSchemaZod.shape.username)],
        nonNullable: true
      }),
      password: this.fb.control('', {
        validators: [zodValidator(createUserFormSchemaZod.shape.password)],
        nonNullable: true
      }),
      phone: this.fb.control('', {
        validators: [zodValidator(createUserFormSchemaZod.shape.phone)],
        nonNullable: true
      }),
      email: this.fb.control('', {
        validators: [zodValidator(createUserFormSchemaZod.shape.email)],
        nonNullable: true
      }),
    });
  }

  protected createUser(){

    let formValue = this.formCreateUser.getRawValue();

    let params : ICreateUserRequest = {

      name : formValue.name as string,
      lastname : formValue.lastname as string,
      username : formValue.username as string,
      password : formValue.password as string,
      email : formValue.email as string,
      phone : formValue.phone as string,
    }

    this.userService.createUser(params).subscribe({
      next: (response) => this.handleCreateUserSuccess(response),
      error: (response) => this.handleCreateUserError(response)
    });
            

    console.log(this.formCreateUser.getRawValue());
    
  }

  protected handleCreateUserSuccess(response: ApiResponse<ICreateUserResponse>) {
    this.snackBar.success(response.message);
    this.router.navigate(['/login']);
  }

  protected handleCreateUserError(response: HttpErrorResponse) {
    console.log(response);
    this.snackBar.error(response.error.message, 10000);
  }
}
