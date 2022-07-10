import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }
  
  //método para obtener 1 persona por id
  public getPersona(idpersona: number): Observable<Persona>{ //getUser:trae el usuario.  Observable: trae los métodos
    return this.http.get<Persona>(`${this.apiServerUrl}/persona/ver/${idpersona}`); // retorna al usuario desde la url indicada
  }

  //método para actualizar persona
  public updatePersona(persona: Persona):Observable<Persona>{ //putUser:actualiza el usuario.  Observable: trae los métodos
    return this.http.put<Persona>(`${this.apiServerUrl}/persona/editar/${persona.id}`, persona);
  }
}
