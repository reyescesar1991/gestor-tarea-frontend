import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../app/environments/environment";
import { delay, Observable, of } from "rxjs";
import { ApiResponse } from "../interfaces/api/api.response.interface";
import { ICreateTaskRequest } from "../interfaces/task/ICreateTaskRequest";
import { ITaskModelResponse } from "../interfaces/task/ITaskModelResponse";
import { IUpdateTaskRequest } from "../interfaces/task/IUpdateTaskRequest";
import { IDeleteTaskRequest } from "../interfaces/task/IDeleteTaskRequest";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    private createTaskUrl = `${this.apiUrl}/v1/task/create-task`;
    private updateTaskUrl = `${this.apiUrl}/v1/task/update-task`;
    private getTasksUrl = `${this.apiUrl}/v1/task/get-tasks`;
    private deleteTaskUrl = `${this.apiUrl}/v1/task/delete-task`;
    
    createTask(params: ICreateTaskRequest): Observable<ApiResponse<void>> {
        if (environment.useDummyData) {

            // Simula un inicio de sesión exitoso para cualquier otro usuario
            const dummySuccessResponse: ApiResponse<void> = {
                message: 'Inicio de sesión exitoso (Modo Dummy).',
                code: 200,
                data: undefined
            };
            return of(dummySuccessResponse).pipe(delay(500));
        }

        // Llamada real a la API. El token se guardará en el componente
        // ya que la respuesta puede ser de dos tipos.
        return this.http.post<ApiResponse<void>>(this.createTaskUrl, params);
    }

    getTasks(): Observable<ApiResponse<ITaskModelResponse[]>> {
        if (environment.useDummyData) {

            // Simula un inicio de sesión exitoso para cualquier otro usuario
            const dummySuccessResponse: ApiResponse<ITaskModelResponse[]> = {
                message: 'Inicio de sesión exitoso (Modo Dummy).',
                code: 200,
                data: [
                    {
                        "_id": "6894f221988bd77395c676fb",
                        "title": "Agregar usuario",
                        "description": "Agregar crud",
                        "dueDate": "2025-08-07T14:32:35.000Z",
                        "priority": "Alta",
                        "status": "Pendiente"
                    },
                    {
                        "_id": "6894f8fe8ab886ab62fda0ba",
                        "title": "Agregar tarea",
                        "description": "agregar",
                        "dueDate": "2025-08-18T00:00:00.000Z",
                        "priority": "Baja",
                        "status": "Pendiente"
                    }
                ]
            };
            return of(dummySuccessResponse).pipe(delay(500));
        }

        // Llamada real a la API. El token se guardará en el componente
        // ya que la respuesta puede ser de dos tipos.
        return this.http.get<ApiResponse<ITaskModelResponse[]>>(this.getTasksUrl);
    }

    updateTask(params: IUpdateTaskRequest): Observable<ApiResponse<void>> {
        if (environment.useDummyData) {

            // Simula un inicio de sesión exitoso para cualquier otro usuario
            const dummySuccessResponse: ApiResponse<void> = {
                message: 'Inicio de sesión exitoso (Modo Dummy).',
                code: 200,
                data: undefined
            };
            return of(dummySuccessResponse).pipe(delay(500));
        }

        // Llamada real a la API. El token se guardará en el componente
        // ya que la respuesta puede ser de dos tipos.
        return this.http.post<ApiResponse<void>>(this.updateTaskUrl, params);
    }

    deleteTask(params : IDeleteTaskRequest): Observable<ApiResponse<void>> {
        if (environment.useDummyData) {

            // Simula un inicio de sesión exitoso para cualquier otro usuario
            const dummySuccessResponse: ApiResponse<void> = {
                message: 'Inicio de sesión exitoso (Modo Dummy).',
                code: 200,
                data: undefined
            };
            return of(dummySuccessResponse).pipe(delay(500));
        }

        // Llamada real a la API. El token se guardará en el componente
        // ya que la respuesta puede ser de dos tipos.
        return this.http.post<ApiResponse<void>>(this.deleteTaskUrl, params);
    }
}