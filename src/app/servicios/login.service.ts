import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiServerUrl=environment.apiBaseUrl;
  url: string = "http://localhost:8080/usuario/login"

  constructor(private http:HttpClient) { }

  //método para actualizar/ editar boolean
  public login(login: Login):Observable<boolean>{
    return this.http.post<boolean>(this.url, login); 
  }
}



