import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../app/environments/environment";
import { ApiResponse } from "../interfaces/api/api.response.interface";
import { delay, Observable, of } from "rxjs";
import { ICreateAssignmentRequest } from "../interfaces/assignment/ICreateAssignment.interface";
import { IAssignmentsResponse } from "../interfaces/assignment/IAssignmentResponse.interface";

@Injectable({
    providedIn: 'root'
})
export class AssignmentService {

    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    private createAssignmentUrl = `${this.apiUrl}/v1/assignment/assignment-task`;
    private getAssignmentsUrl = `${this.apiUrl}/v1/assignment/get-assignments`;

    createAssignment(params: ICreateAssignmentRequest): Observable<ApiResponse<void>> {
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
        return this.http.post<ApiResponse<void>>(this.createAssignmentUrl, params);
    }

    getAssignments(): Observable<ApiResponse<IAssignmentsResponse[]>> {
        if (environment.useDummyData) {

            // Simula un inicio de sesión exitoso para cualquier otro usuario
            const dummySuccessResponse: ApiResponse<IAssignmentsResponse[]> = {
                message: 'Inicio de sesión exitoso (Modo Dummy).',
                code: 200,
                data: [

                ]
            };
            return of(dummySuccessResponse).pipe(delay(500));
        }

        // Llamada real a la API. El token se guardará en el componente
        // ya que la respuesta puede ser de dos tipos.
        return this.http.get<ApiResponse<IAssignmentsResponse[]>>(this.getAssignmentsUrl);
    }
}