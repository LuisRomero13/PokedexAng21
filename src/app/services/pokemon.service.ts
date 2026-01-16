import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Data, Resultado } from '../interfaces/pokeapi';
import { Pokemon } from '../interfaces/pokemon';
import { EMPTY, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl: string = 'https://pokeapi.co/api/v2/';
  private http = inject(HttpClient);

  getByPage(page: number, size: number = 40): Observable<Resultado[]> {
    // if (page > 5) return new Observable<Resultado[]>()
    // Funciona, pero hay opciones mejores:
    // Usar EMPTY (más idiomático en RxJS):
    // if (page > 5) return EMPTY;
    // Usar of([]) (si quieres devolver un array vacío):
    if (page > 5) return of([]);
    // Dejar el Observable completamente vacío (no emite nada, ni array):
    // if (page > 5) return EMPTY;
    const offset = size * (page - 1);
    return this.http
      .get<Data>(`${this.apiUrl}pokemon/?limit=${size}&offset=${offset}`)
      .pipe(map((res) => res.results));

    // const res = await fetch(`${this.apiUrl}pokemon/?limit=${size}&offset=${offset}`);
    // const resJson = await res.json();
    // if (resJson.results.length > 0) return resJson.results;
    // return [];
  }

  getByIdObs(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.apiUrl}pokemon/${id}`);
  }

  async getById(id: string): Promise<Pokemon> {
    const res = await fetch(`${this.apiUrl}pokemon/${id}`);
    return await res.json();
  }

  getDescripcionObs(id: string | number): Observable<string> {
    return this.http.get<any>(`https://pokeapi.co/api/v2/pokemon-species/${id}`).pipe(
      map((res) => {
        const texto = res.flavor_text_entries.find((texto: any) => texto.language.name === 'es');
        return texto.flavor_text;
      })
    );
  }
  
  async getDescripcion(id: string | number): Promise<string> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const resJson = await res.json();
    const texto = resJson.flavor_text_entries.find((texto: any) => texto.language.name === 'es');
    return texto.flavor_text;
  }
}
