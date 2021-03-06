import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Experiencia } from '../models/experiencia';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  //método para obtener el array experiencia
  public getExperiencias(idPersona: number):Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(`${this.apiServerUrl}/persona/${idPersona}/experiencia/ver`);
  }
  //método para obtener 1 experiencia por id
  public getExperiencia(idPersona: number, idExperiencia: number):Observable<Experiencia>{
    return this.http.get<Experiencia>(`${this.apiServerUrl}/persona/${idPersona}/experiencia/ver/${idExperiencia}`);
  }
  //método para agregar experiencia
  public addExperiencia(idPersona: number, experiencia: Experiencia):Observable<Experiencia>{
    return this.http.post<Experiencia>(`${this.apiServerUrl}/persona/${idPersona}/experiencia/new`, experiencia); 
  }
  //método para actualizar/ editar experiencia
  public updateExperiencia(idPersona: number, experiencia: Experiencia):Observable<Experiencia>{
    return this.http.post<Experiencia>(`${this.apiServerUrl}/persona/${idPersona}/experiencia/new`, experiencia); 
  }
  //método para borrar experiencia
  public deleteExperiencia(idPersona: number, experienciaId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/persona/${idPersona}/experiencia/delete/${experienciaId}`); 
  }
}

