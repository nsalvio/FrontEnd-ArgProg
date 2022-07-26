import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, Type } from '@angular/core';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Educacion } from 'src/app/models/educacion';
import { Experiencia } from 'src/app/models/experiencia';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { EditableComponent } from 'src/app/editable.component';
import { LoginService } from 'src/app/servicios/login.service';


@Component({
  selector: 'app-experiencia-y-educacion',
  templateUrl: './experiencia-y-educacion.component.html',
  styleUrls: ['./experiencia-y-educacion.component.css']
})
export class ExperienciaYEducacionComponent extends EditableComponent implements OnInit {
  faEdit = faEdit;
  faPlus = faPlus;
  faTrash = faTrash;

  public educaciones: Educacion[] = [];
  public experiencias: Experiencia[] = [];

  constructor(private educacionService: EducacionService, private experienciaService: ExperienciaService, private _modalService: NgbModal, private _cdr: ChangeDetectorRef, loginService: LoginService) {
    super(loginService);
   }

  ngOnInit(): void {
    if(this.isAuthenticated())
    this.getEducacion();
    this.getExperiencia();
  }

  public getEducacion(): void {
    this.educacionService.getEducaciones(this.idPersona).subscribe({
      next: (Response: Educacion[]) => {
        this.educaciones = Response;
        this._cdr.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }    

  public getExperiencia(): void {
    this.experienciaService.getExperiencias(this.idPersona).subscribe({
      next: (Response: Experiencia[]) => {
        this.experiencias = Response;
        this._cdr.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }  

  open(name: string, id?: number) { 
    const modal = this._modalService.open(MODALS[name], {
      size: "xl"
    });
    modal.componentInstance.id = id;    
    modal.componentInstance.idPersona = this.idPersona;
    modal.componentInstance.caller = this;
    }
}

//modal para borrar experiencia
@Component({
  selector: 'ngbd-modal-delete-experiencia',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Eliminar Experiencia {{id}}</h4>
    <button type="button" class="btn-close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')"></button>
  </div>
  <div class="modal-body">
    <p><strong>¿Está seguro que desea eliminar esta <span class="text-primary">"experiencia"</span> del portfolio?</strong></p>
    <p><span class="text-danger">Esta operación no podrá deshacerse.</span></p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
    <button type="button" class="btn btn-danger" (click)="delete()">Ok</button>
  </div>
  `
})
export class NgbdModalDeleteExperiencia {
  public id?: number;
  public idPersona?: number;
  public caller?: ExperienciaYEducacionComponent;

  constructor(public modal: NgbActiveModal, private experienciaService: ExperienciaService) {}

  delete(){

    if (this.id) {
      this.experienciaService.deleteExperiencia(this.idPersona!, this.id).subscribe({
        next: () => {
          this.caller && this.caller.getExperiencia(); //CHANGE DETECTOR//
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
    this.modal.close('Ok click');
  }
}

//modal para borrar educación
@Component({
  selector: 'ngbd-modal-delete-educacion',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Eliminar Educacion {{id}}</h4>
    <button type="button" class="btn-close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')"></button>
  </div>
  <div class="modal-body">
    <p><strong>¿Está seguro que desea eliminar esta <span class="text-primary">"educacion"</span> del portfolio?</strong></p>
    <p><span class="text-danger">Esta operación no podrá deshacerse.</span></p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
    <button type="button" class="btn btn-danger" (click)="delete()">Ok</button>
  </div>
  `
})
export class NgbdModalDeleteEducacion {
  public id?: number;
  public caller?: ExperienciaYEducacionComponent;
  public idPersona?: number;

  constructor(public modal: NgbActiveModal, private educacionService: EducacionService) {}

  delete(){
    if (this.id) {
      this.educacionService.deleteEducacion(this.idPersona!, this.id).subscribe({
        next: () => {
          this.caller && this.caller.getEducacion(); //CHANGE DETECTOR//
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }    this.modal.close('Ok click');
  }
}

//modal para editar educación
@Component({
  selector: 'ngbd-modal-edit-educacion',
  template: `    
<form [formGroup]="form" class="m-5" (ngSubmit)="edit()">
      <div class="modal-header">
        <h4 class="modal-title" id="modal-title">{{id ? "Editar" : "Agregar"}} Educacion {{id}}</h4>
        <button type="button" class="btn-close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-3">
        <label>Carrera</label>
      </div>
          <div class="col-6" style="margin-bottom: 10px;">
          <input type="text" style="width: 100%" formControlName="name">
        </div>
        </div>
        <div class="row">
          <div class="col-md-3">
        <label>Instituto</label>
      </div>
          <div class="col-6"  style="margin-bottom: 10px">
          <input type="text" style="width: 100%" formControlName="institute">
        </div>
        </div>
        <div class="row">
          <div class="col-md-3">
        <label>¿Cursa actualmente?</label>
      </div>
          <div class="col-6"  style="margin-bottom: 10px">
          <input type="checkbox" style="width: 100%" formControlName="actual">
          </div>
        </div>
    <div class="row">
          <div class="col-md-3">
        <label>Fecha Inicio</label>
      </div>
          <div class="col-6" style="margin-bottom: 10px">
          <input type="date" style="width: 100%" formControlName="date">
        </div>
      </div>
      <div class="row">
          <div class="col-md-3">
        <label>Fecha Fin</label>
      </div>
          <div class="col-6" style="margin-bottom: 10px">
          <input type="date" style="width: 100%" formControlName="datend">
        </div>
      </div>
    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
        <button type="submit" class="btn btn-danger" (submit)="edit">Guardar</button>
      </div>
</form>  `

})
export class NgbdModalEditEducacion {
  public id?: number;
  public educacion?: Educacion;
  public idPersona?: number;
  

  public caller?:ExperienciaYEducacionComponent;

  form: FormGroup;

  constructor(public modal: NgbActiveModal, private educacionService: EducacionService, private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group(
    {
      name: [``, [Validators.required]],
      actual: [``, [Validators.required]],
      institute: [``, [Validators.required]],
      date: [``, [Validators.required]],
      datend: [``, [Validators.required]]
    }
  )
}

  ngOnInit(): void {
    this.getEducacion();
  }

  public getEducacion(): void {
    this.id &&
      this.educacionService.getEducacion(this.idPersona!, this.id).subscribe({
        next: (Response: Educacion) => {
          this.educacion = Response;
          this.form.setValue({
            name: this.educacion?.carrera,
            actual: this.educacion?.estudiaActualmente,
            institute: this.educacion?.instituto,
            date: this.educacion?.fechaInicio,
            datend: this.educacion?.fechaFin,
          });
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
  }
  edit() {
    if (this.educacion) {
      this.educacion.carrera = this.form.get("name")?.value;      
      this.educacion.estudiaActualmente = this.form.get("actual")?.value;
      this.educacion.instituto = this.form.get("institute")?.value;      
      this.educacion.fechaInicio = this.form.get("date")?.value;
      this.educacion.fechaFin = this.form.get("datend")?.value;
      this.educacionService.updateEducacion(this.idPersona!, this.educacion).subscribe({
        next: (Response: Educacion) => {
          this.educacion = Response;
          this.caller && this.caller.getEducacion();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
    else {
      const educacion = {
        carrera: this.form.get("name")?.value,
        estudiaActualmente: this.form.get("actual")?.value,
        instituto: this.form.get("institute")?.value,
        fechaInicio: this.form.get("date")?.value,
        fechaFin: this.form.get("datend")?.value,
      };
      this.educacionService.addEducacion(this.idPersona!, educacion).subscribe({
        next: (Response: Educacion) => {
          this.educacion = Response;
          this.caller && this.caller.getEducacion();
          this.form.setValue({
            name: this.educacion?.carrera,
            actual: this.educacion?.estudiaActualmente,
            institute: this.educacion?.instituto,
            date: this.educacion?.fechaInicio,
            datend: this.educacion?.fechaFin,
          });
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
  }
});
}
this.modal.close('Ok click');
}
}

//modal para editar experiencia
@Component({
  selector: 'ngbd-modal-edit-experiencia',
  template: `
  <form [formGroup]="form" class="m-5" (ngSubmit)="edit()">
      <div class="modal-header">
        <h4 class="modal-title" id="modal-title">{{id ? "Editar" : "Agregar"}} Experiencia {{id}}</h4>
        <button type="button" class="btn-close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-3">
        <label>Empresa</label>
      </div>
         <div class="col-6" style="margin-bottom: 10px; align: left;">
          <input type="text" style="width: 100%" formControlName="name">
      </div>
         </div>
        <div class="row">
          <div class="col-md-3">
        <label>¿Es trabajo Actual?</label>
      </div>
          <div class="col-6"  style="margin-bottom: 10px">
          <input type="checkbox" style="width: 100%" formControlName="actual">
        </div>
        </div>
        <div class="row">
          <div class="col-md-3">
        <label>fecha Inicio</label>
      </div>
          <div class="col-6"  style="margin-bottom: 10px">
          <input type="date" style="width: 100%" formControlName="date">
        </div>
</div>
    <div class="row">
          <div class="col-md-3">
        <label>Fecha Fin</label>
      </div>
         <div class="col-6" style="margin-bottom: 10px">
         <input type="date" sstyle="width: 100%" formControlName="datend">
        </div>
      </div>
      <div class="row">        
        <div class="col-md-3">
        <label>Experiencia</label>
      </div>
          <div class="col-6" style="margin-bottom: 10px">
          <input type="text" style="width: 100%" formControlName="description">
        </div>
      </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
        <button type="submit" class="btn btn-danger" (submit)="edit">Guardar</button>
      </div>
</form> `

})
export class NgbdModalEditExperiencia {
  public id?: number;

  public experiencia?: Experiencia;
  public idPersona?: number;

  public caller?: ExperienciaYEducacionComponent;

  form: FormGroup;

  constructor(public modal: NgbActiveModal, private experienciaService: ExperienciaService, private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group(
      {
        name: [``, [Validators.required]],
        actual: [``, [Validators.required,]],
        date: [``, [Validators.required,]],
        datend: [``, [Validators.required,]],
        description: [``, [Validators.required,]],
      }
    )
  }

  ngOnInit(): void {
    this.getExperiencia();
  }

  public getExperiencia(): void {
    this.id &&
      this.experienciaService.getExperiencia(this.idPersona!, this.id).subscribe({
        next: (Response: Experiencia) => {
          this.experiencia = Response;
          this.form.setValue({
            name: this.experiencia?.nombreEmpresa,
            actual: this.experiencia?.esTrabajoActual,
            date: this.experiencia?.fechaInicio,
            datend: this.experiencia?.fechaFin,
            description: this.experiencia?.descripcion,
          });
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
  }
  edit() {
    if (this.experiencia) {
      this.experiencia.nombreEmpresa = this.form.get("name")?.value;
      this.experiencia.esTrabajoActual = this.form.get("actual")?.value;
      this.experiencia.fechaInicio = this.form.get("date")?.value;
      this.experiencia.fechaFin = this.form.get("datend")?.value;
      this.experiencia.descripcion = this.form.get("description")?.value;
      this.experienciaService.updateExperiencia(this.idPersona!, this.experiencia).subscribe({
        next: (Response: Experiencia) => {
          this.experiencia = Response;
          this.caller && this.caller.getExperiencia();
          this.form.setValue({
            name: this.experiencia?.nombreEmpresa,
            actual: this.experiencia?.esTrabajoActual,
            date: this.experiencia?.fechaInicio,
            datend: this.experiencia?.fechaFin,
            description: this.experiencia?.descripcion,
          });
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
    else {
      const experiencia = {
        nombreEmpresa: this.form.get("name")?.value,
        esTrabajoActual: this.form.get("actual")?.value,
        fechaInicio: this.form.get("date")?.value,
        fechaFin: this.form.get("datend")?.value,
        descripcion: this.form.get("description")?.value,
      };
      this.experienciaService.addExperiencia(this.idPersona!, experiencia).subscribe({
        next: (Response: Experiencia) => {
          this.experiencia = Response;
          this.caller && this.caller.getExperiencia();
          this.form.setValue({
            name: this.experiencia?.nombreEmpresa,
            actual: this.experiencia?.esTrabajoActual,
            date: this.experiencia?.fechaInicio,
            datend: this.experiencia?.fechaFin,
            description: this.experiencia?.descripcion,            
          });
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
    this.modal.close('Ok click');
  }
}

const MODALS: {[name: string]: Type<any>} = {
  deleteExperiencia: NgbdModalDeleteExperiencia,
  deleteEducacion: NgbdModalDeleteEducacion,
  editEducacion: NgbdModalEditEducacion,
  editExperiencia: NgbdModalEditExperiencia,
  addEducacion: NgbdModalEditEducacion,
  addExperiencia: NgbdModalEditExperiencia,
};