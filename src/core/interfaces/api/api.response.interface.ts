/**
 * Interfaz genérica para estandarizar las respuestas de la API.
 * @template T El tipo de datos que se espera en la propiedad 'data'.
 */
export interface ApiResponse<T> {
  message: string;
  code: number;
  data : T;
}

/**
 * Interfaz para estandarizar las respuestas de la API de error.
 */
export interface ApiResponseError{
  message: string;
  code: number;
  stack: string;
}