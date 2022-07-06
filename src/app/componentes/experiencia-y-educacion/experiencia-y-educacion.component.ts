import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Type } from '@angular/core';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Educacion } from 'src/app/models/educacion';
import { Experiencia } from 'src/app/models/experiencia';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';


@Component({
  selector: 'app-experiencia-y-educacion',
  templateUrl: './experiencia-y-educacion.component.html',
  styleUrls: ['./experiencia-y-educacion.component.css']
})
export class ExperienciaYEducacionComponent implements OnInit {
  faEdit = faEdit;
  faPlus = faPlus;
  faTrash = faTrash;

  public educaciones: Educacion[] = [];
  public experiencias: Experiencia[] = [];
  private idPersona = 13;

  constructor(private educacionService: EducacionService, private experienciaService: ExperienciaService, private _modalService: NgbModal) { }

  ngOnInit(): void {
    this.getEducacion();
    this.getExperiencia();
  }

  public getEducacion(): void {
    this.educacionService.getEducaciones(this.idPersona).subscribe({
      next: (Response: Educacion[]) => {
        this.educaciones = Response;
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
    }
}

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

  constructor(public modal: NgbActiveModal) {}

  delete(){
    alert('borrar');
    this.modal.close('Ok click');
  }
}


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

  constructor(public modal: NgbActiveModal) {}

  delete(){
    alert('borrar');
    this.modal.close('Ok click');
  }
}

@Component({
  selector: 'ngbd-modal-edit-educacion',
  template: `
      <div class="modal-header">
        <h4 class="modal-title" id="modal-title">{{id ? "Editar" : "Agregar"}} Educacion {{id}}</h4>
        <button type="button" class="btn-close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-3">
        <label>Carrera</label>
      </div>
          <div class="col-6" style="margin-bottom: 10px;"><input type="text" style="width: 100%" [value]="educacion?.carrera">
         </div>
        </div>
        <div class="row">
          <div class="col-md-3">
        <label>Instituto</label>
      </div>
          <div class="col-6"  style="margin-bottom: 10px"><input type="text" style="width: 100%" [value]="educacion?.instituto">
        </div>
        </div>
        <div class="row">
          <div class="col-md-3">
        <label>¿Cursa actualmente?</label>
      </div>
          <div class="col-6"  style="margin-bottom: 10px"><input type="text" style="width: 100%" [value]="educacion?.estudiaActualmente">
                </div>
        </div>
    <div class="row">
          <div class="col-md-3">
        <label>Fecha Inicio</label>
      </div>
          <div class="col-6" style="margin-bottom: 10px"><input type="date" style="width: 100%" [value]="educacion?.fechaInicio">
        </div>
      </div>
      <div class="row">
          <div class="col-md-3">
        <label>Fecha Fin</label>
      </div>
          <div class="col-6" style="margin-bottom: 10px"><input type="date" style="width: 100%" [value]="educacion?.fechaFin">
        </div>
      </div>
      
    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
        <button type="button" class="btn btn-danger" (click)="edit()">Guardar</button>
      </div>
      `
})
export class NgbdModalEditEducacion {
  public id?: number;

  public educacion?: Educacion;
  private idPersona = 13;

  constructor(public modal: NgbActiveModal, private educacionService: EducacionService) { }

  ngOnInit(): void {
    this.getEducacion();
  }

  public getEducacion(): void {
    this.id &&
      this.educacionService.getEducacion(this.idPersona, this.id).subscribe({
        next: (Response: Educacion) => {
          this.educacion = Response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
  }
  edit() {
    alert('borrar');
    this.modal.close('Ok click');
  }
}

@Component({
  selector: 'ngbd-modal-edit-experiencia',
  template: `
      <div class="modal-header">
        <h4 class="modal-title" id="modal-title">{{id ? "Editar" : "Agregar"}} Experiencia {{id}}</h4>
        <button type="button" class="btn-close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-3">
        <label>Empresa</label>
      </div>
          <div class="col-6" style="margin-bottom: 10px; align: left;"><input type="text" style="width: 100%" [value]="experiencia?.nombreEmpresa">
         </div>
        </div>
        <div class="row">
          <div class="col-md-3">
        <label>¿Es trabajo Actual?</label>
      </div>
          <div class="col-6"  style="margin-bottom: 10px"><input type="checkbox" [value]="experiencia?.esTrabajoActual">
        </div>
        </div>
        <div class="row">
          <div class="col-md-3">
        <label>fecha Inicio</label>
      </div>
          <div class="col-6"  style="margin-bottom: 10px"><input type="text" style="width: 100%" [value]="experiencia?.fechaInicio">              </div>
        </div>
    <div class="row">
          <div class="col-md-3">
        <label>Fecha Fin</label>
      </div>
         <div class="col-6" style="margin-bottom: 10px"><input type="date" style="width: 100%" [value]="experiencia?.fechaFin">
        </div>
      </div>
      <div class="row">        
        <div class="col-md-3">
        <label>Experiencia</label>
      </div>
          <div class="col-6" style="margin-bottom: 10px"><input type="date" style="width: 100%" [value]="experiencia?.descripcion">
        </div>
      </div>
      
    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
        <button type="button" class="btn btn-danger" (click)="edit()">Guardar</button>
      </div>
      `
})
export class NgbdModalEditExperiencia {
  public id?: number;

  public experiencia?: Experiencia;
  private idPersona = 13;

  constructor(public modal: NgbActiveModal, private experienciaService: ExperienciaService) { }

  ngOnInit(): void {
    this.getExperiencia();
  }

  public getExperiencia(): void {
    this.id &&
      this.experienciaService.getExperiencia(this.idPersona, this.id).subscribe({
        next: (Response: Experiencia) => {
          this.experiencia = Response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
  }
  edit() {
    alert('borrar');
    this.modal.close('Ok click');
  }
}

//modal para agregar educación nueva
@Component({
  selector: 'ngbd-modal-add-educacion',
  template: `
      <div class="modal-header">
        <h4 class="modal-title" id="modal-title">Agregar Educacion {{idEducacion}}</h4>
        <button type="button" class="btn-close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-3">
        <label>Carrera</label>
      </div>
          <div class="col-6" style="margin-bottom: 10px;"><input type="text" style="width: 100%" [value]="educacion?.carrera">
         </div>
        </div>
        <div class="row">
          <div class="col-md-3">
        <label>Instituto</label>
      </div>
          <div class="col-6"  style="margin-bottom: 10px"><input type="text" style="width: 100%" [value]="educacion?.instituto">
        </div>
        </div>
        <div class="row">
          <div class="col-md-3">
        <label>¿Cursa actualmente?</label>
      </div>
          <div class="col-6"  style="margin-bottom: 10px"><input type="text" style="width: 100%" [value]="educacion?.estudiaActualmente">
                </div>
        </div>
    <div class="row">
          <div class="col-md-3">
        <label>Fecha Inicio</label>
      </div>
          <div class="col-6" style="margin-bottom: 10px"><input type="date" style="width: 100%" [value]="educacion?.fechaInicio">
        </div>
      </div>
      <div class="row">
          <div class="col-md-3">
        <label>Fecha Fin</label>
      </div>
          <div class="col-6" style="margin-bottom: 10px"><input type="date" style="width: 100%" [value]="educacion?.fechaFin">
        </div>
      </div>
      
    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
        <button type="button" class="btn btn-danger" (click)="edit()">Guardar</button>
      </div>
      `
})
export class NgbdModalAddEducacion {
  public idEducacion?: number;

  public educacion?: Educacion;
  private idPersona = 13;

  constructor(public modal: NgbActiveModal, private educacionService: EducacionService) { }

  ngOnInit(): void {
    this.getEducacion();
  }

  public getEducacion(): void {
    this.idEducacion &&
      this.educacionService.getEducacion(this.idPersona, this.idEducacion).subscribe({
        next: (Response: Educacion) => {
          this.educacion = Response;
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
  }
  edit() {
    alert('borrar');
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