import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        loadComponent: () => import('./features/auth/auth/auth.component').then(mod => mod.AuthComponent),
        children: [

            {
                path: 'login',
                loadComponent: () => import('./features/auth/auth/components/login/login.component').then(mod => mod.LoginComponent),
            },
            {
                path: 'create-user',
                loadComponent: () => import('./features/auth/auth/components/create-user/create-user.component').then(mod => mod.CreateUserComponent),
            },
        ]
    },
    {
        path: 'dashboard',
        loadComponent : () => import('./features/dashboard/dashboard/dashboard.component').then(mod => mod.DashboardComponent),
        children : [
            {
                path : 'start',
                loadComponent : () => import('./features/dashboard/dashboard/components/main/main.component').then(mod => mod.MainComponent),
            },
            {
                path : 'add-task',
                loadComponent : () => import('./features/dashboard/dashboard/components/add-task/add-task.component').then(mod => mod.AddTaskComponent),
            },
        ]
    }
];
