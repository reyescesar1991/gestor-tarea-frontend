import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { environment } from "../../app/environments/environment";

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authToken = authService.getToken();
  const isApiUrl = req.url.startsWith(environment.apiUrl);

  // Si no es una petición a nuestra API, la dejamos pasar sin modificar.
  if (!isApiUrl) {
    return next(req);
  }

  // Lista de rutas de API que no necesitan token.
  // Estas son las rutas exactas que vienen después de la `apiUrl`.
  // He asumido las rutas completas basándome en tu lista. Ajústalas si es necesario.
  const urlsExcluidas = [
    '/v1/auth/login',
    '/v1/auth/verify-2fa',
    '/v1/users/registrar-usuario',
    '/v1/auth/recover-password/initiate',
    '/v1/auth/recover-password/verify',
    '/v1/auth/recover-password/confirm',
    '/v1/auth/recover-username/initiate',
    '/v1/auth/recover-username/verify',
    '/v1/auth/recover-username/confirm'
  ];

  // Obtenemos la ruta relativa de la petición, ignorando query params.
  const requestPath = req.url.substring(environment.apiUrl.length).split('?')[0];

  // Verificamos si la ruta de la petición debe ser excluida.
  const debeExcluir = urlsExcluidas.some(path => path === requestPath);

  let authReq = req;

  // Si hay un token y la URL no está en la lista de exclusión,
  // clonamos la petición para añadir la cabecera de autorización.
  if (authToken && !debeExcluir) {
    authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Solo redirigimos en error 401 si NO es una de las rutas excluidas. Un 401 en el
      // login es un error esperado (credenciales incorrectas) y no debe causar un logout.
      if (error.status === 401 && !debeExcluir) {
        // Si el token es inválido o ha expirado, cerramos sesión y redirigimos.
        authService.logout();
        router.navigate(['/login']);
      }
      // Re-lanzamos el error para que otros manejadores (como un snackbar) puedan capturarlo.
      return throwError(() => error);
    })
  );
};