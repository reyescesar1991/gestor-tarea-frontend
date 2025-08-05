import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../../../core/services/auth.service';
import { SnackNotificationService } from '../../../../../../core/services/snack-bar.service';
import { ILoginForm } from '../../../../../../core/interfaces/forms/auth.login.form.interface';
import { zodValidator } from '../../../../../../core/zodValidator/zod.validator';
import { loginFormSchema } from '../../../../../../core/formSchema/login.form-schema';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  protected formLogin: FormGroup<ILoginForm>;

  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(SnackNotificationService);
  private fb = inject(FormBuilder);

  constructor(){

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


  protected login(){

    console.log(this.formLogin.getRawValue());
    
  }

}
