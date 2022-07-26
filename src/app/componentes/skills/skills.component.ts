import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, Type } from '@angular/core';
import { faEdit, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Skill } from 'src/app/models/skills';
import { SkillsService } from 'src/app/servicios/skills.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThisReceiver } from '@angular/compiler';
import { EditableComponent } from 'src/app/editable.component';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent extends EditableComponent implements OnInit {

  faEdit = faEdit;
  faTrash = faTrash;
  faPlus = faPlus;

  public skills: Skill[] = [];

  constructor(private skillsService: SkillsService, private _modalService: NgbModal, private _cdr: ChangeDetectorRef, loginService: LoginService) {
    super(loginService);
  }


  ngOnInit(): void {
    if (this.isAuthenticated()) {
      this.getSkills();
    }
  }

  public getSkills(): void {
    this.skillsService.getSkills(this.idPersona).subscribe({
      next: (Response: Skill[]) => {
        this.skills = Response;
        this._cdr.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
  }

  open(name: string, id?: number) {
    const modal = this._modalService.open(MODALS[name]);
    modal.componentInstance.idSkill = id;
    modal.componentInstance.idPersona = this.idPersona;
    modal.componentInstance.caller = this;
  }
}

// método para editar skill
@Component({
  selector: 'ngbd-modal-edit-skills',
  template: `
  
<form [formGroup]="form" class="m-5" (ngSubmit)="edit()">
      <div class="modal-header">
        <h4 class="modal-title" id="modal-title">Editar Skills {{idSkill}}</h4>
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
            <label>Porcentaje</label>
          </div>
          <div class="col-6"  style="margin-bottom: 10px">
            <input type="text" style="width: 100%" formControlName="percentage">
          </div>
        </div>
    </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
        <button type="submit" class="btn btn-danger" (submit)="edit">Guardar</button>
      </div>     
      
</form> `
})
export class NgbdModalEditSkills {
  public idSkill?: number;

  public skill?: Skill;
  private idPersona?: number;

  public caller?: SkillsComponent;

  form: FormGroup;

  constructor(public modal: NgbActiveModal, private skillsService: SkillsService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group(
      {
        name: [``, [Validators.required]],
        percentage: [``, [Validators.required, Validators.min(0), Validators.max(1009)]]
      }
    )
  }

  ngOnInit(): void {
    this.getSkills();
  }

  public getSkills(): void {
    this.idSkill &&
      this.skillsService.getSkill(this.idPersona!, this.idSkill).subscribe({
        next: (Response: Skill) => {
          this.skill = Response;
          this.form.setValue({
            name: this.skill?.nombreSkill,
            percentage: this.skill?.porcentaje
          });
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
  }
  edit() {
    if (this.skill) {
      this.skill.nombreSkill = this.form.get("name")?.value;
      this.skill.porcentaje = this.form.get("percentage")?.value;
      this.skillsService.updateSkills(this.idPersona!, this.skill).subscribe({
        next: (Response: Skill) => {
          this.skill = Response;
          this.caller && this.caller.getSkills();
          this.form.setValue({
            name: this.skill?.nombreSkill,
            percentage: this.skill?.porcentaje
          });
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
    }
    else {
      const skill = {
        nombreSkill: this.form.get("name")?.value,
        porcentaje: this.form.get("percentage")?.value
      };
      this.skillsService.addSkills(this.idPersona!, skill).subscribe({
        next: (Response: Skill) => {
          this.skill = Response;
          this.caller && this.caller.getSkills();
          this.form.setValue({
            name: this.skill?.nombreSkill,
            percentage: this.skill?.porcentaje
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

// modal para borrar skill
@Component({
  selector: 'ngbd-modal-delete-skill',
  template: `
      <div class="modal-header">
        <h4 class="modal-title" id="modal-title">Eliminar skill {{idSkill}}</h4>
        <button type="button" class="btn-close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')"></button>
      </div>
      <div class="modal-body">
        <p><strong>¿Está seguro que desea eliminar esta <span class="text-primary">"skill"</span> del portfolio?</strong></p>
        <p><span class="text-danger">Esta operación no podrá deshacerse.</span></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancelar</button>
        <button type="button" class="btn btn-danger" (click)="delete()">Ok</button>
      </div>
      `
})
export class NgbdModalDeleteSkill {
  public idSkill?: number;
  private idPersona?: number;
  public caller?: SkillsComponent;

  constructor(public modal: NgbActiveModal, private skillsService: SkillsService) { }

  delete() {
    if (this.idSkill) {
      this.skillsService.deleteSkill(this.idPersona!, this.idSkill).subscribe({
        next: () => {
          this.caller && this.caller.getSkills(); //CHANGE DETECTOR//
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
  editSkill: NgbdModalEditSkills,
  deleteSkill: NgbdModalDeleteSkill,
  addSkill: NgbdModalEditSkills,
};
