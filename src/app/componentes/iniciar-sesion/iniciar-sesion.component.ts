import { HttpErrorResponse } from '@angular/common/http';
import { jitOnlyGuardedExpression } from '@angular/compiler/src/render3/util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private ruta: Router) {
    this.form = this.formBuilder.group(
      {
        usuario: [``, [Validators.required,]],
        contrasenia: [``, [Validators.required, Validators.minLength(8)]],
        deviceInfo: this.formBuilder.group({
          deviceId: ["17867868768"],
          deviceType: ["DEVICE_TYPE_ANDROID"],
          notificationToken: ["67657575eececc34"]
        })
      }
    )
  }

  ngOnInit(): void {
  }

  get Email() {
    return this.form.get(`email`);
  }

  get Password() {
    return this.form.get(`password`);
  }

  onEnviar(event: Event) {
    event.preventDefault;
    this.loginService.updateProyecto(this.form.value).subscribe({
      next: (login: Login) => { alert ("inicio de sesión exitoso")
      
      
        this.ruta.navigate(['/portfolio']) },
      error: (error: HttpErrorResponse) => {alert(error.message)}
    })
  }
}
