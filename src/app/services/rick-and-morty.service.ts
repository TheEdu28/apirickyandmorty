import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ApiResponse } from '../models/character.interface';

@Injectable({
  providedIn: 'root'
})
export class RickAndMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene la lista de personajes desde la API
   * @param page Número de página (opcional)
   * @returns Observable con la respuesta de la API
   */
  getCharacters(page: number = 1): Observable<ApiResponse | null> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?page=${page}`).pipe(
      catchError(error => {
        console.error('Error al obtener personajes:', error);
        return of(null);
      })
    );
  }

  /**
   * Busca personajes por nombre
   * @param name Nombre a buscar
   * @returns Observable con los resultados de la búsqueda
   */
  searchCharacters(name: string): Observable<ApiResponse | null> {
    return this.http.get<ApiResponse>(`${this.apiUrl}?name=${name}`).pipe(
      catchError(error => {
        console.error('Error al buscar personajes:', error);
        return of(null);
      })
    );
  }
}
