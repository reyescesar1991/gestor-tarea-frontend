import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from '../../../../core/services/user.service';
import { IUsersResponse } from '../../../../core/interfaces/users/IUsersResponse';
import { ApiResponse } from '../../../../core/interfaces/api/api.response.interface';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private userService = inject(UserService);
  private authService = inject(AuthService);
  private router = inject(Router);
  protected nameUser : string = "";
  protected lastnameUser : string = "";

  ngOnInit(): void {
    
    this.userService.getUserData().subscribe({
      next: (response) => this.handleGetUserDataSuccess(response),
      error: (response) => this.handleGetUserDataError(response),
    });
  }

  protected handleGetUserDataSuccess(response: ApiResponse<IUsersResponse>) {

    console.log(response);
    this.authService.setUserData(response.data);
    this.nameUser = response.data.name;
    this.lastnameUser = response.data.lastname;

  }

  protected handleGetUserDataError(response: ApiResponse<IUsersResponse>) {

    console.log(response);
    
  }

  protected logout() {

    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
