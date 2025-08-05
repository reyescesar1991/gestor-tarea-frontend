import { ApplicationRef, createComponent, EnvironmentInjector, Injectable } from "@angular/core";
import { SnackBarComponent, SnackType } from "../../shared/snack-bar/snack-bar.component";


/**
 * Decorador @Injectable que marca esta clase como un servicio que puede ser inyectado.
 * 'providedIn: 'root' indica que este servicio será un singleton a nivel de aplicación.
 */
@Injectable({
    providedIn: 'root' // Proporciona este servicio en el injector raíz de la aplicación
})
export class SnackNotificationService {

    /**
     * Constructor del servicio.
     * Inyecta dependencias necesarias: ApplicationRef y EnvironmentInjector.
     * @param appRef Referencia a la aplicación Angular para manipulación de vistas de componentes.
     * @param injector Inyector de entorno para crear componentes dinámicamente con el contexto de inyección.
     */
    constructor(
        private appRef: ApplicationRef, // Inyección de ApplicationRef
        private injector: EnvironmentInjector // Inyección de EnvironmentInjector
    ) { }


    /**
     * Método privado para mostrar el componente SnackBarComponent dinámicamente.
     * Es privado porque solo se usa internamente dentro de este servicio.
     * @param type Tipo de snackbar (success, error, warning, info) para estilizarlo.
     * @param message Mensaje de texto a mostrar en el snackbar.
     * @param duration Duración en milisegundos que el snackbar se mostrará (por defecto 3000ms).
     */
    private show(type: SnackType, message: string, duration: number = 3000) {
        // Crear el componente SnackBarComponent dinámicamente utilizando createComponent.
        const componentRef = createComponent(SnackBarComponent, {
            environmentInjector: this.injector // Proporciona el inyector de entorno para que el componente tenga acceso a dependencias.
        });

        // Establecer las propiedades de entrada (@Input) del componente SnackBarComponent.
        componentRef.instance.type = type; // Establece la propiedad 'type' con el tipo de snackbar.
        componentRef.instance.message = message; // Establece la propiedad 'message' con el mensaje a mostrar.
        componentRef.instance.duration = duration; // Establece la propiedad 'duration' con la duración del snackbar.

        // Agregar el elemento DOM del componente (nativeElement) al final del body del documento.
        document.body.appendChild(componentRef.location.nativeElement);

        // Anexar la vista del componente a la ApplicationRef para que Angular detecte los cambios y lo gestione.
        this.appRef.attachView(componentRef.hostView);

        // Configurar un temporizador para eliminar el snackbar después de la duración especificada.
        setTimeout(() => {
            // Desanexar la vista del componente de la ApplicationRef para limpieza.
            this.appRef.detachView(componentRef.hostView);
            // Destruir el componente dinámicamente creado para liberar recursos y limpiar la memoria.
            componentRef.destroy();
        }, duration + 300); // Espera duración + 300ms (extra para posible animación de cierre).
    }

    /**
     * Método público para mostrar un snackbar de tipo 'success'.
     * @param message Mensaje de éxito a mostrar.
     * @param duration Duración opcional del snackbar.
     */
    success(message: string, duration?: number) {
        this.show('success', message, duration); // Llama al método 'show' con el tipo 'success'.
    }

    /**
     * Método público para mostrar un snackbar de tipo 'error'.
     * @param message Mensaje de error a mostrar.
     * @param duration Duración opcional del snackbar.
     */
    error(message: string, duration?: number) {
        this.show('error', message, duration); // Llama al método 'show' con el tipo 'error'.
    }

    /**
     * Método público para mostrar un snackbar de tipo 'warning'.
     * @param message Mensaje de advertencia a mostrar.
     * @param duration Duración opcional del snackbar.
     */
    warning(message: string, duration?: number) {
        this.show('warning', message, duration); // Llama al método 'show' con el tipo 'warning'.
    }

    /**
     * Método público para mostrar un snackbar de tipo 'info'.
     * @param message Mensaje de información a mostrar.
     * @param duration Duración opcional del snackbar.
     */
    info(message: string, duration?: number) {
        this.show('info', message, duration); // Llama al método 'show' con el tipo 'info'.
    }
}