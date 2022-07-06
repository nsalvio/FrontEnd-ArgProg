import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Type } from '@angular/core';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/models/proyectos';
import { ProyectosService } from 'src/app/servicios/proyectos.service';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

  faEdit = faEdit;
  faPlus = faPlus;
  faTrash = faTrash;

  public proyectos: Proyecto[] = [];
  private idPersona = 13;

  constructor(private proyectoService: ProyectosService, private _modalService: NgbModal) { }

  ngOnInit(): void {
    this.getProyecto();
  }

  public getProyecto(): void {
    this.proyectoService.getProyectos(this.idPersona).subscribe({
      next: (Response: Proyecto[]) => {
        this.proyectos = Response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  open(name: string, id?: number) {
    const modal = this._modalService.open(MODALS[name]);
    modal.componentInstance.idProyecto = id;
  }
}

//modal para borrar proyecto
@Component({
  selector: 'ngbd-modal-delete-proyecto',
  template: `
      <div class="modal-header">
        <h4 class="modal-title" id="modal-title">Eliminar Proyecto {{idProyecto}}</h4>
        <button type="button" class="btn-close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <p><strong>¿Está seguro que desea eliminar este <span class="text-primary">"proyecto"</span> del portfolio?</strong></p>
        <p><span class="text-danger">Esta operación no podrá deshacerse.</span></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
        <button type="button" class="btn btn-danger" (click)="delete()">Ok</button>
      </div>
      `
})
export class NgbdModalDeleteProyecto {
  public idProyecto?: number;

  constructor(public modal: NgbActiveModal) { }

  delete() {
    alert('borrar');
    this.modal.close('Ok click');
  }
}

//modal para editar proyectos preexistentes
@Component({
  selector: 'ngbd-modal-edit-proyecto',
  template: `
      <div class="modal-header">
        <h4 class="modal-title" id="modal-title">Editar Proyecto {{idProyecto}}</h4>
        <button type="button" class="btn-close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-3">
        <label>Nombre</label>
      </div>
          <div class="col-6" style="margin-bottom: 10px;"><input type="text" style="width: 100%" [value]="proyecto?.nombreDelProyecto">
         </div>
        </div>
        <div class="row">
          <div class="col-md-3">
        <label>Descripcion</label>
      </div>
          <div class="col-6"  style="margin-bottom: 10px"><input type="text" style="width: 100%" [value]="proyecto?.descripcion">
                </div>
        </div>
        <div class="row">
          <div class="col-md-3">
        <label>Fecha</label>
      </div>
          <div class="col-6"  style="margin-bottom: 10px"><input type="date" style="width: 100%" [value]="proyecto?.fechaDeRealizacion">
        </div>
        </div>
    <div class="row">
          <div class="col-md-3">
        <label>Link</label>
      </div>
          <div class="col-6" style="margin-bottom: 10px"><input type="text" style="width: 100%" [value]="proyecto?.link">
        </div>
      
    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
        <button type="button" class="btn btn-danger" (click)="edit()">Guardar</button>
      </div>
      `
})
export class NgbdModalEditProyecto {
  public idProyecto?: number;

  public proyecto?: Proyecto;
  private idPersona = 13;

  constructor(public modal: NgbActiveModal, private proyectoService: ProyectosService) { }

  ngOnInit(): void {
    this.getProyecto();
  }

  public getProyecto(): void {
    this.idProyecto &&
      this.proyectoService.getProyecto(this.idPersona, this.idProyecto).subscribe({
        next: (Response: Proyecto) => {
          this.proyecto = Response;
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

//modal para agregar nuevo proyecto
@Component({
  selector: 'ngbd-modal-add-proyecto',
  template: `
      <div class="modal-header">
        <h4 class="modal-title" id="modal-title">{{id ? "Editar" : "Agregar"}} Proyecto {{id}}</h4>
        <button type="button" class="btn-close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-3">
        <label>Nombre</label>
      </div>
          <div class="col-6" style="margin-bottom: 10px; align: left;"><input type="text" style="width: 100%" [value]="proyecto?.nombreDelProyecto">
         </div>
        </div>
        <div class="row">
          <div class="col-md-3">
        <label>Fecha de realización</label>
      </div>
          <div class="col-6"  style="margin-bottom: 10px"><input type="checkbox" [value]="proyecto?.fechaDeRealizacion">
        </div>
        </div>
        <div class="row">
          <div class="col-md-3">
        <label>Descripción</label>
      </div>
          <div class="col-6"  style="margin-bottom: 10px"><input type="text" style="width: 100%" [value]="proyecto?.descripcion">              </div>
        </div>
    <div class="row">
          <div class="col-md-3">
        <label>Link</label>
      </div>
         <div class="col-6" style="margin-bottom: 10px"><input type="date" style="width: 100%" [value]="proyecto?.link">
        </div>
      </div>      
    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
        <button type="button" class="btn btn-danger" (click)="edit()">Guardar</button>
      </div>
      `
})
export class NgbdModalAddProyecto {
  public id?: number;

  public proyecto?: Proyecto;
  private idPersona = 13;

  constructor(public modal: NgbActiveModal, private proyectosService: ProyectosService) { }

  ngOnInit(): void {
    this.getProyecto();
  }

  public getProyecto(): void {
    this.id &&
      this.proyectosService.getProyecto(this.idPersona, this.id).subscribe({
        next: (Response: Proyecto) => {
          this.proyecto = Response;
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

const MODALS: { [name: string]: Type<any> } = {
  deleteProyecto: NgbdModalDeleteProyecto,
  editProyecto: NgbdModalEditProyecto,
  addProyecto: NgbdModalEditProyecto,
};
