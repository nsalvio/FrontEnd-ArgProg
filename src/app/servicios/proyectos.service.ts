import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  //método para obtener el array proyectos
  public getProyectos(idPersona:number):Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(`${this.apiServerUrl}/persona/${idPersona}/proyecto/ver`);
  }
  
  //método para obtener un proyecto por id
  public getProyecto(idPersona:number, idProyecto: number):Observable<Proyecto>{
    return this.http.get<Proyecto>(`${this.apiServerUrl}/persona/${idPersona}/proyecto/ver/${idProyecto}`);
  }

  //método para agregar proyectos
  public addProyecto(idPersona:number, proyecto: Proyecto):Observable<Proyecto>{
    return this.http.post<Proyecto>(`${this.apiServerUrl}/persona/${idPersona}/proyecto/new`, proyecto); 
  }
  //método para actualizar/ editar proyectos
  public updateProyecto(idPersona:number, proyecto: Proyecto):Observable<Proyecto>{
    return this.http.put<Proyecto>(`${this.apiServerUrl}/persona/${idPersona}/proyecto/new`, proyecto); 
  }
  //método para borrar proyecto
  public deleteProyecto(idPersona:number, idProyecto: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/persona/${idPersona}/proyecto/delete/${idProyecto}`); 
  }
}



