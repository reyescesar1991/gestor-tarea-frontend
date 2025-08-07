import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../app/environments/environment";
import { delay, Observable, of } from "rxjs";
import { ApiResponse } from "../interfaces/api/api.response.interface";
import { ICreateUserRequest } from "../interfaces/users/ICreateUserRequest";
import { ICreateUserResponse } from "../interfaces/users/ICreateUserResponse";
import { IUsersResponse } from "../interfaces/users/IUsersResponse";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    private getUserUrl = `${this.apiUrl}/v1/user/me`;
    private createUserUrl = `${this.apiUrl}/v1/user/create-user`;
    private getUsersUrl = `${this.apiUrl}/v1/user/get-users`;

    createUser(credentials: ICreateUserRequest): Observable<ApiResponse<ICreateUserResponse>> {
        if (environment.useDummyData) {

            // Simula un inicio de sesión exitoso para cualquier otro usuario
            const dummySuccessResponse: ApiResponse<ICreateUserResponse> = {
                message: 'Inicio de sesión exitoso (Modo Dummy).',
                code: 200,
                data: {
                    username: 'username'
                }
            };
            return of(dummySuccessResponse).pipe(delay(500));
        }

        // Llamada real a la API. El token se guardará en el componente
        // ya que la respuesta puede ser de dos tipos.
        return this.http.post<ApiResponse<ICreateUserResponse>>(this.createUserUrl, credentials);
    }

    getUsers(): Observable<ApiResponse<IUsersResponse[]>> {
        if (environment.useDummyData) {

            // Simula un inicio de sesión exitoso para cualquier otro usuario
            const dummySuccessResponse: ApiResponse<IUsersResponse[]> = {
                message: 'Inicio de sesión exitoso (Modo Dummy).',
                code: 200,
                data: [

                    {
                    "_id": "68938f98dbdf31e4fd60c627",
                    "name": "Cesar",
                    "lastname": "Reyes Moreno",
                    "username": "Careyes.19",
                    "email": "reyescesar0711@gmail.com",
                    "phone": "04242746760"
                }
                ]
            };
            return of(dummySuccessResponse).pipe(delay(500));
        }

        // Llamada real a la API. El token se guardará en el componente
        // ya que la respuesta puede ser de dos tipos.
        return this.http.get<ApiResponse<IUsersResponse[]>>(this.getUsersUrl);
    }

    getUserData(): Observable<ApiResponse<IUsersResponse>> {
        if (environment.useDummyData) {

            // Simula un inicio de sesión exitoso para cualquier otro usuario
            const dummySuccessResponse: ApiResponse<IUsersResponse> = {
                message: 'Inicio de sesión exitoso (Modo Dummy).',
                code: 200,
                data: {
                    "_id": "68938f98dbdf31e4fd60c627",
                    "name": "Cesar",
                    "lastname": "Reyes Moreno",
                    "username": "Careyes.19",
                    "email": "reyescesar0711@gmail.com",
                    "phone": "04242746760"
                },
            };
            return of(dummySuccessResponse).pipe(delay(500));
        }

        // Llamada real a la API. El token se guardará en el componente
        // ya que la respuesta puede ser de dos tipos.
        return this.http.get<ApiResponse<IUsersResponse>>(this.getUserUrl);
    }
    
}