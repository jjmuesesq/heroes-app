import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from "../../../environments/environments";
import { User } from "../interfaces/user.interface";
import {catchError, map, Observable, of, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {

  // En determinado tiempo cuando la autenticacion se carga por primera vez el usuario va a estar nulo,
  // privado porque fuera del servicio el usuario no sea modificado o manipulado
  // componentes externos no pueden afectar el valor del usuario.
  private baseUrl = environments.baseUrl;
  private user?: User;

  constructor(private http: HttpClient) {
  }

  get currentUser(): User|undefined {
    if(!this.user ) return undefined;
    return structuredClone( this.user ); //retorna un clon del objeto user
  }

  login( email: string, password: string ): Observable<User> {

    //http.post('login', {email, pasword})
    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user),
        // tap( user => localStorage.setItem('token', user.id.toString() )),
        tap( user => localStorage.setItem('token', 'ASSFJFDsdjl13dff' )),
      )
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');
    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user),
        map( user => !!user),
        catchError( err => of(false) )
      )

  }


  logout() {
    this.user = undefined;
    localStorage.clear(); //borrar cualquier cosa que grabro en localstorage
  }
}
