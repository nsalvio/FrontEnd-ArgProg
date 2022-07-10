import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../models/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {
  
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }


  //método para obtener el array educacion
  public getEducaciones(idPersona: number):Observable<Educacion[]>{
    return this.http.get<Educacion[]>(`${this.apiServerUrl}/persona/${idPersona}/educacion/ver`);
  }
  
    //método para obtener 1 educación por id
  public getEducacion(idPersona: number, idEducacion: number):Observable<Educacion>{
    return this.http.get<Educacion>(`${this.apiServerUrl}/persona/${idPersona}/educacion/ver/${idEducacion}`);
  }
  //método para agregar educacion
  public addEducacion(idPersona: number, educacion: Educacion):Observable<Educacion>{
    return this.http.post<Educacion>(`${this.apiServerUrl}/persona/${idPersona}/educacion/new`, educacion); 

  }
  //método para actualizar educacion
  public updateEducacion(idPersona: number, educacion: Educacion):Observable<Educacion>{
    return this.http.put<Educacion>(`${this.apiServerUrl}/persona/${idPersona}/educacion/new`, educacion); 
  }
  //método para borrar educacion
  public deleteEducacion(idPersona: number, idEducacion: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/persona/${idPersona}/educacion/delete/${idEducacion}`); 
  }

}
