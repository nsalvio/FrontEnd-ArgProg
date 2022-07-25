import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { AcercaDeComponent, NgbdModalEditPersona } from './componentes/acerca-de/acerca-de.component';
import { ExperienciaYEducacionComponent, NgbdModalEditEducacion, NgbdModalEditExperiencia } from './componentes/experiencia-y-educacion/experiencia-y-educacion.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbdModalEditSkills, SkillsComponent } from './componentes/skills/skills.component';
import { NgbdModalEditProyecto, ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { PortfolioService } from './servicios/portfolio.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    AcercaDeComponent,
    ExperienciaYEducacionComponent,
    SkillsComponent,
    ProyectosComponent,
    IniciarSesionComponent,
    PortfolioComponent,
    NgbdModalEditSkills,
    NgbdModalEditProyecto,
    NgbdModalEditEducacion,
    NgbdModalEditExperiencia,
    NgbdModalEditPersona
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgCircleProgressModule.forRoot({}),
    HttpClientModule, 
    FormsModule, 
    ReactiveFormsModule, 
    NgbModule
  ],
  providers: [PortfolioService,
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
