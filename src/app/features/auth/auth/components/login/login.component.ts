import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../../../core/services/auth.service';
import { SnackNotificationService } from '../../../../../../core/services/snack-bar.service';
import { ILoginForm } from '../../../../../../core/interfaces/forms/auth.login.form.interface';
import { zodValidator } from '../../../../../../core/zodValidator/zod.validator';
import { loginFormSchema } from '../../../../../../core/formSchema/login.form-schema';
import { LabelTypeComponent } from '../../../../../../shared/label-type/label-type.component';
import { ICredentials, ILoginResponse } from '../../../../../../core/interfaces/auth/credentials.interface';
import { ApiResponse } from '../../../../../../core/interfaces/api/api.response.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, LabelTypeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  protected formLogin: FormGroup<ILoginForm>;

  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(SnackNotificationService);
  private fb = inject(FormBuilder);

  constructor() {

    this.formLogin = this.fb.group<ILoginForm>({
      username: this.fb.control('', {
        validators: [zodValidator(loginFormSchema.shape.username)],
        nonNullable: true
      }),
      password: this.fb.control('', {
        validators: [zodValidator(loginFormSchema.shape.password)],
        nonNullable: true
      })
    });
  }


  protected login() {

    console.log(this.formLogin.getRawValue());

    let formValue = this.formLogin.getRawValue();

    let params: ICredentials = {

      username: formValue.username as string,
      password: formValue.password as string,
    }

    this.authService.login(params).subscribe({
      next: (response) => this.handleLoginSuccess(response),
      error: (response) => this.handleLoginError(response)
    });
  }

  protected handleLoginSuccess(response: ApiResponse<ILoginResponse>) {

    this.authService.setToken(response.data.token);
    this.snackBar.success(response.message);
    this.router.navigate(['/dashboard/start']);
  }

  protected handleLoginError(response: HttpErrorResponse) {

    this.snackBar.error(response.error.message, 10000);
  }

}
