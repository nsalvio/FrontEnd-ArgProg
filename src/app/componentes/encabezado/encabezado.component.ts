import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { Persona } from 'src/app/models/persona';
import { LoginService } from 'src/app/servicios/login.service';
import { PersonaService } from 'src/app/servicios/persona.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';
import { PortfolioComponent } from '../portfolio/portfolio.component';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  faLinkedin = faLinkedin;
  faGithub = faGithub;

  public persona : Persona | undefined;
  public editPersona : Persona | undefined;

  miPortfolio:any;
  constructor(private personaService : PersonaService, private logingService: LoginService, private ruta: Router) { }

  ngOnInit(): void {
    this.getPersona();
  }

  public logout(): void {
    this.logingService.logout();
    this.ruta.navigate(['/']);
  }

  public getPersona(): void {
    this.personaService.getPersona(this.logingService.getIdPersona()!).subscribe({
      next: (data: Persona) => {
        console.log("Datos Personales" + JSON.stringify(data));
      this.persona=data;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }
}
