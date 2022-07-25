import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Type } from '@angular/core';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/models/proyectos';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { LoginService, Roles } from 'src/app/servicios/login.service';
import { EditableComponent } from 'src/app/editable.component';


@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent extends EditableComponent implements OnInit {

  faEdit = faEdit;
  faPlus = faPlus;
  faTrash = faTrash;

  public proyectos: Proyecto[] = [];

  constructor(private proyectoService: ProyectosService, private _modalService: NgbModal, private _cdr: ChangeDetectorRef, loginService: LoginService) { 
    super(loginService);
  }

  ngOnInit(): void {
    if(this.isAuthenticated()){
      this.getProyecto();
    }
  }

  public getProyecto(): void {
    this.proyectoService.getProyectos(this.idPersona).subscribe({
      next: (Response: Proyecto[]) => {
        this.proyectos = Response;
        this._cdr.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  open(name: string, id?: number) {
    const modal = this._modalService.open(MODALS[name]);
    modal.componentInstance.idProyecto = id;
    modal.componentInstance.caller = this;
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
  public idPersona = 13;
  public caller?: ProyectosComponent;

  constructor(public modal: NgbActiveModal, private proyectosService: ProyectosService) { }

  delete() {
    if (this.idProyecto) {
      this.proyectosService.deleteProyecto(this.idPersona, this.idProyecto).subscribe({
        next: () => {
          this.caller && this.caller.getProyecto(); //CHANGE DETECTOR//
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
    alert('borrar');
    this.modal.close('Ok click');
  }
}

//modal para editar proyectos preexistentes
@Component({
  selector: 'ngbd-modal-edit-proyecto',
  template: `

<form [formGroup]="form" class="m-5" (ngSubmit)="edit()">
      <div class="modal-header">
        <h4 class="modal-title" id="modal-title">Editar Proyecto {{idProyecto}}</h4>
        <button type="button" class="btn-close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-3">
        <label>Nombre</label>
        </div>
          <div class="col-6" style="margin-bottom: 10px;">
          <input type="text" style="width: 100%" formControlName="name"> 
        </div>
        </div>
        <div class="row">
          <div class="col-md-3">
        <label>Descripcion</label>
      </div>
          <div class="col-6"  style="margin-bottom: 10px">
          <input type="text" style="width: 100%" formControlName="description">        
        </div>
        </div>
        <div class="row">
          <div class="col-md-3">
        <label>Fecha</label>
      </div>
          <div class="col-6"  style="margin-bottom: 10px">
          <input type="date" style="width: 100%" formControlName="date">
        </div>
        </div>
    <div class="row">
          <div class="col-md-3">
        <label>Link</label>
      </div>
          <div class="col-6" style="margin-bottom: 10px">
          <input type="text" style="width: 100%" formControlName="link">
        </div>
        </div>
    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
        <button type="button" class="btn btn-danger" (click)="edit()">Guardar</button>
      </div>
</form>`
})
export class NgbdModalEditProyecto {
  public idProyecto?: number;

  public proyecto?: Proyecto;
  private idPersona = 13;

  public caller?: ProyectosComponent;

  form: FormGroup;

  constructor(public modal: NgbActiveModal, private proyectoService: ProyectosService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(
      {
        name: [``, [Validators.required]],
        description: [``, [Validators.required]],
        date: [``, [Validators.required]],
        link: [``, [Validators.required]],
      }
    )
  }
  ngOnInit(): void {
    this.getProyecto();
  }

  public getProyecto(): void {
    this.idProyecto &&
      this.proyectoService.getProyecto(this.idPersona, this.idProyecto).subscribe({
        next: (Response: Proyecto) => {
          this.proyecto = Response;
          this.form.setValue({
            name: this.proyecto?.nombreDelProyecto,
            date: this.proyecto?.fechaDeRealizacion,
            description: this.proyecto?.descripcion,
            link: this.proyecto?.link,
          });
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
  }
  edit() {
    if (this.proyecto) {
      this.proyecto.nombreDelProyecto = this.form.get("name")?.value;
      this.proyecto.fechaDeRealizacion = this.form.get("date")?.value;
      this.proyecto.descripcion = this.form.get("description")?.value;
      this.proyecto.link = this.form.get("link")?.value;
      this.proyectoService.updateProyecto(this.idPersona, this.proyecto).subscribe({
        next: (Response: Proyecto) => {
          this.proyecto = Response;
          this.caller && this.caller.getProyecto();
          this.form.setValue({
            name: this.proyecto?.nombreDelProyecto,
            date: this.proyecto?.fechaDeRealizacion,
            description: this.proyecto?.descripcion,
            link: this.proyecto?.link,
          });
        },
      });
    }
    else {
      const proyecto = {
        nombreDelProyecto: this.form.get("name")?.value,
        fechaDeRealizacion: this.form.get("date")?.value,
        descripcion: this.form.get("description")?.value,
        link: this.form.get("link")?.value,
      };
      this.proyectoService.addProyecto(this.idPersona, proyecto).subscribe({
        next: (Response: Proyecto) => {
          this.proyecto = Response;
          this.caller && this.caller.getProyecto();
          this.form.setValue({
            name: this.proyecto?.nombreDelProyecto,
            date: this.proyecto?.fechaDeRealizacion,
            descripcion: this.proyecto?.descripcion,
            link: this.proyecto?.link,
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

const MODALS: { [name: string]: Type<any> } = {
  deleteProyecto: NgbdModalDeleteProyecto,
  editProyecto: NgbdModalEditProyecto,
  addProyecto: NgbdModalEditProyecto,
};
