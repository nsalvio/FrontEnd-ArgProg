import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../models/skills';

@Injectable({
  providedIn: 'root'
})

export class SkillsService {

  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  //método para obtener el array skills
  public getSkills(idPersona: number):Observable<Skill[]>{
    return this.http.get<Skill[]>(`${this.apiServerUrl}/persona/${idPersona}/Skills/ver`);
  }

   //método para obtener un skill
   public getSkill(idPersona: number, id: number):Observable<Skill>{
    return this.http.get<Skill>(`${this.apiServerUrl}/persona/${idPersona}/Skills/ver/${id}`);
  }

  //método para agregar skill
  public addSkills (idPersona: number, skills: Skill):Observable<Skill>{
    return this.http.post<Skill>(`${this.apiServerUrl}/persona/${idPersona}/Skills/new`, skills); 
  }
  //método para actualizar/ editar skills
  public updateSkills(idPersona: number, skill: Skill):Observable<Skill>{
    return this.http.put<Skill>(`${this.apiServerUrl}/persona/${idPersona}/Skills/edit/${skill.id}`, skill); 
  }
  //método para borrar skill
  public deleteSkill(idPersona: number, idSkills: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/persona/${idPersona}/Skills/delete/${idSkills}`); 
  }
}
