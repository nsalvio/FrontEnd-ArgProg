import { ChangeDetectorRef, Component, OnInit, Type } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/servicios/persona.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormBuilder, FormGroup, Validators, MaxLengthValidator } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { EditableComponent } from 'src/app/editable.component';
import { LoginService } from 'src/app/servicios/login.service';


@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent extends EditableComponent implements OnInit {
  faEdit = faEdit;

  public persona : Persona | undefined;

  constructor(private personaService : PersonaService, private _modalService: NgbModal, private _cdr: ChangeDetectorRef, loginService: LoginService) {
    super(loginService);
  }

  ngOnInit(): void {
    if(this.isAuthenticated()){
    this.getPersona();
    }
  }

  public getPersona(): void {
    this.personaService.getPersona(this.idPersona).subscribe({
      next: (Response: Persona) =>{
      this.persona=Response;
      this._cdr.detectChanges();
    },
    error:(error:HttpErrorResponse)=>{
         alert(error.message);
    }
    });
  }

  open(name: string, id?: number) { 
    const modal = this._modalService.open(MODALS[name]);
    modal.componentInstance.id = this.idPersona;
    modal.componentInstance.caller = this;
    }
}
 
//modal para editar persona: "acerca de mí"
@Component({
  selector: 'ngbd-modal-edit-persona',
  template: `

    <form [formGroup]="form" class="m-5" (ngSubmit)="edit()">
      <div class="modal-header">
        <h4 class="modal-title" id="modal-title">Editar Acerca de mí</h4>
        <button type="button" class="btn-close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-3">
        <label>Breve descripción</label>
      </div>
          <div class="col-6" style="margin-bottom: 10px;">
          <textarea style="width: 100%" formControlName="description"></textarea>
        </div>
        </div>   
    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
        <button type="submit" class="btn btn-danger" (submit)="edit()">Guardar</button>
      </div>
    </form>  `
})
export class NgbdModalEditPersona {
  public id?: number;
  public persona?: Persona;

  public caller?:AcercaDeComponent;

  form: FormGroup;

  constructor(public modal: NgbActiveModal, private personaService: PersonaService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(
      {
        description: [``, [Validators.required, Validators.maxLength(200)]],

      }
    )
  }  

  ngOnInit(): void {
    this.getPersona();
  }

  public getPersona(): void {
    this.id &&
      this.personaService.getPersona(this.id).subscribe({
        next: (Response: Persona) => {
          this.persona = Response;
        this.form.setValue({
          description: this.persona?.sobreMi,
        });
      },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
  }
  edit() {
    if (this.persona) {
      this.persona.sobreMi = this.form.get("description")?.value;
      this.personaService.updatePersona (this.persona).subscribe({
        next: (Response: Persona) => {
          this.persona = Response;
          this.caller && this.caller.getPersona();
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
  editPersona: NgbdModalEditPersona,
};

