import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, Observable, of} from 'rxjs';
import { Hero } from '../interfaces/heroes.interface';
import { environments } from '../../../environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {

    private baseUrl: string = environments.baseUrl;

    constructor(private http: HttpClient) { }

    getHeroes(): Observable<Hero[]> {
        return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`);
    }

    getHeroById( id: string ): Observable<Hero | undefined > {
      return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
        //capturar el error
        .pipe(
          //si hay error regreso un observable que retorna undefined
          catchError( error => of(undefined) ) //of es una forma de crear Observable basado en el valor que voy a especificar
        );
    }

}
