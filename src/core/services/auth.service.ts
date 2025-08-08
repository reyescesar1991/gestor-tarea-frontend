import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../app/environments/environment";
import { delay, Observable, of } from "rxjs";
import { ApiResponse } from "../interfaces/api/api.response.interface";
import { ICredentials, ILoginResponse } from "../interfaces/auth/credentials.interface";
import { IUsersResponse } from "../interfaces/users/IUsersResponse";


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly TOKEN_KEY = 'auth_token';
    private readonly USER_DATA_KEY = 'user_data';
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    private loginUrl = `${this.apiUrl}/v1/auth/login`;

    login(credentials: ICredentials): Observable<ApiResponse<ILoginResponse>> {
        if (environment.useDummyData) {

            // Simula un inicio de sesión exitoso para cualquier otro usuario
            const dummySuccessResponse: ApiResponse<ILoginResponse> = {
                message: 'Inicio de sesión exitoso (Modo Dummy).',
                code: 200,
                data: {
                    token: 'dummy-jwt-token-abc-123-xyz-789'
                }
            };
            return of(dummySuccessResponse).pipe(delay(500));
        }

        // Llamada real a la API. El token se guardará en el componente
        // ya que la respuesta puede ser de dos tipos.
        return this.http.post<ApiResponse<ILoginResponse>>(this.loginUrl, credentials);
    }


    getToken(): string | null {
        return sessionStorage.getItem(this.TOKEN_KEY);
    }

    //TODO: USER SESSION EN VEZ DE LOCAL
    setToken(token: string): void {
        sessionStorage.setItem(this.TOKEN_KEY, token);
    }

    getUserData() : IUsersResponse | null {
        return JSON.parse(sessionStorage.getItem(this.USER_DATA_KEY) || '{}');
    }

    setUserData(userData: IUsersResponse): void {
        sessionStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
    }


    logout(): void {
        sessionStorage.removeItem(this.TOKEN_KEY);
        // Aquí podrías limpiar otros datos del usuario si es necesario
    }
}