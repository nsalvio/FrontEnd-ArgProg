import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/app/models/login';
import { LoginService, Roles } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  form: FormGroup;
  authenticado:boolean = false
  
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private ruta: Router) {
    this.form = this.formBuilder.group(
      {
        usuario: [``, [Validators.required,]],
        contrasenia: [``, [Validators.required, Validators.minLength(8)]],
        role: [``, [Validators.required,]],
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
    return this.form.get(`usuario`);
  }

  get Password() {
    return this.form.get(`contrasenia`);
  }

  

  onEnviar(event: Event) {
    event.preventDefault;
    this.loginService.login(this.form.value).subscribe({
      next: (result: LoginResponse) => {
        if (result) {
          authenticado: true;
          this.loginService.setContextInfo(result.idPersona, result.role);
          this.ruta.navigate(['/portfolio']);
        }
        else {
          authenticado: false;
          alert("Usuario/Contraseña no válido");
        }
      },
      error: (error: HttpErrorResponse) => { alert(error.message) }
    })
  }
}
