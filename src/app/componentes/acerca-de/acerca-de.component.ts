import { Component, OnInit, Type } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/servicios/persona.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  faEdit = faEdit;

  private idPersona = 13;
  public persona : Persona | undefined;
  public editPersona : Persona | undefined;

  constructor(private personaService : PersonaService, private _modalService: NgbModal) { }

  ngOnInit(): void {
    this.getPersona();
  }

  public getPersona(): void {
    this.personaService.getPersona(this.idPersona).subscribe({
      next: (Response: Persona) =>{
      this.persona=Response;
    },
    error:(error:HttpErrorResponse)=>{
         alert(error.message);
    }
    });
  }

  open(name: string) { 
    const modal = this._modalService.open(MODALS[name]);
    modal.componentInstance.id = this.idPersona;
    }
}
 
//modals
@Component({
  selector: 'ngbd-modal-edit-persona',
  template: `
      <div class="modal-header">
        <h4 class="modal-title" id="modal-title">Editar Acerca de mí</h4>
        <button type="button" class="btn-close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-3">
        <label>Breve descripción</label>
      </div>
          <div class="col-6" style="margin-bottom: 10px;"><textarea style="width: 100%">{{persona?.sobreMi}}</textarea>
         </div>
        </div>   
    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
        <button type="button" class="btn btn-danger" (click)="edit()">Guardar</button>
      </div>
      `
})
export class NgbdModalEditPersona {
  public id?: number;

  public persona?: Persona;

  constructor(public modal: NgbActiveModal, private personaService: PersonaService) { }

  ngOnInit(): void {
    this.getPersona();
  }

  public getPersona(): void {
    this.id &&
      this.personaService.getPersona(this.id).subscribe({
        next: (Response: Persona) => {
          this.persona = Response;
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
  editPersona: NgbdModalEditPersona,
};

