import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Login, LoginResponse } from '../models/login';

export enum Roles {
  Admin = 'Administrator',
  Viewer = 'Viewer'
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiServerUrl=environment.apiBaseUrl;
  url: string = "http://localhost:8080/usuario/login";
  private authenticated: boolean;
  private idPersona?: number;
  private role?: Roles;

  constructor(private http:HttpClient) { 
    this.authenticated = false;
  }

  //método para actualizar/ editar boolean
  public login(login: Login):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.url, login); 
  }

  public setContextInfo(idPersona: number, role: Roles){
    this.authenticated = true;
    this.idPersona = idPersona;
    this.role = role;
  }

  public isAuthenticated() {
    return this.authenticated;
  }

  public getIdPersona () {
    return this.idPersona;
  }

  public getRole () {
    return this.role;
  }

  public logout() {
    this.authenticated = false;
    this.idPersona = undefined;
    this.role = undefined;
  }
}



